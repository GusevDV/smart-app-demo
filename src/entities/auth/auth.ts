export function saveAuthData(data: { token: string; ctn: string }) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('ctn', data.ctn);
}

export function getAuthData() {
  return {
    token: localStorage.getItem('token'),
    ctn: localStorage.getItem('ctn'),
  };
}

