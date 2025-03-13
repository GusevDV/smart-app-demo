import { ReactNode } from 'react';
import { Root } from '@/entities/telegram/ui/Root';
import { ReactQueryProvider } from '@/shared/api';

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
            <Header />
            <div className="container">{children}</div>
          </Root>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
