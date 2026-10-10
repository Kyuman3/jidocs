import BrowserFrame from "@/components/ui/BrowserFrame";
import { isShown, type Project } from "@/lib/content";

/** 화면 캡처가 있으면 브라우저 프레임에 담고, 없으면(개발 중인 프로젝트) 일러스트로 대체합니다. */
export default function ProjectVisual({ project, priority }: { project: Project; priority?: boolean }) {
  if (isShown(project.image)) {
    return (
      <BrowserFrame
        src={project.image}
        alt={`${project.name} 서비스 화면`}
        label={project.url ? project.url.replace(/^https?:\/\//, "").replace(/\/$/, "") : project.name}
        priority={priority}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${project.name} 개발 중인 화면을 형상화한 일러스트`}
      className="overflow-hidden rounded-xl border border-line bg-gradient-to-br from-teal-50 via-white to-slate-50 shadow-[0_20px_50px_-20px_rgba(20,33,61,0.25)]"
    >
      <div className="relative aspect-[16/10] p-6">
        <div className="mx-auto flex max-w-sm items-center gap-2 rounded-full border border-line bg-white px-4 py-2.5 shadow-sm">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#0f766e" strokeWidth="2" aria-hidden="true">
            <circle cx="9" cy="9" r="6" />
            <path d="M14 14l4 4" />
          </svg>
          <span className="h-2 w-32 rounded bg-slate-200" />
          <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white">AI</span>
        </div>
        <div className="mx-auto mt-5 grid max-w-sm grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`rounded-lg border border-line bg-white p-3 shadow-sm ${i === 1 ? "animate-float" : i === 2 ? "animate-float-slow" : ""}`}
            >
              <span className="block h-6 w-6 rounded-full bg-teal-100" />
              <span className="mt-3 block h-2 w-full rounded bg-slate-200" />
              <span className="mt-1.5 block h-2 w-2/3 rounded bg-slate-100" />
            </div>
          ))}
        </div>
        <p className="absolute bottom-4 left-0 right-0 text-center text-xs font-semibold text-accent-strong">
          {project.name} · 개발 중
        </p>
      </div>
    </div>
  );
}
