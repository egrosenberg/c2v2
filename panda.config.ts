import {
  createCerberusConfig,
  createCerberusPreset,
} from "@cerberus/panda-preset";

export default createCerberusConfig({
  presets: [createCerberusPreset()],

  preflight: true,
  clean: true,

  outdir: "styled-system",

  include: [
    "./node_modules/@cerberus/react/**/*.{ts,tsx,js,jsx}", // track @cerberus/react components
    "./src/**/*.{ts,tsx}",
  ],
  exclude: [],
  staticCss: {
    themes: ["cerberus"],
  },
});
