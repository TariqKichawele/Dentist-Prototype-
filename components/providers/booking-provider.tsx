"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { BookingModal } from "@/components/booking/booking-modal";

type BookingContextValue = {
  isOpen: boolean;
  preselectedService: string | null;
  openBooking: (service?: string) => void;
  closeBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | null>(
    null
  );

  const openBooking = useCallback((service?: string) => {
    setPreselectedService(service ?? null);
    setIsOpen(true);
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    setPreselectedService(null);
  }, []);

  const value = useMemo(
    () => ({ isOpen, preselectedService, openBooking, closeBooking }),
    [isOpen, preselectedService, openBooking, closeBooking]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}
