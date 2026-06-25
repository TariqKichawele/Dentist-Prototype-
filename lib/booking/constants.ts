import {
  AlertCircle,
  HelpCircle,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export type ServiceOption = {
  id: string;
  label: string;
  icon: LucideIcon;
  mapsTo: string;
};

export const SERVICE_OPTIONS: ServiceOption[] = [
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

export const INSURANCE_OPTIONS = [
  "Delta Dental",
  "Cigna",
  "Aetna",
  "MetLife",
  "Guardian",
  "UnitedHealthcare",
  "no-insurance",
] as const;

export const BOOKING_STEPS = [
  "Service",
  "Practitioner",
  "Insurance",
  "Details",
  "Schedule",
  "Confirmed",
] as const;

export function findServiceMatch(preselectedService: string) {
  return SERVICE_OPTIONS.find(
    (s) =>
      s.mapsTo === preselectedService ||
      s.label.includes(preselectedService) ||
      preselectedService.includes(s.mapsTo) ||
      preselectedService.includes(s.label)
  );
}
