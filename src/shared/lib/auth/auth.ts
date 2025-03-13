'use client';

import Cookies from 'js-cookie';

// TODO временное хранилище для токенов. Удалить после перехода на куки

export function saveAuthData(data: { token: string; ctn: string }) {
  Cookies.set('token', data.token);
  Cookies.set('ctn', data.ctn);
}

export function getAuthData() {
  const token = Cookies.get('token');
  const ctn = Cookies.get('ctn');

  if (!token || !ctn) {
    return null;
  }

  return { token, ctn };
}

