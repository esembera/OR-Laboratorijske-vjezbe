import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Modeli Apple iPhonea",
  description: "Modeli Apple iPhonea kroz vremenski period od 2014. do 2020.",
  author: "Ernest Šembera",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <UserProvider>
        <body>
          <Providers>{children}</Providers>
        </body>
      </UserProvider>
    </html>
  );
}
