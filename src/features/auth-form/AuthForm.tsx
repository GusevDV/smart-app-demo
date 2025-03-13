'use client';

import { Button, Input, Title } from '@telegram-apps/telegram-ui';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getAuthData, saveAuthData } from '@/shared/lib/auth';

import styles from './AuthForm.module.css';

type Inputs = {
  token: string;
  ctn: string;
};

type AuthFormProps = {
  onLogin: () => void;
};

export default function AuthForm({ onLogin }: AuthFormProps) {
  const authData = getAuthData();
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      ctn: typeof window !== 'undefined' ? authData?.ctn || '' : '',
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    saveAuthData(data);
    onLogin && onLogin();
  };

  return (
    <>
      <Title className={styles.title} level="1" weight="3">
        Войти
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input header="Телефон" {...register('ctn')} placeholder="909XXXXXXX" />
        <Input header="Token" {...register('token')} placeholder="" />

        <div className={styles.button_container}>
          <Button type="submit" mode="filled" size="l" stretched>
            Войти
          </Button>
        </div>
      </form>
    </>
  );
}
