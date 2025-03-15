'use client';

import { httpClient } from '../../baseQuery';
import { useQuery } from '@tanstack/react-query';
import { CommonResponse } from '../../types';

// TODO дописать типы
export type SbpBindingResponse = CommonResponse<{
  addSbpBindingAllowed: string;
}>;

async function fetchBalance() {
  try {
    const response = await httpClient.get<SbpBindingResponse>('/v1/balance/main');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export function useBalance() {
  return useQuery({
    queryKey: ['sbp'],
    queryFn: () => fetchBalance(),
  });
}
