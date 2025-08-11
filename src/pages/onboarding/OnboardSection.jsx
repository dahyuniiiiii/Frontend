import "./OnBoard.css";
function OnboardSection({
  bigText,
  smallText,
  imgSrc,
  buttonLabel,
  onButtonClick,
}) {
  return (
    <div>
      <section className="ContentArea">
        <p className="bigP">{bigText}</p>
        <p className="smallP">{smallText}</p>
        <img src={imgSrc} alt="" />
        {buttonLabel && (
          <button className="startBtn1" type="button" onClick={onButtonClick}>
            {buttonLabel}
          </button>
        )}
      </section>
    </div>
  );
}

export default OnboardSection;
