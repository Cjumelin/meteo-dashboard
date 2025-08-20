import type { Temperature, Celsius, Fahrenheit } from './types'
import { TemperatureUnit } from './types'

const CELSIUS_FALLBACK: Celsius = { value: 0, unit: TemperatureUnit.CELSIUS } // 0°C
const FAHRENHEIT_FALLBACK: Fahrenheit = { value: 32, unit: TemperatureUnit.FAHRENHEIT } // 32°F (0°C equivalent)

export const createCelsius = (value: number): Celsius => {
  if (value < -273.15 || value > 100 || isNaN(value)) {
    return CELSIUS_FALLBACK
  }
  return { value, unit: TemperatureUnit.CELSIUS }
}

export const createFahrenheit = (value: number): Fahrenheit => {
  if (value < -459.67 || value > 212 || isNaN(value)) {
    return FAHRENHEIT_FALLBACK
  }
  return { value, unit: TemperatureUnit.FAHRENHEIT }
}

export const createTemperature = (value: number, unit: TemperatureUnit): Temperature => {
  return unit === TemperatureUnit.CELSIUS ? createCelsius(value) : createFahrenheit(value)
}

export const celsiusToFahrenheit = (celsius: Celsius): Fahrenheit => {
  const fahrenheitValue = (celsius.value * 9 / 5) + 32
  return createFahrenheit(fahrenheitValue)
}

export const fahrenheitToCelsius = (fahrenheit: Fahrenheit): Celsius => {
  const celsiusValue = (fahrenheit.value - 32) * 5 / 9
  return createCelsius(celsiusValue)
}
