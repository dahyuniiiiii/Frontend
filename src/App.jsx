import { Routes, Route } from "react-router-dom";
import "./App.css";
import OnBoard from "./pages/onboarding/OnBoard";
import AiChat from "./pages/aichat/AiChat";
import Home from "./pages/Home/Home";
import Shop from "./pages/shop/Shop";
import Layout from "./Layout";
import Roulette from "./pages/Roulette/Roulette";
import RouletteRecommand from "./pages/Roulette/rouletteRecommand";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<OnBoard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/roulette" element={<Roulette />} />
         <Route path="/rouletteRecommand" element={<RouletteRecommand />} />
        <Route path="/ai-chat" element={<AiChat />} />
        <Route path="/shop" element={<Shop />} />
      </Route>
    </Routes>
  );
}

export default App;
