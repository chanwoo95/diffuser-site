import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import { AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <div className="h-full">
      <AuthProvider>
        <Header />
        <div className="pt-[70px]">
          <Outlet />
        </div>
      </AuthProvider>
    </div>
  );
}

export default App;
