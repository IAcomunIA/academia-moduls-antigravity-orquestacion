<template>
  <div class="min-h-screen bg-dark-void text-white p-4 md:p-8">
    <div class="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20">
      
      <!-- Header & Tech Selector -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-deep-space/30 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
        <div class="space-y-2">
          <div class="flex items-center gap-3">
            <h1 class="text-3xl font-heading font-bold text-cyber-cyan">Architect Studio</h1>
            <span class="bg-neon-magenta/20 text-neon-magenta text-[10px] font-bold px-2 py-1 rounded border border-neon-magenta/30 uppercase tracking-widest">v2.0 Advanced</span>
          </div>
          <p class="text-gray-mist text-sm max-w-xl">
            Diseña la estructura de tu proyecto Antigravity. Selecciona un Framework para inyectar componentes específicos de arquitectura.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <!-- Tech Selector -->
          <div class="bg-dark-void/50 p-1 rounded-xl border border-white/10 flex gap-1">
            <button 
              v-for="tech in techOptions" 
              :key="tech.id"
              @click="selectTech(tech)"
              class="px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2"
              :class="selectedTech.id === tech.id ? 'bg-cyber-cyan text-dark-void shadow-glow-cyan' : 'hover:bg-white/5 text-gray-mist'"
            >
              <span>{{ tech.icon }}</span> {{ tech.name }}
            </button>
          </div>

          <div class="h-10 w-[1px] bg-white/10 hidden md:block"></div>

          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="text-[10px] text-gray-dim uppercase">Puntuación</p>
              <p class="text-xl font-bold text-white">{{ score }} <span class="text-cyber-cyan text-xs">XP</span></p>
            </div>
            <Button @click="resetGame" variant="outline" size="sm">Reiniciar</Button>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <!-- Sidebar: Items & Intelligence -->
        <div class="lg:col-span-4 space-y-6">
          <!-- Draggable Items Container -->
          <div class="bg-deep-space/40 p-6 rounded-2xl border border-white/5 backdrop-blur-md">
            <h3 class="text-sm font-bold uppercase tracking-widest text-cyber-cyan mb-6 flex items-center justify-between">
              <span class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></span>
                Planos del Proyecto
              </span>
              <span class="text-[10px] text-gray-dim normal-case italic">Drag to layers</span>
            </h3>
            
            <div class="space-y-3">
              <TransitionGroup name="list">
                <div 
                  v-for="item in availableItems" 
                  :key="item.id"
                  draggable="true"
                  @dragstart="onDragStart($event, item)"
                  class="group p-4 bg-dark-void/80 rounded-xl border border-white/10 cursor-grab active:cursor-grabbing hover:border-cyber-cyan/50 hover:bg-cyber-cyan/5 transition-all relative overflow-hidden"
                >
                  <div class="flex items-center gap-3 relative z-10">
                    <span class="text-2xl">{{ item.icon }}</span>
                    <div class="flex-1">
                      <p class="font-code font-bold text-sm text-white group-hover:text-cyber-cyan">{{ item.name }}</p>
                      <p class="text-[10px] text-gray-mist mt-1 leading-tight">{{ item.hint }}</p>
                    </div>
                  </div>
                  <div class="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </TransitionGroup>

              <!-- Locked State -->
              <div v-if="availableItems.length === 0" class="py-12 border-2 border-dashed border-white/5 rounded-xl text-center">
                 <p class="text-xs text-gray-dim italic">Todos los planos han sido desplegados.</p>
              </div>
            </div>
          </div>

          <!-- Component Inspector (Ghost Files) -->
          <div v-if="selectedDescription" class="bg-soft-purple/5 p-6 rounded-2xl border border-soft-purple/20 animate-fade-in">
             <div class="flex items-center gap-3 mb-4">
               <span class="text-3xl">{{ selectedDescription.icon }}</span>
               <div>
                  <h4 class="font-bold text-white">{{ selectedDescription.name }}</h4>
                  <p class="text-[10px] text-soft-purple uppercase font-bold tracking-tighter">Detalles del Nodo</p>
               </div>
             </div>
             <p class="text-sm text-gray-mist leading-relaxed mb-4">
               {{ selectedDescription.description }}
             </p>
             
             <!-- Ghost Files List -->
             <div class="space-y-2">
                <p class="text-[10px] text-gray-dim uppercase font-bold">Contenido sugerido:</p>
                <div v-for="file in (selectedDescription.files || defaultFiles)" :key="file" class="flex items-center gap-2 text-xs font-code text-soft-purple/80">
                  <span class="opacity-50">📄</span> {{ file }}
                </div>
             </div>
          </div>
        </div>

        <!-- Center: Layers & Drop Zones -->
        <div class="lg:col-span-8 space-y-6">
          <!-- Terminal Preview (The "Realness" factor) -->
          <div class="bg-[#1e1e1e] rounded-xl border border-white/10 shadow-massive overflow-hidden font-code">
            <div class="bg-[#323232] px-4 py-2 flex items-center justify-between">
              <div class="flex gap-1.5">
                <div class="w-3 h-3 rounded-full bg-error-red/50"></div>
                <div class="w-3 h-3 rounded-full bg-yellow-400/50"></div>
                <div class="w-3 h-3 rounded-full bg-success-green/50"></div>
              </div>
              <span class="text-[10px] text-gray-mist uppercase tracking-widest font-bold">Antigravity Terminal Preview</span>
              <button @click="copyFullScript" class="text-[10px] text-cyber-cyan hover:underline flex items-center gap-1">
                📋 Copiar Script
              </button>
            </div>
            <div class="p-6 text-sm text-gray-mist space-y-1 max-h-[200px] overflow-y-auto custom-scrollbar">
              <p class="text-success-green flex gap-2">
                <span class="opacity-50">$</span>
                <span># Generando estructura para {{ selectedTech.name }}...</span>
              </p>
              <div v-for="(cmd, idx) in generatedCommands" :key="idx" class="flex gap-2 group">
                <span class="text-cyber-cyan opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">$ {{ cmd.action }}</span>
                <span class="text-white break-all">{{ cmd.path }}</span>
              </div>
              <p v-if="generatedCommands.length === 0" class="text-gray-dim italic animate-pulse">Arrastra carpetas para ver los comandos de sistema...</p>
              <div class="w-2 h-4 bg-cyber-cyan/50 animate-pulse inline-block mt-2"></div>
            </div>
          </div>

          <!-- Drop Zones (Layers) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="layer in layers" 
              :key="layer.id"
              class="flex flex-col h-full bg-deep-space/20 rounded-2xl border-2 border-dashed transition-all p-6 relative min-h-[260px]"
              :class="[
                isOverLayer === layer.id ? 'border-cyber-cyan bg-cyber-cyan/5 scale-[1.01]' : 'border-white/10 hover:border-white/20',
                layer.completed ? 'border-success-green/30 bg-success-green/5' : ''
              ]"
              @dragover.prevent="onDragOver(layer.id)"
              @dragleave="onDragLeave"
              @drop="onDrop($event, layer.id)"
            >
              <!-- Layer Info -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-dark-void flex items-center justify-center border border-white/10">
                    <span class="text-[10px] font-bold" :class="layer.colorClass">{{ layer.number.split(' ')[1] }}</span>
                  </div>
                  <div>
                    <h3 class="font-heading font-bold text-lg leading-tight" :class="layer.colorClass">{{ layer.title }}</h3>
                    <p class="text-[10px] text-gray-dim uppercase tracking-tighter">{{ layer.description }}</p>
                  </div>
                </div>
                <div v-if="layer.completed" class="text-success-green">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>

              <!-- Main Drop Area -->
              <div class="flex-1 flex flex-wrap gap-2 items-start content-start py-4">
                 <TransitionGroup name="tag">
                   <div 
                     v-for="item in layer.items" 
                     :key="item.id"
                     class="group px-3 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 hover:bg-white/10 hover:border-cyber-cyan/30 transition-all cursor-pointer"
                     @click="selectedDescription = item"
                   >
                     <span class="text-sm">{{ item.icon }}</span>
                     <span class="text-xs font-code font-bold">{{ item.name }}</span>
                     <button @click.stop="removeItem(item, layer.id)" class="ml-1 text-gray-dim hover:text-error-red transition-colors font-bold">×</button>
                   </div>
                 </TransitionGroup>
                 
                 <div v-if="layer.items.length === 0" class="w-full h-full flex items-center justify-center border border-dashed border-white/5 rounded-xl text-gray-dim/20 italic text-xs py-10">
                   Suelte elementos de la Capa {{ layer.number.split(' ')[1] }} aquí
                 </div>
              </div>

              <!-- Layer Progress -->
              <div class="mt-4 pt-4 border-t border-white/5 flex flex-col gap-3">
                 <div class="flex justify-between items-center text-[10px]">
                    <span class="text-gray-dim uppercase tracking-widest font-bold">Consistencia de Capa</span>
                    <span :class="layer.completed ? 'text-success-green' : 'text-gray-dim'">{{ layer.items.length }}/{{ layer.required.length }} Requisitos</span>
                 </div>
                 <div class="grid grid-cols-4 gap-1">
                    <div 
                      v-for="(req, idx) in layer.required" 
                      :key="idx"
                      class="h-1 rounded-full transition-all duration-500"
                      :class="isRequirementMet(layer, req) ? 'bg-success-green shadow-glow-green-sm' : 'bg-white/5'"
                    ></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <footer class="fixed bottom-0 left-0 right-0 bg-deep-space/80 backdrop-blur-2xl border-t border-white/10 p-6 z-50 text-center animate-fade-in-up">
        <div v-if="allCompleted" class="flex flex-col md:flex-row items-center justify-center gap-6 max-w-7xl mx-auto">
          <div class="text-left flex items-center gap-4">
            <div class="bg-success-green/20 p-3 rounded-full text-success-green">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h4 class="font-bold text-white">¡Arquitectura Validada!</h4>
              <p class="text-xs text-gray-mist">Has reconstruido exitosamente la estructura para {{ selectedTech.name }}.</p>
            </div>
          </div>
          <div class="flex gap-4">
             <Button @click="finishLevel" variant="primary" class="shadow-glow-cyan px-8">Guardar Progreso & Reclamar XP</Button>
             <Button @click="copyFullScript" variant="outline" class="flex items-center gap-2">
                <span class="text-cyber-cyan">⚡</span> Descargar Script Base (.ps1)
             </Button>
          </div>
        </div>
        <div v-else class="text-gray-dim text-xs uppercase tracking-widest flex items-center justify-center gap-4">
           <span>Pendiente de validación:</span>
           <div class="flex gap-2">
             <div v-for="l in layers" :key="l.id" :class="l.completed ? 'text-success-green' : 'text-gray-dim/30'" class="transition-colors">
               ● <span class="text-[9px]">{{ l.title }}</span>
             </div>
           </div>
        </div>
      </footer>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useModulesStore } from '@/stores/modules'
