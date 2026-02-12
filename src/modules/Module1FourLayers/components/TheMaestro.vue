<template>
  <!-- TheMaestro - Personaje guía del Nivel 1: Directivas -->
  <div class="card-character group hover:scale-[1.02] transition-transform duration-300">
    <!-- Avatar con glow cyan -->
    <div class="relative mx-auto w-20 h-20 mb-4">
      <div class="absolute inset-0 bg-cyber-cyan/20 rounded-full animate-glow-pulse" />
      <div
        class="relative w-full h-full rounded-full bg-gradient-to-br from-cyber-cyan/30 to-deep-purple/30 border-2 border-cyber-cyan/50 flex items-center justify-center animate-float"
      >
        <span class="text-4xl">🧙‍♂️</span>
      </div>
    </div>

    <!-- Nombre y rol -->
    <h3 class="font-heading font-bold text-cyber-cyan text-sm mb-1">
      {{ nombre }}
    </h3>
    <p class="text-gray-dim text-xs mb-3">{{ rol }}</p>

    <!-- Diálogo actual -->
    <div
      v-if="dialogo"
      class="bg-dark-void/60 rounded-lg px-4 py-3 border border-cyber-cyan/20 relative"
    >
      <!-- Triángulo apuntando al avatar -->
      <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-dark-void/60 border-l border-t border-cyber-cyan/20 rotate-45" />
      <p class="text-gray-mist text-xs leading-relaxed italic">
        "{{ dialogo }}"
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nombre: { type: String, default: 'TheMaestro' },
  rol: { type: String, default: 'Guardián de las Directivas' },
  dialogo: { type: String, default: '' }
})
</script>
