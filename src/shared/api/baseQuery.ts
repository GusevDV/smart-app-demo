'use client';

import axios from 'axios';
import { API_PATH } from '../config';
import { getAuthData } from '../lib/auth';

const createClient = () => {
  // TODO временное решение с получением токена, удаляем после перехода на cookie
  const authData = getAuthData()

  let headers;
  if (authData) {
    headers = {
      "X-idp-id-token": authData.token,
      "X-CTN": authData.ctn,
    }
  }

  return axios.create({
    baseURL: API_PATH,
    timeout: 30000,
    withCredentials: true,
    headers
  })
};

export const httpClient = createClient();
