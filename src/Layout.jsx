import Header from "./pages/Layout/Header";
import Footer from "./pages/Layout/Footer";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const isHide = location.pathname === "/";
  const isBg =
    location.pathname === "/shop" ||
    location.pathname === "/roulette" ||
    location.pathname === "/rouletteRecommend" ||
    location.pathname === "/ai-recommend";
  const isHeadHide = location.pathname === "/store-detail";
  return (
    <div className="appWrapper">
      <div className={`app ${isBg ? "shopBg" : ""}`}>
        {!isHide && !isHeadHide && <Header />}
        <main className="main">
          <Outlet />
        </main>
        {!isHide && <Footer />}
      </div>
    </div>
  );
}

export default Layout;
