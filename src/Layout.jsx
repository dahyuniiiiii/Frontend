import Header from "./pages/Layout/Header";
import Footer from "./pages/Layout/Footer";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const isHide = location.pathname === "/";
  return (
    <div className="appWrapper">
      <div className="app">
        {!isHide && <Header />}
        <main className="main">
          <Outlet />
        </main>
        {!isHide && <Footer />}
      </div>
    </div>
  );
}

export default Layout;
