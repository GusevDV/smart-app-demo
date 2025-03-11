import { useMutation } from "@tanstack/react-query";

export type SbpPayRequest = {
  token: string;
  ctn: string;
  amount: number;
}

export type SbpPayResponse = {
  data: {
    payId: string;
    payLoad: string;
  },
  meta: {
    codeValue: string;
    errorCode: string | null;
    status: string;
    code: number;
    message: string;
    cachedAt: string | null;
    errors: string | null;
  }
}

async function sbpPay(data: SbpPayRequest): Promise<SbpPayResponse> {
  const response = await fetch("/api/payment/sbp-pay", {
    method: "POST",
    headers: {
      "X-idp-id-token": data.token,
      "X-CTN": data.ctn,
    },
    body: JSON.stringify({
      amount: data.amount
    })
  });

  if (!response.ok) {
    throw new Error(`Ошибка. Статус: ${response.status}`);
  }

  return response.json();
}


export function useSbpPay(data: SbpPayRequest) {
  return useMutation({
    mutationFn: () => sbpPay(data),
  })
}
