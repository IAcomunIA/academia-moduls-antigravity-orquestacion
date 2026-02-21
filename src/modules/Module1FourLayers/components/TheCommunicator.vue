<template>
  <div class="card-character group hover:scale-[1.02] transition-transform duration-300">
    <div class="relative mx-auto w-20 h-20 mb-4">
      <div class="absolute inset-0 bg-emerald-200 dark:bg-success-green/20 rounded-full animate-glow-pulse" />
      <div
        class="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-success-green/30 dark:to-cyber-cyan/30 border-2 border-emerald-400 dark:border-success-green/50 flex items-center justify-center animate-float"
      >
        <span class="text-4xl">📦</span>
      </div>
    </div>

    <h3 class="font-heading font-bold text-emerald-600 dark:text-success-green text-sm mb-1">
      {{ nombre }}
    </h3>
    <p class="text-slate-500 dark:text-gray-dim text-xs mb-3">{{ rol }}</p>

    <div
      v-if="dialogo"
      class="bg-slate-100 dark:bg-dark-void/60 rounded-lg px-4 py-3 border border-emerald-200 dark:border-success-green/20 relative"
    >
      <div class="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-100 dark:bg-dark-void/60 border-l border-t border-emerald-200 dark:border-success-green/20 rotate-45" />
      <p class="text-slate-600 dark:text-gray-mist text-xs leading-relaxed italic">
        "{{ dialogo }}"
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nombre: { type: String, default: 'TheCommunicator' },
  rol: { type: String, default: 'Maestro del Output' },
  dialogo: { type: String, default: '' }
})
</script>
