import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Merienda } from "next/font/google";
import Navbar from "@/components/navbar-loader";
import NextTopLoader from "nextjs-toploader";
import Link from "next/link";
import UpButton from "@/components/up-button";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Dinedash - Order food from your Home",
  description: "The fastest way to order food from the comfort of your home",
};

const merienda = Merienda({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-funky",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(GeistSans.variable, merienda.variable)}>
      <body>
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <NextTopLoader color="#ea580c" />
          <Navbar />
          <div className="animate-in flex-1 flex flex-col gap-4 w-full px-3 overflow-x-hidden">
            {children}
          </div>
          <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-md font-funky">
            By &nbsp;
            <Link
              href="https://github.com/ayshthkr"
              target="_blank"
              className="underline underline-offset-2 decoration-1 hover:decoration-4"
            >
              Ayush Thakur
            </Link>
          </footer>
          <UpButton />
        </div>
      </body>
    </html>
  );
}
