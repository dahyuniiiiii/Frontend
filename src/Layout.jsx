import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
function Layout() {
  const location = useLocation();
  const isHide = location.pathname === "/";
  return (
    <div className="appWrapper">
      <div className="app">
        {!isHide && <header className="header">헤더</header>}
        <main className="main">
          <Outlet />
        </main>
        {!isHide && <footer className="footer">푸터</footer>}
      </div>
    </div>
  );
}

export default Layout;
