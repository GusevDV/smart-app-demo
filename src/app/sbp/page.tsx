"use client";

import { useEffect, useState } from "react";
import { getAuthData } from "@/entities/auth";
import { useBalance } from "@/shared/api/balance";
import { Page } from "@/shared/ui/Page";
import { Text, Cell } from "@telegram-apps/telegram-ui";
import Link from "next/link";
import { useSbpPay } from "@/shared/api/payment/sbpPay";

export default function SbpPage() {
  const { token, ctn } = getAuthData();

  const { mutate, data, error, isPending, isError, isSuccess } = useSbpPay({
    token: token ?? "",
    ctn: ctn ?? "",
    amount: 1.0,
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <Page back={true}>
      {isPending && <Text>Loading...</Text>}
      {isError && <Text>Error: {error.message}</Text>}
      {isSuccess && <Link href={data.data.payLoad}>Dashboard</Link>}
    </Page>
  );
}
