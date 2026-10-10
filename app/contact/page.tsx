import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "가입·문의",
  description: "지닥스 가입, 프로젝트 제안, 기타 문의를 남겨 주세요.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="가입·문의"
        lead="가입 문의, 프로젝트 제안, 기타 문의를 남겨 주세요. 확인 후 이메일로 답변드립니다."
      />
      <Section>
        <div className="max-w-2xl">
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
