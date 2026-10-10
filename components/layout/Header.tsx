import Link from "next/link";
import Logo from "@/components/ui/Logo";
import MobileMenu from "@/components/layout/MobileMenu";
import { site } from "@/data/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 md:h-[5.25rem]">
        <Link href="/" aria-label="지닥스 홈">
          <Logo size="lg" />
        </Link>
        <nav aria-label="주 메뉴" className="hidden items-center gap-10 md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-base font-medium text-foreground/80 hover:text-accent">
              {item.label}
            </Link>
          ))}
          <Link
            href={site.contactNav.href}
            className="rounded-md bg-accent px-6 py-3 text-base font-semibold text-white hover:bg-accent-strong"
          >
            {site.contactNav.label}
          </Link>
        </nav>
        <MobileMenu items={[...site.nav, site.contactNav]} />
      </div>
    </header>
  );
}
