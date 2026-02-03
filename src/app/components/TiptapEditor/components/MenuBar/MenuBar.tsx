import { useTiptap, useTiptapState } from "@tiptap/react";
import { menuBarStateSelector } from "./menuBarState";
import { MenuBarButton } from "./components/MenuBarButton/MenuBarButton";
import {
  Code,
  ListBulleted,
  ListNumbered,
  Redo,
  Return,
  Row,
  TextBold,
  TextItalic,
  TextNewLine,
  TextStrikethrough,
  TextUnderline,
  Undo,
} from "@carbon/icons-react";
import { Flex } from "styled-system/jsx";
import { MenuBarDivider } from "./components/MenuBarDivider/MenuBarDivider";

/**
 * Menu bar component that uses useTiptap and useTiptapState hooks
 * to access the editor from context.
 */
export function MenuBar() {
  const { editor, isReady } = useTiptap();
  const editorState = useTiptapState(menuBarStateSelector);

  if (!isReady || !editor) {
    return null;
  }

  return (
    <div>
      <Flex
        flexDir="row"
        gap="xs"
        flexWrap="wrap"
        p="sm"
        border="1px solid"
        borderColor="action.border.initial"
        roundedTop="sm"
        borderBottom="none"
        bgColor="page.surface.200"
      >
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          active={editorState.isBold}
          icon={<TextBold />}
        />
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          active={editorState.isItalic}
          icon={<TextItalic />}
        />
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editorState.canUnderline}
          active={editorState.isUnderline}
          icon={<TextUnderline />}
        />
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          active={editorState.isStrike}
          icon={<TextStrikethrough />}
        />
        {/* <MenuBarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          active={editorState.isCode}
          icon={<Code />}
        /> */}
        <MenuBarDivider />
        {/* <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editorState.isParagraph ? "is-active" : ""}
        >
          Paragraph
        </button> */}
        {/* <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={editorState.isHeading1 ? "is-active" : ""}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={editorState.isHeading2 ? "is-active" : ""}
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={editorState.isHeading3 ? "is-active" : ""}
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={editorState.isHeading4 ? "is-active" : ""}
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={editorState.isHeading5 ? "is-active" : ""}
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={editorState.isHeading6 ? "is-active" : ""}
        >
          H6
        </button> */}
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editorState.isBulletList}
          icon={<ListBulleted />}
        />
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editorState.isOrderedList}
          icon={<ListNumbered />}
        />
        <MenuBarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editorState.isCodeBlock}
          icon={<Code />}
        />
        {/* <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editorState.isBlockquote ? "is-active" : ""}
        >
          Blockquote
        </button> */}
        <MenuBarDivider />
        <MenuBarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          icon={<Row />}
        />
        <MenuBarButton
          onClick={() => editor.chain().focus().setHardBreak().run()}
          icon={<TextNewLine />}
        />
        <MenuBarButton
          onClick={() => editor.chain().focus().undo().run()}
          icon={<Undo />}
        />
        <MenuBarButton
          onClick={() => editor.chain().focus().redo().run()}
          icon={<Redo />}
        />
      </Flex>
    </div>
  );
}
