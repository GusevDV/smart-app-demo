'use client';

import { Page } from '@/shared/ui/Page';
import { Text, Button } from '@telegram-apps/telegram-ui';
import { useSbpPay } from '@/shared/api/payment/sbp-pay';
import { openLink } from '@telegram-apps/sdk-react';

export default function SbpPage() {
  const { mutateAsync, error, isPending, isError } = useSbpPay({
    amount: 10,
    createBinding: false,
    bindingId: null,
    hasBonuses: false,
  });

  const handleClick = async () => {
    const response = await mutateAsync();
    response.data;
    if (openLink.isAvailable()) {
      openLink(response.data.payLoad);
    }
  };

  return (
    <Page back={true}>
      {isPending && <Text>Loading...</Text>}
      {isError && <Text>Error: {error.message}</Text>}
      <div style={{ padding: '0 22px' }}>
        <Button onClick={handleClick} loading={isPending} mode="filled" size="l" stretched>
          Оплатить
        </Button>
      </div>
    </Page>
  );
}
