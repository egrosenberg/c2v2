import { Poppins, Recursive } from "next/font/google";
import { type PropsWithChildren } from "react";
import { css, cx } from "styled-system/css";
import CerberusConfig from "@/src/context/cerberus-config";

import "./globals.css";

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

interface RootProps {}

export default function RootLayout(props: PropsWithChildren<RootProps>) {
  return (
    <html
      className={cx(poppins.variable, recursive.variable)}
      data-panda-theme="cerberus"
      data-color-mode="dark"
      lang="en"
    >
      <body>
        <CerberusConfig>{props.children}</CerberusConfig>
      </body>
    </html>
  );
}