import Button from '@/components/ui/Button.vue'

const router = useRouter()
const userStore = useUserStore()
const modulesStore = useModulesStore()

// --- Tech Options ---
const techOptions = [
  { id: 'vanilla', name: 'Standard (Python/JS)', icon: '🐍', extra: [] },
  { id: 'vue', name: 'VueJS Project', icon: '🟢', extra: [
    { id: 'vue-comp', name: 'src/components/', icon: '🧩', layerId: 'layer-3', description: 'Componentes SFC de Vue.', files: ['BaseButton.vue', 'MainContent.vue'], hint: 'UI Elements' },
    { id: 'vue-store', name: 'src/stores/', icon: '💾', layerId: 'layer-3', description: 'Estado global con Pinia.', files: ['userStore.js', 'projectStore.js'], hint: 'State Management' },
    { id: 'vue-router', name: 'src/router/', icon: '🛣️', layerId: 'layer-3', description: 'Navegación de la SPA.', files: ['index.js'], hint: 'Routing Logic' }
  ]},
  { id: 'react', name: 'React Project', icon: '⚛️', extra: [
    { id: 'react-hooks', name: 'src/hooks/', icon: '🎣', layerId: 'layer-3', description: 'Lógica reutilizable de React.', files: ['useAgent.js', 'useOrchestrator.js'], hint: 'Custom Hooks' },
    { id: 'react-ctx', name: 'src/context/', icon: '🌐', layerId: 'layer-3', description: 'Context API para estado global.', files: ['AppContext.js'], hint: 'Context Providers' },
    { id: 'react-views', name: 'src/pages/', icon: '📄', layerId: 'layer-3', description: 'Páginas/Rutas de React.', files: ['Dashboard.jsx', 'Settings.jsx'], hint: 'Pages/Screens' }
  ]}
]

