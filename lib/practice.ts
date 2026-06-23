export const PRACTICE_NAME = "Gentle Dental Care";

export const MAIN_PHONE = "(555) 123-4567";
export const MAIN_PHONE_HREF = "tel:+15551234567";

export const EMERGENCY_PHONE = "(555) 987-6543";
export const EMERGENCY_PHONE_HREF = "tel:+15559876543";

export const EMAIL = "hello@gentledentalcare.com";
export const EMAIL_HREF = "mailto:hello@gentledentalcare.com";

export const ADDRESS = "123 Smile Avenue, Suite 200";
export const CITY_STATE = "Smile City, SC 29401";
export const FULL_ADDRESS = `${ADDRESS}, ${CITY_STATE}`;

export const MAPS_URL =
  "https://maps.google.com/?q=123+Smile+Avenue+Dental+Smile+City+SC";

export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Gentle+Dental+Care+Smile+City";

export const OFFICE_HOURS = [
  { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 2:00 PM" },
  { day: "Sunday", hours: "Closed" },
] as const;

export const PARKING_NOTE =
  "Free parking in the lot behind the building. Bus line 12 stops one block away.";

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  google: GOOGLE_REVIEWS_URL,
} as const;
