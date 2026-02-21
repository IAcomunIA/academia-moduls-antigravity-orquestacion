<template>
  <div class="space-y-4">
    <div v-if="instruccion" class="p-4 bg-slate-100 dark:bg-dark-void rounded-xl border border-purple-200 dark:border-soft-purple/20">
      <h4 class="font-heading font-semibold text-sm text-cyan-600 dark:text-cyber-cyan mb-2">📋 Instrucciones</h4>
      <p class="text-slate-600 dark:text-gray-mist text-sm leading-relaxed">{{ instruccion }}</p>
    </div>

    <div class="relative">
      <textarea
        v-model="codigo"
        class="input-code w-full resize-none bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white border-slate-300 dark:border-white/10 focus:border-cyan-500 dark:focus:border-cyber-cyan"
        :class="estadoClase"
        :rows="rows"
        :placeholder="placeholder"
        spellcheck="false"
        @input="onInput"
      />

      <div class="absolute top-3 right-3 flex items-center gap-2">
        <span v-if="estado === 'correcto'" class="text-emerald-500 dark:text-success-green text-sm">✅ Correcto</span>
        <span v-else-if="estado === 'incompleto'" class="text-amber-500 dark:text-warning-yellow text-sm">⚠️ Incompleto</span>
        <span v-else-if="estado === 'error'" class="text-red-500 dark:text-error-red text-sm">❌ Error</span>
      </div>
    </div>

    <div
      v-if="feedback"
      class="p-3 rounded-lg text-sm"
      :class="{
        'bg-emerald-50 dark:bg-success-green/10 text-emerald-600 dark:text-success-green border border-emerald-200 dark:border-success-green/30': estado === 'correcto',
        'bg-amber-50 dark:bg-warning-yellow/10 text-amber-600 dark:text-warning-yellow border border-amber-200 dark:border-warning-yellow/30': estado === 'incompleto',
        'bg-red-50 dark:bg-error-red/10 text-red-600 dark:text-error-red border border-red-200 dark:border-error-red/30': estado === 'error'
      }"
    >
      {{ feedback }}
    </div>

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
  validador: { type: Function, default: null }
})

const emit = defineEmits(['validate', 'complete'])

const codigo = ref(props.plantilla)
const estado = ref('')
const feedback = ref('')

const estadoClase = computed(() => ({
  correcto: 'border-emerald-400 dark:border-success-green',
  incompleto: 'border-amber-400 dark:border-warning-yellow',
  error: 'border-red-400 dark:border-error-red'
})[estado.value] || '')

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

function onInput() {
  if (estado.value) {
    estado.value = ''
    feedback.value = ''
  }
}

function resetear() {
  codigo.value = props.plantilla
  estado.value = ''
  feedback.value = ''
}
</script>
