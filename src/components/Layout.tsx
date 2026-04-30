import { ToastProvider } from "@b1nd/dodam-design-system/components";
import { useSafeArea } from "@b1nd/aid-kit/safe-area-provider";
import Header from "./Header";
import type { RouteProps } from "@b1nd/aid-kit/navigation";

export const Layout = ({ outlet }: RouteProps) => {
  const { top, bottom } = useSafeArea();

  return (
    <>
      <ToastProvider />
      <div
        className="w-full h-svh flex flex-col items-center bg-background-default"
        style={{ paddingTop: top, paddingBottom: bottom }}
      >
        <Header />
        <div className="w-full flex-1 overflow-y-scroll px-4">
          <div className="py-4">{outlet}</div>
        </div>
      </div>
    </>
  );
};
