import Script from "next/script";
import { Providers } from "./providers";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ezjobhunt",
  description: "The perfect job board for job seekers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script
        src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
        type="module"
      ></Script>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
