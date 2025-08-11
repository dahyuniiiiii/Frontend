import { useNavigate } from "react-router-dom";
import "./home.css";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="homeWrapper">
        <img className="aiImg" src="assets/ProjectLogo.svg" />
        <img
          className="roulImg"
          src="assets/mainRoul.svg"
          onClick={() => {
            navigate("/roulette");
          }}
        />
      </div>
    </div>
  );
}

export default Home;
