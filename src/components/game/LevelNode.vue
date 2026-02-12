<template>
  <!-- Nodo de nivel en el mapa de niveles -->
  <div
    class="flex flex-col items-center gap-2 group cursor-pointer"
    :class="{ 'opacity-40 pointer-events-none': nivel.estado === 'bloqueado' }"
    @click="navegarANivel"
  >
    <!-- Nodo circular -->
    <div
      class="relative w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300"
      :class="nodoClasses"
    >
      <!-- Candado para niveles bloqueados -->
      <span v-if="nivel.estado === 'bloqueado'">🔒</span>
      <!-- Icono del nivel -->
      <span v-else>{{ nivel.icono }}</span>

      <!-- Indicador de progreso (anillo) -->
      <div
        v-if="nivel.estado === 'disponible'"
        class="absolute inset-0 rounded-full border-2 border-cyber-cyan animate-glow-pulse"
      />

      <!-- Estrellas para completados -->
      <div
        v-if="nivel.completado"
        class="absolute -bottom-1 flex gap-0.5"
      >
        <span
          v-for="i in 3"
          :key="i"
          class="text-xs"
        >
          {{ i <= nivel.estrellas ? '⭐' : '☆' }}
        </span>
      </div>
    </div>

    <!-- Título -->
    <span
      class="text-sm font-heading font-semibold text-center max-w-24 leading-tight transition-colors"
      :class="nivel.completado ? 'text-cyber-cyan' : nivel.estado === 'disponible' ? 'text-white' : 'text-gray-dim'"
    >
      {{ nivel.titulo }}
    </span>

    <!-- Subtítulo -->
    <span class="text-xs text-gray-mist text-center max-w-28 leading-tight">
      {{ nivel.subtitulo }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  nivel: { type: Object, required: true }
})

const router = useRouter()

// Clases del nodo según estado
const nodoClasses = computed(() => {
  if (props.nivel.completado) {
    return 'bg-deep-purple/40 border-2 border-cyber-cyan shadow-glow-cyan'
  }
  if (props.nivel.estado === 'disponible') {
    return 'bg-deep-space border-2 border-soft-purple hover:border-cyber-cyan hover:shadow-glow-cyan'
  }
  return 'bg-dark-void border-2 border-gray-dim/30'
})

// Navegar al nivel
function navegarANivel() {
  if (props.nivel.estado !== 'bloqueado' && props.nivel.ruta) {
    router.push(props.nivel.ruta)
  }
}
</script>
