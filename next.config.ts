import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  typedRoutes: true,
  turbopack: {
    resolveAlias: {
      "styled-system/css": "./styled-system/css/index.mjs",
      "styled-system/jsx": "./styled-system/jsx/index.mjs",
      "styled-system/jsx/factory": "./styled-system/jsx/factory.mjs",
      "styled-system/patterns": "./styled-system/patterns/index.mjs",
      "styled-system/recipes": "./styled-system/recipes/index.mjs",
    },
  },
};

export default nextConfig;
