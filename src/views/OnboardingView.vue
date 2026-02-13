<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-deep-space backdrop-blur-3xl">
    <!-- Background Decor -->
    <div class="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-soft-purple/10 to-transparent pointer-events-none" />
    <div class="stars fixed inset-0 opacity-30"></div>

    <!-- === PASO 1: Identificación === -->
    <section
      v-if="paso === 1"
      class="w-full max-w-lg z-10 animate-slide-up"
    >
      <div class="card-level shadow-2xl relative border-t border-cyber-cyan/30">
        <h2 class="font-heading font-bold text-3xl text-center text-white mb-2 mt-4">
          Identificación de Piloto
        </h2>
        <p class="text-center text-gray-mist text-sm mb-10">Personaliza tu avatar para la misión</p>

        <!-- Vista previa -->
        <div class="flex justify-center mb-10 relative">
          <div class="absolute inset-0 bg-cyber-cyan/20 blur-3xl scale-75 opacity-50 rounded-full"></div>
          <Astronaut :color="colorSeleccionado" size="xl" class="relative z-10" />
        </div>

        <!-- Nombre -->
        <div class="mb-8 space-y-2 px-2">
          <label class="block text-sm text-gray-mist font-medium ml-1 uppercase tracking-widest text-[10px]">Nombre de Clave</label>
          <input
            v-model="nombre"
            type="text"
            class="input-code w-full text-white bg-white/5 border-white/10 focus:border-cyber-cyan focus:bg-white/10 transition-all text-xl py-4"
            placeholder="Ej: AstroDev, NeoCoder..."
            maxlength="20"
            @keyup.enter="nombre.trim() ? siguientePaso() : null"
          />
        </div>

        <!-- Colores -->
        <div class="mb-10 px-2">
          <label class="block text-sm text-gray-mist font-medium ml-1 mb-4 uppercase tracking-widest text-[10px]">Color del Traje</label>
          <div class="flex gap-5 justify-center p-5 bg-white/5 rounded-2xl border border-white/10">
            <button
              v-for="color in colores"
              :key="color.id"
              class="w-12 h-12 rounded-full border-2 transition-all duration-300 relative group"
              :class="colorSeleccionado === color.id
                ? 'border-white scale-110 shadow-glow-white-sm'
                : 'border-transparent hover:border-white/50'"
              :style="{ background: color.hex }"
              @click="colorSeleccionado = color.id"
            >
               <span v-if="colorSeleccionado === color.id" class="absolute inset-0 flex items-center justify-center text-black font-bold">✓</span>
            </button>
          </div>
        </div>

        <Button
          size="xl"
          class="w-full shadow-glow-cyan"
          :disabled="!nombre.trim()"
          @click="siguientePaso"
        >
          Confirmar Identidad →
        </Button>
      </div>
    </section>

    <!-- === PASO 2: Tutorial / Bienvenida === -->
    <section
      v-else-if="paso === 2"
      class="max-w-xl w-full text-center z-10 space-y-12 animate-fade-in"
    >
      <div class="relative inline-block animate-float">
        <div class="absolute inset-0 bg-soft-purple/30 blur-[100px] scale-150 rounded-full"></div>
        <Astronaut :color="userStore.astronautColor" size="xl" />
      </div>

      <div class="card-character relative p-8 border border-soft-purple/30 bg-soft-purple/5 backdrop-blur-xl">
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-dark-bg border border-soft-purple px-4 py-1 rounded-full text-[10px] text-soft-purple font-black tracking-[0.2em]">
          TRANSMISIÓN ENTRANTE
        </div>
        
        <div class="space-y-6">
          <h3 class="text-2xl font-bold text-white leading-tight">
            "Bienvenido al Hangar, <span class="text-cyber-cyan">{{ userStore.username }}</span>"
          </h3>
          <p class="text-gray-mist leading-relaxed italic">
            "Soy El Maestro. Aquí no solo aprenderás a programar, aprenderás a ser el arquitecto de tu propia inteligencia."
          </p>
          
          <div class="grid grid-cols-1 gap-3 text-left">
            <div class="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-4">
              <span class="text-2xl">⚡</span>
              <p class="text-xs text-gray-200">Gana <span class="text-cyber-cyan font-bold">XP</span> completando misiones reales.</p>
            </div>
            <div class="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center gap-4">
              <span class="text-2xl">🗺️</span>
              <p class="text-xs text-gray-200">Sigue el <span class="text-soft-purple font-bold">Mapa Estelar</span> para desbloquear el sistema de 4 capas.</p>
            </div>
          </div>
        </div>
      </div>

      <Button size="xl" @click="finalizar" class="w-full shadow-glow-purple group">
        <span class="group-hover:tracking-widest transition-all uppercase font-black">Iniciar Motores 🚀</span>
      </Button>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useGameStore } from '@/stores/game'
import Astronaut from '@/components/game/Astronaut.vue'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const userStore = useUserStore()
const gameStore = useGameStore()

const paso = ref(1)
const nombre = ref('')
const colorSeleccionado = ref('cyan')

const colores = [
  { id: 'cyan', nombre: 'Cyan', hex: '#00F0FF' },
  { id: 'magenta', nombre: 'Magenta', hex: '#FF00FF' },
  { id: 'purple', nombre: 'Púrpura', hex: '#8B5CF6' },
  { id: 'yellow', nombre: 'Ámbar', hex: '#F59E0B' } 
]

onMounted(() => {
  if (userStore.onboardingCompleted) {
    router.push('/dashboard')
  }
})

function siguientePaso() {
  userStore.crearPerfil(nombre.value.trim(), colorSeleccionado.value, 'nada')
  gameStore.unlockBadge('recluta-espacial')
  userStore.addXP(50)
  paso.value = 2
}

function finalizar() {
  gameStore.updateStreak()
  router.push('/dashboard')
}
</script>

<style scoped>
.stars {
  background: radial-gradient(white, rgba(255,255,255,0) 2px),
              radial-gradient(white, rgba(255,255,255,0) 1px);
  background-size: 550px 550px, 350px 350px;
  animation: drift 120s linear infinite;
}

@keyframes drift {
  from { background-position: 0 0; }
  to { background-position: 550px 550px; }
}

@keyframes animate-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}
.animate-float {
  animation: animate-float 5s infinite ease-in-out;
}
</style>
