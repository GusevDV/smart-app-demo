import { httpClient } from '../baseQuery'
import { useQuery } from "@tanstack/react-query";
import { CommonResponse } from '../types';

export type BalanceResponse = CommonResponse<{
    paymentType: string;
    balanceValue: number;
    balanceType: string;
    balanceName: string;
    balanceCode: string;
    statusUB: string | null;
    lastDate: string | null;
    unbilledCharges: string | null;
    isBlocked: boolean;
}>;

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
