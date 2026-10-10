import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/ui/Section";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "프로젝트",
  description: "지닥스가 만들고 운영하는 프로젝트를 소개합니다.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="프로젝트"
        lead="지닥스가 만들고 운영하는 도구입니다. 프로젝트는 계속 추가됩니다."
      />
      <Section>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={(i % 3) * 100} className="h-full">
                <ProjectCard project={p} />
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          자세한 내용은{" "}
          <Link href="/disclaimer" className="font-medium text-accent underline">
            프로젝트 면책 안내
          </Link>
          에서 확인할 수 있습니다.
        </p>
      </Section>
    </>
  );
}
