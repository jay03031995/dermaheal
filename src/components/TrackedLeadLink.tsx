"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import {
  type AppointmentLeadPayload,
  trackAppointmentLead,
} from "@/lib/appointmentLeads";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & {
  children: ReactNode;
  lead: AppointmentLeadPayload;
};

export default function TrackedLeadLink({ children, lead, ...props }: Props) {
  return (
    <a
      {...props}
      onClick={() => {
        trackAppointmentLead(lead);
      }}
    >
      {children}
    </a>
  );
}
