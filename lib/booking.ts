export function getBookingHref(service?: string) {
  if (!service) return "/book";
  return `/book?service=${encodeURIComponent(service)}`;
}
