"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type FloatingInputProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export function FloatingInput({
  label,
  error,
  id,
  className,
  value,
  defaultValue,
  ...props
}: FloatingInputProps) {
  const inputId = id ?? React.useId();
  const [focused, setFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(
    Boolean(value ?? defaultValue)
  );

  const floated = focused || hasValue || Boolean(value);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            "peer h-12 w-full rounded-xl border bg-surface-white px-4 pt-5 pb-2 text-sm text-foreground transition-all outline-none placeholder:text-transparent",
            "border-input focus-visible:border-brand-primary focus-visible:ring-3 focus-visible:ring-brand-primary/15",
            error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
            className
          )}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value.length > 0);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            setHasValue(e.target.value.length > 0);
            props.onChange?.(e);
          }}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute left-4 text-muted-foreground transition-all duration-200",
            floated
              ? "top-2 text-xs font-medium text-brand-primary"
              : "top-1/2 -translate-y-1/2 text-sm"
          )}
        >
          {label}
        </label>
      </div>
      {error && (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-xs text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
