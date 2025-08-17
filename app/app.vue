<template>
  <div class="weather-app">
    <NuxtRouteAnnouncer />
    
    <div class="weather-atmospheric-bg"></div>
    <div class="weather-cloud weather-cloud-1">☁️</div>
    <div class="weather-cloud-delay-500 weather-cloud-2">⛅</div>
    <div class="weather-cloud-delay-1000 weather-cloud-3">🌤️</div>
    
    <header class="weather-header">
      <div class="weather-header-container">
        <h1 class="weather-title">
          <span class="text-6xl">🌤️</span>
          Weather Dashboard
          <span class="text-6xl">⛅</span>
        </h1>
        <p class="weather-subtitle">
          Experience weather like never before
        </p>
        <div class="text-center mt-8">
          <div class="weather-location-badge">
            <span class="text-2xl">
              📍
            </span>
            <span class="text-white font-medium font-weather">
              San Francisco, CA
            </span>
            <span class="text-gray-300">
              •
            </span>
            <span class="text-gray-200 font-mono">
              12:47 PM
            </span>
          </div>
        </div>
      </div>
    </header>

    <main class="weather-main">
      <NuxtPage />
    </main>

    <footer class="weather-footer">
      <div class="weather-footer-container">
        <div class="weather-footer-brand">
          <span>🌈</span>
          <p class="weather-footer-brand-text">
            Powered by Advanced Weather Design System
          </p>
          <span>✨</span>
        </div>
        <p class="weather-footer-copyright">
          &copy; 2024 Weather Dashboard • Built with Nuxt.js & Tailwind CSS
        </p>
      </div>
    </footer>
  </div>
</template>

<style>
@import "../assets/css/theme.css";

/* Design System Component Classes */

/* Layout Components */
.weather-app {
  @apply min-h-screen bg-clear-sky relative overflow-hidden;
}

.weather-header {
  @apply relative z-10 bg-gray-900/80 backdrop-blur-lg shadow-xl border-b border-gray-700/30;
}

.weather-header-container {
  @apply max-w-xl mx-auto px-8 py-16;
}

.weather-main {
  @apply relative z-10 max-w-2xl mx-auto px-8 py-20;
}

.weather-footer {
  @apply relative z-10 bg-gray-900/90 backdrop-blur-lg border-t border-gray-700/30 mt-32;
}

.weather-footer-container {
  @apply max-w-xl mx-auto px-8 py-12 text-center;
}

/* Typography Components */
.weather-title {
  @apply text-5xl font-bold text-white text-center flex items-center justify-center gap-6 font-display;
}

.weather-subtitle {
  @apply text-gray-100 text-center mt-6 text-xl font-atmospheric;
}

.weather-location-badge {
  @apply inline-flex items-center gap-4 bg-gray-800/70 backdrop-blur-sm rounded-full px-8 py-4 border border-gray-600/50;
}

/* Removed card components - now handled by domain-specific components */

.weather-atmospheric-bg {
  @apply absolute inset-0 bg-atmospheric-depth opacity-30;
}

.weather-cloud {
  @apply absolute opacity-20;
}

.weather-cloud-delay-500 {
  @apply absolute opacity-15;
}

.weather-cloud-delay-1000 {
  @apply absolute opacity-10;
}

/* Positioning Classes */
.weather-cloud-1 { @apply top-10 left-1/4 text-6xl; }
.weather-cloud-2 { @apply top-20 right-1/4 text-4xl; }
.weather-cloud-3 { @apply top-32 left-1/3 text-3xl; }

/* Removed spotlight section - now handled by CurrentConditions component */

.weather-footer-brand {
  @apply flex justify-center items-center gap-4 mb-6;
}

.weather-footer-brand-text {
  @apply text-base font-atmospheric text-gray-200;
}

.weather-footer-copyright {
  @apply text-sm text-gray-400 font-weather;
}
</style>
