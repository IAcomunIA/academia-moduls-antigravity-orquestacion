<template>
  <!-- Nivel 2: Orquestador - El Director de la Orquesta -->
  <div class="min-h-screen px-4 py-8 md:py-12">
    <div class="max-w-4xl mx-auto">

      <!-- === FASE 1: Intro === -->
      <section v-if="fase === 'intro'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <TheCoordinator :dialogo="dialogoActual" />

          <Button @click="siguienteDialogo">
            {{ currentDialogueIdx < contenido.intro_dialogue.length - 1 ? 'Siguiente →' : 'Comenzar la Lección →' }}
          </Button>
        </div>
      </section>

      <!-- === FASE 2: Teoría === -->
      <section v-else-if="fase === 'teoria'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">🎭</span>
          <div>
            <h1 class="font-heading font-bold text-xl text-cyber-cyan">Nivel 2: Orquestador</h1>
            <p class="text-xs text-gray-mist">La Estrategia de los Checkpoints</p>
          </div>
        </div>

        <TheoryPanel :tabs="tabsTeoria" @complete="fase = 'ejercicio'" />
      </section>

      <!-- === FASE 3: Ejercicio Práctico === -->
      <section v-else-if="fase === 'ejercicio'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">✍️</span>
          <div>
            <h2 class="font-heading font-bold text-xl text-cyber-cyan">Práctica: Diseña el Flujo</h2>
            <p class="text-xs text-gray-mist">Crea 3 Checkpoints para tu proyecto</p>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="md:col-span-2">
            <CodeEditor
              instruccion="Completa el orquestador definiendo 3 etapas (Checkpoints). Usa un lenguaje claro para los objetivos y agentes."
              :plantilla="contenido.exercise.template"
              placeholder="Define los checkpoints..."
              :rows="16"
              :validador="validarOrquestador"
              @complete="completarEjercicio"
            />
          </div>
          <div class="space-y-4">
            <HintButton :hints="contenido.exercise.validation.hints" @hint-used="(n) => hintsUsados = n" />
            
            <div class="card-space p-4 text-xs">
              <h4 class="text-soft-purple font-bold mb-2 uppercase tracking-tighter">Tip del Orquestador</h4>
              <p class="text-gray-mist leading-relaxed">
                Cada **Checkpoint** debe ser una unidad de trabajo que se pueda marcar como "Hecho" antes de pasar a la siguiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- === FASE 4: Mini-juego de Ordenamiento === -->
      <section v-else-if="fase === 'minijuego'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">🎮</span>
          <div>
            <h2 class="font-heading font-bold text-xl text-cyber-cyan">Mini-Juego: El Orden Lógico</h2>
            <p class="text-xs text-gray-mist">Ordena los pasos para construir una App exitosa</p>
          </div>
        </div>

        <div class="card-level max-w-2xl mx-auto">
          <p class="text-sm text-gray-mist mb-6 text-center">
            Haz clic en los elementos en el orden secuencial correcto (del 1 al 5).
          </p>

          <div class="grid gap-3 mb-8">
            <button
              v-for="(item, idx) in itemsMinijuego"
              :key="idx"
              class="w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300"
              :class="getEstiloItem(item)"
              :disabled="item.completado"
              @click="seleccionarItemMinijuego(item)"
            >
              <span class="text-sm font-medium">{{ item.text }}</span>
              <div class="flex items-center gap-2">
                <span v-if="item.posicionActual" class="text-xs font-heading font-bold bg-soft-purple/20 text-soft-purple px-2 py-1 rounded">
                  Paso {{ item.posicionActual }}
                </span>
                <span v-if="item.error" class="text-error-red text-lg">❌</span>
                <span v-if="item.completado" class="text-success-green text-lg">✅</span>
              </div>
            </button>
          </div>

          <div v-if="minijuegoCompletado" class="text-center space-y-4 animate-bounce-in">
            <p class="text-success-green font-heading font-bold text-lg">¡Logística Impecable! +75 XP</p>
            <Button size="lg" @click="fase = 'completado'">Ver Resultados →</Button>
          </div>
          
          <div v-else class="text-center">
            <button v-if="reintentos > 0" class="btn-ghost text-xs opacity-50 hover:opacity-100" @click="reiniciarMinijuego">
              ↻ Reiniciar intento
            </button>
          </div>
        </div>
      </section>

      <!-- === FASE 5: Completado === -->
      <section v-else-if="fase === 'completado'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <div class="text-5xl">🏆</div>
          <h2 class="font-heading font-bold text-2xl text-gradient-purple">¡Maestro Orquestador!</h2>
          
          <div class="card-space">
            <div class="space-y-3 text-sm">
              <div class="flex justify-between text-gray-mist">
                <span>Checkpoint Design</span>
                <span class="text-success-green">✅</span>
              </div>
              <div class="flex justify-between text-gray-mist">
                <span>Lógica de Secuencia</span>
                <span class="text-success-green">✅</span>
              </div>
              <hr class="border-gray-dim/20" />
              <div class="flex justify-between">
                <span class="text-gray-mist">Estrellas</span>
                <span class="text-warning-yellow">{{ '⭐'.repeat(estrellas) }}{{ '☆'.repeat(3 - estrellas) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-mist">XP acumulado</span>
                <span class="text-cyber-cyan font-bold">+200 XP</span>
              </div>
            </div>
          </div>

          <div class="card-character border-soft-purple/30">
            <p class="text-xs text-soft-purple font-heading mb-2">🎭 TheCoordinator</p>
            <p class="text-gray-mist text-sm italic">
              "Has alineado los instrumentos a la perfección. La sinfonía del desarrollo está por comenzar."
            </p>
          </div>

          <Button size="lg" @click="irSiguienteNivel">Ir al Nivel 3: Agentes →</Button>
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

// Componentes
import Button from '@/components/ui/Button.vue'
import TheoryPanel from '@/components/learning/TheoryPanel.vue'
import CodeEditor from '@/components/learning/CodeEditor.vue'
import HintButton from '@/components/learning/HintButton.vue'
import TheCoordinator from './components/TheCoordinator.vue'

// Datos
import contenido from './content/level-2-orquestador.json'

// Assets
import orchestratorImg from '@/assets/images/orchestrator-concept.png'

const router = useRouter()
const userStore = useUserStore()
const gameStore = useGameStore()
const modulesStore = useModulesStore()

const fase = ref('intro')
const currentDialogueIdx = ref(0)
const hintsUsados = ref(0)
const errores = ref(0)

// --- Intro ---
const dialogoActual = computed(() => {
  return contenido.intro_dialogue[currentDialogueIdx.value]?.text || '...'
})

function siguienteDialogo() {
  if (currentDialogueIdx.value < contenido.intro_dialogue.length - 1) {
    currentDialogueIdx.value++
  } else {
    fase.value = 'teoria'
  }
}

// --- Teoría ---
const tabsTeoria = computed(() => {
  return contenido.theory.sections.map((section, index) => ({
    titulo: section.title,
    icono: section.icon,
    contenido: [
      index === 0 ? { tipo: 'imagen', valor: orchestratorImg, caption: 'Mapa de Flujo del Orquestador' } : null,
      { tipo: 'texto', valor: section.content },
      section.code_example ? { tipo: 'codigo', valor: section.code_example } : null,
      { tipo: 'lista', items: section.key_points }
    ].filter(Boolean)
  }))
})

// --- Ejercicio (Validator) ---
function validarOrquestador(codigo) {
  const lower = codigo.toLowerCase()
  const contenidoLimpio = lower.replace(/\[\?\?\?\]/g, '')
  
  // Buscar presencia de CP1, CP2, CP3
  const cp1 = lower.includes('checkpoint 1')
  const cp2 = lower.includes('checkpoint 2')
  const cp3 = lower.includes('checkpoint 3')
  
  // Contar cuántos "objetivo", "agente" y "criterio" hay con contenido
  const countO = (contenidoLimpio.match(/objetivo:/g) || []).length
  const countA = (contenidoLimpio.match(/agente:/g) || []).length
  const countC = (contenidoLimpio.match(/criterio:/g) || []).length

  const tieneContenidoReal = contenidoLimpio.length > (contenido.exercise.template.length - 20)

  if (cp1 && cp2 && cp3 && countO >= 3 && countA >= 3 && countC >= 3 && tieneContenidoReal) {
    return { valido: true, feedback: '¡Brillante! Has diseñado un flujo sólido con hitos claros.' }
  }

  if (!cp1 || !cp2 || !cp3) {
    return { valido: false, incompleto: true, feedback: 'Asegúrate de mantener los 3 títulos de CHECKPOINT.' }
  }
  
  if (countO < 3 || countA < 3 || countC < 3 || !tieneContenidoReal) {
    return { valido: false, incompleto: true, feedback: 'Completa todos los campos [???] con información real sobre la landing page.' }
  }

  return { valido: false, incompleto: true, feedback: 'Revisa que no queden marcas [???] en tu orquestador.' }
}

function completarEjercicio() {
  userStore.addXP(100)
  fase.value = 'minijuego'
}

// --- Mini-juego (Sorting) ---
const itemsMinijuego = ref(
  contenido.minigame.items.map(item => ({
    ...item,
    posicionActual: null,
    completado: false,
    error: false
  }))
)

const ordenActual = ref(1)
const reintentos = ref(0)
const minijuegoCompletado = computed(() => itemsMinijuego.value.every(i => i.completado))

function seleccionarItemMinijuego(item) {
  if (item.completado) return

  if (item.correct_position === ordenActual.value) {
    item.completado = true
    item.posicionActual = ordenActual.value
    item.error = false
    ordenActual.value++
    
    if (minijuegoCompletado.value) {
      userStore.addXP(75)
    }
  } else {
    item.error = true
    errores.value++
    reintentos.value++
    setTimeout(() => { item.error = false }, 800)
  }
}

function getEstiloItem(item) {
  if (item.completado) return 'border-success-green bg-success-green/10 text-success-green'
  if (item.error) return 'border-error-red bg-error-red/10 animate-shake'
  return 'border-gray-dim/30 hover:border-soft-purple/50 bg-deep-space/40 text-gray-mist'
}

function reiniciarMinijuego() {
  ordenActual.value = 1
  itemsMinijuego.value.forEach(i => {
    i.completado = false
    i.posicionActual = null
    i.error = false
  })
}

// --- Finalización ---
const estrellas = computed(() => modulesStore.calcularEstrellas(hintsUsados.value, errores.value))

function irSiguienteNivel() {
  modulesStore.completarNivel('level-2', estrellas.value, hintsUsados.value)
  gameStore.unlockBadge('maestro-orquestacion')
  userStore.addXP(200)
  router.push('/module-1/level-3')
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.animate-shake {
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-bounce-in {
  animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes bounce-in {
  0% { transform: scale(0.3); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
