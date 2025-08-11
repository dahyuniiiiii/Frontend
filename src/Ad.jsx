import "./Ad.css";
function Ad() {
  const ads = ["assets/ad1.svg", "assets/ad2.svg","assets/ad3.svg", "assets/ad4.svg", "assets/ad5.svg"];
  return (
    <div className="adWrapper">
      <div className="adImg">
        {ads.map((ad, index) => (
          <img key={index} src={ad} />
        ))}
      </div>
    </div>
  );
}

export default Ad;
