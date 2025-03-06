import { FaSearch } from "react-icons/fa";
import { WiStrongWind, WiHumidity } from "react-icons/wi";
import { useDispatch, useSelector } from "react-redux";
import {
  setCityName,
  setHumidity,
  setLoading,
  setSearch,
  setTemperature,
  setWeatherIcon,
  setWindSpeed,
} from "./redux/appSlice";
import axios from "axios";
import { WEATHER_API_KEY } from "./constant";

function App() {
  const dispatch = useDispatch();
  const {
    search,
    weatherIcon,
    loading,
    temperature,
    cityName,
    humidity,
    windSpeed,
  } = useSelector((store) => store.app);

  const handleonSearch = (e) => {
    dispatch(setSearch(e.target.value));
    // console.log(e.target.value);
  };

  const fetchWeather = async () => {
    if (!search) return;
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${WEATHER_API_KEY}`
      );
      if (res.data.cod === 200) {
        dispatch(setTemperature(res?.data?.main?.temp));
        dispatch(setHumidity(res?.data?.main?.humidity));
        dispatch(setWindSpeed(res?.data?.wind?.speed));
        dispatch(setCityName(res?.data?.name));
        dispatch(setWeatherIcon(res?.data?.weather[0]?.icon));
      }
    } catch (error) {
      console.log("Failed to fetch weather ", error);
      dispatch(setCityName("City not found"));
      dispatch(setWeatherIcon("01d"));
      dispatch(setWindSpeed(null));
      dispatch(setTemperature(null));
      dispatch(setHumidity(null));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center h-screen bg-gradient-to-br
       from-green-950 to-black text-white"
      >
        <div className="flex items-center bg-white p-3 py-2 px-4 rounded-full shadow-lg w-80 mb-6">
          <input
            type="text"
            value={search}
            placeholder="Saerch"
            onChange={handleonSearch}
            className="flex-1 text-black outline-none px-2"
          />
          <button className="p-2 py-2 px-2 bg-gray-100 rounded-full hover:bg-gray-200 ">
            <FaSearch
              onClick={fetchWeather}
              size={15}
              className="text-gray-500 cursor-pointer"
            />
          </button>
        </div>
        <div>
          <img
            src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt="logo"
            className="w-20 h-20 mb-4"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {loading
              ? "loading..."
              : temperature !== null
              ? `${temperature}°C`
              : "-"}
          </h1>
          <p className="text-2xl text-center font-medium mb-2">
            {cityName || "-"}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between w-[30%] mt-4">
          <div className="mb-4 bg-slate-500 p-2 py-4 px-10 rounded-2xl">
            <WiHumidity className="text-4xl mb-1" />
            <span className="text-lg text-center pl-2 font-medium">
              {humidity !== null ? `${humidity}%` : "-"}
            </span>
            <p className="text-sm">Humidity</p>
          </div>
          <div className="bg-slate-500 p-2 py-4 px-10 rounded-2xl">
            <WiStrongWind className="text-4xl mb-1 ml-4 text-center" />
            <span className="text-lg mb-1  font-medium">
              {windSpeed !== null ? `${windSpeed}km/h` : "-"}
            </span>
            <p className="text-sm text-center">Wind</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
