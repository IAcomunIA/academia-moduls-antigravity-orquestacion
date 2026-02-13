<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-full bg-white/5 border border-white/10 text-gray-mist hover:text-cyber-cyan hover:bg-white/10 transition-all focus:outline-none"
    :title="isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
  >
    <!-- Sun Icon (Show in dark to toggle light) -->
    <svg 
      v-if="isDark" 
      xmlns="http://www.w3.org/2000/svg" 
      class="w-5 h-5 text-amber-400 shadow-glow-amber" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M6.343 6.343l.707-.707ZM12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
    <!-- Moon Icon (Show in light to toggle dark) -->
    <svg 
      v-else 
      xmlns="http://www.w3.org/2000/svg" 
      class="w-5 h-5 text-indigo-500" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(true)

const toggleTheme = () => {
  isDark.value = !isDark.value
  updateTheme()
}

const updateTheme = () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    document.body.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    document.body.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  
  if (savedTheme === 'light') {
    isDark.value = false
  } else {
    // Default strictly to dark
    isDark.value = true
  }
  
  updateTheme()
})
</script>
