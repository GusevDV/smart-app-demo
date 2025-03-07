import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export type BalanceRequest = {
    token: string;
    ctn: string;
}

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

async function fetchBalance(data: BalanceRequest): Promise<BalanceResponse> {
  const response = await fetch("/api/balance", {
    headers: {
      "X-idp-id-token": data.token,
      "X-CTN": data.ctn,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export function useBalance(data: BalanceRequest, options: {enabled: boolean}) {
    return useQuery({
      queryKey: ['balance'],
      queryFn: () => fetchBalance(data),
      enabled: options?.enabled
    })
}