import { site } from "@/data/site";

export type Inquiry = {
  name: string;
  affiliation: string;
  email: string;
  phone: string;
  type: string;
  message: string;
  consent: boolean;
};

export type SubmitResult = { ok: true } | { ok: false; error: string };

/**
 * 문의 전송 지점입니다. 현재는 FormSubmit(formsubmit.co)을 통해
 * site.contactEmail 로 이메일을 보냅니다. 다른 방식으로 바꾸려면
 * 이 함수의 내용만 교체하면 됩니다.
 */
export async function submitInquiry(inquiry: Inquiry): Promise<SubmitResult> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${site.contactEmail}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `[지닥스 문의] ${inquiry.type} - ${inquiry.name}`,
        _replyto: inquiry.email,
        _template: "table",
        _captcha: "false",
        이름: inquiry.name,
        소속: inquiry.affiliation,
        이메일: inquiry.email,
        연락처: inquiry.phone || "(미입력)",
        문의유형: inquiry.type,
        내용: inquiry.message,
      }),
    });
    const data = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
    if (!res.ok || !(data?.success === true || data?.success === "true")) {
      return { ok: false, error: "전송에 실패했습니다." };
    }
    return { ok: true };
  } catch {
    return { ok: false, error: "네트워크 오류가 발생했습니다." };
  }
}
