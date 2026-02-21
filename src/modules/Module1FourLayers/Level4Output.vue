<template>
  <div class="min-h-screen px-4 py-8 md:py-12 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-dark-bg dark:to-deep-space transition-colors duration-500">
    <div class="max-w-4xl mx-auto">

      <section v-if="fase === 'intro'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <TheCommunicator :dialogo="dialogoActual" />

          <Button @click="siguienteDialogo">
            {{ currentDialogueIdx < contenido.intro_dialogue.length - 1 ? 'Siguiente →' : 'Comenzar la Lección →' }}
          </Button>
        </div>
      </section>

      <section v-else-if="fase === 'teoria'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">📡</span>
          <div>
            <h1 class="font-heading font-bold text-xl text-cyan-600 dark:text-cyber-cyan">Nivel 4: Output</h1>
            <p class="text-xs text-slate-500 dark:text-gray-mist">La Presentación Perfecta</p>
          </div>
        </div>
        <TheoryPanel :tabs="tabsTeoria" @complete="fase = 'ejercicio'" />
      </section>

      <section v-else-if="fase === 'ejercicio'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">🎮</span>
          <div>
            <h2 class="font-heading font-bold text-xl text-cyan-600 dark:text-cyber-cyan">Ejercicio: Mejora el Output</h2>
            <p class="text-xs text-slate-500 dark:text-gray-mist">Identifica cuál es el mejor formato de presentación</p>
          </div>
        </div>

        <div class="card-level max-w-2xl mx-auto">
          <p class="text-sm text-slate-600 dark:text-gray-mist mb-4">
            Un agente analizó las ventas de una tienda y produjo estos datos:
          </p>

          <div class="input-code text-xs mb-6 bg-slate-800 dark:bg-slate-900 text-slate-200">
            {{ datosJSON }}
          </div>

          <p class="text-sm text-slate-800 dark:text-white font-medium mb-4">¿Cuál es la mejor forma de presentar esto al usuario?</p>

          <div class="space-y-3">
            <button
              v-for="(opcion, idx) in outputOpciones"
              :key="idx"
              class="w-full text-left p-4 rounded-xl border transition-all duration-200"
              :class="seleccion === idx
                ? (idx === 1 ? 'border-emerald-400 dark:border-success-green bg-emerald-50 dark:bg-success-green/10' : 'border-red-400 dark:border-error-red bg-red-50 dark:bg-error-red/10')
                : 'border-slate-200 dark:border-gray-dim/30 hover:border-slate-400 dark:hover:border-gray-mist'"
              @click="seleccionarOutput(idx)"
            >
              <p class="text-sm font-medium mb-1" :class="seleccion === idx && idx !== 1 ? 'text-red-600 dark:text-error-red' : 'text-slate-800 dark:text-white'">
                {{ opcion.titulo }}
              </p>
              <p class="text-xs text-slate-500 dark:text-gray-mist whitespace-pre-line">{{ opcion.ejemplo }}</p>
            </button>
          </div>

          <div v-if="seleccion === 1" class="mt-6 text-center space-y-3">
            <p class="text-emerald-600 dark:text-success-green font-semibold">✅ ¡Correcto! Un resumen visual con datos clave es la mejor opción.</p>
            <Button @click="completarEjercicio">Ver Resultados →</Button>
          </div>
          <div v-else-if="seleccion !== null" class="mt-4 text-center">
            <p class="text-red-500 dark:text-error-red text-sm">{{ feedbackError }}</p>
          </div>
        </div>
      </section>

      <section v-else-if="fase === 'completado'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <div class="text-5xl">🎉</div>
          <h2 class="font-heading font-bold text-2xl text-gradient-cyan">¡Nivel 4 Completado!</h2>
          <div class="card-space">
            <div class="space-y-2 text-sm">
              <div class="flex justify-between"><span class="text-slate-500 dark:text-gray-mist">Estrellas</span><span>{{ '⭐'.repeat(estrellas) }}{{ '☆'.repeat(3-estrellas) }}</span></div>
              <div class="flex justify-between"><span class="text-slate-500 dark:text-gray-mist">XP ganado</span><span class="text-cyan-600 dark:text-cyber-cyan font-bold">+150 XP</span></div>
            </div>
          </div>
          <div class="card-character">
            <p class="text-xs text-purple-600 dark:text-soft-purple font-heading mb-2">📡 El Comunicador</p>
            <p class="text-slate-600 dark:text-gray-mist text-sm">"¡Excelente! Has completado las 4 capas. Ahora dominas la arquitectura fundamental."</p>
          </div>
          <Button size="lg" @click="irCompletado">Ver Resumen del Módulo 🏆</Button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useGameStore } from '@/stores/game'
import { useModulesStore } from '@/stores/modules'

import Button from '@/components/ui/Button.vue'
import TheoryPanel from '@/components/learning/TheoryPanel.vue'
import TheCommunicator from './components/TheCommunicator.vue'

import contenido from './content/level-4-output.json'

const router = useRouter()
const userStore = useUserStore()
const gameStore = useGameStore()
const modulesStore = useModulesStore()

const fase = ref('intro')
const currentDialogueIdx = ref(0)
const errores = ref(0)
const seleccion = ref(null)

const dialogoActual = computed(() => {
  return contenido.intro_dialogue[currentDialogueIdx.value]?.text || ''
})

function siguienteDialogo() {
  if (currentDialogueIdx.value < contenido.intro_dialogue.length - 1) {
    currentDialogueIdx.value++
  } else {
    fase.value = 'teoria'
  }
}

const tabsTeoria = computed(() => {
  return contenido.theory.sections.map(section => ({
    titulo: section.title,
    icono: section.icon,
    contenido: [
      { tipo: 'texto', valor: section.content },
      section.code_example ? { tipo: 'codigo', valor: section.code_example } : null,
      { tipo: 'lista', items: section.key_points }
    ].filter(Boolean)
  }))
})

const datosJSON = `{
  "usuario": "Juan",
  "compras": [
    {"item": "Laptop", "precio": 1200},
    {"item": "Mouse", "precio": 25}
  ],
  "total": 1225
}`

const outputOpciones = [
  {
    titulo: 'A) JSON tal cual',
    ejemplo: '{"usuario":"Juan","total":1225,...}\nEnviar los datos en bruto sin formato.'
  },
  {
    titulo: 'B) Resumen visual',
    ejemplo: '🛒 Resumen de Compra de Juan\n━━━━━━━━━━━━━━━━━━━━\n• Laptop — $1,200\n• Mouse — $25\n━━━━━━━━━━━━━━━━━━━━\n💰 Total: $1,225'
  },
  {
    titulo: 'C) Solo el total',
    ejemplo: 'Total: 1225'
  }
]

const feedbackError = computed(() => {
  if (seleccion.value === 0) return 'JSON es para sistemas, no para usuarios. Necesita formato legible.'
  if (seleccion.value === 2) return 'Demasiado escueto. El usuario necesita ver el detalle de su compra.'
  return ''
})

function seleccionarOutput(idx) {
  seleccion.value = idx
  if (idx !== 1) errores.value++
}

function completarEjercicio() {
  userStore.addXP(75)
  fase.value = 'completado'
}

const estrellas = computed(() => modulesStore.calcularEstrellas(0, errores.value))

function irCompletado() {
  modulesStore.completarNivel('level-4', estrellas.value, 0)
  gameStore.unlockBadge('comunicador-experto')
  gameStore.unlockBadge('explorador-4-capas')
  userStore.addXP(150)
  userStore.addXP(500)
  router.push('/module-1/completion')
}
</script>
