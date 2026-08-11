/**
 * /studio sidebar item: "📊 Dashboard"
 *
 * CRM-style landing view for clinic staff — opens to live counters of new,
 * contacted, confirmed bookings; today's schedule; this week's volume;
 * 30-day conversion rate; and shortlists of new + upcoming confirmed
 * appointments. Refreshes every 30 seconds so a phone call back at the
 * desk just shows up.
 *
 * Pure Studio component (runs in the browser inside the Studio bundle),
 * so no "use client" directive is needed and no server boundaries apply.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Inline,
  Spinner,
  Stack,
  Text,
} from "@sanity/ui";
import {
  CalendarIcon,
  ClockIcon,
  RefreshIcon,
  UsersIcon,
} from "@sanity/icons";
import { useClient } from "sanity";

const QUERY = /* groq */ `{
  "counts": {
    "pending": count(*[_type == "appointment" && status == "pending"]),
    "new": count(*[_type == "appointment" && status == "new"]),
    "contacted": count(*[_type == "appointment" && status == "contacted"]),
    "confirmed": count(*[_type == "appointment" && status == "confirmed"]),
    "rejected": count(*[_type == "appointment" && status == "rejected"]),
    "completed": count(*[_type == "appointment" && status == "completed"]),
    "cancelled": count(*[_type == "appointment" && status == "cancelled"]),
    "noShow": count(*[_type == "appointment" && status == "noShow"])
  },
  "todayAll": count(*[_type == "appointment" && preferredDate == $today]),
  "todayConfirmed": count(*[_type == "appointment" && status == "confirmed" && preferredDate == $today]),
  "thisWeekSubmitted": count(*[_type == "appointment" && submittedAt >= $weekAgo]),
  "last30dNew": count(*[_type == "appointment" && submittedAt >= $monthAgo]),
  "last30dConfirmed": count(*[_type == "appointment" && status in ["confirmed","completed"] && submittedAt >= $monthAgo]),
  "recentPending": *[_type == "appointment" && status in ["pending","new"]] | order(submittedAt desc) [0...8] {
    _id, status, name, phone, concern, doctorName, preferredDate, preferredTime, submittedAt
  },
  "upcomingConfirmed": *[_type == "appointment" && status == "confirmed" && preferredDate >= $today] | order(preferredDate asc, preferredTime asc) [0...5] {
    _id, status, name, phone, concern, doctorName, preferredDate, preferredTime, emailConfirmationSent
  }
}`;

type ApptStub = {
  _id: string;
  status?: string;
  name?: string;
  phone?: string;
  concern?: string;
  doctorName?: string;
  preferredDate?: string;
  preferredTime?: string;
  submittedAt?: string;
  emailConfirmationSent?: boolean;
};

type DashboardData = {
  counts: {
    pending: number;
    new: number;
    contacted: number;
    confirmed: number;
    rejected: number;
    completed: number;
    cancelled: number;
    noShow: number;
  };
  todayAll: number;
  todayConfirmed: number;
  thisWeekSubmitted: number;
  last30dNew: number;
  last30dConfirmed: number;
  recentPending: ApptStub[];
  upcomingConfirmed: ApptStub[];
};

const REFRESH_MS = 30_000;

function makeQueryParams() {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
  return { today, weekAgo, monthAgo };
}

