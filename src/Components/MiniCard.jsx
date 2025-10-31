
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import sun from "../assets/icons/sun.png";
import cloud from "../assets/icons/cloud.png";
import fog from "../assets/icons/fog.png";
import rain from "../assets/icons/rain.png";
import snow from "../assets/icons/snow.png";
import storm from "../assets/icons/storm.png";
import wind from "../assets/icons/windy.png";

const MiniCard = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState();

  useEffect(() => {
    if (!iconString) return;

    const desc = iconString.toLowerCase();

    if (desc.includes("cloud") || desc.includes("overcast")) {
      setIcon(cloud);
    } else if (
      desc.includes("rain") ||
      desc.includes("drizzle") ||
      desc.includes("shower")
    ) {
      setIcon(rain);
    } else if (desc.includes("clear") || desc.includes("sunny")) {
      setIcon(sun);
    } else if (
      desc.includes("thunder") ||
      desc.includes("storm") ||
      desc.includes("lightning")
    ) {
      setIcon(storm);
    } else if (
      desc.includes("fog") ||
      desc.includes("mist") ||
      desc.includes("haze")
    ) {
      setIcon(fog);
    } else if (desc.includes("snow") || desc.includes("sleet")) {
      setIcon(snow);
    } else if (
      desc.includes("wind") ||
      desc.includes("breeze") ||
      desc.includes("gust")
    ) {
      setIcon(wind);
    } else {
      // fallback if nothing matches
      setIcon(cloud);
    }
  }, [iconString]);

  return (
    <div className="glassCard w-[10rem] h-[10rem] p-4 flex flex-col">
      <p className="text-center">
        {new Date(time).toLocaleDateString("en", { weekday: "long" })}
      </p>
      <hr />
      <div className="w-full flex justify-center items-center flex-1">
        <img
          src={icon}
          alt="forecast not available"
          className="w-[4rem] h-[4rem]"
        />
      </div>
      <p className="text-center font-bold">{temp}&deg;C</p>
    </div>
  );
};

export default MiniCard;
