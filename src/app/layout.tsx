import { ReactNode } from 'react';
import { Root } from '@/entities/telegram/ui/Root';
import { ReactQueryProvider } from '@/shared/api';
import './globals.css';
import '@telegram-apps/telegram-ui/dist/styles.css';
import Header from '@/shared/ui/Header/Header';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <ReactQueryProvider>
          <Root>
            <>
              <Header />
              {children}
            </>
          </Root>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
