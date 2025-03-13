'use client';

import { useState, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSignal, initData, type User } from '@telegram-apps/sdk-react';
import {
  Placeholder,
  Input,
  Avatar,
  Button,
  Text,
  Section,
  List,
  ButtonCell,
} from '@telegram-apps/telegram-ui';
import { Page } from '@/shared/ui/Page';
import Image from 'next/image';
import { useBalance } from '@/shared/api/balance';
import { saveAuthData } from '@/shared/lib/auth';
import { useRouter } from 'next/navigation';

type Inputs = {
  token: string;
  ctn: string;
};

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
  ].filter((element) => !!element.value);
}

export default function Home() {
  const initDataRaw = useSignal(initData.raw);
  const initDataState = useSignal(initData.state);

  const [isAuth, setIsAuth] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      ctn: typeof window !== 'undefined' ? localStorage.getItem('ctn') || '' : '',
    },
  });

  const { data, isLoading } = useBalance({
    enabled: isAuth,
  });

  const initDataRows = useMemo(() => {
    if (!initDataState || !initDataRaw) {
      return;
    }
    const { auth_date, hash, query_id, chat_type, chat_instance, start_param } = initDataState;
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
    ].filter((element) => !!element.value);
  }, [initDataState, initDataRaw]);

  const chatRows = useMemo(() => {
    if (!initDataState?.chat) {
      return;
    }
    const { id, title, type, username, photo_url } = initDataState.chat;

    return [
      { title: 'id', value: id.toString() },
      { title: 'title', value: title },
      { title: 'type', value: type },
      { title: 'username', value: username },
      { title: 'photo_url', value: photo_url },
    ].filter((element) => !!element.value);
  }, [initData]);

  const userRows = useMemo(() => {
    return initDataState && initDataState.user ? getUserRows(initDataState.user) : undefined;
  }, [initDataState]);

  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    saveAuthData(data);
    setIsAuth(true);
  };

  const handleSbpClick = () => {
    router.push('/sbp');
  };

  if (!initDataRows) {
    return (
      <Page back={false}>
        <Placeholder header="Ой" description="Приложение запущено вне Telegram">
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
        header={`Привет, ${initDataState?.user?.first_name}!`}
        description="Это demo mini-app"
      >
        <Avatar src={initDataState?.user?.photo_url} width={255} />
      </Placeholder>
      <List
        style={{
          padding: '40px',
        }}
      >
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input header="Token" {...register('token')} placeholder="" />
            <Input header="CTN (MSISDN)" {...register('ctn')} placeholder="" />
            <div style={{ display: 'flex', padding: '0 22px 16px 22px', textAlign: 'left' }}>
              <Text weight="3">
                {data?.data.balanceValue !== undefined ? `Баланс: ${data?.data.balanceValue}` : ''}
              </Text>
            </div>
            <div style={{ display: 'flex', padding: '0 22px 16px 22px', textAlign: 'left' }}>
              <Text weight="3">
                {data?.data.balanceValue !== undefined ? `Баланс: ${data?.data.balanceValue}` : ''}
              </Text>
            </div>
            <Button type="submit" loading={isLoading} mode="filled" size="l" stretched>
              Сохранить токен
            </Button>
          </form>
        </div>
        <Section header="Действия">
          <ButtonCell onClick={handleSbpClick}>СБП</ButtonCell>
          <ButtonCell>Внешние сервисы</ButtonCell>
        </Section>
      </List>
    </Page>
  );
}
