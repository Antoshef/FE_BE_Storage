import Create from "./create";
import Spedition from "./spedition";
import Store from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CompanyProvider from "./components/providers/companyProvider";
import Header from "./components/header/header";
import "./output.css";

const WrapperComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <CompanyProvider>
      <Header />
      {children}
    </CompanyProvider>
  );
};

const router = createBrowserRouter([
  {
    path: "/store",
    element: (
      <WrapperComponent>
        <Store />
      </WrapperComponent>
    ),
  },
  {
    path: "/create",
    element: (
      <WrapperComponent>
        <Create />
      </WrapperComponent>
    ),
  },
  {
    path: "/spedition",
    element: (
      <WrapperComponent>
        <Spedition />
      </WrapperComponent>
    ),
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
