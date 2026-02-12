<template>
  <!-- Barra de progreso con gradiente cyan→púrpura -->
  <div class="w-full">
    <!-- Etiqueta opcional -->
    <div v-if="label || showPercentage" class="flex justify-between items-center mb-1.5">
      <span v-if="label" class="text-sm text-gray-mist font-body">{{ label }}</span>
      <span v-if="showPercentage" class="text-xs font-bold text-cyber-cyan">{{ porcentaje }}%</span>
    </div>

    <!-- Contenedor de la barra -->
    <div
      class="w-full rounded-full overflow-hidden"
      :class="sizeClasses"
      :style="{ background: 'rgba(10,14,39,0.8)', border: '1px solid rgba(0,240,255,0.2)' }"
    >
      <!-- Barra de relleno -->
      <div
        class="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
        :style="{
          width: `${porcentaje}%`,
          background: gradiente
        }"
      >
        <!-- Efecto de brillo animado -->
        <div
          v-if="porcentaje > 0 && animated"
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  label: { type: String, default: '' },
  showPercentage: { type: Boolean, default: false },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  color: { type: String, default: 'cyan', validator: v => ['cyan', 'purple', 'green', 'magenta'].includes(v) },
  animated: { type: Boolean, default: true }
})

const porcentaje = computed(() => Math.min(100, Math.round((props.value / props.max) * 100)))

const sizeClasses = computed(() => ({
  sm: 'h-1.5',
  md: 'h-3',
  lg: 'h-5'
})[props.size])

const gradiente = computed(() => ({
  cyan: 'linear-gradient(90deg, #00F0FF, #6B46C1)',
  purple: 'linear-gradient(90deg, #8B5CF6, #6366F1)',
  green: 'linear-gradient(90deg, #10B981, #00F0FF)',
  magenta: 'linear-gradient(90deg, #FF00FF, #00F0FF)'
})[props.color])
</script>
