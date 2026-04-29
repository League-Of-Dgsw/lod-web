import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@cher1shrxd/toast';
import { exchangeDAuthToken } from '../api/auth';
import { useAuthStore } from '../stores/auth';

const DAUTH_CLIENT_ID = import.meta.env.VITE_DAUTH_CLIENT_ID as string;
const DAUTH_CLIENT_SECRET = import.meta.env.VITE_DAUTH_CLIENT_SECRET as string;

const Callback = () => {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    const error = params.get('error');

    if (error) {
      toast.error('로그인 실패', '사용자가 인증을 거부했습니다.');
      navigate('/');
      return;
    }

    const savedState = sessionStorage.getItem('oauth_state');
    const codeVerifier = sessionStorage.getItem('code_verifier');

    if (!code || !codeVerifier) {
      toast.error('로그인 실패', '인가 코드를 찾을 수 없습니다.');
      navigate('/');
      return;
    }

    if (state !== savedState) {
      toast.error('로그인 실패', '유효하지 않은 요청입니다.');
      navigate('/');
      return;
    }

    sessionStorage.removeItem('oauth_state');
    sessionStorage.removeItem('code_verifier');

    const redirectUri = `${window.location.origin}/callback`;

    // Step 1: DAuth에서 access_token 교환
    const formData = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: DAUTH_CLIENT_ID,
      client_secret: DAUTH_CLIENT_SECRET,
      code_verifier: codeVerifier,
    });

    fetch('https://dodam-api.b1nd.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    })
      .then((r) => r.json())
      .then(({ access_token }: { access_token: string }) => {
        // Step 2: 우리 서버에 DAuth 토큰 전달 → 우리 서버 JWT 수신
        return exchangeDAuthToken(access_token);
      })
      .then(({ accessToken }) => {
        setToken(accessToken);
        toast.success('로그인 성공', '환영합니다!');
        navigate('/');
      })
      .catch(() => {
        toast.error('로그인 실패', '토큰 교환 중 오류가 발생했습니다.');
        navigate('/');
      });
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <p className="text-sm text-gray-500">로그인 처리 중...</p>
    </div>
  );
};

export default Callback;
