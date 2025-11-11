import { TanstackQueryProvider } from "@/app/providers/tanstack-query";
import { WagmiProvider } from "@/app/providers/wagmi";
import { ToastContainer } from "@/shared/ui/toast";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Geist, Geist_Mono } from "next/font/google";
import { ReactNode } from "react";
import "../../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

interface RootLayoutProps {
  children: ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <WagmiProvider>
          <TanstackQueryProvider>
            <RainbowKitProvider>
              {children}
              <ToastContainer />
            </RainbowKitProvider>
          </TanstackQueryProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
