import type { Metadata } from "next";
import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Reveal from "@/components/ui/Reveal";
import { Eyebrow, Section } from "@/components/ui/Section";
import ProjectCard from "@/components/ProjectCard";
import CtaBand from "@/components/CtaBand";
import { getMission, projects } from "@/lib/content";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | ${site.tagline}` },
  description: site.description,
};

const stepIcons = [
  // 기획: 클립보드
  <path key="plan" d="M9 4h6v3H9zM7 5H5v15h14V5h-2M8 12h8M8 16h5" />,
  // 제작: 코드
  <path key="build" d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14" />,
  // 운영: 맥박
  <path key="run" d="M3 12h4l3-8 4 16 3-8h4" />,
  // 공유: 공유 노드
  <path key="share" d="M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />,
];

export default async function HomePage() {
  const mission = await getMission();
  const current = projects.slice(0, 3);
  const pedcal = projects.find((p) => p.slug === "pedcal");
  const yakmul = projects.find((p) => p.slug === "yakmul");

  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div aria-hidden="true" className="animate-drift absolute -left-32 top-10 h-80 w-80 rounded-full bg-teal-100/70 blur-3xl" />
        <div aria-hidden="true" className="animate-drift absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-sky-100/70 blur-3xl [animation-delay:-8s]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-28 lg:grid-cols-2">
          <div>
            <Eyebrow>Jidocs · 젊은 의사들의 그룹</Eyebrow>
            <h1 className="mt-5 text-5xl font-bold leading-[1.15] tracking-tight md:text-6xl">
              아이디어가
              <br />
              실행이 되는 곳,
              <br />
              <span className="text-accent">지닥스</span>
            </h1>
            <p className="mt-7 max-w-xl text-xl leading-relaxed text-muted">
              진료와 학업 사이에서 생긴 아이디어를 실제로 쓰이는 결과물로 만듭니다. 지금도 현장에서 쓰이는 도구를 만들고 있습니다.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/projects">프로젝트 보기</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                가입·문의
              </ButtonLink>
            </div>
          </div>

          {pedcal && yakmul && (
            <div className="relative h-[290px] sm:h-[400px] lg:h-[430px]">
              <div className="animate-float-slow absolute right-0 top-0 w-[78%]">
                <BrowserFrame src={pedcal.image} alt="Pedcal 서비스 화면" label="pedcal.vercel.app" priority />
              </div>
              <div className="animate-float absolute bottom-0 left-0 z-10 w-[78%]">
                <BrowserFrame src={yakmul.image} alt="Yakmul 서비스 화면" label="yakmul.vercel.app" priority />
              </div>
            </div>
          )}
        </div>
      </section>

      <Section eyebrow="How we work" title="아이디어가 결과물이 되는 과정" tone="surface" id="process">
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {mission.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 90} className="h-full">
                <div className="group h-full rounded-xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-accent">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-accent transition group-hover:bg-accent group-hover:text-white">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {stepIcons[i]}
                    </svg>
                  </span>
                  <p className="mt-5 text-xs font-bold text-accent">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-1 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-base text-muted">{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <section aria-labelledby="mission-title" className="relative overflow-hidden bg-[#14213d] text-white">
        <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Mission</p>
            <h2 id="mission-title" className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              우리가 하려는 일
            </h2>
            <p className="mt-7 max-w-3xl text-xl leading-relaxed text-slate-100">{mission.summary}</p>
            <Link href="/mission" className="mt-8 inline-block text-base font-semibold text-teal-300 hover:text-teal-200">
              미션 전문 읽기 →
            </Link>
          </Reveal>
        </div>
      </section>

      <Section eyebrow="Projects" title="진행 중인 프로젝트" id="projects">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {current.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={i * 100} className="h-full">
                <ProjectCard project={p} />
              </Reveal>
            </li>
          ))}
        </ul>
        <Link href="/projects" className="mt-10 inline-block text-base font-semibold text-accent hover:text-accent-strong">
          모든 프로젝트 보기 →
        </Link>
      </Section>

      <CtaBand />
    </>
  );
}
