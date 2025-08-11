import "./Layout.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setIsClosing(true);

    setTimeout(() => {
      setIsMenuOpen(false);
      setIsClosing(false);
      navigate(`/${menu}`);
    }, 100);
  };
  return (
    <header className="header">
      <img className="headerLogo" src="assets/longLogo.svg" />
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
              x
            </button>
            <ul>
              <li
                className={`menuItem ${
                  selectedMenu === "ai-chat" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("ai-chat")}
              >
                <img src="assets/cate1.svg" className="menuIcon" />
                천둥이챗봇
              </li>
              <li
                className={`menuItem ${
                  selectedMenu === "shop" ? "active" : ""
                }`}
                onClick={() => handleMenuClick("shop")}
              >
                <img src="assets/cate2.svg" className="menuIcon" />
                천안도감
              </li>
            </ul>
            <span className="info">© PIT STOP. All rights reserved</span>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
