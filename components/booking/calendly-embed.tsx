"use client";

import { useEffect, useState } from "react";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import { Spinner } from "@/components/ui/spinner";
import { CALENDLY_PAGE_SETTINGS } from "@/lib/calendly/theme";
import { cn } from "@/lib/utils";

export type CalendlyPrefill = {
  email: string;
  firstName: string;
  lastName: string;
};

type CalendlyEmbedProps = {
  url: string;
  prefill: CalendlyPrefill;
  onScheduled?: () => void;
};

export function CalendlyEmbed({ url, prefill, onScheduled }: CalendlyEmbedProps) {
  const [loading, setLoading] = useState(true);

  useCalendlyEventListener({
    onEventScheduled: () => {
      onScheduled?.();
    },
    onPageHeightResize: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 4000);
    return () => window.clearTimeout(timer);
  }, [url]);

  return (
    <div className="calendly-embed relative overflow-hidden rounded-xl border border-border bg-surface-white">
      {loading && (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-surface-white"
          aria-live="polite"
          aria-busy="true"
        >
          <Spinner className="size-8 text-brand-primary" />
          <p className="text-sm text-muted-foreground">Loading available times…</p>
        </div>
      )}
      <div className={cn("min-h-[680px] transition-opacity", loading && "opacity-0")}>
        <InlineWidget
          url={url}
          styles={{ height: "680px", minWidth: "320px" }}
          prefill={{
            email: prefill.email,
            firstName: prefill.firstName,
            lastName: prefill.lastName,
          }}
          pageSettings={CALENDLY_PAGE_SETTINGS}
        />
      </div>
      <p className="border-t border-border px-4 py-3 text-center text-sm text-muted-foreground">
        Having trouble?{" "}
        <a
          href={`${url}?email=${encodeURIComponent(prefill.email)}&first_name=${encodeURIComponent(prefill.firstName)}&last_name=${encodeURIComponent(prefill.lastName)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-brand-primary hover:underline"
        >
          Open scheduler in a new tab
        </a>
      </p>
    </div>
  );
}
