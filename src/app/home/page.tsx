'use client';

import { Page } from '@/shared/ui/Page';
import { useSignal, initData, type User } from '@telegram-apps/sdk-react';
import { Placeholder, Avatar } from '@telegram-apps/telegram-ui';
import Image from 'next/image';

export default function Home() {
  const initDataState = useSignal(initData.state);

  if (!initDataState) {
    return (
      <Page back={false}>
        <Placeholder header="Ой" description="Приложение запущено вне Telegram">
          <Image
            alt="Telegram sticker"
            src="https://xelene.me/telegram.gif"
            style={{ display: 'block', width: '144px', height: '144px' }}
            width={144}
          />
        </Placeholder>
      </Page>
    );
  }

  return <Page back={false}></Page>;
}
