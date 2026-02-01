"use client";

import { Moon, Sun } from "@carbon/icons-react";
import {
  type ColorModes,
  IconButton,
  Show,
  useThemeContext,
} from "@cerberus/react";
import { type MouseEvent, useEffect } from "react";
import { useCookies } from "next-client-cookies";

export function ColorMode() {
  const cookies = useCookies();
  useEffect(() => {
    if (cookies) {
      const colorMode = cookies.get("color-mode") || "dark";
      updateMode(colorMode as ColorModes);
    }
  }, [cookies]);

  const { updateMode, mode } = useThemeContext();

  function toggleMode(e: MouseEvent<HTMLButtonElement>) {
    const mode = e.currentTarget.value as ColorModes;
    const newMode = mode === "light" ? "dark" : "light";
    updateMode(newMode);
    cookies.set("color-mode", newMode);
  }

  return (
    <IconButton
      ariaLabel="Toggle dark/light mode"
      aria-busy={!cookies}
      disabled={!cookies}
      onClick={toggleMode}
      value={mode}
    >
      <Show when={mode === "light"} fallback={<Moon />}>
        <Sun />
      </Show>
    </IconButton>
  );
}
