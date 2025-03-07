
import { ReactNode } from "react";
import { Root } from "@/entities/telegram/Root";
import { ReactQueryProvider } from "@/shared/lib/react-query";
import "./globals.css";
import "@telegram-apps/telegram-ui/dist/styles.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <ReactQueryProvider>
          <Root>{children}</Root>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
