import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/components/store";

export const metadata: Metadata = {
  title: {
    default: "Harbor & Pine — Brewing gear and small-lot coffee",
    template: "%s · Harbor & Pine",
  },
  description:
    "Pour-over kettles, grinders, mugs and fresh-roasted coffee from a small shop in Portland. Free shipping over $75.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className="layout">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
