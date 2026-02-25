import Link from "next/link";
import type { ReactNode } from "react";

type TitleButtonProps = {
  href: string;
  children: ReactNode;
};

export function TitleButton({ href, children }: TitleButtonProps) {
  return (
    <Link
      href={href}
      className="
        inline-flex items-center
        rounded-lg
        bg-[#2A5D59]
        px-4 py-2
        text-sm font-medium
        text-[var(--text-invert)]
        transition
        hover:bg-[#3f7a72]
        focus:outline-none
        focus:ring-2 focus:ring-[#2A5D59]/50
      "
    >
      {children}
    </Link>
  );
}
