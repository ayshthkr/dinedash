import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Merienda } from "next/font/google";
import Navbar from "@/components/navbar";
import { createClient } from "@/utils/supabase/server";

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
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, "dark", merienda.variable)}
    >
      <body>
        <div className="flex-1 w-full flex flex-col gap-20 items-center">
          <Navbar user={user} />
          <div className="animate-in flex-1 flex flex-col gap-4 w-full px-3">
            {children}
          </div>
          <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs"></footer>
        </div>
      </body>
    </html>
  );
}
