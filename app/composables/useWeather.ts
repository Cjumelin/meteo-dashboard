import { inject } from "vue";
import { weatherKey } from "./weather-keys";
import type { WeatherApi } from "./useWeatherProvider";

export const useWeather = (): WeatherApi => {
  const weatherApi = inject<WeatherApi>(weatherKey);

  if (!weatherApi) {
    console.warn(
      "useWeather: No weather provider found. Creating temporary state. " +
        "Consider using useWeatherProvider() in a parent component for better performance."
    );

    const { useWeatherProvider } = require("./useWeatherProvider");
    return useWeatherProvider();
  }

  return weatherApi;
};
