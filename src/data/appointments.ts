export type DoctorId = "navjot-arora" | "jasmine-kohli" | "sonika-soni";

export type DoctorOption = {
  id: DoctorId;
  name: string;
  schedule: string;
  note: string;
};

export const DOCTOR_OPTIONS: DoctorOption[] = [
  {
    id: "navjot-arora",
    name: "Dr. Navjot Singh Arora",
    schedule: "Bookings via Healthplix and phone call",
    note: "Our team will confirm Dr. Navjot Singh Arora appointments through Healthplix or on call.",
  },
  {
    id: "jasmine-kohli",
    name: "Dr. Jasmine Kohli",
    schedule: "Tuesday, Thursday and Saturday · 9:20 AM to 4:30 PM",
    note: "Last online booking slot is 4:00 PM.",
  },
  {
    id: "sonika-soni",
    name: "Dr. Sonika Soni",
    schedule: "Monday and Friday · 2:00 PM to 6:00 PM",
    note: "Last online booking slot is 5:30 PM.",
  },
];

const navjotSlots = ["Healthplix / call confirmation"];
const jasmineSlots = ["9:20 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
const sonikaSlots = ["2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "5:30 PM"];

export function getDoctorName(id?: string) {
  return DOCTOR_OPTIONS.find((doctor) => doctor.id === id)?.name || id || "";
}

export function isDoctorAvailableOnDate(doctorId: string, date: string) {
  if (!date) return true;
  const day = new Date(`${date}T00:00:00`).getDay();
  if (doctorId === "jasmine-kohli") return day === 2 || day === 4 || day === 6;
  if (doctorId === "sonika-soni") return day === 1 || day === 5;
  return true;
}

export function getSlotsForDoctor(doctorId: string) {
  if (doctorId === "jasmine-kohli") return jasmineSlots;
  if (doctorId === "sonika-soni") return sonikaSlots;
  return navjotSlots;
}
