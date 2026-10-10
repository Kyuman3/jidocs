import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{children}</p>;
}

export function Section({
  eyebrow,
  title,
  children,
  tone = "white",
  id,
}: {
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  tone?: "white" | "surface";
  id?: string;
}) {
  const labelId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? labelId : undefined}
      className={tone === "surface" ? "bg-surface" : "bg-white"}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        {title && (
          <h2 id={labelId} className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
        )}
        <div className={title || eyebrow ? "mt-10" : ""}>{children}</div>
      </div>
    </section>
  );
}

export function PageHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-surface">
      <div aria-hidden="true" className="animate-drift absolute -right-24 -top-28 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg text-muted md:text-xl">{lead}</p>}
      </div>
    </div>
  );
}
