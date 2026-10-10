import Link from "next/link";
import type { ReactNode } from "react";

export default function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const base = "inline-flex items-center rounded-md px-7 py-3.5 text-base font-semibold transition-colors";
  const styles =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-strong"
      : "border border-line bg-white text-foreground hover:border-foreground";
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
