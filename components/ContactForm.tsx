"use client";

import { useState, type FormEvent } from "react";
import { submitInquiry, type Inquiry } from "@/lib/submit-inquiry";

const TYPES = ["가입 문의", "프로젝트 제안", "기타"] as const;

type Errors = Partial<Record<keyof Inquiry, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Inquiry): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "이름을 입력해 주세요.";
  if (!v.affiliation.trim()) e.affiliation = "소속을 입력해 주세요.";
  if (!v.email.trim()) e.email = "이메일을 입력해 주세요.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "올바른 이메일 형식이 아닙니다.";
  if (!v.message.trim()) e.message = "내용을 입력해 주세요.";
  if (!v.consent) e.consent = "개인정보 수집·이용에 동의해 주세요.";
  return e;
}

const fieldClass =
  "mt-1 block w-full rounded-md border border-slate-400 bg-white px-3 py-2.5 text-base focus:border-accent";

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required ? (
          <span className="text-accent-strong"> (필수)</span>
        ) : (
          <span className="font-normal text-muted"> (선택)</span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    const value: Inquiry = {
      name: String(form.get("name") ?? ""),
      affiliation: String(form.get("affiliation") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      type: String(form.get("type") ?? TYPES[0]),
      message: String(form.get("message") ?? ""),
      consent: form.get("consent") === "on",
    };
    const found = validate(value);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      ev.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    const result = await submitInquiry(value);
    setStatus(result.ok ? "done" : "failed");
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-lg border border-line bg-surface p-8">
        <h2 className="text-xl font-bold">문의가 접수되었습니다.</h2>
        <p className="mt-2 text-muted">확인 후 남겨 주신 이메일로 답변드리겠습니다.</p>
      </div>
    );
  }

  const describe = (k: keyof Inquiry) => (errors[k] ? `${k === "affiliation" ? "affiliation" : k}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <Field id="name" label="이름" required error={errors.name}>
        <input id="name" name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={describe("name")} className={fieldClass} />
      </Field>
      <Field id="affiliation" label="소속" required error={errors.affiliation}>
        <input id="affiliation" name="affiliation" type="text" autoComplete="organization" required aria-invalid={!!errors.affiliation} aria-describedby={describe("affiliation")} className={fieldClass} />
      </Field>
      <Field id="email" label="이메일" required error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={describe("email")} className={fieldClass} />
      </Field>
      <Field id="phone" label="연락처">
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
      </Field>
      <div>
        <label htmlFor="type" className="text-sm font-semibold">문의 유형</label>
        <select id="type" name="type" className={fieldClass} defaultValue={TYPES[0]}>
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <Field id="message" label="내용" required error={errors.message}>
        <textarea id="message" name="message" rows={6} required aria-invalid={!!errors.message} aria-describedby={describe("message")} className={fieldClass} />
      </Field>

      <fieldset className="rounded-lg border border-line bg-surface p-5">
        <legend className="px-1 text-sm font-semibold">개인정보 수집·이용 안내</legend>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted">
          <li>수집 항목: 이름, 소속, 이메일, 연락처(선택), 문의 내용</li>
          <li>수집 목적: 문의 확인 및 답변, 가입 안내</li>
          <li>보관 기간: 문의 처리 완료 후 1년 뒤 파기</li>
          <li>전달 방식: 이메일 전송 서비스(FormSubmit)를 거쳐 지닥스 운영진 메일로 전달됩니다.</li>
          <li>동의를 거부할 수 있으나, 이 경우 문의 접수가 어렵습니다.</li>
        </ul>
        <div className="mt-4 flex items-start gap-3">
          <input id="consent" name="consent" type="checkbox" aria-invalid={!!errors.consent} aria-describedby={describe("consent")} className="mt-1 h-5 w-5 accent-teal-700" />
          <label htmlFor="consent" className="text-sm font-medium">
            개인정보 수집·이용에 동의합니다. <span className="text-accent-strong">(필수)</span>
          </label>
        </div>
        {errors.consent && <p id="consent-error" className="mt-2 text-sm text-red-700">{errors.consent}</p>}
      </fieldset>

      {status === "failed" && (
        <p role="alert" className="text-sm text-red-700">
          전송하지 못했습니다. 잠시 후 다시 시도해 주세요.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-strong disabled:opacity-60"
      >
        {status === "sending" ? "전송 중…" : "문의 보내기"}
      </button>
    </form>
  );
}
