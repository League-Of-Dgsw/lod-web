import { useEffect } from "react";
import Header from "./components/Header";
import { exchangeDAuthToken } from "./api/auth";
import { useAuthStore } from "./stores/auth";
import { BridgeProvider } from "@b1nd/aid-kit/bridge-kit/web";
import { RouteProvider, Router, type RouteProps } from "@b1nd/aid-kit/navigation";
import { AppStateProvider } from "@b1nd/aid-kit/app-state";
import Home from "./pages/Home";
import { ToastProvider } from "@b1nd/dodam-design-system/components";

const App = () => {
  const { setToken } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) return;

    params.delete("token");
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params}`
      : window.location.pathname;
    window.history.replaceState(null, "", newUrl);

    exchangeDAuthToken(token).then(({ accessToken }) => setToken(accessToken));
  }, []);

  const routes = {
    tabs: [
      {
        index: true,
        element: Layout,
        path: "/",
        children: [{ path: "/", index: true, element: Home }],
      },
    ],
    stacks: [],
  };

  return (
    <BridgeProvider>
      <AppStateProvider>
        <RouteProvider routes={routes}>
          <Router routes={routes} />
        </RouteProvider>
      </AppStateProvider>
    </BridgeProvider>
  );
};

export default App;

export const Layout = ({ outlet }: RouteProps) => {
  return (
    <div className="w-full h-svh flex flex-col items-center bg-white">
      <ToastProvider />
      <Header />
      <div className="w-full flex-1 overflow-y-scroll px-4">
        <div className="py-4">{outlet}</div>
      </div>
    </div>
  );
};