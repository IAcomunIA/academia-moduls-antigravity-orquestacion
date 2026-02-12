<template>
  <!-- Nivel 6: Manager & Parallel - Sinergia en Tiempo Real -->
  <div class="min-h-screen px-4 py-8 md:py-12">
    <div class="max-w-4xl mx-auto">

      <!-- === FASE 1: Intro === -->
      <section v-if="fase === 'intro'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <div class="card-character border-magenta-500/20">
            <div class="relative mx-auto w-20 h-20 mb-4">
              <div class="absolute inset-0 bg-neon-magenta/20 rounded-full animate-glow-pulse" />
              <div class="relative w-full h-full rounded-full bg-gradient-to-br from-neon-magenta/30 to-soft-purple/30 border-2 border-neon-magenta/50 flex items-center justify-center animate-float">
                <span class="text-4xl">⚡</span>
              </div>
            </div>
            <h3 class="font-heading font-bold text-neon-magenta text-sm mb-1">La Mente Colmena</h3>
            <p class="text-gray-dim text-xs mb-3">Sincronización de Alto Rendimiento</p>
            <div class="bg-dark-void/60 rounded-lg px-4 py-3 border border-neon-magenta/20 relative">
              <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-dark-void/60 border-l border-t border-neon-magenta/20 rotate-45" />
              <p class="text-gray-mist text-xs leading-relaxed italic">"{{ dialogoActual }}"</p>
            </div>
          </div>

          <Button @click="siguienteDialogo">
            {{ currentDialogueIdx < contenido.intro_dialogue.length - 1 ? 'Siguiente →' : 'Comenzar la Lección →' }}
          </Button>
        </div>
      </section>

      <!-- === FASE 2: Teoría === -->
      <section v-else-if="fase === 'teoria'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">⚡</span>
          <div>
            <h1 class="font-heading font-bold text-xl text-cyber-cyan">Nivel 6: Agentes en Paralelo</h1>
            <p class="text-xs text-gray-mist">Sincronización Masiva</p>
          </div>
        </div>
        <TheoryPanel :tabs="tabsTeoria" @complete="fase = 'ejercicio'" />
      </section>

      <!-- === FASE 3: Ejercicio (Parallel Simulation) === -->
      <section v-else-if="fase === 'ejercicio'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">🎮</span>
          <div>
            <h2 class="font-heading font-bold text-xl text-cyber-cyan">Laboratorio: Ejecución Paralela</h2>
            <p class="text-xs text-gray-mist">Lanza tus agentes al unísono</p>
          </div>
        </div>

        <div class="card-level max-w-2xl mx-auto overflow-hidden">
          <div class="p-4 bg-deep-space/50 border-b border-gray-dim/20 mb-6">
            <p class="text-sm text-gray-mist leading-relaxed">
              Tarea: <span class="text-white">"Investigar el impacto ambiental de los cohetes."</span><br>
              <span class="text-xs text-soft-purple italic">Agentes necesarios: 3 especialistas (Emisiones, Residuos, Ruido).</span>
            </p>
          </div>

          <div class="space-y-6 mb-8">
            <div v-for="(task, idx) in tasks" :key="idx" class="relative">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-heading text-gray-mist">{{ task.name }}</span>
                <span class="text-[10px] text-cyber-cyan">{{ task.status }}</span>
              </div>
              <div class="h-1.5 w-full bg-dark-void rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-neon-magenta to-soft-purple transition-all duration-300"
                  :style="{ width: task.progress + '%' }"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col items-center gap-4">
            <div v-if="!simulating" class="flex gap-4">
              <button 
                class="px-6 py-3 rounded-xl border border-white/10 bg-white/5 text-sm font-bold hover:bg-white/10 transition-all"
                @click="startSimulation(false)"
              >
                Ejecución Secuencial (Lenta)
              </button>
              <button 
                class="px-6 py-3 rounded-xl border border-neon-magenta/50 bg-neon-magenta/10 text-sm font-bold text-neon-magenta hover:bg-neon-magenta/20 transition-all"
                @click="startSimulation(true)"
              >
                Ejecución Paralela (Óptima)
              </button>
            </div>
            
            <div v-else class="text-center py-4">
              <p class="text-xs text-gray-dim animate-pulse">Procesando sinergia...</p>
              <p class="text-2xl font-heading font-bold text-white mt-1">{{ timer }}s</p>
            </div>

            <div v-if="success" class="text-center animate-slide-up">
              <p class="text-success-green font-bold mb-4">
                🎉 {{ parallelUsed ? '¡Sinergia Exitosa! Ahorraste el 60% del tiempo.' : 'Completado, pero pudiste ser más rápido...' }}
              </p>
              <Button @click="fase = 'completado'">Continuar →</Button>
            </div>
          </div>
        </div>
      </section>

      <!-- === FASE 4: Completado === -->
      <section v-else-if="fase === 'completado'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <div class="text-5xl">⚡</div>
          <h2 class="font-heading font-bold text-2xl text-gradient-magenta">¡Maestro Paralelo!</h2>
          <div class="card-space">
             <p class="text-sm text-gray-mist mb-4">Has comprendido que el tiempo es un recurso y que los agentes Manager son la clave para dominarlo.</p>
             <div class="flex justify-between items-center text-xs text-gray-dim">
               <span>XP Ganado</span>
               <span class="text-neon-magenta font-bold">+250 XP</span>
             </div>
          </div>
          <Button size="lg" @click="irSiguienteNivel">Regresar al Mapa →</Button>
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

// Componentes
import Button from '@/components/ui/Button.vue'
import TheoryPanel from '@/components/learning/TheoryPanel.vue'

// Datos
import contenido from './content/level-6-parallel.json'

const router = useRouter()
const userStore = useUserStore()
const gameStore = useGameStore()
const modulesStore = useModulesStore()

const fase = ref('intro')
const currentDialogueIdx = ref(0)
const simulating = ref(false)
const parallelUsed = ref(false)
const success = ref(false)
const timer = ref(0)

const tasks = ref([
  { name: 'Especialista Ruido', progress: 0, status: 'Esperando...' },
  { name: 'Especialista Emisiones', progress: 0, status: 'Esperando...' },
  { name: 'Especialista Residuos', progress: 0, status: 'Esperando...' }
])

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

async function startSimulation(isParallel) {
  simulating.ref = true
  parallelUsed.value = isParallel
  success.value = false
  tasks.value.forEach(t => { t.progress = 0; t.status = 'Iniciando...'; })
  timer.value = 0

  const interval = setInterval(() => { timer.value++ }, 1000)

  if (isParallel) {
    // Todos a la vez
    await Promise.all(tasks.value.map(async (t) => {
      t.status = 'Ejecutando...'
      for(let i=0; i<=100; i+=10) {
        t.progress = i
        await new Promise(r => setTimeout(r, 150))
      }
      t.status = 'Terminado'
    }))
  } else {
    // Uno por uno
    for (const t of tasks.value) {
      t.status = 'Ejecutando...'
      for(let i=0; i<=100; i+=10) {
        t.progress = i
        await new Promise(r => setTimeout(r, 150))
      }
      t.status = 'Terminado'
    }
  }

  clearInterval(interval)
  simulating.value = false
  success.value = true
}

function irSiguienteNivel() {
  modulesStore.completarNivel('level-6', 3, 0)
  gameStore.unlockBadge('maestro-paralelo')
  userStore.addXP(250)
  router.push('/map')
}
</script>
