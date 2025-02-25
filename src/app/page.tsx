'use client';
import { useMemo } from 'react';
import { useSignal, initData, type User } from '@telegram-apps/sdk-react';
import { Placeholder, Avatar, Section, Input } from '@telegram-apps/telegram-ui';
import { Page } from '@/shared/ui/Page';
import Image from 'next/image';


function getUserRows(user: User) {
  return [
    { title: 'id', value: user.id.toString() },
    { title: 'username', value: user.username },
    { title: 'photo_url', value: user.photoUrl },
    { title: 'last_name', value: user.lastName },
    { title: 'first_name', value: user.firstName },
    { title: 'is_bot', value: user.isBot },
    { title: 'is_premium', value: user.isPremium },
    { title: 'language_code', value: user.languageCode },
  ].filter((element) => !!element.value )
}

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
    ].filter((element) => !!element.value)
  }, [initDataState, initDataRaw]);

  const chatRows = useMemo(() => {
    if (!initDataState?.chat) {
      return;
    }
    const {
      id,
      title,
      type,
      username,
      photoUrl,
    } = initDataState.chat;

    return [
      { title: 'id', value: id.toString() },
      { title: 'title', value: title },
      { title: 'type', value: type },
      { title: 'username', value: username },
      { title: 'photo_url', value: photoUrl },
    ].filter((element) => !!element.value);
  }, [initData]);

  const userRows = useMemo(() => {
    return initDataState && initDataState.user
      ? getUserRows(initDataState.user)
      : undefined;
  }, [initDataState]);


  // const handleClick = (e: MouseEvent<HTMLFormElement>) => {
  //   console.log(e.target);
  // }


  if (!initDataRows) {
    return (
      <Page back={false}>
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
    <Page back={false}>
    <Placeholder
      header={`Привет, ${initDataState?.user?.firstName}!`}
      description="Это demo mini-app"
    >
      <Avatar src={initDataState?.user?.photoUrl} />
    </Placeholder>
    {userRows && (
      <Section
        footer="Информация о пользователе"
        header="User"
      >
        {userRows.map(({ title, value }) => (
          <Input key={title} header={title} value={`${value}`} />
        ))}
      </Section>
    )}
    {chatRows && (
      <Section
      footer="Информация по чату"
      header="Chat"
    >
      {chatRows.map(({ title, value }) => (
        <Input key={title} header={title} value={`${value}`} />
      ))}
    </Section>
    )}
    <Section
      footer="Информация в initData"
      header="InitData"
    >
      {initDataRows.map(({ title, value }) => (
        <Input key={title} header={title} value={`${value}`} />
      ))}
    </Section>

    {/* <Section>
      <form onSubmit={handleClick}>
      <Input header="Текст" placeholder="" />
      </form>
    </Section> */}
  </Page>
  );

}
