import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import membersData from "@/data/members.json";
import projectsData from "@/data/projects.json";

export { isShown, stripTodo, type Member } from "@/lib/shared";
import type { Member } from "@/lib/shared";

export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  overview: string;
  highlights: string[];
  tags: string[];
  image: string;
  status: "운영 중" | "개발 중";
  owner: string;
  url: string;
};

export type MissionStep = { title: string; description: string };

export const members = membersData as Member[];
export const projects = projectsData as Project[];

async function renderMarkdown(source: string): Promise<string> {
  const file = await remark().use(html).process(source);
  return String(file);
}

function readContent(name: string) {
  const raw = fs.readFileSync(path.join(process.cwd(), "content", `${name}.md`), "utf8");
  return matter(raw);
}

export async function getMission() {
  const { data, content } = readContent("mission");
  return {
    headline: data.headline as string,
    summary: data.summary as string,
    steps: data.steps as MissionStep[],
    html: await renderMarkdown(content),
  };
}

export async function getDocument(name: string) {
  const { data, content } = readContent(name);
  return { title: data.title as string, html: await renderMarkdown(content) };
}
