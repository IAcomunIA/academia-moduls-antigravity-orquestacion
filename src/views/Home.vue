<template>
  <div class="min-h-screen flex flex-col relative">
    
    <div class="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-slate-100/50 dark:via-deep-space/50 to-slate-100 dark:to-deep-space pointer-events-none" />

    <div v-if="userStore.onboardingCompleted" class="relative z-10 flex-1 py-8 px-4 md:px-8">
      <div class="max-w-4xl mx-auto">
        
        <main class="w-full space-y-8">
          
          <div class="bg-gradient-to-r from-purple-100 to-cyan-50 dark:from-soft-purple/20 dark:to-cyber-cyan/10 rounded-2xl p-6 border border-purple-200 dark:border-white/10 flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-1">¡Bienvenido a la Base!</h2>
              <p class="text-slate-600 dark:text-gray-mist text-sm">Hay <span class="text-cyan-600 dark:text-cyber-cyan font-bold">3 misiones</span> nuevas esperando tu atención.</p>
            </div>
            <div class="text-4xl">🚀</div>
          </div>

          <div class="card-level p-0 overflow-hidden">
            <div class="p-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center bg-slate-50 dark:bg-white/5">
              <h3 class="font-heading font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span>🏆</span> Top Pilotos
              </h3>
              <span class="text-xs text-slate-500 dark:text-gray-dim uppercase tracking-wider">Esta Semana</span>
            </div>
            
            <div class="divide-y divide-slate-100 dark:divide-white/5">
              <div v-for="(user, idx) in leaderboard" :key="idx" class="p-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <div class="font-mono text-lg font-bold w-6 text-center" 
                  :class="idx === 0 ? 'text-amber-500' : (idx === 1 ? 'text-slate-400' : (idx === 2 ? 'text-orange-500' : 'text-slate-400 dark:text-gray-dim'))">
                  {{ idx + 1 }}
                </div>
                <div class="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-lg">
                  {{ user.avatar }}
                </div>
                <div class="flex-1">
                  <p class="text-sm font-bold text-slate-800 dark:text-white">{{ user.name }}</p>
                  <p class="text-xs text-slate-500 dark:text-gray-mist">{{ user.rango }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-bold text-cyan-600 dark:text-cyber-cyan">{{ user.xp }} XP</p>
                  <p class="text-[10px] text-slate-400 dark:text-gray-dim">{{ user.badges }} insignias</p>
                </div>
              </div>
            </div>
            
            <div class="p-3 text-center border-t border-slate-200 dark:border-white/10">
              <button class="text-xs text-cyan-600 dark:text-cyber-cyan hover:underline">Ver clasificación completa</button>
            </div>
          </div>

          <div class="card-level p-6 relative overflow-hidden group cursor-pointer border-cyan-200 dark:border-cyber-cyan/30 bg-cyan-50/50 dark:bg-cyber-cyan/5" @click="router.push('/module-3/level-1')">
             <div class="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-cyan-100 dark:from-cyber-cyan/20 to-transparent pointer-events-none"></div>
             <div class="absolute -top-2 -right-2 bg-cyan-500 dark:bg-cyber-cyan text-white dark:text-deep-space text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">Nuevo</div>
             <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
               <span>🎮</span> Gestión de Agentes
             </h3>
             <p class="text-sm text-slate-600 dark:text-gray-mist mb-4 pr-12">Configura la autonomía de tus enjambres y domina el Agent Manager.</p>
             <span class="text-xs font-bold text-cyan-600 dark:text-cyber-cyan group-hover:underline">Iniciar Misión →</span>
          </div>

          <div class="card-level p-6 relative overflow-hidden group cursor-pointer" @click="router.push('/module-1/bonus-tools')">
             <div class="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-purple-100 dark:from-soft-purple/20 to-transparent pointer-events-none"></div>
             <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
               <span>🛠️</span> Herramientas Secretas
             </h3>
             <p class="text-sm text-slate-600 dark:text-gray-mist mb-4 pr-12">Descubre los comandos ocultos como @codeContext y los archivos de configuración de agentes.</p>
             <span class="text-xs font-bold text-purple-600 dark:text-soft-purple group-hover:underline">Leer Documentación →</span>
          </div>

        </main>

      </div>
    </div>


    <section
      v-else-if="paso === 0"
      class="flex-1 flex flex-col items-center justify-center px-4 z-10 relative overflow-hidden"
    >
      <div class="absolute inset-0 opacity-20 pointer-events-none dark:opacity-100">
        <div class="stars"></div>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto py-12">
        <div class="text-left space-y-8 animate-slide-right order-2 lg:order-1">
          <div class="inline-block px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyber-cyan/10 border border-cyan-200 dark:border-cyber-cyan/30 text-cyan-700 dark:text-cyber-cyan text-xs font-bold tracking-widest uppercase mb-4">
            🚀 Nueva Era de Inteligencia Artificial
          </div>
          
          <h1 class="font-heading font-black text-5xl md:text-7xl text-slate-800 dark:text-white leading-tight">
            Antigravity<br />
            <span class="text-gradient-cyan">Academy</span>
          </h1>

          <p class="text-slate-600 dark:text-gray-mist text-lg md:text-xl leading-relaxed max-w-lg">
            Domina el arte de orquestar agentes inteligentes. De directivas base a arquitecturas de memoria RAG masiva.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="xl" @click="paso = 1" class="shadow-lg dark:shadow-glow-cyan group">
              Empezar Entrenamiento
              <span class="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </Button>
            <button class="px-8 py-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm font-bold text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
              Explorar Framework
            </button>
          </div>

          <div class="flex gap-8 pt-8 border-t border-slate-200 dark:border-white/5">
            <div>
              <p class="text-2xl font-bold text-slate-800 dark:text-white">08</p>
              <p class="text-[10px] text-slate-500 dark:text-gray-dim uppercase tracking-widest">Niveles</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-slate-800 dark:text-white">02</p>
              <p class="text-[10px] text-slate-500 dark:text-gray-dim uppercase tracking-widest">Módulos</p>
            </div>
            <div>
              <p class="text-2xl font-bold text-slate-800 dark:text-white">3k+</p>
              <p class="text-[10px] text-slate-500 dark:text-gray-dim uppercase tracking-widest">XP Ganables</p>
            </div>
          </div>
        </div>

        <div class="relative order-1 lg:order-2 flex justify-center lg:justify-end">
          <div class="relative animate-float">
             <div class="absolute inset-0 bg-cyan-200/50 dark:bg-cyber-cyan/20 blur-[100px] rounded-full scale-110"></div>
             <img 
               src="@/assets/illustrations/hero-astronaut.png" 
               alt="Antigravity Hero" 
               class="relative z-10 w-full max-w-[500px] object-contain drop-shadow-2xl"
             />
          </div>
        </div>
      </div>
      
      <div class="max-w-6xl mx-auto w-full py-20 animate-fade-in" style="animation-delay: 0.5s">
         <div class="bg-white/80 dark:bg-deep-space/40 border border-slate-200 dark:border-white/5 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative shadow-card-light dark:shadow-none">
          <div class="absolute top-0 right-0 w-64 h-64 bg-purple-100/50 dark:bg-soft-purple/10 blur-[80px] rounded-full"></div>
          
          <div class="flex-1 space-y-6 relative z-10">
            <h2 class="text-3xl font-heading font-extrabold text-slate-800 dark:text-white">No solo código, sino <span class="text-gradient-purple">Sinergia</span></h2>
            <p class="text-slate-600 dark:text-gray-mist leading-relaxed">
              En Antigravity, no programas bots. Construyes especialistas que colaboran en paralelo, aprenden de sus errores y consumen herramientas reales a través de MCP.
            </p>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
                <p class="text-cyan-600 dark:text-cyber-cyan font-bold text-lg mb-1">Directivas</p>
                <p class="text-[10px] text-slate-500 dark:text-gray-dim">Instrucciones de alto nivel</p>
              </div>
              <div class="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5">
                <p class="text-purple-600 dark:text-soft-purple font-bold text-lg mb-1">MCP</p>
                <p class="text-[10px] text-slate-500 dark:text-gray-dim">Conexión con el mundo</p>
              </div>
            </div>
          </div>

          <div class="flex-1 relative">
            <img 
              src="@/assets/illustrations/three-agents.png" 
              alt="Multi Agent System" 
              class="w-full max-w-[400px] mx-auto drop-shadow-massive filter brightness-110"
            />
          </div>
        </div>
      </div>
    </section>

    <section
      v-else-if="paso === 1 && !userStore.onboardingCompleted"
      class="flex-1 flex items-center justify-center px-4 py-8 z-10"
    >
         <div class="card-level max-w-lg w-full animate-slide-up shadow-2xl relative border-t border-cyan-200 dark:border-cyber-cyan/30">
        <button 
          @click="paso = 0" 
          class="absolute top-4 left-4 text-slate-400 dark:text-gray-dim hover:text-slate-700 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
          title="Volver al inicio"
        >
          ←
        </button>

        <h2 class="font-heading font-bold text-2xl text-center text-cyan-600 dark:text-cyber-cyan mb-2 mt-2">
          Identificación de Piloto
        </h2>
        <p class="text-center text-slate-500 dark:text-gray-mist text-sm mb-8">Personaliza tu avatar para la misión</p>

        <div class="flex justify-center mb-8 relative">
          <div class="absolute inset-0 bg-gradient-to-t from-cyan-100 dark:from-cyber-cyan/20 to-transparent rounded-full blur-xl scale-75 opacity-50"></div>
          <Astronaut :color="colorSeleccionado" size="lg" class="filter drop-shadow-xl" />
        </div>

        <div class="mb-6 space-y-2">
          <label class="block text-sm text-slate-600 dark:text-gray-mist font-medium ml-1">Nombre de Clave</label>
          <input
            v-model="nombre"
            type="text"
            class="input-code w-full text-slate-800 dark:text-white bg-slate-100 dark:bg-deep-space/80 focus:bg-white dark:focus:bg-deep-space transition-colors"
            placeholder="Ej: AstroDev, CommanderCode..."
            maxlength="20"
            @keyup.enter="nombre.trim() ? crearAstronauta() : null"
          />
        </div>

        <div class="mb-6 space-y-3">
          <label class="block text-sm text-slate-600 dark:text-gray-mist font-medium ml-1">Color del Traje</label>
          <div class="flex gap-4 justify-center p-4 bg-slate-50 dark:bg-deep-space/40 rounded-xl border border-slate-200 dark:border-white/5">
            <button
              v-for="color in colores"
              :key="color.id"
              class="w-12 h-12 rounded-full border-2 transition-all duration-300 relative group"
              :class="colorSeleccionado === color.id
                ? 'border-slate-800 dark:border-white scale-110 shadow-lg'
                : 'border-transparent hover:border-slate-400 dark:hover:border-white/50 hover:scale-105'"
              :style="{ background: color.hex }"
              :aria-label="`Color ${color.nombre}`"
              @click="colorSeleccionado = color.id"
            >
               <span v-if="colorSeleccionado === color.id" class="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">✓</span>
            </button>
          </div>
        </div>

        <div class="mb-8 space-y-3">
          <label class="block text-sm text-slate-600 dark:text-gray-mist font-medium ml-1">Nivel de Conocimiento IA</label>
          <div class="grid grid-cols-1 gap-3">
            <button
              v-for="nivel in nivelesExperiencia"
              :key="nivel.id"
              class="w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 text-sm flex items-center gap-3 group relative overflow-hidden"
              :class="experiencia === nivel.id
                ? 'border-cyan-400 dark:border-cyber-cyan bg-cyan-50 dark:bg-cyber-cyan/10 text-slate-800 dark:text-white'
                : 'border-slate-200 dark:border-gray-dim/30 text-slate-600 dark:text-gray-mist hover:border-slate-300 dark:hover:border-gray-mist hover:bg-slate-50 dark:hover:bg-white/5'"
              @click="experiencia = nivel.id"
            >
              <div 
                v-if="experiencia === nivel.id" 
                class="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 dark:bg-cyber-cyan"
              ></div>
              <span class="text-xl group-hover:scale-110 transition-transform">{{ nivel.icono }}</span>
              <span class="font-medium">{{ nivel.texto }}</span>
            </button>
          </div>
        </div>

        <Button
          size="lg"
          class="w-full relative overflow-hidden group"
          :disabled="!nombre.trim()"
          @click="crearAstronauta"
        >
          <span class="relative z-10 group-hover:tracking-wider transition-all">Confirmar Identidad →</span>
        </Button>
      </div>
    </section>

    <section
      v-else-if="paso === 2 && !userStore.onboardingCompleted"
      class="flex-1 flex items-center justify-center px-4 z-10"
    >
      <div class="max-w-lg w-full text-center animate-slide-up space-y-8 relative">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-100/30 dark:bg-soft-purple/10 blur-3xl rounded-full pointer-events-none"></div>

        <div class="relative z-10 animate-float">
          <Astronaut :color="userStore.astronautColor" size="xl" />
        </div>

        <div class="card-character relative z-10 transform transition-all hover:scale-[1.02]">
          <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-white dark:bg-deep-space px-3 py-1 rounded-full border border-purple-200 dark:border-soft-purple text-xs text-purple-600 dark:text-soft-purple font-heading flex items-center gap-2 shadow-lg">
            <span>🏛️</span> TRANSMISIÓN ENTRANTE
          </div>
          
          <div class="pt-4 space-y-4">
            <p class="text-slate-800 dark:text-white text-lg font-medium">
              "¡Bienvenido a bordo, <span class="text-cyan-600 dark:text-cyber-cyan font-bold">{{ userStore.username }}</span>!"
            </p>
            <p class="text-slate-600 dark:text-gray-mist text-sm leading-relaxed">
              Soy <strong class="text-purple-600 dark:text-soft-purple">El Maestro</strong>. Te guiaré a través de los secretos de la Inteligencia Artificial.
            </p>
            <div class="bg-slate-50 dark:bg-deep-space/50 p-3 rounded-lg border border-slate-200 dark:border-white/5 text-xs text-left text-slate-600 dark:text-gray-mist space-y-2">
              <div class="flex items-center gap-2">
                <span class="text-lg">🗺️</span>
                <span>Usa el <strong>Mapa</strong> para navegar entre misiones de aprendizaje.</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">⚡</span>
                <span>Gana <strong>XP</strong> y sube de rango completando desafíos.</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-lg">💡</span>
                <span>Si te atascas, busca el botón de ayuda.</span>
              </div>
            </div>
          </div>
        </div>

        <Button size="xl" @click="completarOnboarding" class="w-full shadow-lg dark:shadow-glow-purple">
          Iniciar Motores 🚀
        </Button>
      </div>
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

const paso = ref(0)
const nombre = ref('')
const colorSeleccionado = ref('cyan')
const experiencia = ref('nada')

const leaderboard = [
  { name: 'AnaNeural', xp: 4500, rango: 'Comandante', avatar: '👩‍🚀', badges: 8 },
  { name: 'DevZero', xp: 4120, rango: 'Ingeniero', avatar: '👨‍🚀', badges: 7 },
  { name: 'SynthWave', xp: 3890, rango: 'Especialista', avatar: '🤖', badges: 6 },
  { name: 'PromptMaster', xp: 3200, rango: 'Explorador', avatar: '👾', badges: 4 },
  { name: 'CodeNinja', xp: 2900, rango: 'Recluta', avatar: '🐱‍👤', badges: 3 },
]

const colores = [
  { id: 'cyan', nombre: 'Cyan', hex: '#00F0FF' },
  { id: 'magenta', nombre: 'Magenta', hex: '#FF00FF' },
  { id: 'purple', nombre: 'Púrpura', hex: '#8B5CF6' },
  { id: 'yellow', nombre: 'Ámbar', hex: '#F59E0B' } 
]

const nivelesExperiencia = [
  { id: 'nada', icono: '🌱', texto: 'Explorador Novato (Principiante)' },
  { id: 'algo', icono: '🔧', texto: 'Técnico de Hangar (Intermedio)' },
  { id: 'bastante', icono: '⚡', texto: 'Ingeniero Estelar (Avanzado)' }
]

function crearAstronauta() {
  if (!nombre.value.trim()) return
  userStore.crearPerfil(nombre.value.trim(), colorSeleccionado.value, experiencia.value)
  gameStore.unlockBadge('recluta-espacial')
  userStore.addXP(50)
  paso.value = 2
}

function completarOnboarding() {
  gameStore.updateStreak()
}
</script>

<style scoped>
@keyframes pulse-slow {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
.animate-pulse-slow {
  animation: pulse-slow 3s infinite ease-in-out;
}

.stars {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(white, rgba(255,255,255,0) 2px),
              radial-gradient(white, rgba(255,255,255,0) 1px),
              radial-gradient(white, rgba(255,255,255,0) 1.5px);
  background-size: 550px 550px, 350px 350px, 250px 250px;
  background-position: 0 0, 40px 60px, 130px 270px;
  animation: star-drift 100s linear infinite;
}

@keyframes star-drift {
  from { background-position: 0 0, 40px 60px, 130px 270px; }
  to { background-position: 550px 550px, 350px 350px, 250px 250px; }
}

.text-gradient-purple {
  background: linear-gradient(to right, #7C3AED, #A78BFA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
