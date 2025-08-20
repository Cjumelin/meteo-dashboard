export enum TemperatureUnit {
  CELSIUS = 'celsius',
  FAHRENHEIT = 'fahrenheit',
}

export type Celsius = {
  readonly value: number
  readonly unit: TemperatureUnit.CELSIUS
}

export type Fahrenheit = {
  readonly value: number
  readonly unit: TemperatureUnit.FAHRENHEIT
}

export type Temperature = Celsius | Fahrenheit
