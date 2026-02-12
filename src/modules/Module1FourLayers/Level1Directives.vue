<template>
  <!-- Nivel 1: Directivas - El Corazón del Agente -->
  <div class="min-h-screen px-4 py-8 md:py-12">
    <div class="max-w-4xl mx-auto">

      <!-- === FASE 1: Intro del personaje === -->
      <section v-if="fase === 'intro'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <TheMaestro :dialogo="dialogoActual" />

          <Button @click="siguienteDialogo">
            {{ currentDialogueIdx < contenido.intro_dialogue.length - 1 ? 'Siguiente →' : 'Comenzar la Lección →' }}
          </Button>
        </div>
      </section>

      <!-- === FASE 2: Teoría interactiva === -->
      <section v-else-if="fase === 'teoria'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">🏛️</span>
          <div>
            <h1 class="font-heading font-bold text-xl text-cyber-cyan">Nivel 1: Directivas</h1>
            <p class="text-xs text-gray-mist">El Corazón del Agente</p>
          </div>
        </div>

        <TheoryPanel :tabs="tabsTeoria" @complete="fase = 'ejercicio'" />
      </section>

      <!-- === FASE 3: Ejercicio práctico === -->
      <section v-else-if="fase === 'ejercicio'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">✍️</span>
          <div>
            <h2 class="font-heading font-bold text-xl text-cyber-cyan">Práctica: Tu Primera Directiva</h2>
            <p class="text-xs text-gray-mist">Define un agente tutor de matemáticas</p>
          </div>
        </div>

        <div class="grid md:grid-cols-3 gap-4 mb-6">
          <div class="md:col-span-2">
            <CodeEditor
              instruccion="Un amigo te pide ayuda para crear un agente que lo ayude a estudiar para exámenes de matemáticas. Completa la directiva definiendo: Rol, Contexto y al menos 2 Constraints."
              :plantilla="plantillaEjercicio"
              placeholder="Completa las secciones del agente..."
              :rows="14"
              :validador="validarDirectiva"
              @complete="completarEjercicio"
            />
          </div>
          <div>
            <HintButton :hints="hintsEjercicio" @hint-used="(n) => hintsUsados = n" />
          </div>
        </div>
      </section>

      <!-- === FASE 4: Mini-juego === -->
      <section v-else-if="fase === 'minijuego'">
        <div class="flex items-center gap-3 mb-6">
          <span class="text-2xl">🎮</span>
          <div>
            <h2 class="font-heading font-bold text-xl text-cyber-cyan">Mini-Juego: Conecta los Conceptos</h2>
            <p class="text-xs text-gray-mist">Arrastra cada componente a su definición</p>
          </div>
        </div>

        <!-- Juego de matching -->
        <div class="card-level max-w-2xl mx-auto">
          <div class="space-y-4">
            <div
              v-for="(pregunta, idx) in preguntasMinijuego"
              :key="idx"
              class="p-4 rounded-xl border transition-all duration-200"
              :class="pregunta.respondida
                ? (pregunta.correcta ? 'border-success-green/50 bg-success-green/5' : 'border-error-red/50 bg-error-red/5')
                : 'border-gray-dim/30 bg-deep-space/50'"
            >
              <p class="text-sm text-gray-mist mb-3">{{ pregunta.definicion }}</p>
              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="opcion in pregunta.opciones"
                  :key="opcion"
                  class="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                  :class="pregunta.seleccion === opcion
                    ? (pregunta.correcta ? 'bg-success-green text-white' : 'bg-error-red text-white')
                    : 'bg-soft-purple/20 text-soft-purple hover:bg-soft-purple/30'"
                  :disabled="pregunta.correcta"
                  @click="responderMinijuego(idx, opcion)"
                >
                  {{ opcion }}
                </button>
              </div>
            </div>
          </div>

          <div v-if="minijuegoCompleto" class="mt-6 text-center">
            <p class="text-success-green font-heading font-semibold mb-3">
              🎉 ¡Todos correctos! +75 XP
            </p>
            <Button @click="fase = 'completado'">
              Ver Resultados →
            </Button>
          </div>
        </div>
      </section>

      <!-- === FASE 5: Completado === -->
      <section v-else-if="fase === 'completado'" class="flex items-center justify-center min-h-[70vh]">
        <div class="max-w-lg text-center space-y-6 animate-slide-up">
          <div class="text-5xl">🎉</div>
          <h2 class="font-heading font-bold text-2xl text-gradient-cyan">¡Nivel Completado!</h2>

          <div class="card-space">
            <div class="space-y-3 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-mist">Teoría dominada</span>
                <span class="text-success-green">✅</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-mist">Ejercicio validado</span>
                <span class="text-success-green">✅</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-mist">Mini-juego superado</span>
                <span class="text-success-green">✅</span>
              </div>
              <hr class="border-gray-dim/20" />
              <div class="flex justify-between items-center">
                <span class="text-gray-mist">Estrellas</span>
                <div>
                  <span v-for="i in 3" :key="i">{{ i <= estrellas ? '⭐' : '☆' }}</span>
                </div>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-mist">XP ganado</span>
                <span class="text-cyber-cyan font-bold">+{{ xpGanado }} XP</span>
              </div>
            </div>
          </div>

          <div class="card-character">
            <p class="text-xs text-soft-purple font-heading mb-2">🏛️ El Maestro</p>
            <p class="text-gray-mist text-sm">
              "Excelente trabajo, cadete. Has dominado el arte de las Directivas. ¡Ahora conocerás al Coordinador!"
            </p>
          </div>

          <Button size="lg" @click="irSiguienteNivel">
            Continuar al Nivel 2 →
          </Button>
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

