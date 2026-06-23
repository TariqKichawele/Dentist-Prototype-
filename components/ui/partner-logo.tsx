import Image from "next/image";
import { cn } from "@/lib/utils";

type PartnerLogoProps = {
  name: string;
  src: string;
  className?: string;
  variant?: "card" | "strip";
};

export function PartnerLogo({
  name,
  src,
  className,
  variant = "card",
}: PartnerLogoProps) {
  if (variant === "strip") {
    return (
      <div
        className={cn(
          "flex h-10 w-full items-center justify-center px-2 md:h-12 md:px-3",
          className
        )}
      >
        <Image
          src={src}
          alt={`${name} logo`}
          width={120}
          height={32}
          className="h-6 w-auto max-w-[7rem] object-contain object-center opacity-90 grayscale-[15%] transition-all duration-200 hover:opacity-100 hover:grayscale-0 md:h-7 md:max-w-[8.5rem]"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-14 w-[8.5rem] items-center justify-center rounded-xl border border-border bg-white px-4 py-3 shadow-sm transition-all duration-200 hover:border-brand-primary/20 hover:shadow-md",
        className
      )}
    >
      <Image
        src={src}
        alt={`${name} logo`}
        width={120}
        height={32}
        className="h-7 w-auto max-w-full object-contain object-center opacity-90 grayscale-[15%] transition-all duration-200 hover:opacity-100 hover:grayscale-0"
      />
    </div>
  );
}
