import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../baseQuery";
import { AxiosError } from "axios";

export type SbpPayRequest = {
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

async function sbpPay(request: SbpPayRequest): Promise<SbpPayResponse> {
  try {
    const response = await httpClient.post<SbpPayResponse>("/v2/payment/sbpPay?ctn=${xCtn}", {
      amount: request.amount
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
