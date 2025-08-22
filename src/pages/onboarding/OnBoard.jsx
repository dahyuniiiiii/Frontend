import { useNavigate } from "react-router-dom";
import "./OnBoard.css";
import OnboardSection from "./OnboardSection";
function OnBoard() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  };
  return (
    <div>
      <section className="IntroArea">
        <img src="/assets/longLogo.png"></img>
        <p>
          |<br />
          scroll
          <br />↓
        </p>
      </section>
      <OnboardSection
        bigText={
          <>
            오늘 뭐 먹지? <br />더 이상 고민 마세요!
          </>
        }
        smallText={
          <>
            룰렛 & AI 챗봇이 당신의 입맛을 딱! 맞춰드립니다.
            <br /> 빠르게, 재밌게, 당신만의 메뉴를 찾아보세요!
          </>
        }
        imgSrc="/assets/start1.svg"
      />

      <OnboardSection
        bigText="천안 도감 오픈!"
        smallText={
          <>
            한식부터 양식, 중식, 일식, 카페까지!
            <br /> 천안 맛집의 모든 것, 한눈에 쏙
          </>
        }
        imgSrc="/assets/start2.svg"
      />

      <OnboardSection
        bigText="천안 맛집 지도 속으로 출발!"
        smallText="룰렛과 AI가 추천하는 맞춤 한 끼, 바로 만나보세요."
        imgSrc="/assets/start3.svg"
        buttonLabel="한 끼 정하러 출발!"
        onButtonClick={goHome}
      />
    </div>
  );
}

export default OnBoard;
