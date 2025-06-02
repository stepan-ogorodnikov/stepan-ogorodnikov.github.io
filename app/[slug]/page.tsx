import { PageProps } from "@/.next/types/app/[slug]/page";
import { App } from "@/components/layout/app";
import { Code } from "@/components/layout/code";
import { getContentFileSlug } from "@/lib/utils";
import { promises as fs } from "fs";
import path from "path";

// array of filenames in '@/content' directory
const contentFiles = await fs.readdir(path.join(process.cwd(), "content"));
const files = contentFiles.filter((file) => file.endsWith(".tsx")).map((file) => file.split("/").pop() as string);

// map slugs to full filenames { 'index.tsx': '01-index.tsx', ... }
let slugs: Record<string, string> = {};
files.forEach((file) => {
  const slug = getContentFileSlug(file);
  if (slug) slugs[slug] = file;
});

export async function generateStaticParams() {
  return files.map((file) => ({
    slug: getContentFileSlug(file),
  }));
}

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const source = await getSource(slugs[slug]) || "";
  const code = <Code code={source} />;
  const Component = await import(`@/content/${slugs[slug]}`).then(m => m.default);

  return (
    <App
      filename={slug}
      files={files.sort().map(getContentFileSlug)}
      source={code}
    >
      <Component />
    </App>
  );
}

async function getSource(filename: string) {
  try {
    const filePath = path.join(process.cwd(), "content", filename);
    const source = await fs.readFile(filePath, "utf-8");

    return source;
  } catch (error) {
    console.error("Error loading content:", error);
    return null;
  }
}
