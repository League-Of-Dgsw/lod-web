import api from '../lib/api';

interface DAuthExchangeBody {
  accessToken: string;
}

interface AuthResponse {
  accessToken: string;
}

export const exchangeDAuthToken = (accessToken: string) =>
  api.post<AuthResponse>('/auth/dauth', { accessToken } satisfies DAuthExchangeBody).then(r => r.data);
