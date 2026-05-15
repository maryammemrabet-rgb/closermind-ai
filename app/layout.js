import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Closermind AI",
  description: "AI-powered objection handling assistant",
};

export default function RootLayout({ children }) {

  return (

    <ClerkProvider>

      <html lang="en">

        <body>
          {children}
        </body>

      </html>

    </ClerkProvider>

  );

}