// Componentes UI/Juego
import Button from '@/components/ui/Button.vue'
import TheoryPanel from '@/components/learning/TheoryPanel.vue'
import CodeEditor from '@/components/learning/CodeEditor.vue'
import HintButton from '@/components/learning/HintButton.vue'
import Validator from '@/components/learning/Validator.vue'
import TheMaestro from './components/TheMaestro.vue'

// Datos
import contenido from './content/level-1-directivas.json'

const router = useRouter()
const userStore = useUserStore()
const gameStore = useGameStore()
const modulesStore = useModulesStore()

onMounted(() => {
  console.log('Nivel 1 Montado', contenido)
  if (!contenido) {
    console.error('ERROR CRITICO: Contenido no cargado')
  }
})

const fase = ref('intro')
const currentDialogueIdx = ref(0)
const hintsUsados = ref(0)
const errores = ref(0)

// Diálogo actual del intro con protección
const dialogoActual = computed(() => {
  if (!contenido || !contenido.intro_dialogue) return '...'
  return contenido.intro_dialogue[currentDialogueIdx.value]?.text || ''
})

function siguienteDialogo() {
  if (currentDialogueIdx.value < contenido.intro_dialogue.length - 1) {
    currentDialogueIdx.value++
  } else {
    fase.value = 'teoria'
  }
}

