import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { getDocument } from "@/lib/content";

export const metadata: Metadata = {
  title: "프로젝트 면책 안내",
  description: "지닥스 프로젝트 이용 시 유의할 사항을 안내합니다.",
};

export default async function DisclaimerPage() {
  const doc = await getDocument("disclaimer");
  return (
    <>
      <PageHeader eyebrow="Notice" title={doc.title} />
      <Section>
        <div className="prose-mission max-w-3xl" dangerouslySetInnerHTML={{ __html: doc.html }} />
      </Section>
    </>
  );
}
