<template>
  <div
    class="flex flex-col items-center gap-2 group cursor-pointer"
    :class="{ 'opacity-40 pointer-events-none': nivel.estado === 'bloqueado' }"
    @click="navegarANivel"
  >
    <div
      class="relative w-20 h-20 rounded-full flex items-center justify-center text-3xl transition-all duration-300"
      :class="nodoClasses"
    >
      <span v-if="nivel.estado === 'bloqueado'">🔒</span>
      <span v-else>{{ nivel.icono }}</span>

      <div
        v-if="nivel.estado === 'disponible'"
        class="absolute inset-0 rounded-full border-2 border-cyan-500 dark:border-cyber-cyan animate-glow-pulse"
      />

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

    <span
      class="text-sm font-heading font-semibold text-center max-w-24 leading-tight transition-colors"
      :class="nivel.completado ? 'text-cyan-600 dark:text-cyber-cyan' : nivel.estado === 'disponible' ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-gray-dim'"
    >
      {{ nivel.titulo }}
    </span>

    <span class="text-xs text-slate-500 dark:text-gray-mist text-center max-w-28 leading-tight">
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

const nodoClasses = computed(() => {
  if (props.nivel.completado) {
    return 'bg-purple-100 dark:bg-deep-purple/40 border-2 border-cyan-400 dark:border-cyber-cyan shadow-lg dark:shadow-glow-cyan'
  }
  if (props.nivel.estado === 'disponible') {
    return 'bg-white dark:bg-deep-space border-2 border-purple-300 dark:border-soft-purple hover:border-cyan-400 dark:hover:border-cyber-cyan hover:shadow-lg dark:hover:shadow-glow-cyan'
  }
  return 'bg-slate-100 dark:bg-dark-void border-2 border-slate-200 dark:border-gray-dim/30'
})

function navegarANivel() {
  if (props.nivel.estado !== 'bloqueado' && props.nivel.ruta) {
    router.push(props.nivel.ruta)
  }
}
</script>
