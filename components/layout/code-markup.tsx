import { codeToHtml } from "shiki";

type Props = {
  code: string;
};

export async function CodeMarkup({ code }: Props) {
  const html = await codeToHtml(code, {
    lang: "jsx",
    themes: {
      light: "one-light",
      dark: "one-dark-pro",
    },
    defaultColor: false,
    transformers: [
      {
        pre(node) {
          this.addClassToHast(node, "source-pre");
        },
        code(node) {
          this.addClassToHast(node, "source-code");
        },
      },
    ],
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
