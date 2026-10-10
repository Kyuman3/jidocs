import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { getMission } from "@/lib/content";

export const metadata: Metadata = {
  title: "미션",
  description: "지닥스가 무엇을 믿고 어떻게 일하는지 소개합니다.",
};

export default async function MissionPage() {
  const mission = await getMission();
  return (
    <>
      <PageHeader eyebrow="Mission" title={mission.headline} />
      <Section>
        <div className="prose-mission max-w-3xl" dangerouslySetInnerHTML={{ __html: mission.html }} />
      </Section>
      <Section eyebrow="Process" title="우리가 하는 일" tone="surface" id="process">
        <ol className="grid gap-5 md:grid-cols-4">
          {mission.steps.map((step, i) => (
            <li key={step.title} className="rounded-lg border border-line bg-white p-6">
              <span className="text-sm font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
