import { Uncial_Antiqua } from "next/font/google";
import localFont from "next/font/local";

export const CenturySchoolbook = localFont({
  src: "./fonts/century-schoolbook.woff2",
  variable: "--font-century-schoolbook",
});

export const UncialAntiqua = Uncial_Antiqua({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
  variable: "--font-uncial-antiqua",
});
