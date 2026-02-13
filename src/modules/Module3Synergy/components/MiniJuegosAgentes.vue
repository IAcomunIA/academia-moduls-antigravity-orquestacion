<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-soft-purple/20 to-neon-magenta/20 border border-soft-purple/30 flex items-center justify-center">
          <span class="text-2xl">🎮</span>
        </div>
        <div>
          <h2 class="font-heading font-bold text-xl text-white">Mini-juegos: Agentes en Acción</h2>
          <p class="text-sm text-gray-dim">Pon a prueba tus conocimientos</p>
        </div>
      </div>
      <Button variant="outline" @click="$emit('back')">← Volver</Button>
    </div>

    <!-- Progreso de Mini-juegos -->
    <div class="flex items-center justify-center gap-4">
      <div v-for="(game, idx) in ['matching', 'quiz']" :key="game"
        class="flex items-center gap-2"
      >
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          :class="juegoActual === idx ? 'bg-neon-magenta text-deep-space animate-pulse' : 
                  juegosCompletados.includes(game) ? 'bg-green-500 text-white' : 
                  'bg-white/10 text-gray-dim'"
        >
          {{ juegosCompletados.includes(game) ? '✓' : idx + 1 }}
        </div>
        <span class="text-xs text-gray-mist hidden md:block">
          {{ idx === 0 ? 'Matching' : 'Quiz' }}
        </span>
      </div>
    </div>

    <!-- MINI-JUEGO 1: Matching de Autonomía -->
    <div v-if="juegoActual === 0" class="max-w-3xl mx-auto">
      <div class="card-level p-6">
        <div class="text-center mb-6">
          <h3 class="font-bold text-xl text-white mb-2">🎯 Matching: Nivel de Autonomía</h3>
          <p class="text-sm text-gray-dim">Arrastra cada escenario al modo de autonomía más apropiado</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <!-- Escenarios para arrastrar -->
          <div class="space-y-3">
            <h4 class="text-xs font-bold text-gray-mist uppercase tracking-tighter">Escenarios</h4>
            
            <div v-for="(scenario, idx) in matchingScenarios" :key="scenario.id"
              v-show="!scenario.matched"
              draggable="true"
              @dragstart="onDragStart($event, scenario)"
              class="p-4 rounded-xl border-2 border-dashed border-white/20 bg-white/5 cursor-grab active:cursor-grabbing hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5 transition-all"
            >
              <p class="text-sm text-gray-mist">{{ scenario.text }}</p>
            </div>

            <div v-if="matchingScenarios.every(s => s.matched)" class="text-center py-8">
              <span class="text-4xl mb-2">🎉</span>
              <p class="text-sm text-green-400">¡Todos los escenarios emparejados!</p>
            </div>
          </div>

          <!-- Zonas de drop -->
          <div class="space-y-4">
            <h4 class="text-xs font-bold text-gray-mist uppercase tracking-tighter">Modos de Autonomía</h4>
            
            <div v-for="mode in autonomyModes" :key="mode.id"
              class="p-4 rounded-xl border-2 min-h-[120px] transition-all"
              :class="mode.borderColor + ' ' + mode.bgColor"
              @dragover.prevent
              @drop="onDrop($event, mode)"
            >
              <div class="flex items-center gap-2 mb-2">
                <span class="text-2xl">{{ mode.icon }}</span>
                <span class="font-bold" :class="mode.textColor">{{ mode.label }}</span>
              </div>
              <p class="text-xs text-gray-dim mb-2">{{ mode.description }}</p>
              
              <!-- Escenarios emparejados -->
              <div class="space-y-2 mt-3">
                <div v-for="scenario in getMatchedScenarios(mode.id)" :key="scenario.id"
                  class="p-2 rounded-lg bg-white/10 text-xs text-gray-mist flex items-start gap-2"
                >
                  <span class="text-green-400">✓</span>
                  <span>{{ scenario.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feedback -->
        <div v-if="lastMatchResult" class="mt-6 p-4 rounded-xl text-center"
          :class="lastMatchResult.correct ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'"
        >
          <p class="text-sm font-bold mb-1" :class="lastMatchResult.correct ? 'text-green-400' : 'text-red-400'">
            {{ lastMatchResult.correct ? '✓ ¡Correcto!' : '✗ Intenta de nuevo' }}
          </p>
          <p class="text-xs text-gray-mist">{{ lastMatchResult.feedback }}</p>
        </div>

        <div class="flex justify-between mt-6">
          <Button v-if="matchingScenarios.every(s => s.matched)" @click="completarMatching" class="mx-auto animate-glow-pulse">
            Continuar al Quiz →
          </Button>
        </div>
      </div>
    </div>

    <!-- MINI-JUEGO 2: Quiz de Paralelo vs Secuencial -->
    <div v-else-if="juegoActual === 1" class="max-w-2xl mx-auto">
      <div class="card-level p-6">
        <div class="text-center mb-6">
          <h3 class="font-bold text-xl text-white mb-2">❓ Quiz: ¿Paralelo o Secuencial?</h3>
          <p class="text-sm text-gray-dim">Lee cada escenario y selecciona la respuesta correcta</p>
        </div>

        <!-- Barra de progreso -->
        <div class="mb-6">
          <div class="flex justify-between text-xs text-gray-dim mb-2">
            <span>Pregunta {{ preguntaActual + 1 }} de {{ quizQuestions.length }}</span>
            <span>{{ preguntasCorrectas }} correctas</span>
          </div>
          <div class="h-2 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-cyber-cyan to-neon-magenta transition-all"
              :style="{ width: ((preguntaActual + 1) / quizQuestions.length * 100) + '%' }"
            />
          </div>
        </div>

        <!-- Pregunta Actual -->
        <div v-if="preguntaActual < quizQuestions.length" class="space-y-6">
          <div class="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
            <p class="text-base text-gray-mist leading-relaxed">{{ quizQuestions[preguntaActual].text }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <button @click="responderQuiz('parallel')"
              class="p-4 rounded-xl border-2 transition-all text-center"
              :class="respuestaQuiz === 'parallel' ? 'border-cyber-cyan bg-cyber-cyan/10' : 'border-white/10 hover:border-cyber-cyan/50 bg-white/5'"
            >
              <span class="text-2xl block mb-2">⚡</span>
              <span class="font-bold text-cyber-cyan">Paralelo</span>
              <p class="text-[10px] text-gray-dim mt-1">Todos trabajan al mismo tiempo</p>
            </button>

            <button @click="responderQuiz('sequential')"
              class="p-4 rounded-xl border-2 transition-all text-center"
              :class="respuestaQuiz === 'sequential' ? 'border-neon-magenta bg-neon-magenta/10' : 'border-white/10 hover:border-neon-magenta/50 bg-white/5'"
            >
              <span class="text-2xl block mb-2">➡️</span>
              <span class="font-bold text-neon-magenta">Secuencial</span>
              <p class="text-[10px] text-gray-dim mt-1">Uno tras otro, en orden</p>
            </button>
          </div>

          <!-- Feedback -->
          <div v-if="respuestaQuiz !== null" class="p-4 rounded-xl"
            :class="respuestaCorrecta ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'"
          >
            <p class="font-bold mb-1" :class="respuestaCorrecta ? 'text-green-400' : 'text-red-400'">
              {{ respuestaCorrecta ? '✓ ¡Correcto!' : '✗ Incorrecto' }}
            </p>
            <p class="text-sm text-gray-mist">{{ quizQuestions[preguntaActual].explanation }}</p>
          </div>

          <div v-if="respuestaQuiz !== null" class="flex justify-center">
            <Button @click="siguientePregunta">
              {{ preguntaActual < quizQuestions.length - 1 ? 'Siguiente Pregunta →' : 'Ver Resultados →' }}
            </Button>
          </div>
        </div>

        <!-- Resultados Finales -->
        <div v-else class="text-center space-y-6">
          <div class="text-6xl mb-4">🏆</div>
          <h3 class="font-bold text-2xl text-white">¡Quiz Completado!</h3>
          
          <div class="p-6 rounded-xl bg-gradient-to-br from-cyber-cyan/10 to-neon-magenta/10 border border-cyber-cyan/30">
            <p class="text-4xl font-bold text-cyber-cyan mb-2">{{ preguntasCorrectas }}/{{ quizQuestions.length }}</p>
            <p class="text-sm text-gray-dim">respuestas correctas</p>
            
            <div class="mt-4">
              <p v-if="preguntasCorrectas === quizQuestions.length" class="text-green-400 text-sm">
                🌟 ¡Perfecto! Dominas el concepto
              </p>
              <p v-else-if="preguntasCorrectas >= quizQuestions.length * 0.7" class="text-cyber-cyan text-sm">
                ⭐ ¡Muy bien! Casi perfecto
              </p>
              <p v-else class="text-yellow-400 text-sm">
                💪 Buen intento, sigue practicando
              </p>
            </div>
          </div>

          <Button @click="completarQuiz" class="animate-glow-pulse">
            Finalizar Nivel →
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'

const emit = defineEmits(['complete', 'back'])

const juegoActual = ref(0)
const juegosCompletados = ref([])

// Matching Game
const autonomyModes = [
  {
    id: 'ask',
    icon: '❓',
    label: 'ASK (Pregunta)',
    description: 'Pide permiso antes de cada acción',
    borderColor: 'border-yellow-500/50',
    bgColor: 'bg-yellow-500/10',
    textColor: 'text-yellow-400'
  },
  {
    id: 'auto',
    icon: '🚀',
    label: 'AUTO (Automático)',
    description: 'Actúa autónomamente sin preguntar',
    borderColor: 'border-green-500/50',
    bgColor: 'bg-green-500/10',
    textColor: 'text-green-400'
  },
  {
    id: 'hybrid',
    icon: '⚖️',
    label: 'HYBRID (Híbrido)',
    description: 'Decide solo, confirma casos dudosos',
    borderColor: 'border-blue-500/50',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400'
  }
]

const matchingScenarios = ref([
  {
    id: 1,
    text: 'Migración de base de datos crítica en producción',
    correctMode: 'ask',
    matched: false,
    feedback: 'Correcto: Tareas críticas necesitan supervisión humana en cada paso.'
  },
  {
    id: 2,
    text: 'Generar 100 descripciones de producto para catálogo',
    correctMode: 'auto',
    matched: false,
    feedback: 'Correcto: Tarea repetitiva y probada, máxima velocidad con autonomía total.'
  },
  {
    id: 3,
    text: 'Responder emails de soporte técnico variados',
    correctMode: 'hybrid',
    matched: false,
    feedback: 'Correcto: Algunos simples van en auto, otros complejos necesitan confirmación.'
  },
  {
    id: 4,
    text: 'Depurar código en fase de desarrollo',
    correctMode: 'ask',
    matched: false,
    feedback: 'Correcto: En debugging quieres ver cada decisión del agente.'
  },
  {
    id: 5,
    text: 'Actualizar documentación de API automáticamente',
    correctMode: 'auto',
    matched: false,
    feedback: 'Correcto: Proceso estándar que puede ejecutarse sin supervisión.'
  },
  {
    id: 6,
    text: 'Revisar código de un nuevo desarrollador junior',
    correctMode: 'hybrid',
    matched: false,
    feedback: 'Correcto: Revisar automáticamente pero alertar sobre cambios grandes.'
  }
])

let draggedScenario = null
const lastMatchResult = ref(null)

function onDragStart(event, scenario) {
  draggedScenario = scenario
  event.dataTransfer.effectAllowed = 'move'
}

function onDrop(event, mode) {
  event.preventDefault()
  if (!draggedScenario) return

  const scenario = matchingScenarios.value.find(s => s.id === draggedScenario.id)
  const correct = scenario.correctMode === mode.id

  if (correct) {
    scenario.matched = true
    scenario.matchedMode = mode.id
    lastMatchResult.value = {
      correct: true,
      feedback: scenario.feedback
    }
  } else {
    lastMatchResult.value = {
      correct: false,
      feedback: `No es correcto. "${scenario.text}" debería ser ${getModeName(scenario.correctMode)}.`
    }
  }

  draggedScenario = null
}

function getModeName(modeId) {
  const mode = autonomyModes.find(m => m.id === modeId)
  return mode ? mode.label : modeId
}

function getMatchedScenarios(modeId) {
  return matchingScenarios.value.filter(s => s.matched && s.matchedMode === modeId)
}

function completarMatching() {
  juegosCompletados.value.push('matching')
  juegoActual.value = 1
}

// Quiz Game
const quizQuestions = [
  {
    text: 'Tres agentes analizan el mismo documento desde diferentes ángulos: sentimiento, keywords, y resumen.',
    correct: 'parallel',
    explanation: 'Son análisis independientes del mismo input. Pueden trabajar simultáneamente sin interferir.'
  },
  {
    text: 'Agente A extrae datos → Agente B limpia datos → Agente C visualiza resultados',
    correct: 'sequential',
    explanation: 'Hay dependencia de datos obligatoria. El B necesita el output de A, y C necesita el de B.'
  },
  {
    text: '5 agentes buscan información en diferentes fuentes: Google, Twitter, Reddit, Papers, y News.',
    correct: 'parallel',
    explanation: 'Búsquedas completamente independientes. El paralelismo maximiza la velocidad.'
  },
  {
    text: 'Agente escribe código → Agente revisa código → Agente despliega código en producción',
    correct: 'sequential',
    explanation: 'Pipeline de CI/CD clásico. No puedes desplegar sin revisar, ni revisar sin código.'
  },
  {
    text: 'Agente A genera HTML, Agente B genera CSS, Agente C genera JavaScript simultáneamente.',
    correct: 'parallel',
    explanation: 'Frontend separation: HTML, CSS y JS son independientes entre sí.'
  }
]

const preguntaActual = ref(0)
const respuestaQuiz = ref(null)
const respuestaCorrecta = ref(false)
const preguntasCorrectas = ref(0)

function responderQuiz(respuesta) {
  if (respuestaQuiz.value !== null) return
  
  respuestaQuiz.value = respuesta
  respuestaCorrecta.value = respuesta === quizQuestions[preguntaActual.value].correct
  
  if (respuestaCorrecta.value) {
    preguntasCorrectas.value++
  }
}

function siguientePregunta() {
  respuestaQuiz.value = null
  respuestaCorrecta.value = false
  preguntaActual.value++
}

function completarQuiz() {
  juegosCompletados.value.push('quiz')
  emit('complete')
}
</script>

<style scoped>
.card-level {
  @apply bg-deep-space/60 backdrop-blur-xl border border-white/10 rounded-2xl;
}

.animate-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 240, 255, 0.6); }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>
