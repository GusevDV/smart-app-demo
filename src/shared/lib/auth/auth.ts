'use client';

// TODO временное хранилище для токенов. Удалить после перехода на куки

export function saveAuthData(data: { token: string; ctn: string }) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('ctn', data.ctn);
}

export function getAuthData() {
  const token = localStorage.getItem('token');
  const ctn = localStorage.getItem('ctn');

  if (!token || !ctn) {
    return null;
  }

  return { token, ctn };
}

