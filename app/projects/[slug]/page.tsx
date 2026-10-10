import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Eyebrow, Section } from "@/components/ui/Section";
import ProjectVisual from "@/components/ProjectVisual";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import { isShown, projects } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.name, description: project.description };
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const live = project.status === "운영 중";
  const others = projects.filter((p) => p.slug !== project.slug);

  return (
    <>
      <div className="relative overflow-hidden border-b border-line bg-surface">
        <div aria-hidden="true" className="animate-drift absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-200/40 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:py-20 lg:grid-cols-2">
          <div>
            <Link href="/projects" className="text-sm text-muted hover:text-foreground">
              ← 프로젝트 목록
            </Link>
            <div className="mt-5">
              <Eyebrow>{project.category}</Eyebrow>
            </div>
            <h1 className="mt-3 flex flex-wrap items-center gap-3 text-4xl font-bold tracking-tight md:text-5xl">
              {project.name}
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  live ? "bg-teal-100 text-accent-strong" : "bg-slate-200 text-muted"
                }`}
              >
                {project.status}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted">{project.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span key={t} className="rounded-full border border-line bg-white px-3 py-1 text-xs font-medium text-muted">
                  {t}
                </span>
              ))}
            </div>
            {isShown(project.url) && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-white hover:bg-accent-strong"
              >
                {project.name} 열기 ↗<span className="sr-only"> (새 탭에서 열림)</span>
              </a>
            )}
          </div>
          <div className="animate-float-slow">
            <ProjectVisual project={project} priority />
          </div>
        </div>
      </div>

      <Section eyebrow="Overview" title="프로젝트 소개">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <p className="text-lg">{project.overview}</p>
            <p className="mt-6 rounded-lg border border-line bg-surface p-4 text-sm text-muted">
              참고용 도구이며, 실제 진료 판단은 의료진이 직접 해야 합니다.{" "}
              <Link href="/disclaimer" className="font-medium text-accent underline">
                면책 안내
              </Link>
            </p>
          </Reveal>
          <Reveal delay={120}>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-xs font-semibold text-muted">상태</dt>
                <dd className="mt-1 font-medium">{project.status}</dd>
              </div>
              {isShown(project.owner) && (
                <div>
                  <dt className="text-xs font-semibold text-muted">책임자</dt>
                  <dd className="mt-1 font-medium">{project.owner}</dd>
                </div>
              )}
              <div>
                <dt className="text-xs font-semibold text-muted">분류</dt>
                <dd className="mt-1 font-medium">{project.category}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Section>

      <Section eyebrow="Features" title="주요 기능" tone="surface">
        <ul className="grid gap-4 md:grid-cols-2">
          {project.highlights.map((h, i) => (
            <li key={h}>
              <Reveal delay={i * 80}>
                <div className="flex h-full gap-4 rounded-lg border border-line bg-white p-5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-accent-strong">
                    {i + 1}
                  </span>
                  <p>{h}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {others.length > 0 && (
        <Section eyebrow="More" title="다른 프로젝트">
          <ul className="grid gap-5 md:grid-cols-2">
            {others.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
