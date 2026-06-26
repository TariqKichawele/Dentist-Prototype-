/**
 * Calendly embed colors aligned with app/globals.css brand tokens.
 * Values are 6-char hex without "#" — required by Calendly's embed API.
 * Requires a Calendly paid plan for pageSettings colors to apply.
 */
export const CALENDLY_PAGE_SETTINGS = {
  backgroundColor: "ffffff",
  primaryColor: "0a4e68",
  textColor: "1e293b",
  hideEventTypeDetails: false,
  hideLandingPageDetails: false,
} as const;
