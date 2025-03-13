import { httpClient } from '../baseQuery'
import { useQuery } from "@tanstack/react-query";

export type BalanceResponse = {
  data: {
    paymentType: string;
    balanceValue: number;
    balanceType: string;
    balanceName: string;
    balanceCode: string;
    statusUB: string | null;
    lastDate: string | null;
    unbilledCharges: string | null;
    isBlocked: boolean;
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

async function fetchBalance() {
  try {
    const response = await httpClient.get<BalanceResponse>("/v1/balance/main");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function useBalance() {
  return useQuery({
    queryKey: ['balance'],
    queryFn: () => fetchBalance(),
  })
}