function relativeTime(iso?: string): string {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  const diff = Date.now() - then;
  const mins = Math.round(diff / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

function StatCard({
  label,
  value,
  tone = "default",
  hint,
}: {
  label: string;
  value: number | string;
  tone?: "default" | "primary" | "positive" | "caution" | "critical";
  hint?: string;
}) {
  return (
    <Card padding={4} radius={3} shadow={1} tone={tone}>
      <Stack space={3}>
        <Text size={1} muted weight="medium">
          {label}
        </Text>
        <Heading size={4}>{value}</Heading>
        {hint && (
          <Text size={1} muted>
            {hint}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  new: "New",
  contacted: "Contacted",
  confirmed: "Confirmed",
  rejected: "Rejected",
  cancelled: "Cancelled",
  completed: "Completed",
  noShow: "No-show",
};

function ApptRow({
  a,
  onAction,
  actionLoading,
}: {
  a: ApptStub;
  onAction?: (id: string, status: "confirmed" | "rejected" | "cancelled") => void;
  actionLoading?: string | null;
}) {
  const canApproveReject = a.status === "pending" || a.status === "new";
  const canCancel = canApproveReject || a.status === "confirmed";
  return (
    <Card padding={3} radius={2} shadow={0} tone="transparent">
      <Flex align="center" justify="space-between" gap={3} wrap="wrap">
        <Stack space={2} flex={1}>
          <Flex align="center" gap={2} wrap="wrap">
            <Text weight="semibold" size={2}>
              {a.name ?? "Unnamed"}
            </Text>
            {a.status && (
              <Text size={1} muted>
                · {STATUS_LABELS[a.status] ?? a.status}
              </Text>
            )}
          </Flex>
          <Inline space={3}>
            {a.phone && (
              <Text size={1} muted>
                📞 {a.phone}
              </Text>
            )}
            {a.doctorName && (
              <Text size={1} muted>
                · {a.doctorName}
              </Text>
            )}
            {a.concern && (
              <Text size={1} muted>
                · {a.concern}
              </Text>
            )}
            {(a.preferredDate || a.preferredTime) && (
              <Text size={1} muted>
                · {a.preferredDate ?? ""}
                {a.preferredTime ? ` ${a.preferredTime}` : ""}
              </Text>
            )}
          </Inline>
          {a.emailConfirmationSent && (
            <Text size={1} muted>
              Email confirmation sent
            </Text>
          )}
        </Stack>
        <Stack space={2}>
          {a.submittedAt && (
            <Text size={1} muted>
              {relativeTime(a.submittedAt)}
            </Text>
          )}
          {(canApproveReject || canCancel) && onAction && (
            <Inline space={2}>
              {canApproveReject && (
                <>
                  <Button
                    text="Approve"
                    tone="positive"
                    fontSize={1}
                    disabled={Boolean(actionLoading)}
                    loading={actionLoading === `${a._id}:confirmed`}
                    onClick={() => onAction(a._id, "confirmed")}
                  />
                  <Button
                    text="Reject"
                    tone="critical"
                    mode="ghost"
                    fontSize={1}
                    disabled={Boolean(actionLoading)}
                    loading={actionLoading === `${a._id}:rejected`}
                    onClick={() => onAction(a._id, "rejected")}
                  />
                </>
              )}
              {canCancel && (
                <Button
                  text="Cancel"
                  mode="ghost"
                  fontSize={1}
                  disabled={Boolean(actionLoading)}
                  loading={actionLoading === `${a._id}:cancelled`}
                  onClick={() => onAction(a._id, "cancelled")}
                />
              )}
            </Inline>
          )}
        </Stack>
      </Flex>
    </Card>
  );
}

export default function AppointmentsDashboard() {
  const client = useClient({ apiVersion: "2024-11-01" });
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [refreshTick, setRefreshTick] = useState(0);

  const refreshNow = useCallback(() => {
    setLoading(true);
    setError(null);
    setRefreshTick((n) => n + 1);
  }, []);

  const updateAppointmentStatus = useCallback(
    async (id: string, status: "confirmed" | "rejected" | "cancelled") => {
      setActionLoading(`${id}:${status}`);
      setError(null);
      try {
        const res = await fetch(`/api/appointments/${id}/status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        const payload = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          message?: string;
          emailReason?: string;
        };
        if (!res.ok || !payload.ok) {
          throw new Error(payload.message || `Could not update appointment (${res.status})`);
        }
        if (status === "confirmed" && payload.emailReason) {
          setError(`Appointment approved, but email was not sent: ${payload.emailReason}`);
        }
        refreshNow();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to update appointment");
      } finally {
        setActionLoading(null);
      }
    },
    [refreshNow],
  );

  useEffect(() => {
    let cancelled = false;
    client
      .fetch<DashboardData>(QUERY, makeQueryParams())
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [client, refreshTick]);

  useEffect(() => {
    const id = window.setInterval(refreshNow, REFRESH_MS);
    return () => window.clearInterval(id);
  }, [refreshNow]);

  const conversionPct = useMemo(() => {
    if (!data || data.last30dNew === 0) return null;
    return Math.round((data.last30dConfirmed / data.last30dNew) * 100);
  }, [data]);

  const todayLabel = useMemo(() => {
    return new Date().toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }, []);

  return (
    <Box padding={4}>
      <Stack space={5}>
        {/* Header */}
        <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
          <Stack space={2}>
            <Heading size={3}>Appointments Dashboard</Heading>
            <Text size={1} muted>
              {todayLabel} · auto-refreshes every 30 seconds
            </Text>
          </Stack>
          <Button
            icon={RefreshIcon}
            text={loading ? "Refreshing…" : "Refresh now"}
            mode="ghost"
            disabled={loading}
            onClick={refreshNow}
          />
        </Flex>

        {error && (
          <Card padding={4} radius={3} tone="critical">
            <Text>Failed to load dashboard: {error}</Text>
          </Card>
        )}

        {loading && !data && (
          <Flex padding={5} align="center" justify="center">
            <Spinner />
          </Flex>
        )}

        {data && (
          <>
            {/* Pipeline counts */}
            <Stack space={3}>
              <Text size={1} muted weight="medium">
                PIPELINE
              </Text>
              <Grid columns={[2, 2, 4]} gap={3}>
                <StatCard
                  label="🟡 Pending approval"
                  value={data.counts.pending + data.counts.new}
                  tone={data.counts.pending + data.counts.new > 0 ? "caution" : "default"}
                  hint="Approve, reject, or cancel from this dashboard"
                />
                <StatCard
                  label="📞 Contacted"
                  value={data.counts.contacted}
                  tone="primary"
                  hint="Awaiting patient response"
                />
                <StatCard
                  label="✅ Confirmed"
                  value={data.counts.confirmed}
                  tone="positive"
                  hint="Booked & scheduled"
                />
                <StatCard
                  label="Rejected / cancelled"
                  value={data.counts.rejected + data.counts.cancelled}
                  tone={data.counts.rejected + data.counts.cancelled > 0 ? "critical" : "default"}
                  hint={`${data.counts.completed} completed all-time`}
                />
              </Grid>
            </Stack>

            {/* Today + week + conversion */}
            <Stack space={3}>
              <Text size={1} muted weight="medium">
                ACTIVITY
              </Text>
              <Grid columns={[1, 2, 3]} gap={3}>
                <StatCard
                  label="Today's confirmed visits"
                  value={data.todayConfirmed}
                  tone={data.todayConfirmed > 0 ? "positive" : "default"}
                  hint={
                    data.todayAll > data.todayConfirmed
                      ? `+${data.todayAll - data.todayConfirmed} unconfirmed today`
                      : "All today's bookings are confirmed"
                  }
                />
                <StatCard
                  label="Bookings this week (last 7 days)"
                  value={data.thisWeekSubmitted}
                  hint="Total submissions through the website"
                />
                <StatCard
                  label="30-day conversion"
                  value={
                    conversionPct === null ? "—" : `${conversionPct}%`
                  }
                  tone={
                    conversionPct === null
                      ? "default"
                      : conversionPct >= 60
                      ? "positive"
                      : conversionPct >= 30
                      ? "caution"
                      : "critical"
                  }
                  hint={
                    data.last30dNew === 0
                      ? "No bookings in the last 30 days"
                      : `${data.last30dConfirmed} of ${data.last30dNew} new bookings reached Confirmed/Completed`
                  }
                />
              </Grid>
            </Stack>

            {/* Two-column: New + Upcoming */}
            <Grid columns={[1, 1, 2]} gap={4}>
              <Card padding={4} radius={3} shadow={1}>
                <Stack space={4}>
                  <Flex align="center" gap={2}>
                    <UsersIcon />
                    <Heading size={1}>Pending approval</Heading>
                  </Flex>
                  {data.recentPending.length === 0 ? (
                    <Text muted>
                      Inbox zero — no bookings waiting for approval.
                    </Text>
                  ) : (
                    <Stack space={2}>
                      {data.recentPending.map((a) => (
                        <ApptRow
                          key={a._id}
                          a={a}
                          onAction={updateAppointmentStatus}
                          actionLoading={actionLoading}
                        />
                      ))}
                    </Stack>
                  )}
                </Stack>
              </Card>

              <Card padding={4} radius={3} shadow={1}>
                <Stack space={4}>
                  <Flex align="center" gap={2}>
                    <CalendarIcon />
                    <Heading size={1}>Upcoming confirmed</Heading>
                  </Flex>
                  {data.upcomingConfirmed.length === 0 ? (
                    <Text muted>
                      No confirmed appointments scheduled going forward.
                    </Text>
                  ) : (
                    <Stack space={2}>
                      {data.upcomingConfirmed.map((a) => (
                        <ApptRow
                          key={a._id}
                          a={a}
                          onAction={updateAppointmentStatus}
                          actionLoading={actionLoading}
                        />
                      ))}
                    </Stack>
                  )}
                </Stack>
              </Card>
            </Grid>

            <Card padding={3} radius={2} tone="transparent">
              <Flex align="center" gap={2}>
                <ClockIcon />
                <Text size={1} muted>
                  Tip: click any appointment in the sidebar to view full
                  patient details, add internal notes, or change status.
                </Text>
              </Flex>
            </Card>
          </>
        )}
      </Stack>
    </Box>
  );
}
