<template>
  <!-- Nivel 3: Agentes - Los Especialistas -->
  <div class="min-h-screen px-4 py-8 md:py-12">
    <div class="max-w-4xl mx-auto">

      <!-- Intro -->
      <section v-if="fase === 'intro'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <TheTeam :dialogo="dialogoActual" />

          <Button @click="siguienteDialogo">
            {{ currentDialogueIdx < contenido.intro_dialogue.length - 1 ? 'Siguiente →' : 'Comenzar la Lección →' }}
          </Button>
        </div>
      </section>

      <!-- Teoría -->
      <section v-else-if="fase === 'teoria'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">🤖</span>
          <div>
            <h1 class="font-heading font-bold text-xl text-cyber-cyan">Nivel 3: Agentes</h1>
            <p class="text-xs text-gray-mist">Los Especialistas</p>
          </div>
        </div>
        <TheoryPanel :tabs="tabsTeoria" @complete="fase = 'ejercicio'" />
      </section>

      <!-- Ejercicio: Matching de skills -->
      <section v-else-if="fase === 'ejercicio'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">🎮</span>
          <div>
            <h2 class="font-heading font-bold text-xl text-cyber-cyan">Mini-Juego: Matching de Skills</h2>
            <p class="text-xs text-gray-mist">Conecta cada tarea con el agente apropiado</p>
          </div>
        </div>

        <div class="card-level max-w-2xl mx-auto">
          <div class="space-y-4">
            <div
              v-for="(pregunta, idx) in matchingPreguntas"
              :key="idx"
              class="p-4 rounded-xl border transition-all duration-200"
              :class="pregunta.correcta
                ? 'border-success-green/50 bg-success-green/5'
                : pregunta.seleccion && !pregunta.correcta
                  ? 'border-error-red/50 bg-error-red/5'
                  : 'border-gray-dim/30 bg-deep-space/50'"
            >
              <p class="text-sm text-white mb-3">📋 {{ pregunta.tarea }}</p>
              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="opcion in agentesOpciones"
                  :key="opcion"
                  class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                  :class="pregunta.seleccion === opcion
                    ? (pregunta.correcta ? 'bg-success-green text-white' : 'bg-error-red text-white')
                    : 'bg-soft-purple/20 text-soft-purple hover:bg-soft-purple/30'"
                  :disabled="pregunta.correcta"
                  @click="responderMatching(idx, opcion)"
                >
                  {{ opcion }}
                </button>
              </div>
            </div>
          </div>

          <div v-if="matchingCompleto" class="mt-6 text-center space-y-3">
            <p class="text-success-green font-semibold">🎉 ¡Todas las conexiones correctas! +75 XP</p>
            <Button @click="completarEjercicio">Ver Resultados →</Button>
          </div>
        </div>
      </section>

      <!-- Completado -->
      <section v-else-if="fase === 'completado'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <div class="text-5xl">🎉</div>
          <h2 class="font-heading font-bold text-2xl text-gradient-cyan">¡Nivel 3 Completado!</h2>
          <div class="card-space">
            <div class="space-y-2 text-sm">
              <div class="flex justify-between"><span class="text-gray-mist">Estrellas</span><span>{{ '⭐'.repeat(estrellas) }}{{ '☆'.repeat(3-estrellas) }}</span></div>
              <div class="flex justify-between"><span class="text-gray-mist">XP ganado</span><span class="text-cyber-cyan font-bold">+150 XP</span></div>
            </div>
          </div>
          <div class="card-character">
            <p class="text-xs text-soft-purple font-heading mb-2">🤖 El Equipo</p>
            <p class="text-gray-mist text-sm">"¡Gran trabajo! Ahora conocerás al Comunicador para aprender cómo presentar resultados."</p>
          </div>
          <Button size="lg" @click="irSiguienteNivel">Continuar al Nivel 4 →</Button>
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
import TheTeam from './components/TheTeam.vue'

// Datos
import contenido from './content/level-3-agentes.json'

const router = useRouter()
const userStore = useUserStore()
const gameStore = useGameStore()
const modulesStore = useModulesStore()

const fase = ref('intro')
const currentDialogueIdx = ref(0)
const errores = ref(0)

// Diálogo actual
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

// Convertir teoría
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

// Mini-juego de matching (Mantenemos la lógica de matching)
const agentesOpciones = ['Agente NLP', 'Agente Datos', 'Agente Redacción', 'Agente Código']
const matchingPreguntas = ref([
  { tarea: 'Analizar sentimiento en reviews de clientes', respuesta: 'Agente NLP', seleccion: null, correcta: false },
  { tarea: 'Generar reporte financiero mensual', respuesta: 'Agente Datos', seleccion: null, correcta: false },
  { tarea: 'Escribir email de bienvenida para nuevos usuarios', respuesta: 'Agente Redacción', seleccion: null, correcta: false },
  { tarea: 'Depurar un error en código Python', respuesta: 'Agente Código', seleccion: null, correcta: false }
])

const matchingCompleto = computed(() => matchingPreguntas.value.every(p => p.correcta))

function responderMatching(idx, opcion) {
  const pregunta = matchingPreguntas.value[idx]
  pregunta.seleccion = opcion
  pregunta.correcta = opcion === pregunta.respuesta
  if (!pregunta.correcta) {
    errores.value++
    setTimeout(() => { pregunta.seleccion = null }, 1000)
  }
  if (matchingCompleto.value) userStore.addXP(75)
}

function completarEjercicio() { fase.value = 'completado' }

const estrellas = computed(() => modulesStore.calcularEstrellas(0, errores.value))

function irSiguienteNivel() {
  modulesStore.completarNivel('level-3', estrellas.value, 0)
  gameStore.unlockBadge('constructor-agentes')
  userStore.addXP(150)
  router.push('/module-1/level-4')
}
</script>
