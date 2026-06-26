"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FloatingInput } from "@/components/ui/floating-input";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendlyEmbed } from "@/components/booking/calendly-embed";
import { cn } from "@/lib/utils";
import {
  BOOKING_STEPS,
  findServiceMatch,
  INSURANCE_OPTIONS,
  SERVICE_OPTIONS,
} from "@/lib/booking/constants";
import { createClient } from "@/lib/supabase/client";
import type { Practitioner } from "@/lib/database.types";
import { MAIN_PHONE, MAIN_PHONE_HREF } from "@/lib/practice";
import { CheckCircle2, ArrowLeft, UserRound } from "lucide-react";

type FormData = {
  service: string;
  practitionerId: string;
  insurance: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  textReminders: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

type BookingFunnelProps = {
  preselectedService?: string | null;
};

export function BookingFunnel({ preselectedService }: BookingFunnelProps) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [loadingPractitioners, setLoadingPractitioners] = useState(false);
  const [practitionerError, setPractitionerError] = useState<string | null>(
    null
  );
  const [calendlyUrl, setCalendlyUrl] = useState<string | null>(null);
  const [loadingCalendlyUrl, setLoadingCalendlyUrl] = useState(false);
  const [calendlyUrlError, setCalendlyUrlError] = useState<string | null>(null);
  const [savingPatient, setSavingPatient] = useState(false);
  const [patientSaveError, setPatientSaveError] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    service: "",
    practitionerId: "",
    insurance: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    textReminders: true,
  });

  useEffect(() => {
    if (!preselectedService) return;
    const match = findServiceMatch(preselectedService);
    if (match) {
      setForm((f) => ({ ...f, service: match.id }));
      setStep(1);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (step !== 1 || !form.service) return;

    let cancelled = false;

    async function loadPractitioners() {
      setLoadingPractitioners(true);
      setPractitionerError(null);

      try {
        const supabase = createClient();
        const { data: appointmentType, error: typeError } = await supabase
          .from("appointment_types")
          .select("id")
          .eq("slug", form.service)
          .maybeSingle();

        if (typeError) {
          if (typeError.code === "PGRST205" || typeError.message.includes("does not exist")) {
            throw new Error(
              "Booking database is not set up yet. Run npm run db:push (or npm run db:seed after pushing the schema)."
            );
          }
          throw typeError;
        }
        if (!appointmentType) {
          throw new Error(
            "No appointment types found in the database. Run npm run db:seed to load service data."
          );
        }

        const { data: mappings, error: mappingError } = await supabase
          .from("practitioner_services")
          .select("practitioner_id, practitioners(*)")
          .eq("appointment_type_id", appointmentType.id);

        if (mappingError) throw mappingError;

        const list = (mappings ?? [])
          .map((row) => {
            const practitioner = row.practitioners;
            if (Array.isArray(practitioner)) return practitioner[0];
            return practitioner;
          })
          .filter((p): p is Practitioner => p != null);

        if (!cancelled) {
          setPractitioners(list);
          if (list.length === 0) {
            setPractitionerError(
              "No practitioners are available for this service. Please call us to schedule."
            );
          }
        }
      } catch (error) {
        if (!cancelled) {
          setPractitionerError(
            error instanceof Error
              ? error.message
              : "Unable to load practitioners."
          );
          setPractitioners([]);
        }
      } finally {
        if (!cancelled) setLoadingPractitioners(false);
      }
    }

    loadPractitioners();
    return () => {
      cancelled = true;
    };
  }, [step, form.service]);

  useEffect(() => {
    if (step !== 4 || !form.practitionerId || !form.service) return;

    let cancelled = false;

    async function loadCalendlyUrl() {
      setLoadingCalendlyUrl(true);
      setCalendlyUrlError(null);
      setCalendlyUrl(null);

      try {
        const params = new URLSearchParams({
          practitionerId: form.practitionerId,
          appointmentTypeSlug: form.service,
        });
        const response = await fetch(`/api/booking/calendly-url?${params}`);
        const data = (await response.json()) as { url?: string; error?: string };

        if (!response.ok) {
          throw new Error(data.error ?? "Unable to load scheduling widget.");
        }

        if (!cancelled) setCalendlyUrl(data.url ?? null);
      } catch (error) {
        if (!cancelled) {
          setCalendlyUrlError(
            error instanceof Error
              ? error.message
              : "Unable to load scheduling widget."
          );
        }
      } finally {
        if (!cancelled) setLoadingCalendlyUrl(false);
      }
    }

    loadCalendlyUrl();
    return () => {
      cancelled = true;
    };
  }, [step, form.practitionerId, form.service]);

  const handleServiceSelect = (serviceId: string) => {
    setForm((f) => ({ ...f, service: serviceId, practitionerId: "" }));
    setTimeout(() => setStep(1), 200);
  };

  const validateDetails = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDetailsContinue = async () => {
    if (!validateDetails()) return;

    setSavingPatient(true);
    setPatientSaveError(null);

    try {
      const response = await fetch("/api/booking/patient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          practitionerId: form.practitionerId,
          appointmentTypeSlug: form.service,
          insurance: form.insurance,
        }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Unable to save your details.");
      }

      setStep(4);
    } catch (error) {
      setPatientSaveError(
        error instanceof Error
          ? error.message
          : "Unable to save your details. Please try again."
      );
    } finally {
      setSavingPatient(false);
    }
  };

  const selectedServiceLabel =
    SERVICE_OPTIONS.find((s) => s.id === form.service)?.label ?? "";

  const selectedPractitioner = practitioners.find(
    (p) => p.id === form.practitionerId
  );

  const insuranceLabel =
    form.insurance === "no-insurance"
      ? "Out-of-pocket / No Insurance"
      : form.insurance;

  const progressSteps = 5;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-brand-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to home
      </Link>

      <div className="overflow-hidden rounded-2xl border border-border bg-surface-white shadow-sm">
        <div className="border-b px-6 py-5">
          <h1 className="text-2xl font-bold text-foreground">
            {step === 5 ? "You're All Set!" : "Book Your Appointment"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground" id="booking-description">
            {step === 5
              ? "Your appointment has been confirmed."
              : `Step ${step + 1} of ${progressSteps} — ${BOOKING_STEPS[step]}`}
          </p>

          {step < 5 && (
            <div className="mt-4 flex gap-1.5" aria-hidden="true">
              {Array.from({ length: progressSteps }).map((_, s) => (
                <div
                  key={s}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    s <= step ? "bg-brand-primary" : "bg-border"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-6">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">
                What brings you in today?
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {SERVICE_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleServiceSelect(option.id)}
                      className={cn(
                        "flex min-h-16 items-center gap-4 rounded-xl border-2 p-4 text-left transition-all",
                        "hover:border-brand-primary hover:bg-brand-primary/5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-primary/20",
                        form.service === option.id
                          ? "border-brand-primary bg-brand-primary/5"
                          : "border-border bg-surface-white"
                      )}
                      aria-label={option.label}
                    >
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10">
                        <Icon className="size-6 text-brand-primary" aria-hidden="true" />
                      </div>
                      <span className="font-medium text-foreground">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Choose Your Practitioner
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Selected: {selectedServiceLabel}
                </p>
              </div>

              {loadingPractitioners ? (
                <div className="flex flex-col items-center gap-3 py-12">
                  <Spinner className="size-8 text-brand-primary" />
                  <p className="text-sm text-muted-foreground">
                    Loading available practitioners…
                  </p>
                </div>
              ) : practitionerError ? (
                <div className="rounded-xl border border-border bg-ice-bg p-5 text-sm text-muted-foreground">
                  <p>{practitionerError}</p>
                  <p className="mt-3">
                    Call us at{" "}
                    <a
                      href={MAIN_PHONE_HREF}
                      className="font-medium text-brand-primary hover:underline"
                    >
                      {MAIN_PHONE}
                    </a>
                  </p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {practitioners.map((practitioner) => (
                    <button
                      key={practitioner.id}
                      type="button"
                      onClick={() =>
                        setForm((f) => ({ ...f, practitionerId: practitioner.id }))
                      }
                      className={cn(
                        "flex items-start gap-4 rounded-xl border-2 p-4 text-left transition-all",
                        "hover:border-brand-primary hover:bg-brand-primary/5 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-brand-primary/20",
                        form.practitionerId === practitioner.id
                          ? "border-brand-primary bg-brand-primary/5"
                          : "border-border bg-surface-white"
                      )}
                    >
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10">
                        <UserRound
                          className="size-6 text-brand-primary"
                          aria-hidden="true"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {practitioner.name}
                        </p>
                        {practitioner.specialty && (
                          <p className="mt-0.5 text-sm text-brand-secondary">
                            {practitioner.specialty}
                          </p>
                        )}
                        {practitioner.role && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {practitioner.role}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(0)}
                  className="h-11 rounded-full"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!form.practitionerId || !!practitionerError}
                  className="h-11 flex-1 rounded-full bg-brand-primary hover:bg-brand-primary/90"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Insurance & Payment
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedServiceLabel}
                  {selectedPractitioner ? ` with ${selectedPractitioner.name}` : ""}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="insurance-select">Insurance Provider</Label>
                <Select
                  value={form.insurance}
                  onValueChange={(v) => setForm((f) => ({ ...f, insurance: v }))}
                >
                  <SelectTrigger
                    id="insurance-select"
                    className="h-12 w-full rounded-xl"
                    aria-label="Insurance provider"
                  >
                    <SelectValue placeholder="Select your insurance" />
                  </SelectTrigger>
                  <SelectContent>
                    {INSURANCE_OPTIONS.filter((i) => i !== "no-insurance").map(
                      (ins) => (
                        <SelectItem key={ins} value={ins}>
                          {ins}
                        </SelectItem>
                      )
                    )}
                    <SelectItem value="no-insurance">
                      I am paying out-of-pocket / No Insurance
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {form.insurance === "no-insurance" && (
                <div className="rounded-xl border border-brand-secondary/30 bg-brand-secondary/5 p-4 text-sm text-foreground">
                  Ask about our <strong>$99 New Patient Special</strong> at
                  checkout — includes exam, X-rays, and cleaning.
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="h-11 rounded-full"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!form.insurance}
                  className="h-11 flex-1 rounded-full bg-brand-primary hover:bg-brand-primary/90"
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Your Details
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  We&apos;ll pre-fill your information on the next step so you
                  don&apos;t have to enter it twice.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FloatingInput
                  label="First Name"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, firstName: e.target.value }))
                  }
                  error={errors.firstName}
                  autoComplete="given-name"
                />
                <FloatingInput
                  label="Last Name"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, lastName: e.target.value }))
                  }
                  error={errors.lastName}
                  autoComplete="family-name"
                />
              </div>

              <FloatingInput
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                error={errors.email}
                autoComplete="email"
              />

              <FloatingInput
                label="Mobile Phone"
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: formatPhone(e.target.value) }))
                }
                error={errors.phone}
                autoComplete="tel"
                inputMode="numeric"
              />

              <div className="flex items-start gap-3">
                <Checkbox
                  id="text-reminders"
                  checked={form.textReminders}
                  onCheckedChange={(checked) =>
                    setForm((f) => ({ ...f, textReminders: checked === true }))
                  }
                />
                <Label
                  htmlFor="text-reminders"
                  className="cursor-pointer text-sm leading-relaxed text-muted-foreground"
                >
                  Send me text reminders for this appointment (highly recommended)
                </Label>
              </div>

              {patientSaveError && (
                <p className="text-sm text-destructive" role="alert">
                  {patientSaveError}
                </p>
              )}

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="h-11 rounded-full"
                  disabled={savingPatient}
                >
                  Back
                </Button>
                <Button
                  onClick={handleDetailsContinue}
                  disabled={savingPatient}
                  className="h-12 flex-1 rounded-full bg-brand-accent text-base font-semibold text-white hover:bg-brand-accent-hover"
                >
                  {savingPatient ? (
                    <>
                      <Spinner className="mr-2 size-4" />
                      Saving…
                    </>
                  ) : (
                    "Continue to Scheduling"
                  )}
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Pick a Time
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedServiceLabel}
                  {selectedPractitioner ? ` with ${selectedPractitioner.name}` : ""}
                </p>
              </div>

              {loadingCalendlyUrl ? (
                <div className="flex flex-col items-center gap-3 py-16">
                  <Spinner className="size-8 text-brand-primary" />
                  <p className="text-sm text-muted-foreground">
                    Preparing your scheduling calendar…
                  </p>
                </div>
              ) : calendlyUrlError ? (
                <div className="rounded-xl border border-border bg-ice-bg p-5 text-sm text-muted-foreground">
                  <p>{calendlyUrlError}</p>
                  <p className="mt-3">
                    Call us at{" "}
                    <a
                      href={MAIN_PHONE_HREF}
                      className="font-medium text-brand-primary hover:underline"
                    >
                      {MAIN_PHONE}
                    </a>
                  </p>
                </div>
              ) : calendlyUrl ? (
                <CalendlyEmbed
                  url={calendlyUrl}
          prefill={{
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
          }}
                  onScheduled={() => setStep(5)}
                />
              ) : null}

              <Button
                variant="outline"
                onClick={() => setStep(3)}
                className="h-11 rounded-full"
              >
                Back
              </Button>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col items-center py-4 text-center">
              <CheckCircle2
                className="size-16 animate-in zoom-in-50 text-success duration-500"
                aria-hidden="true"
              />

              <h2 className="mt-6 text-xl font-semibold text-foreground">
                Appointment Confirmed!
              </h2>
              <p className="mt-2 text-muted-foreground">
                We&apos;ve sent a confirmation to {form.email}
              </p>

              <div className="mt-8 w-full rounded-xl border border-border bg-ice-bg p-5 text-left text-sm">
                <dl className="space-y-3">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Service</dt>
                    <dd className="font-medium text-foreground">{selectedServiceLabel}</dd>
                  </div>
                  {selectedPractitioner && (
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Practitioner</dt>
                      <dd className="font-medium text-foreground">
                        {selectedPractitioner.name}
                      </dd>
                    </div>
                  )}
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Insurance</dt>
                    <dd className="font-medium text-foreground">{insuranceLabel}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Location</dt>
                    <dd>
                      <a
                        href="https://maps.google.com/?q=123+Smile+Avenue+Dental"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-brand-primary hover:underline"
                      >
                        123 Smile Avenue, Suite 200
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
                <Button variant="outline" className="h-11 flex-1 rounded-full" asChild>
                  <Link href="/#team">Meet the Team</Link>
                </Button>
                <Button
                  className="h-11 flex-1 rounded-full bg-brand-primary hover:bg-brand-primary/90"
                  asChild
                >
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
