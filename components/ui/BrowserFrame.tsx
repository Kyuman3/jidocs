import Image from "next/image";

export default function BrowserFrame({
  src,
  alt,
  label,
  priority,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-white shadow-[0_20px_50px_-20px_rgba(20,33,61,0.35)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-surface px-3 py-2" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="ml-3 truncate rounded bg-white px-3 py-0.5 text-[11px] text-muted">{label}</span>
      </div>
      <div className="relative aspect-[16/10] bg-slate-100">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 560px, 90vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}
