import Link from "next/link";
import { getBookingHref } from "@/lib/booking";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_HREF } from "@/lib/practice";
import { AlertCircle } from "lucide-react";

export function EmergencyBanner() {
  return (
    <div
      className="relative z-[60] border-b border-destructive/20 bg-destructive/5 px-4 py-2.5 text-center text-sm"
      role="region"
      aria-label="Emergency dental care notice"
    >
      <div className="section-container flex items-center justify-center gap-2 pr-8">
        <AlertCircle
          className="size-4 shrink-0 text-destructive"
          aria-hidden="true"
        />
        <p className="text-foreground">
          <span className="font-semibold">Toothache or dental emergency?</span>{" "}
          <Link
            href={getBookingHref("emergency")}
            className="font-medium text-destructive underline-offset-2 hover:underline"
          >
            Book same-day
          </Link>
          {" · "}
          <a
            href={EMERGENCY_PHONE_HREF}
            className="font-medium text-destructive underline-offset-2 hover:underline"
          >
            Call {EMERGENCY_PHONE}
          </a>
        </p>
      </div>
    </div>
  );
}
