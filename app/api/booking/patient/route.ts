import { NextResponse } from "next/server";
import {
  resolveAppointmentTypeId,
  upsertBookingIntent,
} from "@/lib/booking/intent";
import { upsertPatient } from "@/lib/patients/upsert";

type PatientRequestBody = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  practitionerId?: string;
  appointmentTypeSlug?: string;
  insurance?: string;
};

export async function POST(request: Request) {
  let body: PatientRequestBody;
  try {
    body = (await request.json()) as PatientRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const email = body.email?.trim() ?? "";
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const practitionerId = body.practitionerId?.trim() ?? "";
  const appointmentTypeSlug = body.appointmentTypeSlug?.trim() ?? "";
  const insurance = body.insurance?.trim() ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required" },
      { status: 400 }
    );
  }

  if (!firstName) {
    return NextResponse.json({ error: "First name is required" }, { status: 400 });
  }

  if (!lastName) {
    return NextResponse.json({ error: "Last name is required" }, { status: 400 });
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length !== 10) {
    return NextResponse.json(
      { error: "A valid 10-digit phone number is required" },
      { status: 400 }
    );
  }

  if (!practitionerId) {
    return NextResponse.json(
      { error: "A practitioner selection is required" },
      { status: 400 }
    );
  }

  if (!appointmentTypeSlug) {
    return NextResponse.json(
      { error: "A service selection is required" },
      { status: 400 }
    );
  }

  if (!insurance) {
    return NextResponse.json(
      { error: "An insurance selection is required" },
      { status: 400 }
    );
  }

  try {
    const appointmentTypeId = await resolveAppointmentTypeId(appointmentTypeSlug);
    if (!appointmentTypeId) {
      return NextResponse.json(
        { error: "Selected service was not found" },
        { status: 400 }
      );
    }

    const patientId = await upsertPatient({
      email,
      firstName,
      lastName,
      phone,
    });

    await upsertBookingIntent({
      email,
      practitionerId,
      appointmentTypeId,
      insurance,
    });

    return NextResponse.json({ id: patientId });
  } catch (error) {
    console.error("Failed to save patient:", error);
    return NextResponse.json(
      { error: "Failed to save patient details" },
      { status: 500 }
    );
  }
}
