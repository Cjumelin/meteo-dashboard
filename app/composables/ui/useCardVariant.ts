import { WEATHER_CARD_VARIANTS, type WeatherCardVariant } from '~/utils/ui/card-variants'

export const useCardVariant = () => {
  const getCardVariant = (index: number): WeatherCardVariant => {
    return WEATHER_CARD_VARIANTS[index] || 'weather-moderate'
  }

  return {
    getCardVariant
  }
}
