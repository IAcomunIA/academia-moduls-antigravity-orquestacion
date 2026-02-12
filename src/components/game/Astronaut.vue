<template>
  <!-- Astronauta SVG animado -->
  <div class="inline-block animate-float" :class="sizeClass">
    <svg
      viewBox="0 0 120 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="w-full h-full drop-shadow-lg"
      role="img"
      :aria-label="`Astronauta ${color}`"
    >
      <!-- Aura de fondo -->
      <circle cx="60" cy="80" r="50" :fill="auraColor" opacity="0.15" />

      <!-- Casco (cabeza) -->
      <ellipse cx="60" cy="48" rx="28" ry="30" fill="#1A1A3E" stroke="#94A3B8" stroke-width="2" />
      <!-- Visor del casco -->
      <ellipse cx="60" cy="50" rx="20" ry="18" :fill="visorGradient" opacity="0.9" />
      <!-- Reflejo del visor -->
      <ellipse cx="53" cy="44" rx="6" ry="8" fill="white" opacity="0.2" />

      <!-- Cuerpo (traje espacial) -->
      <rect x="35" y="72" width="50" height="45" rx="12" :fill="bodyColor" />
      <!-- Panel central del traje -->
      <rect x="48" y="80" width="24" height="16" rx="4" fill="#0A0E27" stroke="#94A3B8" stroke-width="1" />
      <!-- Luces del panel -->
      <circle cx="54" cy="86" r="2" :fill="accentColor" class="animate-glow-pulse" />
      <circle cx="60" cy="86" r="2" fill="#10B981" />
      <circle cx="66" cy="86" r="2" fill="#F59E0B" />

      <!-- Mochila propulsora -->
      <rect x="82" y="78" width="10" height="25" rx="4" fill="#1A1A3E" stroke="#94A3B8" stroke-width="1" />
      <!-- Propulsión -->
      <ellipse cx="87" cy="108" rx="4" ry="6" :fill="accentColor" opacity="0.6" class="animate-glow-pulse" />

      <!-- Brazos -->
      <rect x="20" y="80" width="18" height="8" rx="4" :fill="bodyColor" transform="rotate(-15 29 84)" />
      <rect x="82" y="80" width="18" height="8" rx="4" :fill="bodyColor" transform="rotate(15 91 84)" />

      <!-- Piernas -->
      <rect x="40" y="112" width="12" height="22" rx="5" :fill="bodyColor" />
      <rect x="68" y="112" width="12" height="22" rx="5" :fill="bodyColor" />
      <!-- Botas -->
      <rect x="38" y="130" width="16" height="10" rx="5" fill="#1A1A3E" stroke="#94A3B8" stroke-width="1" />
      <rect x="66" y="130" width="16" height="10" rx="5" fill="#1A1A3E" stroke="#94A3B8" stroke-width="1" />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  color: { type: String, default: 'cyan', validator: v => ['cyan', 'magenta', 'purple'].includes(v) },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg', 'xl'].includes(v) }
})

// Colores según tema seleccionado por usuario
const colorMap = {
  cyan: { body: '#0E4A5C', accent: '#00F0FF', visor: '#00F0FF', aura: '#00F0FF' },
  magenta: { body: '#5C0E4A', accent: '#FF00FF', visor: '#FF00FF', aura: '#FF00FF' },
  purple: { body: '#3B1A6C', accent: '#8B5CF6', visor: '#8B5CF6', aura: '#8B5CF6' }
}

const bodyColor = computed(() => colorMap[props.color].body)
const accentColor = computed(() => colorMap[props.color].accent)
const visorGradient = computed(() => colorMap[props.color].visor)
const auraColor = computed(() => colorMap[props.color].aura)

const sizeClass = computed(() => ({
  sm: 'w-16 h-20',
  md: 'w-24 h-32',
  lg: 'w-32 h-40',
  xl: 'w-48 h-60'
})[props.size])
</script>
