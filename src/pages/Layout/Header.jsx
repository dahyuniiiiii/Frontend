import "./Layout.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isShop =
    location.pathname === "/shop" || location.pathname === "/ai-recommend";

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const handleMenuClick = (menu) => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
      navigate(`/${menu}`);
    }, 100);
  };

  return (
    <header className={`header ${isShop ? "shopHeader" : ""}`}>
      <img
        className="headerLogo"
        src="assets/longLogo.png"
        onClick={() => navigate("/home")}
      />
      <img
        className="cateBarLogo"
        src="assets/menubar.svg"
        onClick={() => setIsMenuOpen(true)}
      />
      {isMenuOpen && (
        <div className="menuScreen" onClick={() => setIsMenuOpen(false)}>
          <div
            className={`sidebarMenu ${isClosing ? "slideOut" : "slideIn"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="sidebarClose"
              onClick={() => setIsMenuOpen(false)}
            >
              <img src="assets/noIcon.svg" />
            </button>
            <ul>
              <li
                className={`menuItem ${
                  location.pathname === "/ai-chat" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("ai-chat")}
              >
                <img src="assets/cate1.svg" className="menuIcon" />
                천둥이챗봇
              </li>
              <li
                className={`menuItem ${
                  location.pathname === "/shop" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("shop")}
              >
                <img src="assets/cate2.svg" className="menuIcon" />
                천안도감
              </li>
              <li
                className={`menuItem ${
                  location.pathname === "/roulette" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("roulette")}
              >
                <img src="assets/cate3.svg" className="menuIcon" />
                오뭐땡 룰렛
              </li>
            </ul>
            <div className="catebottom">
              <img src="assets/longLogo.png" className="menulogo" />
              <span className="info">© PIT STOP. All rights reserved</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
