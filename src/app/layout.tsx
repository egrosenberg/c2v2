import { Poppins, Recursive } from "next/font/google";
import { css, cx } from "styled-system/css";
import CerberusConfig from "../context/cerberus-config";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import type { LayoutRoutes } from ".next/dev/types/routes";
import { cerberus, ThemeProvider } from "@cerberus/react";
import { CenturySchoolbook, UncialAntiqua } from "./fonts";
import { TopNav } from "./components/TopNav/TopNav";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CookiesProvider } from "next-client-cookies/server";

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
export const metadata: Metadata = {
  title: "Celestus",
  description: "Celestus TTRPG",
};

export default async function RootLayout(props: LayoutProps<LayoutRoutes>) {
  return (
    <html
      className={cx(
        poppins.variable,
        recursive.variable,
        UncialAntiqua.variable,
        CenturySchoolbook.variable,
      )}
      data-panda-theme="elysium"
      data-color-mode="dark"
      lang="en"
    >
      <body
        className={css({
          w: "100vw",
          h: "100vh",
          py: "6rem",
          bgGradient: "to-br",
          gradientFrom: "page.surface.initial",
          gradientTo: "page.surface.100",
        })}
      >
        <SessionProvider>
          <CerberusConfig>
            <Suspense>
              <CookiesProvider>
                <ThemeProvider defaultTheme="elysium" defaultColorMode={"dark"}>
                  <TopNav />
                  <cerberus.main
                    role="main"
                    css={{ h: "full", w: "full", px: "lg" }}
                  >
                    {props.children}
                  </cerberus.main>
                </ThemeProvider>
              </CookiesProvider>
            </Suspense>
          </CerberusConfig>
        </SessionProvider>
      </body>
    </html>
  );
}
