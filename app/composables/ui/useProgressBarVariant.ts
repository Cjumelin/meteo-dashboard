import { type ProgressVariant } from "~/utils/ui/progress-variants";

export const useProgressBarVariant = () => {
  const getProgressBarVariant = (index: number): ProgressVariant => {
    const variants: ProgressVariant[] = [
      "weather-safe",
      "weather-low",
      "weather-moderate",
      "weather-high",
      "weather-extreme",
    ];
    const variant = variants[index] || "weather-moderate";
    return variant;
  };

  return {
    getProgressBarVariant,
  };
};
