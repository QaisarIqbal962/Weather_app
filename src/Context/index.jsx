import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [weather, setWeather] = useState({});
  const [place, setPlace] = useState("Islamabad"); // Default city
  const [thisLocation, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState([]);

  // ✅ Your WeatherAPI key
  const API_KEY = "daabb7aa511d464b8e672411253110";

  // ✅ Fetch current + 7-day forecast for Pakistan only
  const fetchWeather = async () => {
    if (!place) return;

    setLoading(true);
    try {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(
        place + ", Pakistan"
      )}&days=7&aqi=no&alerts=no`;

      const response = await axios.get(url);
      const data = response.data;

      // Normalize fields to match component expectations
      setWeather({
        temp: data.current?.temp_c,
        humidity: data.current?.humidity,
        heatindex: data.current?.feelslike_c,
        wspd: data.current?.wind_kph,
        conditions: data.current?.condition?.text,
        icon: data.current?.condition?.icon,
      });

      // Map forecast days to MiniCard-friendly shape
      const mapped = (data.forecast?.forecastday || []).map((day) => ({
        datetime: day.date,
        temp: day.day?.avgtemp_c,
        conditions: day.day?.condition?.text,
      }));
      setValues(mapped);

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
        values,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
