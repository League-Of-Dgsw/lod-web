import { generateCodeVerifier, generateCodeChallenge } from '../lib/pkce';
import { useAuthStore } from '../stores/auth';

const DAUTH_CLIENT_ID = import.meta.env.VITE_DAUTH_CLIENT_ID as string;
const DAUTH_SCOPE = import.meta.env.VITE_DAUTH_SCOPE ?? 'profile:read';

const Header = () => {
  const { token, clearToken } = useAuthStore();

  const handleLogin = async () => {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = crypto.randomUUID();
    const redirectUri = `${window.location.origin}/callback`;

    sessionStorage.setItem('code_verifier', codeVerifier);
    sessionStorage.setItem('oauth_state', state);

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: DAUTH_CLIENT_ID,
      redirect_uri: redirectUri,
      scope: DAUTH_SCOPE,
      state,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
    });

    window.location.href = `https://dauth.b1nd.com/authorize?${params}`;
  };

  return (
    <div className="w-full h-14 flex items-center justify-between px-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2">
        <span className="font-black text-base tracking-widest text-black uppercase">League of</span>
        <img src="/dgsw.png" alt="DGSW" className="w-14" />
      </div>
      {token ? (
        <button
          onClick={clearToken}
          className="px-4 py-1.5 border border-gray-300 text-gray-500 text-xs font-bold tracking-wide rounded active:opacity-60 transition-opacity cursor-pointer">
          로그아웃
        </button>
      ) : (
        <button
          onClick={handleLogin}
          className="px-4 py-1.5 border border-gray-900 text-gray-900 text-xs font-bold tracking-wide rounded active:opacity-60 transition-opacity cursor-pointer">
          로그인
        </button>
      )}
    </div>
  );
};

export default Header;
