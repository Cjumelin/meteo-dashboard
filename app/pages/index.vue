<template>
  <div v-if="loading" class="flex justify-center items-center min-h-64 bg-gradient-to-br from-weather-clear-50 to-weather-clear-100 rounded-[var(--radius-card)] shadow-[var(--shadow-glass)] backdrop-blur-sm">
    <div class="text-center p-8">
      <div class="text-6xl mb-6 animate-pulse">🌤️</div>
      <div class="text-xl font-weather text-weather-cloudy-600">Loading weather data...</div>
      <div class="text-sm text-weather-cloudy-400 mt-2">Gathering atmospheric information</div>
    </div>
  </div>

  <div v-else-if="error" class="flex justify-center items-center min-h-64 bg-gradient-to-br from-weather-storm-50 to-weather-storm-100 rounded-[var(--radius-card)] shadow-[var(--shadow-glass)] backdrop-blur-sm">
    <div class="text-center p-8">
      <div class="text-6xl mb-6">⚠️</div>
      <div class="text-xl font-weather text-weather-storm-700 mb-3">Error loading weather data</div>
      <div class="text-sm text-weather-storm-500 mb-6 max-w-md">{{ error }}</div>
      <button 
        @click="retrieveCurrentCondition" 
        class="bg-weather-clear-500 hover:bg-weather-clear-600 text-white font-weather font-semibold py-3 px-6 rounded-[var(--radius-button)] shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease-weather)] hover:shadow-[var(--shadow-glow)]"
      >
        Retry
      </button>
    </div>
  </div>

  <div v-else-if="currentCondition">
    <div class="flex justify-between items-center mb-8 p-6 bg-gradient-to-r from-weather-clear-50 to-weather-partlyCloudy-50 rounded-[var(--radius-card)] shadow-[var(--shadow-glass)] backdrop-blur-sm">
      <h2 class="text-3xl font-display font-bold text-weather-cloudy-800">Weather Dashboard</h2>
      <button 
        @click="retrieveCurrentCondition" 
        :disabled="loading"
        class="flex items-center gap-3 bg-weather-clear-500 hover:bg-weather-clear-600 disabled:bg-weather-cloudy-400 text-white font-weather font-semibold py-3 px-6 rounded-[var(--radius-button)] shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease-weather)] hover:shadow-[var(--shadow-glow)] disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="animate-spin text-lg">🔄</span>
        <span v-else class="text-lg">🔄</span>
        <span>{{ loading ? 'Refreshing...' : 'Refresh' }}</span>
      </button>
    </div>

    <WeatherChart />
    
    <CurrentConditions 
      :current-condition="currentCondition"
    />
    
    <div class="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
      <WindMetrics 
        :wind="currentCondition.wind"
      />
      <HumidityMetrics 
        :humidity="currentCondition.humidity"
      />
      <VisibilityMetrics 
        :visibility="currentCondition.visibility"
      />
      <UvIndexMetrics 
        :uv-index="currentCondition.uvIndex"
      />
    </div>
  </div>

  <div v-else class="flex justify-center items-center min-h-64 bg-gradient-to-br from-weather-fog-50 to-weather-fog-100 rounded-[var(--radius-card)] shadow-[var(--shadow-glass)] backdrop-blur-sm">
    <div class="text-center p-8">
      <div class="text-6xl mb-6">🌤️</div>
      <div class="text-xl font-weather text-weather-fog-600 mb-3">No weather data available</div>
      <div class="text-sm text-weather-fog-400 mb-6">Ready to display atmospheric conditions</div>
      <button 
        @click="retrieveCurrentCondition" 
        class="bg-weather-clear-500 hover:bg-weather-clear-600 text-white font-weather font-semibold py-3 px-6 rounded-[var(--radius-button)] shadow-[var(--shadow-card)] transition-all duration-300 ease-[var(--ease-weather)] hover:shadow-[var(--shadow-glow)]"
      >
        Load Weather Data
      </button>
    </div>
  </div>
</template>


<script setup lang="ts">
const {
  currentCondition,
  error,
  loading,
  retrieveCurrentCondition
} = useWeather()

onMounted(async () => {
  await retrieveCurrentCondition()
})
</script>
