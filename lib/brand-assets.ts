export type InsurancePartner = {
  name: string;
  logo: string;
};

export const INSURANCE_PARTNERS: InsurancePartner[] = [
  { name: "Delta Dental", logo: "/logos/insurance/delta-dental.svg" },
  { name: "Cigna", logo: "/logos/insurance/cigna.svg" },
  { name: "Aetna", logo: "/logos/insurance/aetna.svg" },
  { name: "MetLife", logo: "/logos/insurance/metlife.svg" },
  { name: "Guardian", logo: "/logos/insurance/guardian.svg" },
  { name: "UnitedHealthcare", logo: "/logos/insurance/unitedhealthcare.svg" },
  { name: "Humana", logo: "/logos/insurance/humana.svg" },
  { name: "Blue Cross Blue Shield", logo: "/logos/insurance/bluecross.svg" },
];

export type SocialPlatform = "instagram" | "facebook" | "google";

export const SOCIAL_ICON_PATHS: Record<SocialPlatform, string> = {
  instagram: "/icons/social/instagram.svg",
  facebook: "/icons/social/facebook.svg",
  google: "/icons/social/google.svg",
};
