"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMemo } from "react";
import { useSignal, initData, type User } from "@telegram-apps/sdk-react";
import { Placeholder, Input, Cell, Avatar, Button, Text } from "@telegram-apps/telegram-ui";
import { Page } from "@/shared/ui/Page";
import Image from "next/image";
import { useBalance } from "@/shared/api/balance";
import { BalanceRequest } from "@/shared/api/balance/balance";

type Inputs = {
  token: string;
  ctn: string;
};

function getUserRows(user: User) {
  return [
    { title: "id", value: user.id.toString() },
    { title: "username", value: user.username },
    { title: "photo_url", value: user.photoUrl },
    { title: "last_name", value: user.lastName },
    { title: "first_name", value: user.firstName },
    { title: "is_bot", value: user.isBot },
    { title: "is_premium", value: user.isPremium },
    { title: "language_code", value: user.languageCode },
  ].filter((element) => !!element.value);
}

export default function Home() {
  const initDataRaw = useSignal(initData.raw);
  const initDataState = useSignal(initData.state);

  const [formData, setFormData] = useState<BalanceRequest>({
    ctn: "",
    token: "",
  });

  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      ctn: typeof window !== "undefined" ? localStorage.getItem("ctn") || "" : "",
    },
  });

  const { data, error, isLoading, isError, isSuccess, refetch } = useBalance(formData, {
    enabled: !!formData.ctn && !!formData.token,
  });

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
      { title: "raw", value: initDataRaw },
      { title: "auth_date", value: authDate.toLocaleString() },
      { title: "auth_date (raw)", value: authDate.getTime() / 1000 },
      { title: "hash", value: hash },
      {
        title: "can_send_after",
        value: initData.canSendAfterDate()?.toISOString(),
      },
      { title: "query_id", value: queryId },
      { title: "start_param", value: startParam },
      { title: "chat_type", value: chatType },
      { title: "chat_instance", value: chatInstance },
    ].filter((element) => !!element.value);
  }, [initDataState, initDataRaw]);

  const chatRows = useMemo(() => {
    if (!initDataState?.chat) {
      return;
    }
    const { id, title, type, username, photoUrl } = initDataState.chat;

    return [
      { title: "id", value: id.toString() },
      { title: "title", value: title },
      { title: "type", value: type },
      { title: "username", value: username },
      { title: "photo_url", value: photoUrl },
    ].filter((element) => !!element.value);
  }, [initData]);

  const userRows = useMemo(() => {
    return initDataState && initDataState.user ? getUserRows(initDataState.user) : undefined;
  }, [initDataState]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    localStorage.setItem("ctn", data.ctn);
    setFormData(data);
    refetch();
  };

  if (!initDataRows) {
    return (
      <Page back={false}>
        <Placeholder header="Ой" description="Приложение запущено вне Telegram">
          <Image
            alt="Telegram sticker"
            src="https://xelene.me/telegram.gif"
            style={{ display: "block", width: "144px", height: "144px" }}
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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input header="Token" {...register("token")} placeholder="" />
          <Input header="CTN (MSISDN)" {...register("ctn")} placeholder="" />
          <div style={{ display: "flex", padding: "0 22px 16px 22px", textAlign: "left" }}>
            <Text weight="3">
              {data?.data?.balanceValue !== undefined ? `Баланс: ${data.data.balanceValue}` : ""}
            </Text>
          </div>
          <div style={{ padding: "0 22px" }}>
            <Button type="submit" loading={isLoading} mode="filled" size="l" stretched>
              Показать баланс
            </Button>
          </div>
        </form>
      </div>

      {isError && (
        <Cell readOnly subtitle="Error">
          Error: {error.message}
        </Cell>
      )}
    </Page>
  );
}
