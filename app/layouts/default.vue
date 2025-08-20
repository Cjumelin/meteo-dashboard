<template>
  <div class="min-h-screen bg-[var(--background-image-clear-sky)] relative overflow-hidden">
    <NuxtRouteAnnouncer />

    <div class="absolute inset-0 bg-[var(--background-image-atmospheric-depth)] opacity-30" />
    <div class="absolute top-10 left-1/4 text-6xl opacity-20">
      ☁️
    </div>
    <div class="absolute top-20 right-1/4 text-4xl opacity-15">
      ⛅
    </div>
    <div class="absolute top-32 left-1/3 text-3xl opacity-10">
      🌤️
    </div>

    <header class="relative z-10 bg-weather-cloudy-900/80 backdrop-blur-lg shadow-[var(--shadow-floating)] border-b border-weather-cloudy-700/30">
      <div class="max-w-xl mx-auto px-8 py-16">
        <h1 class="text-5xl font-bold text-white text-center flex items-center justify-center gap-6 font-display">
          <span class="text-6xl">🌤️</span>
          Weather Dashboard
          <span class="text-6xl">⛅</span>
        </h1>
        <p class="text-weather-cloudy-100 text-center mt-6 text-xl font-atmospheric">
          Experience weather like never before
        </p>
        <div class="text-center mt-8">
          <div class="inline-flex items-center gap-4 bg-weather-cloudy-800/70 backdrop-blur-sm rounded-full px-8 py-4 border border-weather-cloudy-600/50">
            <span class="text-2xl">
              📍
            </span>
            <span class="text-white font-medium font-weather">
              Limassol, CY
            </span>
            <span class="text-weather-cloudy-300">
              •
            </span>
            <span class="text-weather-cloudy-200 font-mono">
              12:47 PM
            </span>
          </div>
        </div>
      </div>
    </header>

    <main class="relative z-10 max-w-2xl mx-auto px-8 py-20">
      <slot />
    </main>

    <footer class="relative z-10 bg-weather-cloudy-900/90 backdrop-blur-lg border-t border-weather-cloudy-700/30 mt-32">
      <div class="max-w-xl mx-auto px-8 py-12 text-center">
        <div class="flex justify-center items-center gap-4 mb-6">
          <span>🌈</span>
          <p class="text-base font-atmospheric text-weather-cloudy-200">
            Powered by Advanced Weather Design System
          </p>
          <span>✨</span>
        </div>
        <p class="text-sm text-weather-cloudy-400 font-weather">
          &copy; 2024 Weather Dashboard • Built with Nuxt.js & Tailwind CSS
        </p>
      </div>
    </footer>
  </div>
</template>
