import Image from "next/image";
import { cn } from "@/lib/utils";
import type { SocialPlatform } from "@/lib/brand-assets";
import { SOCIAL_ICON_PATHS } from "@/lib/brand-assets";

const LABELS: Record<SocialPlatform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  google: "Google Reviews",
};

type SocialIconLinkProps = {
  platform: SocialPlatform;
  href: string;
  className?: string;
};

export function SocialIconLink({ platform, href, className }: SocialIconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex size-10 items-center justify-center rounded-full border border-border bg-white transition-colors hover:border-brand-primary/30 hover:bg-ice-bg",
        className
      )}
      aria-label={LABELS[platform]}
    >
      <Image
        src={SOCIAL_ICON_PATHS[platform]}
        alt=""
        width={20}
        height={20}
        aria-hidden
        className="size-5"
      />
    </a>
  );
}
