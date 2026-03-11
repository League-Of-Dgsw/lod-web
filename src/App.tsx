import { ToastContainer } from "@cher1shrxd/toast";
import Header from "./components/Header";
import Router from "./components/Router";

const App = () => {
  return (
    <div className="w-full max-w-96 mx-auto h-svh flex flex-col items-center bg-white">
      <ToastContainer />
      <Header />
      <div className="w-full flex-1 overflow-y-scroll px-4">
        <div className="py-4">
          <Router />
        </div>
      </div>
    </div>
  );
};

export default App;
