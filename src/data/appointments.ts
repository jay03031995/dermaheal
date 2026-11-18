export type DoctorBookingMode = "online" | "call-only";

export type DoctorBookingSchedule = {
  days: string[];
  startTime: string;
  endTime: string;
  slotIntervalMinutes?: number;
};

export type DoctorBookingProfile = {
  slug: string;
  name: string;
  bookingMode?: DoctorBookingMode;
  bookingNote?: string;
  bookingSchedule?: DoctorBookingSchedule[] | null;
};

type AvailabilityWindow = {
  days: number[];
  slots: string[];
  label?: string;
};

export type DoctorOption = {
  id: string;
  name: string;
  schedule: string;
  note: string;
  bookingMode: DoctorBookingMode;
  availability: AvailabilityWindow[];
};

const DAY_OPTIONS = [
  { name: "sunday", label: "Sunday", value: 0 },
  { name: "monday", label: "Monday", value: 1 },
  { name: "tuesday", label: "Tuesday", value: 2 },
  { name: "wednesday", label: "Wednesday", value: 3 },
  { name: "thursday", label: "Thursday", value: 4 },
  { name: "friday", label: "Friday", value: 5 },
  { name: "saturday", label: "Saturday", value: 6 },
] as const;

const DAY_INDEX = Object.fromEntries(
  DAY_OPTIONS.map(({ name, value }) => [name, value]),
) as Record<string, number>;

const jasmineSlots = ["9:20 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
const sonikaSlots = ["2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "5:30 PM"];
const srishtiWednesdaySlots = createTimeSlots("15:30", "19:30", 30);
const srishtiEveningSlots = createTimeSlots("17:30", "19:30", 30);

export const DOCTOR_OPTIONS: DoctorOption[] = [
  {
    id: "navjot-arora",
    name: "Dr. Navjot Singh Arora",
    schedule: "Call-only bookings",
    note: "Dr. Navjot Singh Arora bookings are taken through call only.",
    bookingMode: "call-only",
    availability: [],
  },
  {
    id: "jasmine-kohli",
    name: "Dr. Jasmine Kohli",
    schedule: "Tuesday, Thursday and Saturday · 9:20 AM to 4:30 PM",
    note: "Last online booking slot is 4:00 PM.",
    bookingMode: "online",
    availability: [{ days: [2, 4, 6], slots: jasmineSlots }],
  },
  {
    id: "sonika-soni",
    name: "Dr. Sonika Soni",
    schedule: "Monday and Friday · 2:00 PM to 6:00 PM",
    note: "Last online booking slot is 5:30 PM.",
    bookingMode: "online",
    availability: [{ days: [1, 5], slots: sonikaSlots }],
  },
  {
    id: "shrishti-jain",
    name: "Dr. Srishti Jain",
    schedule:
      "Wednesday · 3:30 PM to 7:30 PM; Tuesday, Thursday and Saturday · 5:30 PM to 7:30 PM",
    note: "Last online booking slot is 7:00 PM.",
    bookingMode: "online",
    availability: [
      { days: [3], slots: srishtiWednesdaySlots },
      { days: [2, 4, 6], slots: srishtiEveningSlots },
    ],
  },
];

function parseTime(value: string): number | undefined {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);
  if (!match) return undefined;
  return Number(match[1]) * 60 + Number(match[2]);
}

function formatTime(minutes: number): string {
  const hour24 = Math.floor(minutes / 60);
  const minute = String(minutes % 60).padStart(2, "0");
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${minute} ${hour24 < 12 ? "AM" : "PM"}`;
}

export function createTimeSlots(
  startTime: string,
  endTime: string,
  intervalMinutes = 30,
): string[] {
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  if (
    start === undefined ||
    end === undefined ||
    end <= start ||
    !Number.isInteger(intervalMinutes) ||
    intervalMinutes <= 0
  ) {
    return [];
  }

  const slots: string[] = [];
  for (let time = start; time < end; time += intervalMinutes) {
    slots.push(formatTime(time));
  }
  return slots;
}

function joinDays(days: string[]): string {
  if (days.length < 2) return days[0] ?? "";
  if (days.length === 2) return `${days[0]} and ${days[1]}`;
  return `${days.slice(0, -1).join(", ")} and ${days[days.length - 1]}`;
}

function configuredAvailability(
  schedules: DoctorBookingSchedule[] | null = [],
): AvailabilityWindow[] {
  return (schedules ?? []).flatMap((schedule) => {
    const days = [
      ...new Set(
        schedule.days
          .map((day) => DAY_INDEX[day.toLowerCase()])
          .filter((day): day is number => day !== undefined),
      ),
    ];
    const slots = createTimeSlots(
      schedule.startTime,
      schedule.endTime,
      schedule.slotIntervalMinutes ?? 30,
    );
    if (days.length === 0 || slots.length === 0) return [];

    const dayLabels = DAY_OPTIONS.filter((day) => days.includes(day.value)).map(
      (day) => day.label,
    );
    const start = parseTime(schedule.startTime);
    const end = parseTime(schedule.endTime);
    if (start === undefined || end === undefined) return [];

    return [
      {
        days,
        slots,
        label: `${joinDays(dayLabels)} · ${formatTime(start)} to ${formatTime(end)}`,
      },
    ];
  });
}

export function createDoctorOptions(
  doctors: DoctorBookingProfile[],
): DoctorOption[] {
  return doctors.map((doctor) => {
    const fallback = DOCTOR_OPTIONS.find((option) => option.id === doctor.slug);
    const configured = configuredAvailability(doctor.bookingSchedule);
    const availability = configured.length
      ? configured
      : (fallback?.availability ?? []);
    const bookingMode =
      doctor.bookingMode === "call-only" || availability.length === 0
        ? "call-only"
        : "online";

    return {
      id: doctor.slug,
      name: doctor.name,
      schedule: configured.length
        ? configured.map((window) => window.label).join("; ")
        : (fallback?.schedule ?? "Call to confirm availability"),
      note:
        doctor.bookingNote ||
        fallback?.note ||
        "The clinic will confirm your booking request.",
      bookingMode,
      availability,
    };
  });
}

export function getDoctorName(
  id?: string,
  doctors: DoctorOption[] = DOCTOR_OPTIONS,
) {
  return doctors.find((doctor) => doctor.id === id)?.name || id || "";
}

function getWeekday(date: string): number | undefined {
  if (!date) return undefined;
  const day = new Date(`${date}T00:00:00`).getDay();
  return Number.isNaN(day) ? undefined : day;
}

export function isDoctorAvailableOnDate(
  doctorId: string,
  date: string,
  doctors: DoctorOption[] = DOCTOR_OPTIONS,
) {
  if (!date) return true;
  const weekday = getWeekday(date);
  if (weekday === undefined) return false;
  return (
    doctors
      .find((doctor) => doctor.id === doctorId)
      ?.availability.some((window) => window.days.includes(weekday)) ?? false
  );
}

export function getSlotsForDoctor(
  doctorId: string,
  date: string,
  doctors: DoctorOption[] = DOCTOR_OPTIONS,
) {
  const weekday = getWeekday(date);
  if (weekday === undefined) return [];
  const doctor = doctors.find((item) => item.id === doctorId);
  if (!doctor) return [];

  return [
    ...new Set(
      doctor.availability
        .filter((window) => window.days.includes(weekday))
        .flatMap((window) => window.slots),
    ),
  ];
}
