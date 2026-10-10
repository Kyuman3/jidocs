/** "지 닥 스" 세 글자를 원 안에 넣은 로고. 지닥스 서비스들의 "by 지닥스" 표기와 같은 형태입니다. */
export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const dim = size === "lg" ? "h-11 w-11 text-lg" : "h-9 w-9 text-sm";
  return (
    <span className="inline-flex items-center gap-2" role="img" aria-label="지닥스">
      {["지", "닥", "스"].map((c) => (
        <span
          key={c}
          aria-hidden="true"
          className={`flex items-center justify-center rounded-full bg-accent font-bold text-white ${dim}`}
        >
          {c}
        </span>
      ))}
    </span>
  );
}