// Convertir secciones de teoría del JSON al formato del TheoryPanel con protección
const tabsTeoria = computed(() => {
  if (!contenido?.theory?.sections) return []
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

// === Ejercicio ===
const plantillaEjercicio = `# Directiva: Tutor de Matemáticas

## Rol
[Escribe aquí: ¿Qué es este agente?]

## Contexto
[Escribe aquí: ¿Para qué/quién trabaja?]

## Constraints
- [Límite 1]
- [Límite 2]`

const hintsEjercicio = [
  'Recuerda definir quién es el agente en la sección Rol. Debe ser específico: "Tutor de matemáticas especializado en..."',
  'El contexto debería explicar para quién trabaja el agente y en qué situación.',
  'Los constraints definen los límites. Ejemplo: "Solo álgebra básica", "No da respuestas directas".',
  'Ejemplo de solución: Rol = "Tutor paciente de álgebra y geometría para secundaria"'
]

// Validador del ejercicio
function validarDirectiva(codigo) {
  const lower = codigo.toLowerCase()
  
  // Limpiamos el código de los placeholders para validar el contenido real
  const contenidoLimpio = lower.replace(/\[escribe aquí:?.*?\]/g, '')
  
  const tieneRol = lower.includes('## rol') && contenidoLimpio.split('## rol')[1]?.split('##')[0]?.trim().length > 5
  const tieneContexto = lower.includes('## contexto') && contenidoLimpio.split('## contexto')[1]?.split('##')[0]?.trim().length > 5
  const tieneConstraints = (lower.match(/^- .+/gm) || []).length >= 2

  // Extraer el texto del rol para validar longitud
  const textoRol = contenidoLimpio.split('## rol')[1]?.split('##')[0]?.trim() || ''
  const rolSuficiente = textoRol.length > 10

  if (tieneRol && tieneContexto && tieneConstraints && rolSuficiente) {
    return { valido: true, feedback: '¡Excelente! Tu directiva está bien estructurada y es específica.' }
  }

  if (!tieneRol || !rolSuficiente) {
    return { 
      valido: false, 
      incompleto: true, 
      feedback: 'El Rol del agente es muy corto o falta completarlo. ¡Dime qué tipo de tutor es!' 
    }
  }
  if (!tieneContexto) {
    return { 
      valido: false, 
      incompleto: true, 
      feedback: 'Cuéntame un poco más en el Contexto: ¿para quién es este tutor?' 
    }
  }
  if (!tieneConstraints) {
    return { 
      valido: false, 
      incompleto: true, 
      feedback: 'Agrega al menos 2 reglas de comportamiento (usa el guion "- " al inicio).' 
    }
  }

  return { valido: false, incompleto: true, feedback: 'Revisa que todas las secciones tengan contenido real.' }
}

function completarEjercicio() {
  userStore.addXP(hintsUsados.value === 0 ? 50 : 30)
  fase.value = 'minijuego'
}

// === Mini-juego ===
const preguntasMinijuego = ref([
  {
    definicion: 'Define QUÉ ES el agente y su área de expertise',
    respuestaCorrecta: 'Rol',
    opciones: ['Rol', 'Contexto', 'Constraints'],
    seleccion: null,
    respondida: false,
    correcta: false
  },
  {
    definicion: 'Define DÓNDE y PARA QUÉ trabaja el agente',
    respuestaCorrecta: 'Contexto',
    opciones: ['Rol', 'Contexto', 'Constraints'],
    seleccion: null,
    respondida: false,
    correcta: false
  },
  {
    definicion: 'Define los LÍMITES y lo que NO DEBE HACER',
    respuestaCorrecta: 'Constraints',
    opciones: ['Rol', 'Contexto', 'Constraints'],
    seleccion: null,
    respondida: false,
    correcta: false
  }
])

const minijuegoCompleto = computed(() =>
  preguntasMinijuego.value.every(p => p.correcta)
)

function responderMinijuego(idx, opcion) {
  const pregunta = preguntasMinijuego.value[idx]
  pregunta.seleccion = opcion
  pregunta.respondida = true
  pregunta.correcta = opcion === pregunta.respuestaCorrecta

  if (!pregunta.correcta) {
    errores.value++
    // Resetear después de 1s para reintentar
    setTimeout(() => {
      pregunta.respondida = false
      pregunta.seleccion = null
    }, 1000)
  }

  if (minijuegoCompleto.value) {
    userStore.addXP(75)
  }
}

// === Completado ===
const estrellas = computed(() => modulesStore.calcularEstrellas(hintsUsados.value, errores.value))
const xpGanado = computed(() => {
  let total = 150 // Base
  if (hintsUsados.value === 0) total += 20
  return total
})

function irSiguienteNivel() {
  // Registrar nivel completado
  modulesStore.completarNivel('level-1', estrellas.value, hintsUsados.value)
  gameStore.unlockBadge('arquitecto-directivas')
  gameStore.unlockBadge('navegante')
  userStore.addXP(150)

  router.push('/module-1/level-2')
}
</script>
