export type ProgressVariant
  = | 'default'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'weather-safe'
    | 'weather-low'
    | 'weather-moderate'
    | 'weather-high'
    | 'weather-extreme'

export const PROGRESS_VARIANT_CLASSES = {
  container: {
    'default': 'bg-weather-cloudy-200',
    'success': 'bg-weather-clear-200',
    'warning': 'bg-weather-partlyCloudy-200',
    'danger': 'bg-weather-storm-200',
    'info': 'bg-weather-windy-200',

    'weather-safe': 'bg-weather-clear-200',
    'weather-low': 'bg-weather-partlyCloudy-200',
    'weather-moderate': 'bg-weather-cloudy-200',
    'weather-high': 'bg-weather-rainy-200',
    'weather-extreme': 'bg-weather-storm-200',
  },

  fill: {
    'default': 'bg-gradient-to-r from-weather-cloudy-300 to-weather-cloudy-500',
    'success': 'bg-gradient-to-r from-weather-clear-300 to-weather-clear-500',
    'warning':
      'bg-gradient-to-r from-weather-partlyCloudy-300 to-weather-partlyCloudy-500',
    'danger': 'bg-gradient-to-r from-weather-storm-300 to-weather-storm-500',
    'info': 'bg-gradient-to-r from-weather-windy-300 to-weather-windy-500',

    'weather-safe':
      'bg-gradient-to-r from-weather-clear-300 to-weather-clear-500',
    'weather-low':
      'bg-gradient-to-r from-weather-partlyCloudy-300 to-weather-partlyCloudy-500',
    'weather-moderate':
      'bg-gradient-to-r from-weather-cloudy-300 to-weather-cloudy-500',
    'weather-high':
      'bg-gradient-to-r from-weather-rainy-300 to-weather-rainy-500',
    'weather-extreme':
      'bg-gradient-to-r from-weather-storm-300 to-weather-storm-500',
  },
} as const
