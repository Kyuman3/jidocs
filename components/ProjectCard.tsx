import Link from "next/link";
import Image from "next/image";
import { isShown, type Project } from "@/lib/content";

export default function ProjectCard({ project }: { project: Project }) {
  const live = project.status === "운영 중";
  const hasImage = isShown(project.image);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_18px_40px_-24px_rgba(15,118,110,0.5)]">
      <Link href={`/projects/${project.slug}`} className="block" aria-label={`${project.name} 자세히 보기`} tabIndex={-1}>
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-gradient-to-br from-teal-50 to-slate-50">
          {hasImage ? (
            <Image
              src={project.image}
              alt={`${project.name} 서비스 화면`}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 90vw"
              className="object-cover object-top transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div aria-hidden="true" className="flex h-full items-center justify-center">
              <span className="rounded-full border border-teal-200 bg-white px-4 py-1.5 text-sm font-bold text-accent-strong shadow-sm">
                {project.name}
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-accent">{project.category}</p>
            <h3 className="mt-1 text-xl font-bold">
              <Link href={`/projects/${project.slug}`} className="hover:text-accent-strong">
                {project.name}
              </Link>
            </h3>
          </div>
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
              live ? "bg-teal-50 text-accent-strong" : "bg-slate-100 text-muted"
            }`}
          >
            {project.status}
          </span>
        </div>
        <p className="mt-3 text-sm text-muted">{project.description}</p>
        {isShown(project.owner) && (
          <dl className="mt-4 flex gap-2 text-sm">
            <dt className="text-muted">책임자</dt>
            <dd className="font-medium">{project.owner}</dd>
          </dl>
        )}
        <p className="mt-4 text-xs text-muted">참고용 도구이며, 실제 진료 판단은 의료진이 직접 해야 합니다.</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-sm font-semibold">
          <Link href={`/projects/${project.slug}`} className="text-accent hover:text-accent-strong">
            자세히 보기 →
          </Link>
          {isShown(project.url) && (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground">
              서비스 열기 ↗<span className="sr-only"> (새 탭에서 열림)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
