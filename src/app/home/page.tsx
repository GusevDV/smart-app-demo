'use client';

import { Page } from '@/shared/ui/Page';
import { useSignal, initData, type User, openLink } from '@telegram-apps/sdk-react';
import { Placeholder, List, Cell, Avatar, Title, Link } from '@telegram-apps/telegram-ui';
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

  const handlePayLinkClick = () => {
    if (openLink.isAvailable()) {
      openLink('https://topiframe2.ruru.ru');
    }
  };

  return (
    <Page back={false}>
      <List style={{ marginTop: '0.2rem' }}>
        <Title level="1" weight="3" style={{ textAlign: 'center', padding: '1rem 0' }}>
          Что вы хотите сделать?
        </Title>
        <Cell
          style={{
            backgroundColor: 'var(--tgui--section_bg_color)',
            borderRadius: '10px',
            color: '#fff',
          }}
          after={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="12"
              fill="none"
              viewBox="0 0 7 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 5 5-5 5"
              ></path>
            </svg>
          }
          before={<Avatar src={initDataState?.user?.photo_url} width={44} />}
          subtitle="Чтобы пополнить баланс"
          Component={Link}
          href="/auth"
        >
          Войти в билайн
        </Cell>
        <Cell
          style={{
            backgroundColor: 'var(--tgui--section_bg_color)',
            borderRadius: '10px',
            color: '#fff',
          }}
          after={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="7"
              height="12"
              fill="none"
              viewBox="0 0 7 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 5 5-5 5"
              ></path>
            </svg>
          }
          before={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="44" height="44">
              <circle cx="50" cy="50" r="48" fill="#4A90E2" stroke="#FFFFFF" stroke-width="4" />
              <rect x="20" y="35" width="60" height="30" rx="5" ry="5" fill="#FFFFFF" />
              <rect x="20" y="40" width="60" height="5" fill="#4A90E2" />
              <rect x="25" y="55" width="15" height="5" fill="#4A90E2" />
              <rect x="45" y="55" width="10" height="5" fill="#4A90E2" />
            </svg>
          }
          subtitle="Любым способом"
          Component={Link}
          href="#"
          onClick={handlePayLinkClick}
        >
          Оплата услуг
        </Cell>
      </List>
    </Page>
  );
}
