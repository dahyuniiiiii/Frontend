import "./Ad.css";

function Ad() {
  const ads = [
    "assets/ad1.svg",
    "assets/ad2.svg",
    "assets/ad3.svg",
    "assets/ad4.svg",
    "assets/ad5.svg",
  ];
  const loop = [...ads, ...ads]; 

  return (
    <div className="adWrapper">
      <div className="adImg">
        {loop.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            draggable="false"
          />
        ))}
      </div>
    </div>
  );
}

export default Ad;
