'use client';
import { useMemo } from 'react';
import { useSignal, initData } from '@telegram-apps/sdk-react';
import { Placeholder, Avatar, List, Text } from '@telegram-apps/telegram-ui';
import { Page } from '@/shared/ui/Page';
import Image from 'next/image';


// function getUserRows(user: User) {
//   return [
//     { title: 'id', value: user.id.toString() },
//     { title: 'username', value: user.username },
//     { title: 'photo_url', value: user.photo_url },
//     { title: 'last_name', value: user.last_name },
//     { title: 'first_name', value: user.first_name },
//     { title: 'is_bot', value: user.is_bot },
//     { title: 'is_premium', value: user.is_premium },
//     { title: 'language_code', value: user.language_code },
//   ];
// }

export default function Home() {
  const initDataRaw = useSignal(initData.raw);
  const initDataState = useSignal(initData.state);

  const initDataRows = useMemo(() => {
    if (!initDataState || !initDataRaw) {
      return;
    }
    const {
      authDate,
      hash,
      queryId,
      chatType,
      chatInstance,

      startParam,
    } = initDataState;
    return [
      { title: 'raw', value: initDataRaw },
      { title: 'auth_date', value: authDate.toLocaleString() },
      { title: 'auth_date (raw)', value: authDate.getTime() / 1000 },
      { title: 'hash', value: hash },
      {
        title: 'can_send_after',
        value: initData.canSendAfterDate()?.toISOString(),
      },
      { title: 'query_id', value: queryId },
      { title: 'start_param', value: startParam },
      { title: 'chat_type', value: chatType },
      { title: 'chat_instance', value: chatInstance },
    ];
  }, [initDataState, initDataRaw]);


  console.log(initDataRaw)
  console.log(initDataState)
  console.log(initDataRows)


  if (!initDataRows) {
    return (
      <Page>
        <Placeholder
          header="Ой"
          description="Приложение запущено вне Telegram"
        >
          <Image
            alt="Telegram sticker"
            src="https://xelene.me/telegram.gif"
            style={{ display: 'block', width: '144px', height: '144px' }}
          />
        </Placeholder>
      </Page>
    );
  }
  return (
    <Page>
    <Placeholder
      header={`Привет, ${initDataState?.user?.firstName}!`}
      description="Это demo mini-app"
    >
      <Avatar src={initDataState?.user?.photoUrl} />
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
  </Page>
  );

}
