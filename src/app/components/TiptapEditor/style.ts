import { css } from "styled-system/css";

export const richTextClassname = css({
  "& p": {
    textStyle: "body-md",
    lineHeight: "110%",
    mb: "xs",
    _last: {
      mb: 0,
    },
  },
  "& ul": {
    listStyleType: "circle",
    pl: "md",
    lineHeight: "100%",
  },
  "& ol": {
    listStyleType: "numbered",
    pl: "md",
    lineHeight: "100%",
  },
  "& pre": {
    textStyle: "mono-xs",
    fontSize: "0.75rem",
    backgroundColor: "page.surface.initial",
    border: "1px solid",
    borderColor: "page.border.100",
    padding: "sm",
    rounded: "sm",
  },
  "& hr": {
    bg: "linear-gradient(to right, transparent, var(--cerberus-colors-page-surface-inverse), transparent)",
    h: "1px",
    border: "none",
    my: "sm",
  },
});
