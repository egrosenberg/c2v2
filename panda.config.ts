import {
  createCerberusConfig,
  createCerberusPreset,
} from "@cerberus/panda-preset";
import {
  presetAcheronTheme,
  getThemeName as getAcheronThemeName,
} from "@cerberus/preset-acheron-theme";
import {
  presetElysiumTheme,
  getThemeName as getElysiumThemeName,
} from "@cerberus/preset-elysium-theme";

export default createCerberusConfig({
  clean: true,
  minify: process.env.NODE_ENV === "production",

  include: [
    "./node_modules/@cerberus-design/react/**/*.{ts,tsx,js,jsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  exclude: [],

  presets: [
    createCerberusPreset({
      sansFont: "schoolbook",
      displayFont: "uncial",
    }),
    presetAcheronTheme,
    presetElysiumTheme,
  ],

  staticCss: {
    themes: ["cerberus", getAcheronThemeName(), getElysiumThemeName()],
  },

  theme: {
    extend: {
      recipes: {
        button: {
          defaultVariants: {
            shape: "default",
          },
        },
      },
      tokens: {
        fonts: {
          uncial: { value: "var(--font-uncial-antiqua), display" },
          schoolbook: { value: "var(--font-century-schoolbook), serif" },
        },
      },
    },
  },
});
