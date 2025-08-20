<template>
  <Card
    variant="modal"
    class="w-full max-w-2xl mx-auto border-weather-cloudy-200 p-6 md:p-12"
  >
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-4 font-display flex items-center justify-center gap-6 text-weather-cloudy-800">
        <span class="text-5xl">🌤️</span>
        7-Day Weather Forecast
        <span class="text-4xl">📊</span>
      </h2>
      <p class="text-lg text-weather-cloudy-600 font-atmospheric">
        Interactive temperature and precipitation analysis
      </p>
    </div>

    <!-- Main Chart Area -->
    <div class="relative h-80 md:h-96 bg-gradient-to-b from-weather-cloudy-50 via-weather-partlyCloudy-50 to-weather-cloudy-100 rounded-[var(--radius-card)] p-4 md:p-8 overflow-hidden shadow-inner border border-weather-cloudy-200 mb-8">
      <!-- Y-axis Temperature Labels -->
      <div class="absolute left-2 top-0 h-full flex flex-col justify-between text-sm text-weather-cloudy-700 py-8 z-10">
        <span
          v-for="temp in yAxisLabels"
          :key="temp"
          class="text-xs font-medium font-mono bg-white/80 rounded px-2 py-1 shadow-sm"
        >
          {{ temp }}°C
        </span>
      </div>

      <!-- Chart Content Area -->
      <div class="ml-12 h-full relative">
        <!-- Grid Lines Background -->
        <div class="absolute inset-0 z-0">
          <div
            v-for="i in 5"
            :key="i"
            class="absolute w-full border-t border-weather-cloudy-300/40"
            :style="{ top: `${(i - 1) * 25}%` }"
          />
        </div>

        <!-- SVG Temperature Line Chart -->
        <svg
          class="absolute inset-0 w-full h-full z-20"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <!-- Temperature Gradient Definition -->
          <defs>
            <linearGradient
              id="tempGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                style="stop-color:#60a5fa;stop-opacity:1"
              />
              <stop
                offset="50%"
                style="stop-color:#3b82f6;stop-opacity:1"
              />
              <stop
                offset="100%"
                style="stop-color:#1d4ed8;stop-opacity:1"
              />
            </linearGradient>
            <linearGradient
              id="areaGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                style="stop-color:#3b82f6;stop-opacity:0.3"
              />
              <stop
                offset="100%"
                style="stop-color:#3b82f6;stop-opacity:0.1"
              />
            </linearGradient>
          </defs>

          <!-- Temperature Area Fill -->
          <polygon
            :points="temperatureAreaPoints"
            fill="url(#areaGradient)"
            class="opacity-60"
          />

          <!-- Temperature Line -->
          <polyline
            :points="temperatureLinePoints"
            fill="none"
            stroke="url(#tempGradient)"
            stroke-width="1"
            class="drop-shadow-sm"
          />

          <!-- Temperature Data Points -->
          <g>
            <circle
              v-for="(day, index) in weatherData"
              :key="`temp-${index}`"
              :cx="(index * 100) / (weatherData.length - 1)"
              :cy="getTemperatureY(day.temp)"
              r="2"
              fill="#3b82f6"
              class="drop-shadow-sm hover:scale-150 transition-transform duration-200 cursor-pointer"
            />
          </g>
        </svg>

        <!-- Precipitation Bars -->
        <div class="absolute z-20 bottom-0 w-full h-full flex items-end justify-between px-2">
          <div
            v-for="(day, index) in weatherData"
            :key="`precip-${index}`"
            class="flex flex-col items-center relative"
            :style="{ width: `${100 / weatherData.length}%` }"
          >
            <div
              class="bg-weather-rainy-400/70 rounded-t-lg w-4 transition-all duration-400 hover:bg-weather-rainy-500/80 hover:scale-110 shadow-sm cursor-pointer"
              :style="{
                height: `${getPrecipitationHeight(day.precipitation)}px`,
              }"
              :title="`${day.precipitation}mm precipitation`"
            />
            <span class="text-xs text-weather-cloudy-600 font-mono mt-1 bg-white/80 rounded px-1 py-0.5 shadow-sm">{{ day.precipitation }}mm</span>
          </div>
        </div>
      </div>

      <!-- X-axis Day Labels -->
      <div class="absolute bottom-0 left-12 right-0 flex justify-between text-xs text-weather-cloudy-700 font-medium py-2">
        <span
          v-for="(day, index) in weatherData"
          :key="`day-${index}`"
          class="text-center font-mono bg-white/80 rounded px-2 py-1 shadow-sm hover:bg-white transition-all duration-200"
        >
          {{ day.day }}
        </span>
      </div>
    </div>

    <!-- Chart Legend -->
    <div class="flex justify-center items-center gap-8 bg-weather-cloudy-50 rounded-[var(--radius-card)] p-6 mb-8">
      <div class="flex items-center gap-3">
        <div class="w-8 h-2 bg-gradient-to-r from-weather-partlyCloudy-400 to-weather-partlyCloudy-600 rounded-full shadow-sm" />
        <span class="text-sm text-weather-cloudy-700 font-medium font-weather">Temperature (°C)</span>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-6 h-6 bg-weather-rainy-400/70 rounded-lg shadow-sm" />
        <span class="text-sm text-weather-cloudy-700 font-medium font-weather">Precipitation (mm)</span>
      </div>
    </div>

    <div class="mt-16">
      <h3 class="text-2xl font-bold text-center mb-8 font-display flex items-center justify-center gap-4 text-weather-cloudy-800">
        <span class="text-3xl">🗓️</span>
        Weekly Outlook
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3 md:gap-4">
        <div
          v-for="(day, index) in weatherData"
          :key="`card-${index}`"
          :class="getWeatherCardClass(day.condition)"
          class="py-4 md:py-6 rounded-[var(--radius-card)] text-center shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-floating)] transition-all duration-300 ease-[var(--ease-weather)] hover:scale-105 border-2"
        >
          <div class="text-xs font-medium mb-3 font-atmospheric uppercase tracking-wide opacity-80">
            {{ day.day }}
          </div>
          <div class="text-2xl mb-3">
            {{ day.icon }}
          </div>
          <div class="text-lg font-bold mb-2 font-mono">
            {{ day.temp }}°C
          </div>
          <div class="text-xs font-medium mb-2 font-weather opacity-70">
            {{ day.precipitation }}mm
          </div>
          <div class="text-xs font-weather opacity-60">
            {{ day.condition }}
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
const weatherData = ref([
  { day: 'Mon', temp: 22, precipitation: 5, condition: 'Partly Cloudy', icon: '⛅' },
  { day: 'Tue', temp: 24, precipitation: 0, condition: 'Sunny', icon: '☀️' },
  { day: 'Wed', temp: 19, precipitation: 12, condition: 'Rainy', icon: '🌧️' },
  { day: 'Thu', temp: 21, precipitation: 3, condition: 'Cloudy', icon: '☁️' },
  { day: 'Fri', temp: 26, precipitation: 0, condition: 'Clear', icon: '☀️' },
  { day: 'Sat', temp: 23, precipitation: 8, condition: 'Showers', icon: '🌦️' },
  { day: 'Sun', temp: 25, precipitation: 2, condition: 'Partly Cloudy', icon: '⛅' },
])

