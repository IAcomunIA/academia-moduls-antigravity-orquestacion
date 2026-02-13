<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyber-cyan/20 to-neon-magenta/20 border border-cyber-cyan/30 flex items-center justify-center">
          <span class="text-2xl">⚡</span>
        </div>
        <div>
          <h2 class="font-heading font-bold text-xl text-white">Simulador: Paralelo vs Secuencial</h2>
          <p class="text-sm text-gray-dim">Visualiza la magia de la programación asíncrona</p>
        </div>
      </div>
      <Button variant="outline" @click="$emit('back')">← Volver</Button>
    </div>

    <!-- Controles Principales -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Panel de Simulación Secuencial -->
      <div class="card-level p-6 border-red-500/20">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-white flex items-center gap-2">
            <span class="text-red-400">❌</span>
            Modo Secuencial
          </h3>
          <span class="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">Síncrono</span>
        </div>

        <p class="text-xs text-gray-dim mb-4">Un agente espera a que el anterior termine</p>

        <!-- Visualización Secuencial -->
        <div class="space-y-3 mb-6">
          <div v-for="(task, idx) in tasks" :key="idx"
            class="flex items-center gap-3"
          >
            <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
              :class="getSequentialStatus(idx)"
            >
              {{ task.icon }}
            </div>
            <div class="flex-1">
              <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-red-500 transition-all duration-100"
                  :style="{ width: getSequentialProgress(idx) + '%' }"
                />
              </div>
            </div>
            <span class="text-xs text-gray-dim w-12 text-right">
              {{ getSequentialProgress(idx) }}%
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between p-3 rounded-xl bg-red-500/10 border border-red-500/20">
          <span class="text-xs text-gray-mist">Tiempo Total:</span>
          <span class="text-xl font-bold text-red-400">{{ tiempoSecuencial }}s</span>
        </div>

        <Button v-if="!simulatingSequential" @click="startSequential" class="w-full mt-4" variant="outline">
          ▶ Ejecutar Secuencial
        </Button>
      </div>

      <!-- Panel de Simulación Paralela -->
      <div class="card-level p-6 border-green-500/20">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-white flex items-center gap-2">
            <span class="text-green-400">✅</span>
            Modo Paralelo
          </h3>
          <span class="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Asíncrono</span>
        </div>

        <p class="text-xs text-gray-dim mb-4">Todos los agentes trabajan simultáneamente</p>

        <!-- Visualización Paralela -->
        <div class="space-y-3 mb-6">
          <div v-for="(task, idx) in tasks" :key="idx"
            class="flex items-center gap-3"
          >
            <div class="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
              :class="getParallelStatus(idx)"
            >
              {{ task.icon }}
            </div>
            <div class="flex-1">
              <div class="h-2 bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-green-500 transition-all duration-100"
                  :style="{ width: getParallelProgress(idx) + '%' }"
                />
              </div>
            </div>
            <span class="text-xs text-gray-dim w-12 text-right">
              {{ getParallelProgress(idx) }}%
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between p-3 rounded-xl bg-green-500/10 border border-green-500/20">
          <span class="text-xs text-gray-mist">Tiempo Total:</span>
          <span class="text-xl font-bold text-green-400">{{ tiempoParalelo }}s</span>
        </div>

        <Button v-if="!simulatingParallel" @click="startParallel" class="w-full mt-4">
          ▶ Ejecutar Paralelo
        </Button>
      </div>
    </div>

    <!-- Comparativa Visual -->
    <div class="card-level p-6">
      <h3 class="font-bold text-white mb-4">📊 Comparativa de Rendimiento</h3>
      
      <div class="space-y-4">
        <!-- Timeline Visual -->
        <div class="relative">
          <div class="text-xs text-gray-dim mb-2">Línea de Tiempo (0-{{ Math.max(tiempoSecuencial, tiempoParalelo) + 2 }}s)</div>
          
          <!-- Secuencial -->
          <div class="mb-4">
            <div class="text-xs text-red-400 mb-1">Secuencial</div>
            <div class="h-8 bg-white/5 rounded-lg overflow-hidden flex">
              <div v-for="(task, idx) in tasks" :key="idx"
                class="h-full flex items-center justify-center text-[10px] text-white/70 border-r border-white/10"
                :style="{ width: (task.duration / tiempoSecuencial * 100) + '%', backgroundColor: task.color + '40' }"
              >
                {{ task.name }} ({{ task.duration }}s)
              </div>
            </div>
          </div>

          <!-- Paralelo -->
          <div>
            <div class="text-xs text-green-400 mb-1">Paralelo</div>
            <div class="h-8 bg-white/5 rounded-lg overflow-hidden relative">
              <div v-for="(task, idx) in tasks" :key="idx"
                class="absolute h-full flex items-center justify-center text-[10px] text-white/70 border-r border-white/10"
                :style="{ 
                  width: (task.duration / tiempoSecuencial * 100) + '%', 
                  left: '0%',
                  backgroundColor: task.color + '40'
                }"
              >
                {{ task.name }}
              </div>
            </div>
          </div>
        </div>

        <!-- Métricas -->
        <div class="grid grid-cols-3 gap-4 mt-6">
          <div class="text-center p-4 rounded-xl bg-white/5">
            <p class="text-2xl font-bold text-cyber-cyan">{{ tiempoSecuencial }}s</p>
            <p class="text-[10px] text-gray-dim">Tiempo Secuencial</p>
          </div>
          <div class="text-center p-4 rounded-xl bg-white/5">
            <p class="text-2xl font-bold text-green-400">{{ tiempoParalelo }}s</p>
            <p class="text-[10px] text-gray-dim">Tiempo Paralelo</p>
          </div>
          <div class="text-center p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-cyber-cyan/20 border border-green-500/30">
            <p class="text-2xl font-bold text-green-400">{{ ahorroTiempo }}%</p>
            <p class="text-[10px] text-gray-dim">Ahorro de Tiempo</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Explicación Interactiva -->
    <div class="grid md:grid-cols-2 gap-6">
      <div class="card-level p-5">
        <h4 class="font-bold text-white mb-3 flex items-center gap-2">
          <span class="text-red-400">🚫</span>
          ¿Cuándo NO usar Paralelo?
        </h4>
        <ul class="space-y-2 text-xs text-gray-mist">
          <li class="flex items-start gap-2">
            <span class="text-red-400">×</span>
            <span>Cuando Agente B necesita el resultado de Agente A</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-red-400">×</span>
            <span>Recursos compartidos que pueden causar conflictos</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-red-400">×</span>
            <span>Orden lógico obligatorio (ej: validar antes de guardar)</span>
          </li>
        </ul>
      </div>

      <div class="card-level p-5">
        <h4 class="font-bold text-white mb-3 flex items-center gap-2">
          <span class="text-green-400">✓</span>
          ¿Cuándo SÍ usar Paralelo?
        </h4>
        <ul class="space-y-2 text-xs text-gray-mist">
          <li class="flex items-start gap-2">
            <span class="text-green-400">✓</span>
            <span>Tareas completamente independientes</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-400">✓</span>
            <span>Búsquedas en diferentes fuentes simultáneamente</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-green-400">✓</span>
            <span>Procesamiento de datos sin dependencias</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Ejercicio Práctico -->
    <div class="card-level p-6 border-cyber-cyan/30">
      <h3 class="font-bold text-white mb-4">🎯 Ejercicio: Identifica el Patrón</h3>
      <p class="text-sm text-gray-mist mb-4">Lee cada escenario y selecciona si debería ser Paralelo o Secuencial:</p>

      <div class="space-y-4">
        <div v-for="(scenario, idx) in scenarios" :key="idx"
          class="p-4 rounded-xl border"
          :class="scenario.userAnswer === null ? 'border-white/10 bg-white/5' :
                  scenario.userAnswer === scenario.correct ? 'border-green-500/50 bg-green-500/10' :
                  'border-red-500/50 bg-red-500/10'"
        >
          <p class="text-sm text-gray-mist mb-3">{{ idx + 1 }}. {{ scenario.text }}</p>
          
          <div class="flex gap-2">
            <button @click="scenario.userAnswer = 'parallel'"
              class="px-4 py-2 rounded-lg text-xs font-medium transition-all"
              :class="scenario.userAnswer === 'parallel' ? 'bg-cyber-cyan text-deep-space' : 'bg-white/10 text-gray-mist hover:bg-white/20'"
            >Paralelo</button>
            <button @click="scenario.userAnswer = 'sequential'"
              class="px-4 py-2 rounded-lg text-xs font-medium transition-all"
              :class="scenario.userAnswer === 'sequential' ? 'bg-neon-magenta text-deep-space' : 'bg-white/10 text-gray-mist hover:bg-white/20'"
            >Secuencial</button>
          </div>

          <div v-if="scenario.userAnswer !== null" class="mt-3 text-xs p-3 rounded-lg"
            :class="scenario.userAnswer === scenario.correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'"
          >
            {{ scenario.userAnswer === scenario.correct ? '✓ Correcto!' : '✗ Incorrecto' }} 
            {{ scenario.explanation }}
          </div>
        </div>
      </div>
    </div>

    <!-- Botón Continuar -->
    <div class="flex justify-end">
      <Button @click="completar" class="animate-glow-pulse" size="lg">
        Continuar a Mini-juegos →
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Button from '@/components/ui/Button.vue'

