export const PRACTICE_NAME = "Gentle Dental Care";

export const MAIN_PHONE = "(555) 123-4567";
export const MAIN_PHONE_HREF = "tel:+15551234567";

export const EMERGENCY_PHONE = "(555) 987-6543";
export const EMERGENCY_PHONE_HREF = "tel:+15559876543";

export const EMAIL = "hello@gentledentalcare.com";
export const EMAIL_HREF = "mailto:hello@gentledentalcare.com";

export const STREET_ADDRESS = "123 Smile Avenue, Suite 200";
export const ADDRESS = STREET_ADDRESS;
export const ADDRESS_LOCALITY = "Smile City";
export const ADDRESS_REGION = "SC";
export const POSTAL_CODE = "29401";
export const ADDRESS_COUNTRY = "US";
export const CITY_STATE = `${ADDRESS_LOCALITY}, ${ADDRESS_REGION} ${POSTAL_CODE}`;
export const FULL_ADDRESS = `${ADDRESS}, ${CITY_STATE}`;

export const MAPS_URL =
  "https://maps.google.com/?q=123+Smile+Avenue+Dental+Smile+City+SC";

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Gentle+Dental+Care+Smile+City";

/** Display-friendly office hours for UI */
export const OFFICE_HOURS = [
  { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
] as const;

/** Machine-readable hours for schema.org OpeningHoursSpecification */
export const OPENING_HOURS_SPEC = [
  {
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ] as const,
    opens: "08:00",
    closes: "18:00",
  },
  {
    days: ["Saturday"] as const,
    opens: "09:00",
    closes: "14:00",
  },
] as const;

export const PARKING_NOTE =
  "Free parking in the lot behind the building. Bus line 12 stops one block away.";

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  google: GOOGLE_REVIEWS_URL,
} as const;
