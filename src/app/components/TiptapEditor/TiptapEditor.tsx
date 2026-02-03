"use client";

import {
  useEditor,
  EditorContent,
  Tiptap,
  useTiptapState,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { css, cx } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { MenuBar } from "./components/MenuBar/MenuBar";
import { richTextClassname } from "./style";
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { menuBarStateSelector } from "./components/MenuBar/menuBarState";
import { Text } from "@cerberus/react";

export type TipTapEditorProps = {
  setHtml: Dispatch<SetStateAction<string>>;
  initialHtml?: string;
  label?: string;
};

export const TiptapEditor = ({
  setHtml,
  initialHtml,
  label,
}: TipTapEditorProps) => {
  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: initialHtml,
      onUpdate: ({ editor }) => setHtml(editor?.getHTML() ?? ""),
      // Don't render immediately on the server to avoid SSR issues
      immediatelyRender: false,
    },
    [initialHtml],
  );

  return (
    <Box display="flex" flexDir="column" gap="xs">
      {label && (
        <label className={css({ textStyle: "label-sm" })}>{label}</label>
      )}
      <Box>
        <Tiptap instance={editor}>
          <MenuBar />
          <Tiptap.Content
            className={cx(
              css({
                border: "1px solid",
                borderColor: "action.border.initial",
                p: "md",
                roundedBottom: "sm",
                // Remove outline from editable component
                "& [contenteditable]": {
                  outline: "0px solid transparent",
                },
              }),
              richTextClassname,
            )}
          />
        </Tiptap>
      </Box>
    </Box>
  );
};