const emit = defineEmits(['complete', 'back'])

// Datos de tareas
const tasks = [
  { name: 'Research', icon: '🔍', duration: 3, color: '#00F0FF' },
  { name: 'Code', icon: '💻', duration: 5, color: '#FF00FF' },
  { name: 'Test', icon: '🧪', duration: 2, color: '#8B5CF6' },
  { name: 'Deploy', icon: '🚀', duration: 1, color: '#10B981' }
]

// Estados de simulación
const simulatingSequential = ref(false)
const simulatingParallel = ref(false)
const sequentialProgress = ref([0, 0, 0, 0])
const parallelProgress = ref([0, 0, 0, 0])
const tiempoSecuencial = ref(11)
const tiempoParalelo = ref(5)

// Escenarios para el ejercicio
const scenarios = ref([
  {
    text: 'Tres agentes analizan el mismo documento: uno extrae keywords, otro analiza sentimiento, otro hace resumen',
    correct: 'parallel',
    explanation: 'Son análisis independientes del mismo input. Pueden trabajar simultáneamente.',
    userAnswer: null
  },
  {
    text: 'Agente A limpia datos → Agente B analiza datos limpios → Agente C visualiza resultados',
    correct: 'sequential',
    explanation: 'Hay dependencia de datos: cada uno necesita el output del anterior.',
    userAnswer: null
  },
  {
    text: '5 agentes buscan información en diferentes fuentes: Google, Twitter, Reddit, Papers, News',
    correct: 'parallel',
    explanation: 'Búsquedas independientes en fuentes diferentes. Máxima velocidad en paralelo.',
    userAnswer: null
  },
  {
    text: 'Agente escribe código → Agente revisa código → Agente despliega en producción',
    correct: 'sequential',
    explanation: 'Pipeline de CI/CD: orden obligatorio, no se puede desplegar sin revisar.',
    userAnswer: null
  }
])

