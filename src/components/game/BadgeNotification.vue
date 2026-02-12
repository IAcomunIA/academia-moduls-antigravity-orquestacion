<template>
  <!-- Notificación toast de badge desbloqueado -->
  <Transition name="badge-toast">
    <div
      v-if="gameStore.badgePendiente"
      class="fixed bottom-6 right-6 z-[200] animate-slide-up"
    >
      <div class="bg-dark-void border border-cyber-cyan/50 rounded-2xl p-5 shadow-glow-cyan max-w-sm flex items-center gap-4">
        <!-- Icono del badge con animación -->
        <div class="text-4xl animate-float">
          {{ gameStore.badgePendiente.icono }}
        </div>

        <!-- Info del badge -->
        <div class="flex-1">
          <p class="text-xs text-cyber-cyan font-heading font-semibold uppercase tracking-wider mb-1">
            ¡Badge Desbloqueado!
          </p>
          <p class="text-white font-bold text-sm">
            {{ gameStore.badgePendiente.nombre }}
          </p>
          <p class="text-gray-mist text-xs mt-0.5">
            {{ gameStore.badgePendiente.descripcion }}
          </p>
        </div>

        <!-- Botón cerrar -->
        <button
          class="text-gray-dim hover:text-white transition-colors self-start"
          @click="gameStore.limpiarBadgePendiente()"
          aria-label="Cerrar notificación"
        >
          ✕
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { watch } from 'vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

// Auto-cerrar después de 5 segundos
watch(() => gameStore.badgePendiente, (badge) => {
  if (badge) {
    setTimeout(() => gameStore.limpiarBadgePendiente(), 5000)
  }
})
</script>
