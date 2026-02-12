<template>
  <!-- Componente de validación de ejercicios con feedback visual -->
  <div class="space-y-3">
    <!-- Botón de validar -->
    <button
      :disabled="validando || deshabilitado"
      class="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      @click="validar"
    >
      <span v-if="validando" class="animate-spin">⏳</span>
      <span v-else>🔍</span>
      {{ validando ? 'Validando...' : textoBoton }}
    </button>

    <!-- Resultado de validación -->
    <div
      v-if="resultado"
      :class="[
        'rounded-xl p-4 border transition-all duration-300 animate-slide-up',
        resultado.exito
          ? 'bg-success-green/10 border-success-green/30'
          : 'bg-error-red/10 border-error-red/30'
      ]"
    >
      <div class="flex items-start gap-3">
        <span class="text-xl flex-shrink-0">
          {{ resultado.exito ? '✅' : '❌' }}
        </span>
        <div class="space-y-1">
          <p
            :class="[
              'font-semibold text-sm',
              resultado.exito ? 'text-success-green' : 'text-error-red'
            ]"
          >
            {{ resultado.titulo }}
          </p>
          <p class="text-gray-mist text-xs">
            {{ resultado.mensaje }}
          </p>
          <!-- Lista de errores específicos -->
          <ul
            v-if="resultado.errores && resultado.errores.length"
            class="mt-2 space-y-1"
          >
            <li
              v-for="(error, idx) in resultado.errores"
              :key="idx"
              class="text-xs text-error-red/80 flex items-start gap-1.5"
            >
              <span class="mt-0.5">•</span>
              <span>{{ error }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  // Contenido a validar
  contenido: { type: String, default: '' },
  // Reglas de validación
  reglas: {
    type: Object,
    default: () => ({
      camposRequeridos: [],
      longitudMinima: 0,
      palabrasProhibidas: [],
      hints: []
    })
  },
  textoBoton: { type: String, default: 'Validar Solución' },
  deshabilitado: { type: Boolean, default: false }
})

const emit = defineEmits(['validado', 'exito', 'fallo'])

const validando = ref(false)
const resultado = ref(null)

// Ejecutar validaciones
async function validar() {
  validando.value = true
  resultado.value = null

  // Simular delay de procesamiento
  await new Promise(r => setTimeout(r, 800))

  const errores = []
  const texto = props.contenido.trim()

  // Validar longitud mínima
  if (props.reglas.longitudMinima && texto.length < props.reglas.longitudMinima) {
    errores.push(`El texto debe tener al menos ${props.reglas.longitudMinima} caracteres (actual: ${texto.length})`)
  }

  // Validar campos requeridos
  if (props.reglas.camposRequeridos) {
    for (const campo of props.reglas.camposRequeridos) {
      if (!texto.includes(campo)) {
        errores.push(`Falta la sección: "${campo}"`)
      }
    }
  }

  // Validar palabras prohibidas (ej: [???] sin rellenar)
  if (props.reglas.palabrasProhibidas) {
    for (const palabra of props.reglas.palabrasProhibidas) {
      if (texto.includes(palabra)) {
        errores.push(`Aún tienes campos sin completar: "${palabra}"`)
      }
    }
  }

  const exito = errores.length === 0

  resultado.value = {
    exito,
    titulo: exito ? '¡Solución Correcta!' : 'Necesita Ajustes',
    mensaje: exito
      ? '¡Excelente trabajo! Tu solución cumple todos los criterios.'
      : `Se encontraron ${errores.length} problema(s). Revisa y vuelve a intentar.`,
    errores: exito ? [] : errores
  }

  validando.value = false
  emit('validado', resultado.value)

  if (exito) {
    emit('exito')
  } else {
    emit('fallo', errores)
  }
}
</script>