const selectedTech = ref(techOptions[0])

// --- State & Config ---
const score = ref(0)
const isOverLayer = ref(null)
const selectedDescription = ref(null)
const defaultFiles = ['README.md', '.gitignore']

const BASE_ITEMS = [
  { id: 'dirs', name: 'directives/', icon: '📜', layerId: 'layer-1', description: 'Define el "Qué", los objetivos y reglas del sistema.', files: ['MASTER_DIRECTIVE.md', 'SYSTEM_ROLE.md'], hint: 'Reglas y SOPs' },
  { id: 'orch', name: 'orchestrators/', icon: '🎭', layerId: 'layer-2', description: 'Define el "Cómo", coordinando el flujo.', files: ['main_orch.md', 'sequential_flow.md'], hint: 'Flujos lógicos' },
  { id: 'agents', name: 'agents/', icon: '🤖', layerId: 'layer-2', description: 'Contiene los especialistas técnicos.', files: ['coder_agent.md', 'writer_agent.md'], hint: 'Roles especializados' },
  { id: 'exec', name: 'execution/', icon: '⚡', layerId: 'layer-3', description: 'Scripts deterministas de ejecución.', files: ['generator.py', 'processor.js'], hint: 'Scripts de acción' },
  { id: 'tmp', name: '.tmp/', icon: '📦', layerId: 'layer-3', description: 'Archivos temporales e intermedios.', files: ['state.json', 'buffer.txt'], hint: 'Datos volátiles' },
  { id: 'logs', name: 'logs/', icon: '📡', layerId: 'layer-4', description: 'Registro de auditoría y trazas.', files: ['antigravity.db', 'session.log'], hint: 'Auditoría y trazas' },
  { id: 'dash', name: 'dashboard/', icon: '📊', layerId: 'layer-4', description: 'UI de Observabilidad.', files: ['app.py', 'metrics.html'], hint: 'Visualización' }
]

