import { Routes, Route } from "react-router-dom";
import "./App.css";
import OnBoard from "./pages/onboarding/OnBoard";
import AiChat from "./pages/aichat/AiChat";
import AiRecommend from "./pages/aichat/AiRecommend";
import Home from "./pages/Home/Home";
import Shop from "./pages/shop/Shop";
import Layout from "./Layout";
import Roulette from "./pages/Roulette/Roulette";
import RouletteRecommend from "./pages/Roulette/RouletteRecommend";
import AdPage from "./pages/Roulette/AdPage";
import StoreDetail from "./pages/Detail/StoreDetail";
import MapPage from "./pages/Detail/MapPage";

function App() {
  return (
    <Routes>
      <Route path="/rouletteAd" element={<AdPage />} />
      <Route element={<Layout />}>
        <Route path="/" element={<OnBoard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/roulette" element={<Roulette />} />
        <Route path="/rouletteRecommend" element={<RouletteRecommend />} />
        <Route path="/ai-chat" element={<AiChat />} />
        <Route path="/ai-recommend" element={<AiRecommend />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/store-detail" element={<StoreDetail />} />
        <Route path="/map" element={<MapPage />} />
      </Route>
    </Routes>
  );
}

export default App;
