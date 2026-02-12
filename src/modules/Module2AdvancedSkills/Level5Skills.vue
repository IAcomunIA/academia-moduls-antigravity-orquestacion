<template>
  <!-- Nivel 5: Skills & Rules - El DNA del Agente -->
  <div class="min-h-screen px-4 py-8 md:py-12">
    <div class="max-w-4xl mx-auto">

      <!-- === FASE 1: Intro === -->
      <section v-if="fase === 'intro'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <div class="card-character group">
            <div class="relative mx-auto w-20 h-20 mb-4">
              <div class="absolute inset-0 bg-warning-yellow/20 rounded-full animate-glow-pulse" />
              <div class="relative w-full h-full rounded-full bg-gradient-to-br from-warning-yellow/30 to-orange-500/30 border-2 border-warning-yellow/50 flex items-center justify-center animate-float">
                <span class="text-4xl">🛡️</span>
              </div>
            </div>
            <h3 class="font-heading font-bold text-warning-yellow text-sm mb-1">El Guardián</h3>
            <p class="text-gray-dim text-xs mb-3">Guardián de las Reglas Globales</p>
            <div class="bg-dark-void/60 rounded-lg px-4 py-3 border border-warning-yellow/20 relative">
              <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-dark-void/60 border-l border-t border-warning-yellow/20 rotate-45" />
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
          <span class="text-2xl">⚖️</span>
          <div>
            <h1 class="font-heading font-bold text-xl text-cyber-cyan">Nivel 5: Skills & Rules</h1>
            <p class="text-xs text-gray-mist">El ADN del Comportamiento</p>
          </div>
        </div>
        <TheoryPanel :tabs="tabsTeoria" @complete="fase = 'ejercicio'" />
      </section>

      <!-- === FASE 3: Ejercicio === -->
      <section v-else-if="fase === 'ejercicio'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">✍️</span>
          <div>
            <h2 class="font-heading font-bold text-xl text-cyber-cyan">Práctica: Crea una Skill</h2>
            <p class="text-xs text-gray-mist">Define un comportamiento reutilizable</p>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="md:col-span-2">
            <CodeEditor
              :instruccion="contenido.exercise.instruction"
              :plantilla="contenido.exercise.template"
              :validador="validarSkill"
              @complete="fase = 'completado'"
            />
          </div>
          <div class="space-y-4">
            <HintButton :hints="contenido.exercise.validation.hints" @hint-used="(n) => hintsUsados = n" />
            <div class="card-space p-4 text-xs">
              <h4 class="text-warning-yellow font-bold mb-2 uppercase tracking-tighter">¿Sabías que...?</h4>
              <p class="text-gray-mist leading-relaxed italic">
                "Las SKILLS en Antigravity se guardan como archivos .md o .skill independientes, permitiendo que varios orquestadores las importen según sea necesario."
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- === FASE 4: Completado === -->
      <section v-else-if="fase === 'completado'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <div class="text-5xl">📜</div>
          <h2 class="font-heading font-bold text-2xl text-gradient-cyan">¡Arquitecto de Skills!</h2>
          <div class="card-space">
             <p class="text-sm text-gray-mist mb-4">Has dominado el núcleo del comportamiento agentic.</p>
             <div class="flex justify-between items-center text-xs text-gray-dim">
               <span>XP Ganado</span>
               <span class="text-cyber-cyan font-bold">+250 XP</span>
             </div>
          </div>
          <Button size="lg" @click="irSiguienteNivel">Ir al Mapa →</Button>
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
import contenido from './content/level-5-skills.json'

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

function validarSkill(codigo) {
  const lower = codigo.toLowerCase()
  const content = lower.replace(/\[\?\?\?\]/g, '')
  
  const hasTitle = lower.includes('skill: editor-estilo')
  const hasPurpose = lower.includes('## propósito') && content.split('## propósito')[1]?.split('##')[0]?.trim().length > 10
  const hasRules = (lower.match(/^- .+/gm) || []).length >= 2
  
  if (hasTitle && hasPurpose && hasRules && !lower.includes('[???]')) {
    return { valido: true, feedback: '¡Perfecto! Has encapsulado un comportamiento modular.' }
  }
  
  return { valido: false, incompleto: true, feedback: 'Asegúrate de completar todas las secciones y borrar los [???].' }
}

function irSiguienteNivel() {
  modulesStore.completarNivel('level-5', 3, hintsUsados.value)
  gameStore.unlockBadge('arquitecto-skills')
  userStore.addXP(250)
  router.push('/map')
}
</script>
