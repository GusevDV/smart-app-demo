'use client';

import { Page } from '@/shared/ui/Page';
import { Skeleton, Cell } from '@telegram-apps/telegram-ui';
import { useBalance } from '@/shared/api/balance';
import { getAuthData } from '@/shared/lib/auth';
import SbpForm from '@/features/sbp';
import { initData, useSignal } from '@telegram-apps/sdk-react';

export default function SbpPage() {
  const initDataState = useSignal(initData.state);

  console.log(initDataState);

  const authData = getAuthData();
  const { data, error: balanceError, isLoading, isSuccess } = useBalance();

  return (
    <Page back={true}>
      <Skeleton visible={isLoading}>
        {isSuccess ? (
          <Cell subtitle={`Баланс: ${data?.data.balanceValue}`}>Номер: {authData?.ctn}</Cell>
        ) : (
          <Cell subtitle={balanceError?.message}>Ошибка</Cell>
        )}
      </Skeleton>
      <SbpForm />
    </Page>
  );
}
