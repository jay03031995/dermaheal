import { useMemo, useState } from "react";
import { Box, Button, Card, Flex, Stack, Text } from "@sanity/ui";
import { useFormValue } from "sanity";

type AppointmentValue = {
  _id?: string;
  status?: string;
  name?: string;
  phone?: string;
  emailConfirmationSent?: boolean;
  emailConfirmationError?: string;
};

type ActionStatus = "confirmed" | "rejected" | "cancelled";

function publishedId(id?: string) {
  return id?.replace(/^drafts\./, "") || "";
}

export default function AppointmentActionsInput() {
  const appointment = useFormValue([]) as AppointmentValue | undefined;
  const [loading, setLoading] = useState<ActionStatus | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const id = publishedId(appointment?._id);
  const status = appointment?.status;
  const canApprove = status === "pending" || status === "new";
  const canReject = status === "pending" || status === "new";
  const canCancel = canApprove || status === "confirmed";
  const canSendEmail = status === "confirmed";

  const helperText = useMemo(() => {
    if (!id) return "Save this appointment before using admin actions.";
    if (appointment?.emailConfirmationSent) {
      return "Email confirmation has been sent for this appointment.";
    }
    if (status === "confirmed") {
      return "Use Send confirmation email if this appointment was confirmed manually.";
    }
    return "Use Approve & send email to confirm the appointment and notify the patient.";
  }, [appointment?.emailConfirmationSent, id, status]);

  const runAction = async (nextStatus: ActionStatus) => {
    if (!id) return;
    setLoading(nextStatus);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch(`/api/appointments/${id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      const payload = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        emailSent?: boolean;
        emailReason?: string;
      };
      if (!res.ok || !payload.ok) {
        throw new Error(payload.message || `Action failed (${res.status})`);
      }
      if (nextStatus === "confirmed") {
        setMessage(
          payload.emailSent
            ? "Appointment confirmed and email sent. Refresh the document to see the updated status."
            : `Appointment confirmed, but email was not sent: ${payload.emailReason || "missing email setup"}`,
        );
      } else {
        setMessage(`Appointment ${nextStatus}. Refresh the document to see the updated status.`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update appointment");
    } finally {
      setLoading(null);
    }
  };

  return (
    <Card padding={4} radius={3} tone="primary" border>
      <Stack space={3}>
        <Stack space={2}>
          <Text weight="semibold">Appointment admin actions</Text>
          <Text size={1} muted>
            {helperText}
          </Text>
        </Stack>

        <Flex gap={2} wrap="wrap">
          {canApprove && (
            <Button
              text="Approve & send email"
              tone="positive"
              disabled={!id || Boolean(loading)}
              loading={loading === "confirmed"}
              onClick={() => runAction("confirmed")}
            />
          )}
          {canSendEmail && (
            <Button
              text="Send confirmation email"
              tone="positive"
              mode={appointment?.emailConfirmationSent ? "ghost" : "default"}
              disabled={!id || Boolean(loading)}
              loading={loading === "confirmed"}
              onClick={() => runAction("confirmed")}
            />
          )}
          {canReject && (
            <Button
              text="Reject"
              tone="critical"
              mode="ghost"
              disabled={!id || Boolean(loading)}
              loading={loading === "rejected"}
              onClick={() => runAction("rejected")}
            />
          )}
          {canCancel && (
            <Button
              text="Cancel"
              mode="ghost"
              disabled={!id || Boolean(loading)}
              loading={loading === "cancelled"}
              onClick={() => runAction("cancelled")}
            />
          )}
        </Flex>

        {message && (
          <Card padding={3} radius={2} tone="positive">
            <Text size={1}>{message}</Text>
          </Card>
        )}
        {error && (
          <Card padding={3} radius={2} tone="critical">
            <Text size={1}>{error}</Text>
          </Card>
        )}
        {appointment?.emailConfirmationError && (
          <Box>
            <Text size={1} muted>
              Last email error: {appointment.emailConfirmationError}
            </Text>
          </Box>
        )}
      </Stack>
    </Card>
  );
}
