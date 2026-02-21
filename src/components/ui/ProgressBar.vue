<template>
  <div class="w-full">
    <div v-if="label || showPercentage" class="flex justify-between items-center mb-1.5">
      <span v-if="label" class="text-sm text-slate-600 dark:text-gray-mist font-body">{{ label }}</span>
      <span v-if="showPercentage" class="text-xs font-bold text-cyan-600 dark:text-cyber-cyan">{{ porcentaje }}%</span>
    </div>

    <div
      class="w-full rounded-full overflow-hidden"
      :class="sizeClasses"
      :style="{ background: bgStyle, border: borderStyle }"
    >
      <div
        class="h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
        :style="{
          width: `${porcentaje}%`,
          background: gradiente
        }"
      >
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
  cyan: 'linear-gradient(90deg, #06B6D4, #7C3AED)',
  purple: 'linear-gradient(90deg, #8B5CF6, #6366F1)',
  green: 'linear-gradient(90deg, #10B981, #06B6D4)',
  magenta: 'linear-gradient(90deg, #FF00FF, #06B6D4)'
})[props.color])

const bgStyle = computed(() => {
  const isDark = document.documentElement.classList.contains('dark')
  return isDark ? 'rgba(10,14,39,0.8)' : '#E2E8F0'
})

const borderStyle = computed(() => {
  const isDark = document.documentElement.classList.contains('dark')
  return isDark ? '1px solid rgba(0,240,255,0.2)' : '1px solid rgba(6,182,212,0.2)'
})
</script>
