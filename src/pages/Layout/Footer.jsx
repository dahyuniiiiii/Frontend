import { useNavigate, useLocation } from "react-router-dom";
import "./Layout.css";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer className="footer">
      <div
        className={`footerBtn ${
          location.pathname === "/ai-chat" ? "active" : ""
        }`}
        onClick={() => navigate("/ai-chat")}
      >
        <img src="assets/aiChatLogo.png" />
        <div>챗봇</div>
      </div>

      <div
        className={`footerBtn-center ${
          location.pathname === "/home" ? "active" : ""
        }`}
        onClick={() => navigate("/home")}
      >
        <img src="assets/homeLogo.png" />
      </div>

      <div
        className={`footerBtn ${location.pathname === "/shop" ? "active" : ""}`}
        onClick={() => navigate("/shop")}
      >
        <img src="assets/shopLogo.png" />
        <div>천안도감</div>
      </div>
    </footer>
  );
}

export default Footer;
