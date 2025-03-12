"use client";

import { getAuthData } from "@/entities/auth";
import { Page } from "@/shared/ui/Page";
import { Text, Button } from "@telegram-apps/telegram-ui";
import { useSbpPay } from "@/shared/api/payment/sbpPay";
import { openLink } from "@telegram-apps/sdk-react";

export default function SbpPage() {
  const { token, ctn } = getAuthData();

  const { mutateAsync, data, error, isPending, isError, isSuccess } = useSbpPay({
    token: token ?? "",
    ctn: ctn ?? "",
    amount: 10,
  });

  const handleClick = async () => {
    const response = await mutateAsync();
    response.data;
    if (openLink.isAvailable()) {
      openLink(response.data.payId, {
        tryBrowser: "chrome",
        tryInstantView: true,
      });
    }
  };

  return (
    <Page back={true}>
      {isPending && <Text>Loading...</Text>}
      {isError && <Text>Error: {error.message}</Text>}
      <div style={{ padding: "0 22px" }}>
        <Button onClick={handleClick} loading={isPending} mode="filled" size="l" stretched>
          Оплатить
        </Button>
      </div>
    </Page>
  );
}