const maxTemp = computed(() => Math.max(...weatherData.value.map(d => d.temp)))
const minTemp = computed(() => Math.min(...weatherData.value.map(d => d.temp)))
const tempRange = computed(() => maxTemp.value - minTemp.value || 1)

const maxPrecipitation = computed(() => Math.max(...weatherData.value.map(d => d.precipitation)))

const yAxisLabels = computed(() => {
  const range = tempRange.value
  const step = Math.ceil(range / 4) || 1
  return Array.from({ length: 5 }, (_, i) => maxTemp.value - (i * step))
})

const getTemperatureY = (temp: number) => {
  return 100 - ((temp - minTemp.value) / tempRange.value) * 100
}

// Helper function to get precipitation bar height
const getPrecipitationHeight = (precipitation: number) => {
  return Math.max((precipitation / maxPrecipitation.value) * 80, 2)
}

// Generate SVG points for temperature line
const temperatureLinePoints = computed(() => {
  return weatherData.value.map((day, index) => {
    const x = (index / (weatherData.value.length - 1)) * 100
    const y = getTemperatureY(day.temp)
    return `${x},${y}`
  }).join(' ')
})

// Generate SVG points for temperature area fill
const temperatureAreaPoints = computed(() => {
  const linePoints = weatherData.value.map((day, index) => {
    const x = (index / (weatherData.value.length - 1)) * 100
    const y = getTemperatureY(day.temp)
    return `${x},${y}`
  })

  // Add bottom corners to close the area
  const firstX = 0
  const lastX = 100
  const bottomY = 100

  return [
    `${firstX},${bottomY}`,
    ...linePoints,
    `${lastX},${bottomY}`,
  ].join(' ')
})

// Weather card styling based on condition using theme colors
const getWeatherCardClass = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
    case 'clear':
      return 'border-weather-clear-200 bg-gradient-to-br from-weather-clear-50 to-weather-clear-100 text-weather-clear-900 hover:from-weather-clear-100 hover:to-weather-clear-200'
    case 'partly cloudy':
      return 'border-weather-partlyCloudy-200 bg-gradient-to-br from-weather-partlyCloudy-50 to-weather-partlyCloudy-100 text-weather-partlyCloudy-900 hover:from-weather-partlyCloudy-100 hover:to-weather-partlyCloudy-200'
    case 'cloudy':
      return 'border-weather-cloudy-200 bg-gradient-to-br from-weather-cloudy-50 to-weather-cloudy-100 text-weather-cloudy-900 hover:from-weather-cloudy-100 hover:to-weather-cloudy-200'
    case 'rainy':
    case 'showers':
      return 'border-weather-rainy-300 bg-gradient-to-br from-weather-rainy-100 to-weather-rainy-50 text-weather-rainy-900 hover:from-weather-rainy-200 hover:to-weather-rainy-100'
    default:
      return 'border-weather-cloudy-200 bg-gradient-to-br from-weather-cloudy-50 to-weather-cloudy-100 text-weather-cloudy-700 hover:from-weather-cloudy-100 hover:to-weather-cloudy-200'
  }
}
</script>
