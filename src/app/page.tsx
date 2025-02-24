'use client';
import { useMemo } from 'react';
import { useSignal, initData, type User } from '@telegram-apps/sdk-react';
import { AppRoot, Placeholder, Avatar, List, Text } from '@telegram-apps/telegram-ui';

import '@telegram-apps/telegram-ui/dist/styles.css';


function getUserRows(user: User) {
  return [
    { title: 'id', value: user.id.toString() },
    { title: 'username', value: user.username },
    { title: 'photo_url', value: user.photo_url },
    { title: 'last_name', value: user.last_name },
    { title: 'first_name', value: user.first_name },
    { title: 'is_bot', value: user.is_bot },
    { title: 'is_premium', value: user.is_premium },
    { title: 'language_code', value: user.language_code },
  ];
}


export default function Home() {
  const initDataRaw = useSignal(initData.raw);
  const initDataState = useSignal(initData.state);

  const initDataRows = useMemo(() => {
    if (!initDataState || !initDataRaw) {
      return;
    }
    const {
      auth_date,
      hash,
      query_id,
      chat_type,
      chat_instance,

      start_param,
    } = initDataState;
    return [
      { title: 'raw', value: initDataRaw },
      { title: 'auth_date', value: auth_date.toLocaleString() },
      { title: 'auth_date (raw)', value: auth_date.getTime() / 1000 },
      { title: 'hash', value: hash },
      {
        title: 'can_send_after',
        value: initData.canSendAfterDate()?.toISOString(),
      },
      { title: 'query_id', value: query_id },
      { title: 'start_param', value: start_param },
      { title: 'chat_type', value: chat_type },
      { title: 'chat_instance', value: chat_instance },
    ];
  }, [initDataState, initDataRaw]);


  if (!initDataRows) {
    return (
      <AppRoot>
        <Placeholder
          header="Ой"
          description="Приложение запущено вне Telegram"
        >
          <img
            alt="Telegram sticker"
            src="https://xelene.me/telegram.gif"
            style={{ display: 'block', width: '144px', height: '144px' }}
          />
        </Placeholder>
      </AppRoot>
    );
  }
  return (
    <AppRoot>
    <Placeholder
      header={`Привет, ${initDataState?.user?.first_name}!`}
      description="Это demo mini-app"
    >
      <Avatar src={initDataState?.user?.photo_url} />
    </Placeholder>
    <List>
      {initDataRows.map(({ title, value }) => (
        <Text key={title}>
          <b>{title}</b>: {value
            ? value.toString()
            : '—'}
        </Text>
      ))}
    </List>
  </AppRoot>
  );

}
