<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-neon-magenta/20 to-cyber-cyan/20 border border-neon-magenta/30 flex items-center justify-center">
          <span class="text-2xl">🧪</span>
        </div>
        <div>
          <h2 class="font-heading font-bold text-xl text-white">Laboratorio: Creación de Agentes</h2>
          <p class="text-sm text-gray-dim">Crea tu primera flota de agentes especializados</p>
        </div>
      </div>
      <Button variant="outline" @click="$emit('back')">← Volver</Button>
    </div>

    <!-- Progreso del Laboratorio -->
    <div class="flex items-center gap-4">
      <div v-for="(step, idx) in 3" :key="idx"
        class="flex items-center gap-2"
      >
        <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
          :class="pasoActual === idx ? 'bg-cyber-cyan text-deep-space' : 
                  pasoActual > idx ? 'bg-green-500 text-white' : 
                  'bg-white/10 text-gray-dim'"
        >
          {{ pasoActual > idx ? '✓' : idx + 1 }}
        </div>
        <span class="text-xs text-gray-mist hidden md:block">
          {{ idx === 0 ? 'Define Agentes' : idx === 1 ? 'Configura Autonomía' : 'Orquesta Flujo' }}
        </span>
        <div v-if="idx < 2" class="w-8 h-px bg-white/20" />
      </div>
    </div>

    <!-- PASO 1: Definición de Agentes -->
    <div v-if="pasoActual === 0" class="grid lg:grid-cols-3 gap-6">
      <!-- Panel de Herramientas -->
      <div class="lg:col-span-1 space-y-4">
        <div class="card-level p-4">
          <h3 class="text-xs font-bold text-gray-mist uppercase tracking-tighter mb-4">Plantillas de Agente</h3>
          <div class="space-y-3">
            <div v-for="template in plantillas" :key="template.id"
              draggable="true"
              @dragstart="onDragStart($event, template)"
              class="p-3 rounded-xl border border-white/10 bg-white/5 cursor-grab active:cursor-grabbing hover:bg-white/10 hover:border-cyber-cyan/30 transition-all group"
            >
              <div class="flex items-center gap-3">
                <span class="text-2xl">{{ template.icon }}</span>
                <div class="flex-1">
                  <p class="text-xs font-bold text-white">{{ template.name }}</p>
                  <p class="text-[10px] text-gray-dim">{{ template.role }}</p>
                </div>
              </div>
              <div class="mt-2 flex flex-wrap gap-1">
                <span v-for="skill in template.skills.slice(0, 2)" :key="skill"
                  class="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-gray-mist"
                >{{ skill }}</span>
              </div>
            </div>
          </div>
          <p class="text-[10px] text-gray-dim mt-4 text-center">Arrastra al workspace →</p>
        </div>

        <!-- Instrucciones -->
        <div class="card-level p-4 border-cyber-cyan/20">
          <h3 class="text-xs font-bold text-cyber-cyan uppercase tracking-tighter mb-2">📋 Instrucciones</h3>
          <p class="text-xs text-gray-mist leading-relaxed">
            Para este proyecto de e-commerce, necesitas:
          </p>
          <ul class="text-xs text-gray-dim mt-2 space-y-1">
            <li>• 1 Agente de Investigación</li>
            <li>• 1 Agente de Código</li>
            <li>• 1 Agente de Testing</li>
          </ul>
        </div>
      </div>

      <!-- Workspace -->
      <div class="lg:col-span-2">
        <div class="card-level p-6 min-h-[500px]"
          @dragover.prevent
          @drop="onDropAgente"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-bold text-white">Tu Flota de Agentes</h3>
            <span class="text-xs text-gray-dim">{{ agentesCreados.length }}/3 agentes</span>
          </div>

          <div v-if="agentesCreados.length === 0" class="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/20 rounded-xl">
            <span class="text-4xl mb-3">👆</span>
            <p class="text-sm text-gray-dim">Arrastra plantillas aquí para crear agentes</p>
          </div>

          <div v-else class="grid md:grid-cols-2 gap-4">
            <div v-for="(agente, idx) in agentesCreados" :key="idx"
              class="p-4 rounded-xl border border-cyber-cyan/30 bg-cyber-cyan/5 relative group"
            >
              <button @click="eliminarAgente(idx)" 
                class="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
              >×</button>
              
              <div class="flex items-center gap-3 mb-3">
                <span class="text-3xl">{{ agente.icon }}</span>
                <div>
                  <input v-model="agente.name" 
                    class="bg-transparent text-sm font-bold text-white border-b border-white/20 focus:border-cyber-cyan outline-none w-full"
                    placeholder="Nombre del agente"
                  />
                  <p class="text-[10px] text-cyber-cyan">{{ agente.role }}</p>
                </div>
              </div>

              <div class="space-y-2">
                <div>
                  <p class="text-[10px] text-gray-dim mb-1">Skills:</p>
                  <div class="flex flex-wrap gap-1">
                    <span v-for="skill in agente.skills" :key="skill"
                      class="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-gray-mist"
                    >{{ skill }}</span>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <span class="text-[10px] text-gray-dim">ID:</span>
                  <span class="text-[10px] font-mono text-cyber-cyan">{{ agente.id }}</span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="agentesCreados.length >= 3" class="mt-6 text-center">
            <Button @click="pasoActual = 1" class="animate-glow-pulse">
              Continuar a Configuración →
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- PASO 2: Configuración de Autonomía -->
    <div v-else-if="pasoActual === 1" class="space-y-6">
      <div class="card-level p-6">
        <h3 class="text-lg font-bold text-white mb-4">Configura la Autonomía de cada Agente</h3>
        <p class="text-sm text-gray-mist mb-6">Decide cuánta libertad tiene cada agente para tomar decisiones</p>

        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="(agente, idx) in agentesCreados" :key="idx"
            class="p-4 rounded-xl border border-white/10 bg-white/5"
          >
            <div class="flex items-center gap-3 mb-4">
              <span class="text-3xl">{{ agente.icon }}</span>
              <div>
                <p class="font-bold text-white">{{ agente.name }}</p>
                <p class="text-xs text-gray-dim">{{ agente.role }}</p>
              </div>
            </div>

            <div class="space-y-2">
              <p class="text-xs text-gray-dim">Nivel de Autonomía:</p>
              
              <div class="grid grid-cols-3 gap-1">
                <button v-for="mode in autonomyModes" :key="mode.id"
                  @click="agente.autonomy = mode.id"
                  class="p-2 rounded-lg text-[10px] font-medium transition-all"
                  :class="agente.autonomy === mode.id 
                    ? mode.id === 'ask' ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400' :
                      mode.id === 'auto' ? 'bg-green-500/20 border border-green-500/50 text-green-400' :
                      'bg-blue-500/20 border border-blue-500/50 text-blue-400'
                    : 'bg-white/5 text-gray-dim hover:bg-white/10'"
                >
                  <span class="block text-lg mb-1">{{ mode.icon }}</span>
                  {{ mode.label }}
                </button>
              </div>

              <p class="text-[10px] text-gray-dim mt-2 italic">
                {{ getAutonomyDescription(agente.autonomy) }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-8">
          <Button variant="outline" @click="pasoActual = 0">← Anterior</Button>
          <Button @click="pasoActual = 2" :disabled="!allAutonomyConfigured" class="animate-glow-pulse">
            Continuar →
          </Button>
        </div>
      </div>

      <!-- Guía de Autonomía -->
      <div class="grid md:grid-cols-3 gap-4">
        <div v-for="mode in autonomyModes" :key="mode.id"
          class="p-4 rounded-xl border"
          :class="mode.id === 'ask' ? 'border-yellow-500/30 bg-yellow-500/5' :
                  mode.id === 'auto' ? 'border-green-500/30 bg-green-500/5' :
                  'border-blue-500/30 bg-blue-500/5'"
        >
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xl">{{ mode.icon }}</span>
            <span class="font-bold text-sm" 
              :class="mode.id === 'ask' ? 'text-yellow-400' :
                      mode.id === 'auto' ? 'text-green-400' : 'text-blue-400'"
            >{{ mode.label }}</span>
          </div>
          <p class="text-xs text-gray-mist">{{ mode.description }}</p>
          <p class="text-[10px] text-gray-dim mt-2">{{ mode.useCase }}</p>
        </div>
      </div>
    </div>

    <!-- PASO 3: Orquestación del Flujo -->
    <div v-else-if="pasoActual === 2" class="space-y-6">
      <div class="card-level p-6">
        <h3 class="text-lg font-bold text-white mb-4">Orquesta el Flujo de Trabajo</h3>
        <p class="text-sm text-gray-mist mb-6">Organiza a tus agentes: ¿Trabajan uno tras otro (secuencial) o todos a la vez (paralelo)?</p>

        <!-- Visualización del Flujo -->
        <div class="mb-6 p-6 rounded-xl bg-dark-void/60 border border-white/10">
          <div class="flex items-center justify-center gap-4 flex-wrap">
            <template v-for="(agente, idx) in agentesCreados" :key="idx">
              <!-- Nodo Agente -->
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-2 transition-all"
                  :class="flujoConexiones.includes(idx) ? 'bg-cyber-cyan/20 border-2 border-cyber-cyan' : 'bg-white/10 border-2 border-white/20'"
                >
                  {{ agente.icon }}
                </div>
                <span class="text-[10px] text-gray-mist">{{ agente.name }}</span>
                <span class="text-[9px] px-1.5 py-0.5 rounded mt-1"
                  :class="agente.autonomy === 'ask' ? 'bg-yellow-500/20 text-yellow-400' :
                          agente.autonomy === 'auto' ? 'bg-green-500/20 text-green-400' :
                          'bg-blue-500/20 text-blue-400'"
                >{{ agente.autonomy.toUpperCase() }}</span>
              </div>

              <!-- Conector (excepto último) -->
              <div v-if="idx < agentesCreados.length - 1" class="flex items-center">
                <div class="flex gap-1">
                  <button @click="toggleConexion(idx)"
                    class="w-12 h-8 rounded-lg border-2 flex items-center justify-center transition-all"
                    :class="flujoConexiones.includes(idx) ? 'border-cyber-cyan bg-cyber-cyan/20' : 'border-white/20 hover:border-cyber-cyan/50'"
                  >
                    <span class="text-lg">{{ flujoConexiones.includes(idx) ? '→' : '+' }}</span>
                  </button>
                  <div v-if="flujoConexiones.includes(idx)" class="text-[10px] text-cyber-cyan self-center ml-1">
                    Secuencia
                  </div>
                </div>
              </div>
            </template>
          </div>

          <div class="mt-6 text-center">
            <p class="text-xs text-gray-mist mb-2">
              {{ allConnected ? '✓ Flujo Secuencial Configurado' : 
                 flujoConexiones.length === 0 ? '○ Flujo Paralelo (todos trabajan al mismo tiempo)' :
                 '◐ Flujo Mixto' }}
            </p>
            <p class="text-[10px] text-gray-dim max-w-md mx-auto">
              {{ allConnected 
                ? 'Los agentes trabajan uno tras otro. El output de uno es el input del siguiente.' 
                : flujoConexiones.length === 0 
                  ? 'Los agentes trabajan simultáneamente. Ideal cuando no dependen entre sí.'
                  : 'Algunos agentes trabajan en secuencia, otros en paralelo.' }}
            </p>
          </div>
        </div>

        <!-- Resumen de Configuración -->
        <div class="p-4 rounded-xl bg-gradient-to-r from-cyber-cyan/10 to-soft-purple/10 border border-cyber-cyan/30 mb-6">
          <h4 class="text-sm font-bold text-white mb-3">📊 Resumen de tu Flota</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p class="text-2xl font-bold text-cyber-cyan">{{ agentesCreados.length }}</p>
              <p class="text-[10px] text-gray-dim">Agentes Totales</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-green-400">{{ agentesCreados.filter(a => a.autonomy === 'auto').length }}</p>
              <p class="text-[10px] text-gray-dim">Modo AUTO</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-yellow-400">{{ agentesCreados.filter(a => a.autonomy === 'ask').length }}</p>
              <p class="text-[10px] text-gray-dim">Modo ASK</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-cyber-cyan">{{ flujoConexiones.length + 1 }}</p>
              <p class="text-[10px] text-gray-dim">Grupos de Ejecución</p>
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <Button variant="outline" @click="pasoActual = 1">← Anterior</Button>
          <Button @click="completarLaboratorio" class="animate-glow-pulse">
            Finalizar Laboratorio →
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Button from '@/components/ui/Button.vue'

const emit = defineEmits(['complete', 'back'])

const pasoActual = ref(0)
const agentesCreados = ref([])
const flujoConexiones = ref([])

const plantillas = [
  {
    id: 'researcher',
    icon: '🔍',
    name: 'Agente Investigador',
    role: 'Research Specialist',
    skills: ['Web Search', 'Data Mining', 'Analysis'],
    autonomy: 'ask'
  },
  {
    id: 'coder',
    icon: '💻',
    name: 'Agente Programador',
    role: 'Code Developer',
    skills: ['Vue.js', 'JavaScript', 'APIs'],
    autonomy: 'hybrid'
  },
  {
    id: 'tester',
    icon: '🧪',
    name: 'Agente Tester',
    role: 'QA Specialist',
    skills: ['Testing', 'Debugging', 'Validation'],
    autonomy: 'auto'
  },
  {
    id: 'writer',
    icon: '✍️',
    name: 'Agente Redactor',
    role: 'Content Writer',
    skills: ['Copywriting', 'SEO', 'Editing'],
    autonomy: 'auto'
  }
]

const autonomyModes = [
  {
    id: 'ask',
    icon: '❓',
    label: 'ASK',
    description: 'Pregunta antes de cada acción importante',
    useCase: 'Ideal para debugging y tareas críticas'
  },
  {
    id: 'auto',
    icon: '🚀',
    label: 'AUTO',
    description: 'Decide y ejecuta autónomamente',
    useCase: 'Para flujos probados, máxima velocidad'
  },
  {
    id: 'hybrid',
    icon: '⚖️',
    label: 'HYBRID',
    description: 'Decide solo, confirma casos dudosos',
    useCase: 'Balance entre velocidad y control'
  }
]

const allAutonomyConfigured = computed(() => {
  return agentesCreados.value.every(a => a.autonomy)
})

const allConnected = computed(() => {
  return flujoConexiones.value.length === agentesCreados.value.length - 1
})

function getAutonomyDescription(mode) {
  const modeData = autonomyModes.find(m => m.id === mode)
  return modeData ? modeData.description : 'Selecciona un modo'
}

// Drag and Drop
let draggedTemplate = null

function onDragStart(event, template) {
  draggedTemplate = template
  event.dataTransfer.effectAllowed = 'copy'
}

function onDropAgente(event) {
  event.preventDefault()
  if (draggedTemplate && agentesCreados.value.length < 3) {
    const newAgent = {
      ...draggedTemplate,
      name: draggedTemplate.name,
      id: `${draggedTemplate.id}_${Date.now()}`,
      autonomy: 'ask'
    }
    agentesCreados.value.push(newAgent)
  }
  draggedTemplate = null
}

function eliminarAgente(idx) {
  agentesCreados.value.splice(idx, 1)
  // Actualizar conexiones
  flujoConexiones.value = flujoConexiones.value.filter(c => c < agentesCreados.value.length - 1)
}

function toggleConexion(idx) {
  const pos = flujoConexiones.value.indexOf(idx)
  if (pos > -1) {
    flujoConexiones.value.splice(pos, 1)
  } else {
    flujoConexiones.value.push(idx)
    flujoConexiones.value.sort((a, b) => a - b)
  }
}

function completarLaboratorio() {
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
</style>
