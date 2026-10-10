import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted">{site.tagline}</p>
        </div>
        <nav aria-label="푸터 메뉴">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li><Link href="/contact" className="text-muted hover:text-foreground">문의</Link></li>
            <li><Link href="/disclaimer" className="text-muted hover:text-foreground">프로젝트 면책 안내</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-4 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
