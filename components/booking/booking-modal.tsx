"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useBooking } from "@/components/providers/booking-provider";
import { cn } from "@/lib/utils";
import {
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Stethoscope,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

const SERVICE_OPTIONS = [
  {
    id: "cleaning",
    label: "Routine Cleaning & Exam",
    icon: Sparkles,
    mapsTo: "Routine Cleaning",
  },
  {
    id: "emergency",
    label: "Tooth Pain / Emergency",
    icon: AlertCircle,
    mapsTo: "Emergency Visit",
  },
  {
    id: "cosmetic",
    label: "Cosmetic Consultation",
    icon: Stethoscope,
    mapsTo: "Cosmetic Consultation",
  },
  {
    id: "other",
    label: "Other",
    icon: HelpCircle,
    mapsTo: "Other",
  },
];

const INSURANCE_OPTIONS = [
  "Delta Dental",
  "Cigna",
  "Aetna",
  "MetLife",
  "Guardian",
  "UnitedHealthcare",
  "no-insurance",
];

const TIME_SLOTS = {
  Morning: ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM"],
  Afternoon: ["12:00 PM", "12:30 PM", "1:00 PM", "2:00 PM", "2:30 PM", "3:00 PM"],
  Evening: ["4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM"],
};

const LOW_AVAILABILITY_DAYS = [3, 7, 12, 18];

type FormData = {
  service: string;
  insurance: string;
  date: Date | null;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  textReminders: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const STEPS = ["Service", "Insurance", "Schedule", "Details", "Confirmed"];

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function BookingModal() {
  const { isOpen, closeBooking, preselectedService } = useBooking();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());

  const [form, setForm] = useState<FormData>({
    service: "",
    insurance: "",
    date: null,
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    textReminders: true,
  });

  const resetForm = useCallback(() => {
    setStep(0);
    setErrors({});
    setSubmitting(false);
    setProcessing(false);
    setCalendarMonth(new Date());
    setForm({
      service: "",
      insurance: "",
      date: null,
      time: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      textReminders: true,
    });
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
      return;
    }
    if (preselectedService) {
      const match = SERVICE_OPTIONS.find(
        (s) =>
          s.mapsTo === preselectedService ||
          s.label.includes(preselectedService) ||
          preselectedService.includes(s.mapsTo)
      );
      if (match) {
        setForm((f) => ({ ...f, service: match.id }));
        setStep(1);
      }
    }
  }, [isOpen, preselectedService, resetForm]);

  const handleServiceSelect = (serviceId: string) => {
    setForm((f) => ({ ...f, service: serviceId }));
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

  const handleSubmit = async () => {
    if (!validateDetails()) return;
    setSubmitting(true);
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    setProcessing(false);
    setStep(4);
    setSubmitting(false);
  };

  const selectedServiceLabel =
    SERVICE_OPTIONS.find((s) => s.id === form.service)?.label ?? "";

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const today = new Date();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const date = new Date(year, month, day);
    const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isLowAvailability = LOW_AVAILABILITY_DAYS.includes(day);
    return { day, date, isPast, isLowAvailability };
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeBooking()}>
      <DialogContent
        className="flex max-h-[90vh] flex-col overflow-hidden rounded-2xl p-0 sm:max-w-2xl"
        aria-describedby="booking-description"
      >
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle className="text-xl font-semibold text-foreground">
            {step === 4 ? "You're All Set!" : "Book Your Appointment"}
          </DialogTitle>
          <DialogDescription id="booking-description">
            {step === 4
              ? "Your appointment has been confirmed."
              : `Step ${step + 1} of 4 — ${STEPS[step]}`}
          </DialogDescription>

          {step < 4 && (
            <div className="mt-3 flex gap-1.5" aria-hidden="true">
              {[0, 1, 2, 3].map((s) => (
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
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Step 1: Service Selection */}
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                What brings you in today?
              </h3>
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

          {/* Step 2: Insurance */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Insurance & Payment
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Selected: {selectedServiceLabel}
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

              <Button
                onClick={() => setStep(2)}
                disabled={!form.insurance}
                className="h-11 w-full rounded-full bg-brand-primary hover:bg-brand-primary/90"
              >
                Continue to Scheduling
              </Button>
            </div>
          )}

          {/* Step 3: Calendar */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Choose Date & Time
              </h3>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setCalendarMonth(new Date(year, month - 1, 1))
                      }
                      className="rounded-lg px-2 py-1 text-sm text-brand-primary hover:bg-brand-primary/5"
                      aria-label="Previous month"
                    >
                      ←
                    </button>
                    <span className="font-medium text-foreground">
                      {calendarMonth.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setCalendarMonth(new Date(year, month + 1, 1))
                      }
                      className="rounded-lg px-2 py-1 text-sm text-brand-primary hover:bg-brand-primary/5"
                      aria-label="Next month"
                    >
                      →
                    </button>
                  </div>

                  <div
                    className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground"
                    role="row"
                  >
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <div key={d} role="columnheader">
                        {d}
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-2 grid grid-cols-7 gap-1"
                    role="grid"
                    aria-label="Calendar date picker"
                  >
                    {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} />
                    ))}
                    {calendarDays.map(({ day, date, isPast, isLowAvailability }) => {
                      const selected = form.date && isSameDay(form.date, date);
                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={isPast}
                          onClick={() =>
                            setForm((f) => ({ ...f, date, time: "" }))
                          }
                          aria-label={`${date.toLocaleDateString("default", { month: "long", day: "numeric" })}${isLowAvailability ? ", limited availability" : ""}`}
                          aria-selected={selected ?? undefined}
                          role="gridcell"
                          className={cn(
                            "relative flex size-9 items-center justify-center rounded-lg text-sm transition-colors",
                            isPast && "cursor-not-allowed text-muted-foreground/40",
                            !isPast && "hover:bg-brand-primary/10",
                            selected && "bg-brand-primary text-white hover:bg-brand-primary"
                          )}
                        >
                          {day}
                          {isLowAvailability && !isPast && (
                            <span className="absolute -top-0.5 right-0.5 size-1.5 rounded-full bg-warning" aria-hidden="true" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {form.date &&
                    LOW_AVAILABILITY_DAYS.includes(form.date.getDate()) && (
                      <Badge className="mt-3 rounded-full bg-warning/10 text-warning hover:bg-warning/10">
                        Only 2 slots left for this day
                      </Badge>
                    )}
                </div>

                <div className="max-h-72 space-y-4 overflow-y-auto">
                  {form.date ? (
                    Object.entries(TIME_SLOTS).map(([period, slots]) => (
                      <div key={period}>
                        <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-foreground">
                          <Clock className="size-3.5" aria-hidden="true" />
                          {period}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {slots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setForm((f) => ({ ...f, time: slot }))}
                              className={cn(
                                "rounded-lg border px-3 py-2 text-sm transition-colors",
                                form.time === slot
                                  ? "border-brand-primary bg-brand-primary text-white"
                                  : "border-border hover:border-brand-primary/50"
                              )}
                              aria-pressed={form.time === slot}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-muted-foreground">
                      <Calendar className="size-8 opacity-40" aria-hidden="true" />
                      <p className="text-sm">Select a date to see available times</p>
                    </div>
                  )}
                </div>
              </div>

              <Button
                onClick={() => setStep(3)}
                disabled={!form.date || !form.time}
                className="h-11 w-full rounded-full bg-brand-primary hover:bg-brand-primary/90"
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 4: Lead Capture */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Almost Done — Your Details
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {form.date?.toLocaleDateString("default", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {form.time}
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
                  Send me text reminders for this appointment (highly
                  recommended)
                </Label>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="h-12 w-full rounded-full bg-brand-accent text-base font-semibold text-white hover:bg-brand-accent-hover"
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="size-5 text-white" />
                    Confirming...
                  </span>
                ) : (
                  "Confirm Appointment"
                )}
              </Button>
            </div>
          )}

          {/* Step 5: Success */}
          {step === 4 && (
            <div className="flex flex-col items-center py-4 text-center">
              {processing ? (
                <Spinner className="size-12 text-brand-primary" />
              ) : (
                <CheckCircle2
                  className="size-16 text-success animate-in zoom-in-50 duration-500"
                  aria-hidden="true"
                />
              )}

              <h3 className="mt-6 text-xl font-semibold text-foreground">
                Appointment Confirmed!
              </h3>
              <p className="mt-2 text-muted-foreground">
                We&apos;ve sent a confirmation to {form.email}
              </p>

              <div className="mt-8 w-full rounded-xl border border-border bg-ice-bg p-5 text-left text-sm">
                <dl className="space-y-3">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Service</dt>
                    <dd className="font-medium text-foreground">{selectedServiceLabel}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Date</dt>
                    <dd className="font-medium text-foreground">
                      {form.date?.toLocaleDateString("default", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Time</dt>
                    <dd className="font-medium text-foreground">{form.time}</dd>
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
                <Button
                  variant="outline"
                  className="h-11 flex-1 rounded-full"
                  asChild
                >
                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Dental+Appointment&dates=20260101T100000Z/20260101T110000Z&details=${selectedServiceLabel}&location=123+Smile+Avenue`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Add to Google Calendar
                  </a>
                </Button>
                <Button
                  onClick={closeBooking}
                  className="h-11 flex-1 rounded-full bg-brand-primary hover:bg-brand-primary/90"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
