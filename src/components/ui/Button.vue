<template>
  <button
    :class="[
      'font-semibold transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses,
      sizeClasses
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <!-- Indicador de carga -->
    <span v-if="loading" class="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'primary', validator: v => ['primary', 'secondary', 'ghost', 'danger'].includes(v) },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v) },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false }
})

defineEmits(['click'])

// Clases según variante
const variantClasses = computed(() => ({
  primary: 'btn-primary text-white',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'bg-error-red/20 border-2 border-error-red text-error-red hover:bg-error-red/30 rounded-xl'
})[props.variant])

// Clases según tamaño
const sizeClasses = computed(() => ({
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-8 py-3 text-base rounded-xl',
  lg: 'px-10 py-4 text-lg rounded-xl'
})[props.size])
</script>
