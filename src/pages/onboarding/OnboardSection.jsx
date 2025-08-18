import "./OnBoard.css";
import { useEffect, useRef } from "react";
function OnboardSection({
  bigText,
  smallText,
  imgSrc,
  buttonLabel,
  onButtonClick,
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("inview");
          io.unobserve(el);
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div>
      <section ref={sectionRef} className="ContentArea reveal">
        <p className="bigP reveal-item" style={{ "--d": 0 }}>
          {bigText}
        </p>
        <p className="smallP reveal-item" style={{ "--d": 1 }}>
          {smallText}
        </p>
        <img
          className="onboardImg reveal-item"
          style={{ "--d": 2 }}
          src={imgSrc}
          alt=""
        />
        {buttonLabel && (
          <button
            className="startBtn1 reveal-item"
            style={{ "--d": 3 }}
            type="button"
            onClick={onButtonClick}
          >
            {buttonLabel}
          </button>
        )}
      </section>
    </div>
  );
}

export default OnboardSection;
