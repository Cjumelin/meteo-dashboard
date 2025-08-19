const progressVariants = [
  'bg-gradient-to-r from-weather-clear-300 to-weather-clear-500',
  'bg-gradient-to-r from-weather-partlyCloudy-300 to-weather-partlyCloudy-500',
  'bg-gradient-to-r from-weather-cloudy-300 to-weather-cloudy-500',
  'bg-gradient-to-r from-weather-rainy-300 to-weather-rainy-500',
  'bg-gradient-to-r from-weather-storm-300 to-weather-storm-500'
]

export const useProgressVariant = () => {
  const getProgressVariant = (index: number): string => {
    return progressVariants[index] || 'bg-gradient-to-r from-weather-cloudy-300 to-weather-cloudy-500'
  }

  return {
    getProgressVariant
  }
}
