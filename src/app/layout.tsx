import '@telegram-apps/telegram-ui/dist/styles.css';
import { Root } from "@/entities/telegram/Root";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Root>
          {children}
        </Root>
      </body>
    </html>
  );
}
