"use client";

import { useState } from "react";
import MemberCard from "@/components/MemberCard";
import type { Member } from "@/lib/shared";

const COPIES = 4; // 넓은 화면에서도 끊기지 않도록 같은 목록을 반복해 이어 붙입니다.

/** 직급 구분 없이 한 줄로 왼쪽으로 흘러가는 멤버 목록 */
export default function MemberMarquee({ members }: { members: Member[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((v) => !v)}
          aria-pressed={paused}
          className="rounded-md border border-line bg-white px-4 py-2 text-sm font-medium text-muted hover:border-foreground hover:text-foreground"
        >
          {paused ? "▶ 움직임 재생" : "⏸ 움직임 멈추기"}
        </button>
      </div>
      <div className="marquee -mx-5 overflow-hidden px-0 py-2">
        <ul
          className={`marquee-track flex w-max gap-6 ${paused ? "is-paused" : ""}`}
          aria-label="멤버 목록"
        >
          {Array.from({ length: COPIES }).flatMap((_, copy) =>
            members.map((m, i) => (
              <li
                key={`${copy}-${m.name}`}
                aria-hidden={copy > 0 ? true : undefined}
                className="w-[300px] shrink-0 sm:w-[340px]"
              >
                <MemberCard member={m} index={i} />
              </li>
            )),
          )}
        </ul>
      </div>
    </div>
  );
}
