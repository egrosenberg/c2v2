import { Poppins, Recursive } from "next/font/google";
import { css, cx } from "styled-system/css";
import CerberusConfig from "../context/cerberus-config";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { LayoutRoutes } from ".next/dev/types/routes";

const poppins = Poppins({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
});

const recursive = Recursive({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-recursive",
});

export default async function RootLayout(props: LayoutProps<LayoutRoutes>) {
  return (
    <html
      className={cx(poppins.variable, recursive.variable)}
      data-panda-theme="cerberus"
      data-color-mode="dark"
      lang="en"
    >
      <body className={css({ w: "100vw", h: "100vh" })}>
        <SessionProvider>
          <CerberusConfig>{props.children}</CerberusConfig>
        </SessionProvider>
      </body>
    </html>
  );
}
