import { useState } from "react";
import "./OrderAnimation.css"; // Import your CSS
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const OrderAnimation = () => {
  const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 10000); // Reset animation after 10 seconds
  };

  return (
    <button
      className={`order ${isAnimating ? "animate" : ""}`}
      onClick={handleClick}
       style={{ borderRadius: "10px" }}
    >
      <span className="default">
        <Typography sx={{ fontSize: "20px" }} variant="body2">
          {t("requestNow")}
        </Typography>
      </span>
      <span className="success">
        <Typography sx={{ fontSize: "18px" }} variant="body2">
          {t("fiberOnTheWay")}
          <svg className="scaled-icon" viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1" />
          </svg>
        </Typography>
      </span>
      <div className="box" />
      <div className="truck">
        <div className="back" />
        <div className="front">
          <div className="window" />
        </div>
        <div className="light top" />
        <div className="light bottom" />
      </div>
      <div className="lines" />
    </button>
  );
};

export default OrderAnimation;