const ahorroTiempo = computed(() => {
  const ahorro = tiempoSecuencial.value - tiempoParalelo.value
  return Math.round((ahorro / tiempoSecuencial.value) * 100)
})

function getSequentialStatus(idx) {
  if (!simulatingSequential.value) return 'bg-white/10 text-gray-dim'
  if (sequentialProgress.value[idx] === 100) return 'bg-green-500/30 text-green-400 border border-green-500/50'
  if (sequentialProgress.value[idx] > 0) return 'bg-cyber-cyan/30 text-cyber-cyan border border-cyber-cyan/50 animate-pulse'
  return 'bg-white/10 text-gray-dim'
}

function getParallelStatus(idx) {
  if (!simulatingParallel.value) return 'bg-white/10 text-gray-dim'
  if (parallelProgress.value[idx] === 100) return 'bg-green-500/30 text-green-400 border border-green-500/50'
  if (parallelProgress.value[idx] > 0) return 'bg-cyber-cyan/30 text-cyber-cyan border border-cyber-cyan/50 animate-pulse'
  return 'bg-white/10 text-gray-dim'
}

function getSequentialProgress(idx) {
  return sequentialProgress.value[idx]
}

function getParallelProgress(idx) {
  return parallelProgress.value[idx]
}

async function startSequential() {
  simulatingSequential.value = true
  sequentialProgress.value = [0, 0, 0, 0]
  
  for (let i = 0; i < tasks.length; i++) {
    const duration = tasks[i].duration * 100 // ms por segundo
    const steps = 100
    const stepTime = duration / steps
    
    for (let p = 0; p <= 100; p += 2) {
      sequentialProgress.value[i] = p
      await sleep(stepTime * 2)
    }
  }
  
  simulatingSequential.value = false
}

async function startParallel() {
  simulatingParallel.value = true
  parallelProgress.value = [0, 0, 0, 0]
  
  // Todos empiezan al mismo tiempo
  const promises = tasks.map(async (task, i) => {
    const duration = task.duration * 100
    const steps = 100
    const stepTime = duration / steps
    
    for (let p = 0; p <= 100; p += 2) {
      parallelProgress.value[i] = p
      await sleep(stepTime * 2)
    }
  })
  
  await Promise.all(promises)
  simulatingParallel.value = false
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function completar() {
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
  animation: pulse 1s ease-in-out infinite;
}
</style>
