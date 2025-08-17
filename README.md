# 🌤️ Weather Dashboard

A modern, reactive weather dashboard built with Nuxt.js, featuring real-time weather data, beautiful UI components, and a clean architecture that separates domain logic from presentation concerns.

## 🚀 Features

- **Real-time Weather Data**: Fetches current weather conditions from WeatherAPI.com
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Clean Architecture**: Domain-driven design with clear separation of concerns
- **Type Safety**: Full TypeScript support with strict typing
- **Offline Development**: Stub data for development without API keys
- **Reactive Components**: Vue 3 composition API with reactive state management
- **Custom Theme**: Tailwind CSS with custom weather-themed design system

## 🏗️ Architecture

### Domain Layer (`shared/weather/`)
```
shared/weather/
├── types.ts              # Domain types and enums
├── index.ts              # Main domain constructors and exports
├── stub.ts               # Development stub data
└── constructors/         # Individual constructors
    ├── wind.ts           # Wind domain object creation
    ├── humidity.ts       # Humidity domain object creation
    ├── uv-index.ts       # UV index domain object creation
    └── visibility.ts     # Visibility domain object creation
```

### Framework Layer (`composables/`)
```
composables/
├── useWeather.ts         # Weather data management
├── useWeatherIcons.ts    # Icon logic for view components
└── useWeatherDisplay.ts  # Display options based on domain logic
```

### API Layer (`server/api/`)
```
server/api/forecast/
├── index.ts              # Main API endpoint
├── types.ts              # API response types
├── adapter.ts            # API to domain transformation
└── stub.ts               # Development stub data
```

### Component Layer (`app/components/`)
```
app/components/
├── CurrentConditions.vue # Main weather display
├── WindMetrics.vue       # Wind information card
├── HumidityMetrics.vue   # Humidity information card
├── UvIndexMetrics.vue    # UV index information card
└── VisibilityMetrics.vue # Visibility information card
```

## 🛠️ Setup

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd meteo-dashboard
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:
   ```env
   # Optional: WeatherAPI.com API key for production
   NUXT_WEATHER_API_KEY=your_api_key_here
   
   # Environment modes:
   # - offline: Uses stub data (no API key needed)
   # - development: Uses real API (API key required)
   # - production: Uses real API (API key required)
   NODE_ENV=offline
   ```

   **Note**: The app works without an API key in offline mode using stub data.

4. **Start Development Server**
   ```bash
   pnpm dev
   ```

   The app will be available at `http://localhost:3000`

## 🔧 Development

### Offline Development

The app includes stub data for development without requiring an API key:

- **Offline Mode**: Uses stub data when `NODE_ENV=offline`
- **Development Mode**: Uses real API when `NODE_ENV=development` and API key is provided
- **Production Mode**: Requires valid `NUXT_WEATHER_API_KEY` environment variable

### API Integration

To use real weather data:

1. **Get API Key**: Sign up at [WeatherAPI.com](https://www.weatherapi.com/)
2. **Set Environment Variable**: Add your API key to `.env`
3. **Restart Server**: The app will automatically switch to real API calls

### Architecture Principles

#### Domain-Driven Design
- **Domain Objects**: Pure business logic without UI concerns
- **Value Objects**: Immutable, validated data structures
- **Domain Services**: Business logic encapsulated in constructors

#### Clean Architecture
- **Domain Layer**: Core business logic, independent of frameworks
- **Framework Layer**: Vue composables for view concerns
- **Component Layer**: UI components using domain data and composables

#### Separation of Concerns
- **Domain Logic**: Weather calculations, validations, business rules
- **View Logic**: Icons, display options, UI state management
- **Data Layer**: API calls, data transformation, error handling

### Key Design Patterns

#### Constructor Pattern
```typescript
// Domain object creation with validation
export const createWind = ({ speed, direction, unit, intensity }: UnguardWind): Wind => {
  return {
    speed: guardWindSpeed(speed),
    direction,
    speedUnit: unit || 'km/h',
    intensity,
    compassAngle: getCompassAngle(direction)
  }
}
```

#### Adapter Pattern
```typescript
// Transform API response to domain objects
export const adaptForecastToCurrentCondition = (
  data: ForecastResponse | WeatherApiError
): UnguardCurrentCondition | null => {
  // Validation and transformation logic
}
```

#### Composable Pattern
```typescript
// Reusable view logic
export const useWeatherIcons = () => {
  const getWindIcon = (intensity: WindIntensity): string => {
    // Icon selection logic
  }
  return { getWindIcon }
}
```

## 📁 Project Structure

```
meteo-dashboard/
├── app/
│   ├── components/           # Vue components
│   ├── pages/               # Page components
│   └── app.vue              # Root component
├── assets/
│   └── css/                 # Global styles
├── composables/             # Vue composables
├── server/
│   └── api/                 # API endpoints
├── shared/
│   ├── utils/               # Utility functions
│   └── weather/             # Domain layer
├── public/                  # Static assets
├── nuxt.config.ts           # Nuxt configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🎨 Design System

### Weather Theme
The app uses a custom Tailwind theme with weather-inspired colors:

- **Clear**: Sunny yellows and oranges
- **Cloudy**: Soft blues and grays  
- **Stormy**: Dark blues and purples
- **Rainy**: Cool blues and greens

### Component Styling
- **Glass Morphism**: Backdrop blur effects
- **Gradient Backgrounds**: Dynamic color schemes
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: CSS transitions and transforms

## 🔍 Type Safety

### Domain Types
```typescript
export type Wind = {
  readonly speed: WindSpeed
  readonly direction: WindDirection
  readonly speedUnit: string
  readonly intensity: WindIntensity
  readonly compassAngle: number
}
```

### String Enums
```typescript
export enum WindIntensity {
  Light = 'Light',
  Moderate = 'Moderate', 
  Strong = 'Strong',
  Severe = 'Severe'
}
```

### Type Guards
```typescript
const guardWindSpeed = (value: number): WindSpeed => {
  if (value < 0 || isNaN(value)) {
    return WIND_SPEED_FALLBACK
  }
  return value
}
```

## 🚀 Deployment

### Build for Production
```bash
pnpm build
```

### Preview Production Build
```bash
pnpm preview
```

### Environment Variables for Production
```env
NUXT_WEATHER_API_KEY=your_production_api_key
NODE_ENV=production
```

## 📝 API Documentation

### WeatherAPI.com Integration
- **Endpoint**: `/api/forecast`
- **Method**: GET
- **Response**: `UnguardCurrentCondition | WeatherApiError`
- **Location**: London (configurable)
- **Forecast Days**: 7 days

### Error Handling
```typescript
type WeatherApiError = {
  error: {
    code: number
    message: string
  }
}
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) for weather data
- [Nuxt.js](https://nuxt.com/) for the framework
- [Vue.js](https://vuejs.org/) for the reactive UI
- [Tailwind CSS](https://tailwindcss.com/) for styling
