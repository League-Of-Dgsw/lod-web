import { ToastContainer } from "@cher1shrxd/toast";
import Header from "./components/Header";
import Router from "./components/Router";

const App = () => {
  return (
    <div className="w-full h-svh flex flex-col items-center">
      <ToastContainer />
      <Header />
      <div className="w-full flex-1 overflow-y-scroll px-2">
        <div className="py-2">
          <Router />
        </div>
      </div>
    </div>
  );
};

export default App;
