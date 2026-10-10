/** 서버와 클라이언트 양쪽에서 쓰는 공용 타입과 함수 (파일 시스템을 쓰지 않습니다). */

const TODO = "TODO";

/** 값이 비었거나 TODO이면 화면에 표시하지 않습니다. */
export function isShown(value: string | undefined | null): value is string {
  return !!value && value.trim() !== "" && value.trim() !== TODO;
}

/** 문장 끝에 붙은 TODO 표시를 제거합니다. */
export function stripTodo(value: string): string {
  return value.replace(/\s*TODO\s*$/, "").trim();
}

export type Member = {
  name: string;
  role: string;
  field: string;
  focus: string;
  bio: string;
  photo?: string;
};
