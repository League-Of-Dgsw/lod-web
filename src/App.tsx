import { useEffect } from "react";
import { exchangeDAuthToken } from "./api/auth";
import { useAuthStore } from "./stores/auth";
import { BridgeProvider } from "@b1nd/aid-kit/bridge-kit/web";
import {
  RouteProvider,
  Router,
} from "@b1nd/aid-kit/navigation";
import { AppStateProvider } from "@b1nd/aid-kit/app-state";
import Home from "./pages/Home";
import { SafeAreaProvider } from "@b1nd/aid-kit/safe-area-provider";
import { Layout } from "./components/Layout";
import { OverlayProvider } from "@b1nd/dodam-design-system/components";

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
    <SafeAreaProvider>
      <BridgeProvider>
        <AppStateProvider>
          <OverlayProvider>
            <RouteProvider routes={routes}>
              <Router routes={routes} />
            </RouteProvider>
          </OverlayProvider>
        </AppStateProvider>
      </BridgeProvider>
    </SafeAreaProvider>
  );
};

export default App;