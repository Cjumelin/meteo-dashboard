const badgeVariants = [
  'bg-weather-clear-100 text-weather-clear-800',
  'bg-weather-partlyCloudy-100 text-weather-partlyCloudy-800',
  'bg-weather-cloudy-100 text-weather-cloudy-800',
  'bg-weather-rainy-100 text-weather-rainy-800',
  'bg-weather-storm-100 text-weather-storm-800'
]

export const useBadgeVariant = () => {
  const getBadgeVariant = (index: number): string => {
    return badgeVariants[index] || 'bg-weather-cloudy-100 text-weather-cloudy-800'
  }

  return {
    getBadgeVariant
  }
}
