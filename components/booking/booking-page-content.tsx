"use client";

import { useSearchParams } from "next/navigation";
import { BookingFunnel } from "@/components/booking/booking-funnel";

export function BookingPageContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service");

  return <BookingFunnel preselectedService={service} />;
}
