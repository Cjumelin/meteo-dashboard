# Development Guide

## Quick Start

### 1. Environment Setup

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

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Start Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Offline Development

The app automatically uses stub data in offline mode when no API key is provided:

- **Offline Mode**: Uses stub data from `shared/weather/stub.ts`
- **Development Mode**: Uses real API when API key is provided
- **Production Mode**: Requires valid `NUXT_WEATHER_API_KEY`

### Stub Data Features

The stub provides realistic weather data for development:

```typescript
export const stub: UnguardCurrentCondition = {
  temperature: {
    current: 22.4,
    feelsLike: 24,
    high: 26.2,
    low: 14.2
  },
  condition: {
    description: "Sunny",
    icon: "🌤️",
    type: WeatherCondition.Sunny
  },
  wind: {
    speed: 11.9,
    direction: WindDirection.E,
    unit: "km/h",
    intensity: WindIntensity.Light
  },
  humidity: {
    value: 43
  },
  uv: {
    index: 5.8
  },
  visibility: {
    distance: 10,
    unit: DistanceUnit.Kilometers,
    maxDistance: 15
  }
}
```

## API Integration

### Getting an API Key

1. Sign up at [WeatherAPI.com](https://www.weatherapi.com/)
2. Get your free API key (1000 requests/month)
3. Add the key to your `.env` file

### API Configuration

The API endpoint is configured in `server/api/forecast/index.ts`:

```typescript
const location = 'Limassol'  // Change this for different locations
const days = 7             // Number of forecast days
```

### API Response

The API returns `UnguardCurrentCondition` data that gets transformed into domain objects:

```typescript
type UnguardCurrentCondition = {
  temperature: UnguardTemperature
  condition: UnguardCondition
  wind: UnguardWind
  humidity: UnguardHumidity
  uv: UnguardUv
  visibility: UnguardVisibility
}
```

## Architecture Overview

### Domain Layer

The domain layer contains pure business logic:

```
shared/weather/
├── types.ts              # Domain types and enums
├── index.ts              # Main constructors and exports
├── stub.ts               # Development stub data
└── constructors/         # Individual constructors
    ├── wind.ts           # Wind domain object creation
    ├── humidity.ts       # Humidity domain object creation
    ├── uv-index.ts       # UV index domain object creation
    └── visibility.ts     # Visibility domain object creation
```

### Key Domain Types

```typescript
// Domain objects (pure business logic)
export type Wind = {
  readonly speed: WindSpeed
  readonly direction: WindDirection
  readonly speedUnit: string
  readonly intensity: WindIntensity
  readonly compassAngle: number
}

// String enums for better UX
export enum WindIntensity {
  Light = 'Light',
  Moderate = 'Moderate',
  Strong = 'Strong',
  Severe = 'Severe'
}
```

### Constructor Pattern

Domain objects are created using constructors with validation:

```typescript
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

### View Layer

Components use composables for view concerns:

```typescript
// In components
const { getWindIcon } = useWeatherIcons()
const { getWindDisplayOptions } = useWeatherDisplay()

const windIcon = computed(() => getWindIcon(props.wind.intensity))
const { showCompass } = getWindDisplayOptions(props.wind)
```

## Development Workflow

### 1. Adding New Weather Metrics

1. **Define Domain Type** in `shared/weather/types.ts`
2. **Create Constructor** in `shared/weather/constructors/`
3. **Add to Main Export** in `shared/weather/index.ts`
4. **Update Adapter** in `server/api/forecast/adapter.ts`
5. **Create Component** in `app/components/`
6. **Add to Main View** in `app/pages/index.vue`

### 2. Modifying Display Logic

1. **Update Composables** in `composables/`
2. **Test in Components** 
3. **Verify Domain Logic** remains unchanged

### 3. API Changes

1. **Update Types** in `server/api/forecast/types.ts`
2. **Modify Adapter** in `server/api/forecast/adapter.ts`
3. **Update Stub** in `server/api/forecast/stub.ts`
4. **Test Both Modes** (stub and real API)

## Testing

### Component Testing

```bash
pnpm test:components
```

### Unit Testing

```bash
pnpm test:unit
```

### Manual Testing

1. **Offline Mode**: Set `NODE_ENV=offline`, verify stub data displays
2. **API Mode**: Set `NODE_ENV=development` with API key, verify real data fetches
3. **Error Handling**: Test with invalid API key
4. **Responsive Design**: Test on different screen sizes

## Common Issues

### Type Errors

- Ensure domain types match between layers
- Check constructor return types
- Verify enum values are consistent

### API Errors

- Check API key validity
- Verify network connectivity
- Review API response format

### Stub Data Issues

- Ensure stub matches `UnguardCurrentCondition` type
- Check enum values are valid
- Verify all required properties are present

## Performance Considerations

### Domain Object Creation

- Constructors are lightweight and fast
- Validation happens once per object creation
- No unnecessary computations

### Component Reactivity

- Use `computed()` for derived values
- Avoid expensive operations in templates
- Leverage Vue's reactivity system

### API Calls

- Server-side rendering for initial data
- Client-side updates for real-time data
- Error boundaries for graceful failures

## Deployment

### Production Build

```bash
pnpm build
pnpm preview
```

### Environment Variables

```env
# Production
NUXT_WEATHER_API_KEY=your_production_api_key
NODE_ENV=production

# Development with API
NUXT_WEATHER_API_KEY=your_development_api_key
NODE_ENV=development

# Offline development (no API key needed)
NODE_ENV=offline
```

### Platform Deployment

The app can be deployed to:
- Vercel
- Netlify
- Railway
- Any Node.js hosting platform

## Contributing

### Code Style

- Use TypeScript strict mode
- Follow domain-driven design principles
- Keep components small and focused
- Write meaningful commit messages

### Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

### Development Guidelines

- **Domain Logic**: Keep pure and framework-independent
- **View Logic**: Use composables for reusability
- **Error Handling**: Graceful degradation
- **Performance**: Optimize for user experience
