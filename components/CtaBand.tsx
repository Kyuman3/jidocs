import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

export default function CtaBand({
  title = "지닥스와 함께 만들어 보고 싶으신가요?",
  text = "가입 문의와 프로젝트 제안을 기다립니다.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="bg-accent-strong text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-16 md:flex-row md:items-center">
        <Reveal>
          <h2 id="cta-title" className="text-3xl font-bold tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-lg text-teal-50">{text}</p>
        </Reveal>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact" className="rounded-md bg-white px-7 py-3.5 text-base font-semibold text-accent-strong hover:bg-teal-50">
            가입·문의
          </Link>
          <Link href="/projects" className="rounded-md border border-teal-200/60 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/10">
            프로젝트 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
