import Navbar from "@/components/navbar";
import Provider from "@/providers/provider";
import "@rainbow-me/rainbowkit/styles.css";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistMono.className}>
        <Provider>
          <Navbar />
          <div className=" py-5">{children}</div>
        </Provider>
      </body>
    </html>
  );
}
