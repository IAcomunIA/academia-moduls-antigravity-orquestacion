<template>
  <footer class="mt-auto border-t border-white/10 bg-dark-void/80 backdrop-blur-sm py-8 relative z-20">
    <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      
      <!-- Izquierda: Copyright y Comunidad -->
      <div class="text-center md:text-left">
        <p class="text-gray-mist text-sm">
          © {{ year }} <span class="font-bold text-white">IAComunia</span>.
        </p>
        <p class="text-xs text-gray-dim mt-1">
          Tu comunidad de Inteligencia Artificial.
        </p>
      </div>

      <!-- Centro/Derecha: Powered by -->
      <div class="text-center md:text-right flex items-center gap-2 text-sm text-gray-mist">
        <span>Creado con</span>
        <span class="text-cyber-cyan font-heading font-bold">Antigravity Framework</span>
        <span>🚀</span>
      </div>

    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
