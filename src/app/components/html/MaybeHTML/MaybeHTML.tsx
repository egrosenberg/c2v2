import { richTextClassname } from "@/components/TiptapEditor/style";
import { Box, type BoxProps } from "styled-system/jsx";

export type MaybeHTMLProps = {
  maybeHtml: string;
} & BoxProps;

export function MaybeHTML({ maybeHtml, ...boxProps }: MaybeHTMLProps) {
  const isHtml = /(<.*>.*<\/.*>)|(<.*\/>)/.test(maybeHtml);

  const html = isHtml
    ? maybeHtml
    : maybeHtml
        .split("\n")
        .map((str) => `<p>${str}</p>`)
        .join("");

  return (
    <Box
      className={richTextClassname}
      dangerouslySetInnerHTML={{ __html: html }}
      {...boxProps}
    />
  );
}
