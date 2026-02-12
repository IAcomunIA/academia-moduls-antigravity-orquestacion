<template>
  <!-- Badge/etiqueta de estado con variantes de color -->
  <span
    :class="[
      'inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200',
      tamanoClases,
      varianteClases
    ]"
  >
    <span v-if="icono" class="flex-shrink-0">{{ icono }}</span>
    <slot />
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variante: {
    type: String,
    default: 'cyan',
    validator: (v) => ['cyan', 'purple', 'green', 'red', 'yellow', 'magenta'].includes(v)
  },
  tamano: {
    type: String,
    default: 'sm',
    validator: (v) => ['xs', 'sm', 'md'].includes(v)
  },
  icono: { type: String, default: '' }
})

// Tamaños
const tamanoClases = computed(() => {
  switch (props.tamano) {
    case 'xs': return 'text-[10px] px-2 py-0.5'
    case 'md': return 'text-sm px-4 py-1.5'
    default: return 'text-xs px-3 py-1'
  }
})

// Variantes de color
const varianteClases = computed(() => {
  const estilos = {
    cyan: 'bg-cyber-cyan/15 text-cyber-cyan border border-cyber-cyan/30',
    purple: 'bg-soft-purple/15 text-soft-purple border border-soft-purple/30',
    green: 'bg-success-green/15 text-success-green border border-success-green/30',
    red: 'bg-error-red/15 text-error-red border border-error-red/30',
    yellow: 'bg-warning-yellow/15 text-warning-yellow border border-warning-yellow/30',
    magenta: 'bg-neon-magenta/15 text-neon-magenta border border-neon-magenta/30'
  }
  return estilos[props.variante] || estilos.cyan
})
</script>
