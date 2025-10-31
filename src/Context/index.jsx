import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [place, setPlace] = useState("Karachi"); // Default city
  const [thisLocation, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Your WeatherAPI key
  const API_KEY = "daabb7aa511d464b8e672411253110";

  // ✅ Fetch weather data for Pakistan only
  const fetchWeather = async () => {
    if (!place) return;

    setLoading(true);
    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(
        place + ", Pakistan"
      )}&aqi=no`;

      const response = await axios.get(url);
      const data = response.data;

      setWeather({
        temp: data.current.temp_c,
        feels_like: data.current.feelslike_c,
        humidity: data.current.humidity,
        pressure: data.current.pressure_mb,
        wind_speed: data.current.wind_kph,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
      });

      setLocation(
        `${data.location.name}, ${data.location.region}, ${data.location.country}`
      );
    } catch (e) {
      console.error(e);
      alert("City not found in Pakistan. Try another city name.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [place]);

  return (
    <StateContext.Provider
      value={{
        weather,
        setPlace,
        thisLocation,
        place,
        loading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
