import Image from "next/image";
import { isShown, stripTodo, type Member } from "@/lib/shared";

const GRADIENTS = [
  "from-teal-100 via-teal-50 to-sky-100",
  "from-sky-100 via-teal-50 to-emerald-100",
  "from-emerald-100 via-teal-50 to-slate-100",
];

/** "A 및 B" 형태의 담당 업무를 태그로 나눕니다. */
function splitFocus(focus: string): string[] {
  return focus.split(/\s*(?:및|,|·)\s*/).filter(Boolean);
}

/** 직급 없이 모두 같은 형태로 보여 주는 멤버 카드 */
export default function MemberCard({ member, index }: { member: Member; index: number }) {
  const bio = isShown(member.bio) ? stripTodo(member.bio) : "";
  const tags = isShown(member.focus) ? splitFocus(member.focus) : [];
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:border-accent hover:shadow-[0_18px_40px_-24px_rgba(15,118,110,0.5)]">
      {member.photo ? (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
          <Image
            src={member.photo}
            alt={`${member.name} 프로필 사진`}
            fill
            sizes="340px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-line bg-gradient-to-br ${GRADIENTS[index % GRADIENTS.length]}`}
        >
          <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/70" />
          <span className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full border border-white/70" />
          <span className="text-6xl font-bold text-accent/40 transition duration-500 group-hover:scale-110 group-hover:text-accent/70">
            {member.name.charAt(0)}
          </span>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-bold tracking-tight">{member.name}</h3>
        {isShown(member.field) && <p className="mt-1 text-base text-muted">{member.field}</p>}
        {tags.length > 0 && (
          <ul aria-label="담당 업무" className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <li key={t} className="rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-accent-strong">
                {t}
              </li>
            ))}
          </ul>
        )}
        {bio && <p className="mt-5 text-base leading-relaxed text-muted">{bio}</p>}
      </div>
    </article>
  );
}
