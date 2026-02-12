<template>
  <!-- Input personalizado con estilos de la marca -->
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-mist mb-1.5"
    >
      {{ label }}
    </label>
    <div class="relative">
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full rounded-lg px-4 py-3 font-body text-sm transition-all duration-300',
          'bg-dark-void/80 border-2 text-white placeholder-gray-dim',
          'focus:outline-none',
          estadoClases
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <!-- Icono de estado -->
      <span
        v-if="estado === 'success'"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-success-green"
      >
        ✓
      </span>
      <span
        v-else-if="estado === 'error'"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-error-red"
      >
        ✕
      </span>
    </div>
    <p
      v-if="mensaje"
      :class="[
        'mt-1 text-xs',
        estado === 'error' ? 'text-error-red' : 'text-gray-mist'
      ]"
    >
      {{ mensaje }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  type: { type: String, default: 'text' },
  disabled: { type: Boolean, default: false },
  estado: { type: String, default: '', validator: (v) => ['', 'success', 'error', 'warning'].includes(v) },
  mensaje: { type: String, default: '' },
  inputId: { type: String, default: () => `input-${Math.random().toString(36).slice(2, 8)}` }
})

defineEmits(['update:modelValue', 'focus', 'blur'])

// Clases dinámicas según el estado
const estadoClases = computed(() => {
  if (props.disabled) return 'border-gray-dim/30 opacity-50 cursor-not-allowed'
  switch (props.estado) {
    case 'success': return 'border-success-green shadow-[0_0_15px_rgba(16,185,129,0.3)]'
    case 'error': return 'border-error-red shadow-[0_0_15px_rgba(239,68,68,0.3)]'
    case 'warning': return 'border-warning-yellow shadow-[0_0_15px_rgba(245,158,11,0.3)]'
    default: return 'border-cyber-cyan/30 focus:border-cyber-cyan focus:shadow-glow-cyan'
  }
})
</script>
