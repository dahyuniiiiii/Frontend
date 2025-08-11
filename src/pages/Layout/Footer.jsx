import { useNavigate } from "react-router-dom";
import "./Layout.css";
function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footerBtn " onClick={() => navigate("/ai-chat")}>
        <img src="assets/aiChatLogo.png" />
        <div>챗봇</div>
      </div>
      <div className="footerBtn-center" onClick={() => navigate("/home")}>
        <img src="assets/homeLogo.png" />
      </div>
      <div className="footerBtn" onClick={() => navigate("/shop")}>
        <img src="assets/shopLogo.png" />
        <div>천안도감</div>
      </div>
    </footer>
  );
}

export default Footer;
