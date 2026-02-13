<template>
  <div class="min-h-screen px-4 py-8 md:py-12 bg-gradient-to-b from-deep-space via-deep-space to-indigo-950/30">
    <div class="max-w-6xl mx-auto">

      <!-- === FASE 1: Intro Cinematográfica === -->
      <section v-if="fase === 'intro'" class="flex items-center justify-center min-h-[80vh]">
        <div class="max-w-2xl text-center space-y-8 animate-slide-up">
          <!-- Personaje Animado -->
          <div class="relative mx-auto w-32 h-32 mb-6">
            <div class="absolute inset-0 bg-cyber-cyan/20 rounded-full animate-glow-pulse blur-xl" />
            <div class="absolute inset-0 bg-neon-magenta/10 rounded-full animate-pulse" />
            <div class="relative w-full h-full rounded-full bg-gradient-to-br from-cyber-cyan/30 via-soft-purple/30 to-neon-magenta/30 border-2 border-cyber-cyan/50 flex items-center justify-center animate-float">
              <span class="text-6xl">🧠</span>
            </div>
          </div>

          <!-- Título y Subtítulo -->
          <div class="space-y-2">
            <h3 class="font-heading font-bold text-cyber-cyan text-lg tracking-widest uppercase">El Estratega</h3>
            <p class="text-gray-dim text-sm">Maestro de Flotas de Agentes</p>
          </div>

          <!-- Diálogo con efecto de typing -->
          <div class="card-character border-cyber-cyan/30 max-w-lg mx-auto">
            <div class="bg-dark-void/60 rounded-xl px-6 py-5 border border-cyber-cyan/20 relative">
              <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-dark-void/60 border-l border-t border-cyber-cyan/20 rotate-45" />
              <p class="text-gray-mist text-base leading-relaxed italic min-h-[60px]">{{ dialogoMostrado }}</p>
              <span v-if="mostrandoTyping" class="inline-block w-2 h-4 bg-cyber-cyan animate-pulse ml-1">|</span>
            </div>
          </div>

          <!-- Indicadores de progreso -->
          <div class="flex justify-center gap-2">
            <div v-for="(dialogue, idx) in contenido.intro_dialogue" :key="idx"
              class="w-2 h-2 rounded-full transition-all duration-300"
              :class="idx <= currentDialogueIdx ? 'bg-cyber-cyan w-6' : 'bg-gray-600'"
            />
          </div>

          <Button @click="siguienteDialogo" size="lg" class="animate-glow-pulse">
            {{ currentDialogueIdx < contenido.intro_dialogue.length - 1 ? 'Continuar →' : 'Comenzar Lección →' }}
          </Button>
        </div>
      </section>

      <!-- === FASE 2: Teoría Interactiva === -->
      <section v-else-if="fase === 'teoria'">
        <!-- Header del Nivel -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyber-cyan/20 to-soft-purple/20 border border-cyber-cyan/30 flex items-center justify-center">
              <span class="text-3xl">🧬</span>
            </div>
            <div>
              <h1 class="font-heading font-bold text-2xl text-white">Nivel 9: Maestría en Agentes</h1>
              <p class="text-sm text-cyber-cyan">Autonomía, Creación y Flotas Asíncronas</p>
            </div>
          </div>
          <div class="flex items-center gap-4 text-xs">
            <div class="px-3 py-1.5 rounded-full bg-dark-void/60 border border-white/10">
              <span class="text-gray-dim">Progreso:</span>
              <span class="text-cyber-cyan font-bold ml-2">{{ seccionActual + 1 }}/{{ contenido.theory.sections.length }}</span>
            </div>
          </div>
        </div>

        <!-- Navegación de Secciones -->
        <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button v-for="(section, idx) in contenido.theory.sections" :key="idx"
            @click="irASeccion(idx)"
            class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-300"
            :class="seccionActual === idx 
              ? 'bg-cyber-cyan/20 border border-cyber-cyan/50 text-cyber-cyan' 
              : 'bg-white/5 border border-white/10 text-gray-mist hover:bg-white/10'"
          >
            <span>{{ section.icon }}</span>
            <span class="hidden md:inline">{{ section.title }}</span>
          </button>
        </div>

        <!-- Contenido de la Sección Actual -->
        <div class="grid lg:grid-cols-3 gap-6">
          <!-- Panel Principal de Contenido -->
          <div class="lg:col-span-2 space-y-6">
            <div class="card-level p-6">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-3xl">{{ seccionActiva.icon }}</span>
                <h2 class="font-heading font-bold text-xl text-white">{{ seccionActiva.title }}</h2>
              </div>
              
              <div class="prose prose-invert prose-sm max-w-none">
                <p class="text-gray-mist leading-relaxed">{{ seccionActiva.content }}</p>
              </div>

              <!-- Key Points -->
              <div class="mt-6 space-y-3">
                <h3 class="text-xs font-bold text-cyber-cyan uppercase tracking-wider">Puntos Clave</h3>
                <div class="grid gap-2">
                  <div v-for="(point, idx) in seccionActiva.key_points" :key="idx"
                    class="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-cyber-cyan/30 transition-all"
                  >
                    <span class="text-cyber-cyan mt-0.5">▸</span>
                    <span class="text-sm text-gray-mist">{{ point }}</span>
                  </div>
                </div>
              </div>

              <!-- Ejemplo de Código (si existe) -->
              <div v-if="seccionActiva.code_example" class="mt-6">
                <h3 class="text-xs font-bold text-cyber-cyan uppercase tracking-wider mb-3">Ejemplo en Código</h3>
                <div class="bg-dark-void rounded-xl p-4 border border-white/10 overflow-x-auto">
                  <pre class="text-xs font-mono text-gray-mist"><code>{{ seccionActiva.code_example }}</code></pre>
                </div>
              </div>

              <!-- Tabla Comparativa (si existe) -->
              <div v-if="seccionActiva.comparison_table" class="mt-6">
                <h3 class="text-xs font-bold text-cyber-cyan uppercase tracking-wider mb-3">Comparativa</h3>
                <div class="overflow-x-auto">
                  <table class="w-full text-xs">
                    <thead>
                      <tr class="border-b border-white/10">
                        <th v-for="header in seccionActiva.comparison_table.headers" :key="header"
                          class="text-left py-2 px-3 text-cyber-cyan font-medium"
                        >{{ header }}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, idx) in seccionActiva.comparison_table.rows" :key="idx"
                        class="border-b border-white/5 hover:bg-white/5"
                      >
                        <td v-for="(cell, cellIdx) in row" :key="cellIdx"
                          class="py-3 px-3 text-gray-mist"
                          :class="cellIdx === 0 ? 'font-medium text-white' : ''"
                        >{{ cell }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Analogía (si existe) -->
              <div v-if="seccionActiva.analogy" class="mt-6 p-4 rounded-xl bg-soft-purple/10 border border-soft-purple/30">
                <div class="flex items-start gap-3">
                  <span class="text-xl">💡</span>
                  <div>
                    <h4 class="text-xs font-bold text-soft-purple uppercase mb-1">Analogía</h4>
                    <p class="text-sm text-gray-mist italic">{{ seccionActiva.analogy }}</p>
                  </div>
                </div>
              </div>

              <!-- FAQ (si existe) -->
              <div v-if="seccionActiva.faq" class="mt-6 space-y-3">
                <h3 class="text-xs font-bold text-cyber-cyan uppercase tracking-wider">Preguntas Frecuentes</h3>
                <div v-for="(item, idx) in seccionActiva.faq" :key="idx"
                  class="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <p class="text-sm font-medium text-white mb-2">Q: {{ item.q }}</p>
                  <p class="text-xs text-gray-dim">A: {{ item.a }}</p>
                </div>
              </div>

              <!-- Visualización de Async (si existe) -->
              <div v-if="seccionActiva.visual_explanation" class="mt-6">
                <h3 class="text-xs font-bold text-cyber-cyan uppercase tracking-wider mb-3">Visualización</h3>
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                    <h4 class="text-xs font-bold text-red-400 mb-2">❌ Síncrono</h4>
                    <p class="text-xs text-gray-mist">{{ seccionActiva.visual_explanation.sync }}</p>
                  </div>
                  <div class="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                    <h4 class="text-xs font-bold text-green-400 mb-2">✅ Asíncrono</h4>
                    <p class="text-xs text-gray-mist">{{ seccionActiva.visual_explanation.async }}</p>
                  </div>
                </div>
              </div>

              <!-- Scenarios Paralelo vs Secuencial (si existe) -->
              <div v-if="seccionActiva.scenarios" class="mt-6 space-y-4">
                <h3 class="text-xs font-bold text-cyber-cyan uppercase tracking-wider">Escenarios</h3>
                <div v-for="(scenario, idx) in seccionActiva.scenarios" :key="idx"
                  class="p-4 rounded-xl border"
                  :class="scenario.type === 'paralelo' 
                    ? 'bg-cyber-cyan/10 border-cyber-cyan/30' 
                    : 'bg-neon-magenta/10 border-neon-magenta/30'"
                >
                  <h4 class="text-sm font-bold mb-2" :class="scenario.type === 'paralelo' ? 'text-cyber-cyan' : 'text-neon-magenta'">
                    {{ scenario.title }}
                  </h4>
                  <p class="text-xs text-gray-mist mb-2">{{ scenario.example }}</p>
                  <ul class="text-xs text-gray-dim space-y-1 mb-2">
                    <li v-for="(task, tidx) in scenario.tasks" :key="tidx">• {{ task }}</li>
                  </ul>
                  <p class="text-xs text-white/80">{{ scenario.why }}</p>
                  <p class="text-xs text-green-400 mt-2">⏱️ {{ scenario.time_saved }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Panel Lateral: Navegación y Progreso -->
          <div class="space-y-4">
            <!-- Tarjeta de Personaje -->
            <div class="card-level p-4 text-center">
              <div class="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cyber-cyan/20 to-soft-purple/20 border border-cyber-cyan/30 flex items-center justify-center mb-3">
                <span class="text-3xl">🧠</span>
              </div>
              <h3 class="font-heading font-bold text-white text-sm">El Estratega</h3>
              <p class="text-xs text-gray-dim mt-1">"La verdadera maestría está en saber cuándo dejar que tus agentes vuelen solos."</p>
            </div>

            <!-- Checklist de Secciones -->
            <div class="card-level p-4">
              <h3 class="text-xs font-bold text-gray-mist uppercase tracking-tighter mb-3">Tu Progreso</h3>
              <div class="space-y-2">
                <div v-for="(section, idx) in contenido.theory.sections" :key="idx"
                  class="flex items-center gap-2 text-xs"
                  :class="idx <= seccionActual ? 'text-gray-mist' : 'text-gray-dim'"
                >
                  <span class="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    :class="idx < seccionActual ? 'bg-green-500/20 text-green-400' : 
                            idx === seccionActual ? 'bg-cyber-cyan/20 text-cyber-cyan animate-pulse' : 
                            'bg-white/5 text-gray-dim'"
                  >
                    {{ idx < seccionActual ? '✓' : idx === seccionActual ? '▶' : idx + 1 }}
                  </span>
                  <span class="truncate">{{ section.title }}</span>
                </div>
              </div>
            </div>

            <!-- Botones de Navegación -->
            <div class="flex gap-2">
              <Button v-if="seccionActual > 0" @click="seccionAnterior" variant="outline" class="flex-1">
                ← Anterior
              </Button>
              <Button v-if="seccionActual < contenido.theory.sections.length - 1" @click="siguienteSeccion" class="flex-1">
                Siguiente →
              </Button>
              <Button v-else @click="fase = 'laboratorio'" class="flex-1 animate-glow-pulse">
                Ir al Laboratorio →
              </Button>
            </div>
          </div>
        </div>
      </section>

      <!-- === FASE 3: Laboratorio de Creación de Agentes === -->
      <section v-else-if="fase === 'laboratorio'">
        <LaboratorioAgentes 
          @complete="completarLaboratorio"
          @back="fase = 'teoria'"
        />
      </section>

      <!-- === FASE 4: Simulador de Flujo Asíncrono === -->
      <section v-else-if="fase === 'simulador'">
        <SimuladorAsync 
          @complete="completarSimulador"
          @back="fase = 'laboratorio'"
        />
      </section>

      <!-- === FASE 5: Mini-juegos === -->
      <section v-else-if="fase === 'minigames'">
        <MiniJuegosAgentes 
          @complete="completarMinijuegos"
          @back="fase = 'simulador'"
        />
      </section>

      <!-- === FASE 6: Completado === -->
      <section v-else-if="fase === 'completado'" class="flex items-center justify-center min-h-[80vh]">
        <div class="max-w-2xl text-center space-y-8 animate-slide-up">
          <!-- Animación de celebración -->
          <div class="relative">
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-40 h-40 rounded-full bg-cyber-cyan/20 animate-ping" />
            </div>
            <div class="relative text-7xl animate-float">🧬</div>
          </div>

          <div>
            <h2 class="font-heading font-bold text-3xl text-gradient-cyan mb-2">¡Maestría Conseguida!</h2>
            <p class="text-gray-mist">Has dominado el arte de los agentes autónomos</p>
          </div>

          <!-- Resumen de Logros -->
          <div class="card-space p-6 text-left">
            <h3 class="text-sm font-bold text-white mb-4">🏆 Logros Desbloqueados</h3>
            <div class="space-y-3">
              <div v-for="(achievement, idx) in contenido.completion_summary.achievements" :key="idx"
                class="flex items-start gap-3 text-sm"
              >
                <span class="text-green-400 mt-0.5">✓</span>
                <span class="text-gray-mist">{{ achievement }}</span>
              </div>
            </div>

            <div class="mt-6 pt-6 border-t border-white/10">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-dim">XP Ganado</span>
                <span class="text-xl font-bold text-cyber-cyan">+{{ contenido.rewards.xp }} XP</span>
              </div>
            </div>
          </div>

          <!-- Badge -->
          <div class="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-cyber-cyan/20 to-soft-purple/20 border border-cyber-cyan/30">
            <span class="text-4xl">{{ contenido.rewards.badge.emoji }}</span>
            <div class="text-left">
              <p class="text-xs text-gray-dim uppercase tracking-wider">Nuevo Badge</p>
              <p class="font-heading font-bold text-white">{{ contenido.rewards.badge.name }}</p>
              <p class="text-xs text-gray-mist">{{ contenido.rewards.badge.description }}</p>
            </div>
          </div>

          <div class="flex gap-4 justify-center">
            <Button size="lg" variant="outline" @click="repetirNivel">
              Repetir Lección
            </Button>
            <Button size="lg" class="animate-glow-pulse" @click="irAlMapa">
              Regresar al Mapa →
            </Button>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useGameStore } from '@/stores/game'
import { useModulesStore } from '@/stores/modules'

// Componentes UI
import Button from '@/components/ui/Button.vue'
import LaboratorioAgentes from './components/LaboratorioAgentes.vue'
import SimuladorAsync from './components/SimuladorAsync.vue'
import MiniJuegosAgentes from './components/MiniJuegosAgentes.vue'

// Datos
import contenido from './content/level-9-config.json'

const router = useRouter()
const userStore = useUserStore()
const gameStore = useGameStore()
const modulesStore = useModulesStore()

// Estado
const fase = ref('intro')
const currentDialogueIdx = ref(0)
const seccionActual = ref(0)
const dialogoMostrado = ref('')
const mostrandoTyping = ref(false)

// Computed
const seccionActiva = computed(() => contenido.theory.sections[seccionActual.value])

// Typing effect para diálogos
function mostrarDialogoConTyping(texto) {
  dialogoMostrado.value = ''
  mostrandoTyping.value = true
  let i = 0
  const interval = setInterval(() => {
    if (i < texto.length) {
      dialogoMostrado.value += texto.charAt(i)
      i++
    } else {
      clearInterval(interval)
      mostrandoTyping.value = false
    }
  }, 30)
}

// Navegación de diálogos
function siguienteDialogo() {
  if (currentDialogueIdx.value < contenido.intro_dialogue.length - 1) {
    currentDialogueIdx.value++
    mostrarDialogoConTyping(contenido.intro_dialogue[currentDialogueIdx.value].text)
  } else {
    fase.value = 'teoria'
  }
}

// Navegación de secciones
function irASeccion(idx) {
  seccionActual.value = idx
}

function siguienteSeccion() {
  if (seccionActual.value < contenido.theory.sections.length - 1) {
    seccionActual.value++
  }
}

function seccionAnterior() {
  if (seccionActual.value > 0) {
    seccionActual.value--
  }
}

// Completar fases
function completarLaboratorio() {
  fase.value = 'simulador'
  gameStore.addXP(150)
}

function completarSimulador() {
  fase.value = 'minigames'
  gameStore.addXP(150)
}

function completarMinijuegos() {
  fase.value = 'completado'
  finalizarNivel()
}

function finalizarNivel() {
  modulesStore.completarNivel('level-9', 3, 3) // Módulo 3, 3 estrellas
  gameStore.unlockBadge(contenido.rewards.badge.id)
  userStore.addXP(contenido.rewards.xp)
}

function repetirNivel() {
  fase.value = 'intro'
  currentDialogueIdx.value = 0
  seccionActual.value = 0
  mostrarDialogoConTyping(contenido.intro_dialogue[0].text)
}

function irAlMapa() {
  router.push('/map')
}

// Inicialización
onMounted(() => {
  if (contenido.intro_dialogue.length > 0) {
    mostrarDialogoConTyping(contenido.intro_dialogue[0].text)
  }
})
</script>

<style scoped>
.card-level {
  @apply bg-deep-space/60 backdrop-blur-xl border border-white/10 rounded-2xl;
}

.card-character {
  @apply bg-gradient-to-br from-deep-space/80 to-indigo-950/80 backdrop-blur-xl border rounded-2xl p-6;
}

.card-space {
  @apply bg-gradient-to-br from-deep-space/60 to-indigo-950/40 backdrop-blur-xl border border-white/10 rounded-2xl;
}

.text-gradient-cyan {
  @apply bg-gradient-to-r from-cyber-cyan to-soft-purple bg-clip-text text-transparent;
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 240, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 240, 255, 0.6); }
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out;
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 240, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 240, 255, 0.5);
}
</style>