const INITIAL_LAYERS = [
  { id: 'layer-1', number: 'Capa 1', title: 'Directiva', description: 'Propósito y Reglas', items: [], required: ['directives/'], colorClass: 'text-cyber-cyan' },
  { id: 'layer-2', number: 'Capa 2', title: 'Orquestación', description: 'Lógica y Especialistas', items: [], required: ['orchestrators/', 'agents/'], colorClass: 'text-soft-purple' },
  { id: 'layer-3', number: 'Capa 3', title: 'Ejecución', description: 'Procesamiento y Estado', items: [], required: ['execution/'], colorClass: 'text-neon-magenta' },
  { id: 'layer-4', number: 'Capa 4', title: 'Observabilidad', description: 'Auditoría y Análisis', items: [], required: ['logs/', 'dashboard/'], colorClass: 'text-success-green' }
]

const availableItems = ref([...BASE_ITEMS])
const layers = ref(INITIAL_LAYERS.map(l => ({ ...l, completed: false, items: [] })))

// --- Watch Tech Change ---
watch(selectedTech, (newTech) => {
  resetGame()
  // Add framework specific items to available
  if (newTech.extra.length > 0) {
    availableItems.value = [...BASE_ITEMS, ...newTech.extra]
    // Update layer requirements for Layer 3 (Execution) to include framework items
    const layer3 = layers.value.find(l => l.id === 'layer-3')
    layer3.required = ['execution/', ...newTech.extra.map(i => i.name)]
  }
})

