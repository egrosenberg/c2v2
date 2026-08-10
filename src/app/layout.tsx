import { Poppins, Recursive } from "next/font/google";
import { css, cx } from "styled-system/css";
import CerberusConfig from "../context/cerberus-config";

import "./globals.css";
import { SessionProvider } from "next-auth/react";
import type { LayoutRoutes } from ".next/dev/types/routes";
import { cerberus, NotificationCenter, ThemeProvider } from "@cerberus/react";
import { CenturySchoolbook, IbmPlexSans, UncialAntiqua } from "./fonts";
import { TopNav } from "./components/TopNav/TopNav";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CookiesProvider } from "next-client-cookies/server";
import { MainContentWrapper } from "./components/Wrappers/MainContentWrapper";

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
        IbmPlexSans.variable,
      )}
      data-panda-theme="acheron"
      data-color-mode="dark"
      lang="en"
    >
      <body
        className={css({
          w: "100vw",
          h: "100vh",
          pt: "6rem",
          pb: "xl",
          bgGradient: "to-br",
          gradientFrom: "page.surface.initial",
          gradientTo: "page.surface.100",
        })}
      >
        <SessionProvider>
          <CerberusConfig>
            <Suspense>
              <CookiesProvider>
                <ThemeProvider defaultTheme="acheron" defaultColorMode={"dark"}>
                  <TopNav />
                  <cerberus.main
                    role="main"
                    css={{
                      h: "full",
                      w: "full",
                      px: "lg",
                      maxW: "full",
                      maxH: "full",
                    }}
                  >
                    <MainContentWrapper>{props.children}</MainContentWrapper>
                    <NotificationCenter />
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
