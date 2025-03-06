import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    search: "",
    loading: false,
    temperature: null,
    humidity: null,
    windSpeed: null,
    cityName: "",
    weatherIcon: "01d",
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTemperature: (state, action) => {
      state.temperature = action.payload;
    },
    setHumidity: (state, action) => {
      state.humidity = action.payload;
    },
    setWindSpeed: (state, action) => {
      state.windSpeed = action.payload;
    },
    setCityName: (state, action) => {
      state.cityName = action.payload;
    },
    setWeatherIcon: (state, action) => {
      state.weatherIcon = action.payload;
    },
  },
});

export const {
  setSearch,
  setLoading,
  setTemperature,
  setHumidity,
  setWindSpeed,
  setCityName,
  setWeatherIcon,
} = appSlice.actions;

export default appSlice.reducer;
