import type { PropsWithChildren } from "react";
import { css } from "styled-system/css";

export function Virtue({ children }: PropsWithChildren) {
  return (
    <span className={css({ fontVariantCaps: "small-caps" })}>{children}</span>
  );
}
