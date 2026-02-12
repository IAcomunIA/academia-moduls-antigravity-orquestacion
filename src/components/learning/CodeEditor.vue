<template>
  <!-- Editor de código simple con validación en tiempo real -->
  <div class="space-y-4">
    <!-- Instrucciones del ejercicio -->
    <div v-if="instruccion" class="p-4 bg-dark-void rounded-xl border border-soft-purple/20">
      <h4 class="font-heading font-semibold text-sm text-cyber-cyan mb-2">📋 Instrucciones</h4>
      <p class="text-gray-mist text-sm leading-relaxed">{{ instruccion }}</p>
    </div>

    <!-- Área del editor -->
    <div class="relative">
      <textarea
        v-model="codigo"
        class="input-code w-full resize-none"
        :class="estadoClase"
        :rows="rows"
        :placeholder="placeholder"
        spellcheck="false"
        @input="onInput"
      />

      <!-- Indicador de estado -->
      <div class="absolute top-3 right-3 flex items-center gap-2">
        <span v-if="estado === 'correcto'" class="text-success-green text-sm">✅ Correcto</span>
        <span v-else-if="estado === 'incompleto'" class="text-warning-yellow text-sm">⚠️ Incompleto</span>
        <span v-else-if="estado === 'error'" class="text-error-red text-sm">❌ Error</span>
      </div>
    </div>

    <!-- Mensaje de feedback -->
    <div
      v-if="feedback"
      class="p-3 rounded-lg text-sm"
      :class="{
        'bg-success-green/10 text-success-green border border-success-green/30': estado === 'correcto',
        'bg-warning-yellow/10 text-warning-yellow border border-warning-yellow/30': estado === 'incompleto',
        'bg-error-red/10 text-error-red border border-error-red/30': estado === 'error'
      }"
    >
      {{ feedback }}
    </div>

    <!-- Acciones -->
    <div class="flex gap-3">
      <button class="btn-primary text-sm" @click="validar">
        Validar
      </button>
      <button class="btn-ghost text-sm" @click="resetear">
        ↻ Resetear
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  instruccion: { type: String, default: '' },
  plantilla: { type: String, default: '' },
  placeholder: { type: String, default: '// Escribe tu código aquí...' },
  rows: { type: Number, default: 10 },
  // Función de validación: recibe el código, devuelve { valido, feedback }
  validador: { type: Function, default: null }
})

const emit = defineEmits(['validate', 'complete'])

const codigo = ref(props.plantilla)
const estado = ref('') // '', 'correcto', 'incompleto', 'error'
const feedback = ref('')

// Clase CSS según estado de validación
const estadoClase = computed(() => ({
  correcto: 'input-success',
  incompleto: 'input-warning',
  error: 'input-error'
})[estado.value] || '')

// Validar el código
function validar() {
  if (!props.validador) {
    emit('validate', codigo.value)
    return
  }

  const resultado = props.validador(codigo.value)
  estado.value = resultado.valido ? 'correcto' : (resultado.incompleto ? 'incompleto' : 'error')
  feedback.value = resultado.feedback || ''

  if (resultado.valido) {
    emit('complete', codigo.value)
  }
}

// Input en tiempo real
function onInput() {
  // Limpiar estado al escribir
  if (estado.value) {
    estado.value = ''
    feedback.value = ''
  }
}

// Resetear al template original
function resetear() {
  codigo.value = props.plantilla
  estado.value = ''
  feedback.value = ''
}
</script>
