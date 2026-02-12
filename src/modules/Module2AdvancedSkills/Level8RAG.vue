<template>
  <!-- Nivel 8: Memory & RAG - Conocimiento Infinito -->
  <div class="min-h-screen px-4 py-8 md:py-12">
    <div class="max-w-4xl mx-auto">

      <!-- === FASE 1: Intro === -->
      <section v-if="fase === 'intro'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <div class="card-character border-pink-500/20">
            <div class="relative mx-auto w-20 h-20 mb-4">
              <div class="absolute inset-0 bg-pink-500/20 rounded-full animate-glow-pulse" />
              <div class="relative w-full h-full rounded-full bg-gradient-to-br from-pink-500/30 to-purple-500/30 border-2 border-pink-500/50 flex items-center justify-center animate-float">
                <span class="text-4xl">🧠</span>
              </div>
            </div>
            <h3 class="font-heading font-bold text-pink-400 text-sm mb-1">La Archivista</h3>
            <p class="text-gray-dim text-xs mb-3">Custodio de la Sabiduría Digital</p>
            <div class="bg-dark-void/60 rounded-lg px-4 py-3 border border-pink-500/20 relative">
              <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-dark-void/60 border-l border-t border-pink-500/20 rotate-45" />
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
          <span class="text-2xl">🧠</span>
          <div>
            <h1 class="font-heading font-bold text-xl text-cyber-cyan">Nivel 8: Memory & RAG</h1>
            <p class="text-xs text-gray-mist">Conocimiento Infinito</p>
          </div>
        </div>
        <TheoryPanel :tabs="tabsTeoria" @complete="fase = 'minijuego'" />
      </section>

      <!-- === FASE 3: Mini-juego (Sorting Flow) === -->
      <section v-else-if="fase === 'minijuego'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">🧩</span>
          <div>
            <h2 class="font-heading font-bold text-xl text-cyber-cyan">Puzzle: El Circuito RAG</h2>
            <p class="text-xs text-gray-mist">Ordena los pasos para recuperar memoria</p>
          </div>
        </div>

        <div class="max-w-md mx-auto space-y-3">
          <div
            v-for="(item, idx) in itemsPuzzle"
            :key="idx"
            class="p-4 bg-deep-space/50 border border-white/10 rounded-xl cursor-move hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5 transition-all flex items-center gap-4 group"
            draggable="true"
            @dragstart="onDragStart(idx)"
            @dragover.prevent
            @drop="onDrop(idx)"
          >
            <span class="text-gray-dim font-heading group-hover:text-cyber-cyan">{{ idx + 1 }}</span>
            <span class="text-sm text-gray-mist leading-tight">{{ item.text }}</span>
          </div>

          <div class="mt-8 text-center">
            <Button size="lg" @click="validarPuzzle">Validar Circuito →</Button>
          </div>
        </div>
      </section>

      <!-- === FASE 4: Completado (Módulo 2 Final) === -->
      <section v-else-if="fase === 'completado'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <div class="text-6xl">🏆</div>
          <h2 class="font-heading font-bold text-3xl text-gradient-cyan">¡Arquitecto Avanzado Completado!</h2>
          <div class="card-space">
             <p class="text-sm text-gray-mist mb-4 italic">"Has cruzado la frontera de lo básico. Теперь tienes el poder de crear agentes que piensan, actúan y recuerdan."</p>
             <div class="flex justify-between items-center text-xs text-gray-dim pt-4 border-t border-white/5">
                <span>XP Total del Módulo</span>
                <span class="text-cyber-cyan font-bold font-heading">+1100 XP</span>
             </div>
          </div>
          <div class="flex flex-col gap-3">
            <Button size="lg" @click="terminarMódulo">Finalizar Módulo 2</Button>
            <button @click="$router.push('/map')" class="btn-ghost text-xs uppercase tracking-widest">Volver al Mapa</button>
          </div>
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
import contenido from './content/level-8-rag.json'

const router = useRouter()
const userStore = useUserStore()
const gameStore = useGameStore()
const modulesStore = useModulesStore()

const fase = ref('intro')
const currentDialogueIdx = ref(0)
const itemsPuzzle = ref([...contenido.exercise.items].sort(() => Math.random() - 0.5))
const dragIdx = ref(null)

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

function onDragStart(idx) {
  dragIdx.value = idx
}

function onDrop(idx) {
  const item = itemsPuzzle.value.splice(dragIdx.value, 1)[0]
  itemsPuzzle.value.splice(idx, 0, item)
}

function validarPuzzle() {
  const correct = itemsPuzzle.value.every((item, idx) => item.order === idx + 1)
  if (correct) {
    fase.value = 'completado'
  } else {
    alert('¡Casi! El flujo de información no es correcto. Inténtalo de nuevo.')
  }
}

function terminarMódulo() {
  modulesStore.completarNivel('level-8', 3, 0)
  gameStore.unlockBadge('guardian-memoria')
  userStore.addXP(350)
  router.push('/map')
}
</script>
