<template>
  <!-- Nivel 7: MCP & Tools - Conectando con el Mundo -->
  <div class="min-h-screen px-4 py-8 md:py-12">
    <div class="max-w-4xl mx-auto">

      <!-- === FASE 1: Intro === -->
      <section v-if="fase === 'intro'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <div class="card-character border-emerald-500/20">
            <div class="relative mx-auto w-20 h-20 mb-4">
              <div class="absolute inset-0 bg-emerald-500/20 rounded-full animate-glow-pulse" />
              <div class="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/30 border-2 border-emerald-500/50 flex items-center justify-center animate-float">
                <span class="text-4xl">🔌</span>
              </div>
            </div>
            <h3 class="font-heading font-bold text-emerald-400 text-sm mb-1">El Enlace</h3>
            <p class="text-gray-dim text-xs mb-3">Ingeniero de Conectividad</p>
            <div class="bg-dark-void/60 rounded-lg px-4 py-3 border border-emerald-500/20 relative">
              <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-dark-void/60 border-l border-t border-emerald-500/20 rotate-45" />
              <p class="text-gray-mist text-xs leading-relaxed italic">"{{ dialogoActual }}"</p>
            </div>
          </div>

          <Button @click="siguienteDialogue">
            {{ currentDialogueIdx < contenido.intro_dialogue.length - 1 ? 'Siguiente →' : 'Comenzar la Lección →' }}
          </Button>
        </div>
      </section>

      <!-- === FASE 2: Teoría === -->
      <section v-else-if="fase === 'teoria'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">🔌</span>
          <div>
            <h1 class="font-heading font-bold text-xl text-cyber-cyan">Nivel 7: MCP & Tools</h1>
            <p class="text-xs text-gray-mist">Acceso al Mundo Real</p>
          </div>
        </div>
        <TheoryPanel :tabs="tabsTeoria" @complete="fase = 'ejercicio'" />
      </section>

      <!-- === FASE 3: Ejercicio === -->
      <section v-else-if="fase === 'ejercicio'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">✍️</span>
          <div>
            <h2 class="font-heading font-bold text-xl text-cyber-cyan">Práctica: Define una Herramienta</h2>
            <p class="text-xs text-gray-mist">Estructura un Tool Call en formato JSON</p>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="md:col-span-2">
            <CodeEditor
              :instruccion="contenido.exercise.instruction"
              :plantilla="contenido.exercise.template"
              :validador="validarTool"
              @complete="fase = 'completado'"
            />
          </div>
          <div class="space-y-4">
            <HintButton :hints="contenido.exercise.validation.hints" @hint-used="(n) => hintsUsados = n" />
            <div class="card-space p-4 text-xs">
              <h4 class="text-emerald-400 font-bold mb-2 uppercase tracking-tighter">Tip de Seguridad</h4>
              <p class="text-gray-mist leading-relaxed italic">
                "Siempre define descripciones claras para tus herramientas. El agente decide qué herramienta usar basándose ÚNICAMENTE en esa descripción."
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- === FASE 4: Completado === -->
      <section v-else-if="fase === 'completado'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <div class="text-5xl">🔌</div>
          <h2 class="font-heading font-bold text-2xl text-gradient-cyan">¡Conectividad Establecida!</h2>
          <div class="card-space">
             <p class="text-sm text-gray-mist mb-4">Has dado el primer paso para convertir a tus agentes en entes de acción pura.</p>
             <div class="flex justify-between items-center text-xs text-gray-dim">
               <span>XP Ganado</span>
               <span class="text-emerald-400 font-bold">+300 XP</span>
             </div>
          </div>
          <Button size="lg" @click="irSiguienteNivel">Ir al Último Nivel →</Button>
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
import CodeEditor from '@/components/learning/CodeEditor.vue'
import HintButton from '@/components/learning/HintButton.vue'

// Datos
import contenido from './content/level-7-mcp.json'

const router = useRouter()
const userStore = useUserStore()
const gameStore = useGameStore()
const modulesStore = useModulesStore()

const fase = ref('intro')
const currentDialogueIdx = ref(0)
const hintsUsados = ref(0)

const dialogoActual = computed(() => {
  return contenido.intro_dialogue[currentDialogueIdx.value]?.text || ''
})

function siguienteDialogue() {
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

function validarTool(codigo) {
  try {
    const json = JSON.parse(codigo)
    const hasName = json.name === 'search_knowledge'
    const hasDesc = json.description && json.description.length > 10 && !json.description.includes('[???]')
    const hasParams = json.parameters && json.parameters.properties && json.parameters.properties.query
    const hasRequired = Array.isArray(json.parameters.required) && json.parameters.required.includes('query')

    if (hasName && hasDesc && hasParams && hasRequired) {
      return { valido: true, feedback: '¡Excelente! Herramienta definida correctamente.' }
    }
  } catch (e) {
    return { valido: false, incompleto: true, feedback: 'El formato debe ser un JSON válido.' }
  }
  return { valido: false, incompleto: true, feedback: 'Revisa que todos los campos estén llenos y que "query" sea obligatorio.' }
}

function irSiguienteNivel() {
  modulesStore.completarNivel('level-7', 3, hintsUsados.value)
  gameStore.unlockBadge('tecnico-mcp')
  userStore.addXP(300)
  router.push('/map')
}
</script>