// --- Computed ---
const generatedCommands = computed(() => {
  const commands = []
  layers.value.forEach(layer => {
    layer.items.forEach(item => {
      commands.push({ action: 'mkdir -p', path: item.name })
      const files = item.files || defaultFiles
      files.forEach(f => {
        commands.push({ action: 'touch', path: `${item.name}${f}` })
      })
    })
  })
  return commands
})

const allCompleted = computed(() => {
  return layers.value.every(l => l.completed)
})

// --- Methods ---
function selectTech(tech) {
  selectedTech.value = tech
}

function onDragStart(event, item) {
  event.dataTransfer.setData('itemId', item.id)
  event.dataTransfer.effectAllowed = 'move'
}

function onDragOver(layerId) {
  isOverLayer.value = layerId
}

function onDragLeave() {
  isOverLayer.value = null
}

function onDrop(event, layerId) {
  isOverLayer.value = null
  const itemId = event.dataTransfer.getData('itemId')
  const item = availableItems.value.find(i => i.id === itemId)

  if (item) {
    const layer = layers.value.find(l => l.id === layerId)
    
    if (item.layerId === layerId) {
      layer.items.push(item)
      availableItems.value = availableItems.value.filter(i => i.id !== itemId)
      score.value += 100
      selectedDescription.value = item
      checkLayerCompletion(layer)
    } else {
      score.value = Math.max(0, score.value - 20)
      alert(`⚠️ "${item.name}" debe ir en una capa que gestione ${item.hint.toLowerCase()}.`)
    }
  }
}

function removeItem(item, layerId) {
  const layer = layers.value.find(l => l.id === layerId)
  layer.items = layer.items.filter(i => i.id !== item.id)
  availableItems.value.push(item)
  checkLayerCompletion(layer)
}

function checkLayerCompletion(layer) {
  layer.completed = layer.required.every(reqName => 
    layer.items.some(i => i.name === reqName)
  )
}

function isRequirementMet(layer, reqName) {
  return layer.items.some(i => i.name === reqName)
}

function resetGame() {
  availableItems.value = [...BASE_ITEMS]
  layers.value = INITIAL_LAYERS.map(l => ({ ...l, completed: false, items: [] }))
  score.value = 0
  selectedDescription.value = null
}

function copyFullScript() {
  let script = "# Antigravity Academy Architecture Script\n"
  script += `# Tech Stack: ${selectedTech.value.name}\n\n`
  
  generatedCommands.value.forEach(cmd => {
    script += `${cmd.action} ${cmd.path}\n`
  })
  
  navigator.clipboard.writeText(script)
  alert("¡Script copiado! Guárdalo como .sh o .ps1 para ejecutarlo.")
}

function finishLevel() {
  modulesStore.completarNivel('level-builder', 3, 0, 180)
  userStore.addXP(score.value)
  router.push('/dashboard')
}

// Inicializar con la tecnología actual
selectTech(techOptions[0])
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #555; }

/* Transitions */
.list-enter-active, .list-leave-active { transition: all 0.4s ease; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateX(-30px); }

.tag-enter-active { animation: scale-up 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
@keyframes scale-up { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }

.shadow-glow-cyan { box-shadow: 0 0 20px rgba(0, 243, 255, 0.2); }
.shadow-glow-green-sm { box-shadow: 0 0 10px rgba(16, 185, 129, 0.4); }

.animate-fade-in-up { animation: fade-in-up 0.5s ease-out forwards; }
@keyframes fade-in-up { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
</style>
