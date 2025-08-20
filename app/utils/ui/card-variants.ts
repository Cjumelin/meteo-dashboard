export type WeatherCardVariant
  = | 'weather-safe'
    | 'weather-low'
    | 'weather-moderate'
    | 'weather-high'
    | 'weather-extreme'

export const WEATHER_CARD_VARIANTS: WeatherCardVariant[] = [
  'weather-safe',
  'weather-low',
  'weather-moderate',
  'weather-high',
  'weather-extreme',
]

export const CARD_VARIANT_CLASSES = {
  'default': 'border-weather-cloudy-200',
  'compact': 'border-weather-cloudy-200',
  'large': 'border-weather-cloudy-200',
  'modal':
    'border-weather-cloudy-200 bg-white/95 backdrop-blur-lg shadow-[var(--shadow-floating)] rounded-[var(--radius-modal)]',

  // Weather-specific variants - unified danger severity system
  'weather-safe': 'border-weather-clear-200 bg-weather-clear-50/30',
  'weather-low':
    'border-weather-partlyCloudy-200 bg-weather-partlyCloudy-50/30',
  'weather-moderate': 'border-weather-cloudy-200 bg-weather-cloudy-50/30',
  'weather-high': 'border-weather-rainy-200 bg-weather-rainy-50/30',
  'weather-extreme': 'border-weather-storm-200 bg-weather-storm-50/30',
} as const

export type CardVariant = keyof typeof CARD_VARIANT_CLASSES
