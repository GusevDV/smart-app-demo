'use client'

import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../baseQuery";
import { AxiosError } from "axios";
import { getAuthData } from "@/shared/lib/auth";

export type SbpPayRequest = {
  amount: number;
  createBinding: boolean;
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

async function sbpPay(request: SbpPayRequest): Promise<SbpPayResponse> {
  // TODO удалить после перехода на cookie
  const authData = getAuthData();
  const ctn = authData?.ctn ?? '';

  try {
    const response = await httpClient.post<SbpPayResponse>(`/v2/payment/sbpPay?ctn=${ctn}`, {
      amount: request.amount,
      createBinding: request.createBinding,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


export function useSbpPay(data: SbpPayRequest) {
  return useMutation<SbpPayResponse, AxiosError | Error>({
    mutationFn: () => sbpPay(data),
  })
}
