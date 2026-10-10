import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import MemberMarquee from "@/components/MemberMarquee";
import CtaBand from "@/components/CtaBand";
import { members } from "@/lib/content";

export const metadata: Metadata = {
  title: "멤버",
  description: "지닥스와 함께하는 사람들을 소개합니다.",
};

export default function MembersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="함께 만드는 사람들"
        lead="지닥스에는 위아래가 없습니다. 직급 없이 각자의 관심과 역량으로 같은 선에서 함께 만듭니다."
      />
      <Section>
        <MemberMarquee members={members} />
      </Section>
      <CtaBand title="지닥스와 함께하고 싶으신가요?" text="가입 문의를 남겨 주시면 확인 후 연락드립니다." />
    </>
  );
}
