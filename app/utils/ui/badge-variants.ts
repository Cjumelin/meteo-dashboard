// Badge variant constants for consistent styling across the app

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "weather-safe"
  | "weather-low"
  | "weather-moderate"
  | "weather-high"
  | "weather-extreme";

export const BADGE_VARIANT_CLASSES = {
  // General purpose variants
  default: "bg-weather-cloudy-100 text-weather-cloudy-800",
  success: "bg-weather-clear-100 text-weather-clear-800",
  warning: "bg-weather-partlyCloudy-100 text-weather-partlyCloudy-800",
  danger: "bg-weather-storm-100 text-weather-storm-800",
  info: "bg-weather-windy-100 text-weather-windy-800",

  // Weather-specific variants - unified danger severity system
  "weather-safe": "bg-weather-clear-100 text-weather-clear-800",
  "weather-low": "bg-weather-partlyCloudy-100 text-weather-partlyCloudy-800",
  "weather-moderate": "bg-weather-cloudy-100 text-weather-cloudy-800",
  "weather-high": "bg-weather-rainy-100 text-weather-rainy-800",
  "weather-extreme": "bg-weather-storm-100 text-weather-storm-800",
} as const;
