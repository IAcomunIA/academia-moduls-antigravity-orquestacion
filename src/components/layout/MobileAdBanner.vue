<template>
  <a 
    href="https://ko-fi.com/s/a2f7374844" 
    target="_blank"
    class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-4 flex items-center gap-4 group active:scale-[0.98] transition-all"
  >
    <!-- Fondo con gradiente animado -->
    <div class="absolute inset-0 bg-gradient-to-r from-soft-purple/20 via-cyber-cyan/10 to-soft-purple/20 animate-gradient-x opacity-30"></div>
    
    <!-- Icono/Imagen pequeña -->
    <div class="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-cyan to-soft-purple flex items-center justify-center text-2xl shadow-glow-cyan-sm">
      🚀
    </div>

    <!-- Texto -->
    <div class="relative z-10 flex-1">
      <div class="flex items-center gap-2">
        <span class="text-[9px] font-black bg-neon-magenta px-1.5 py-0.5 rounded text-white tracking-tighter uppercase">Pack PRO</span>
        <span class="text-[9px] text-cyber-cyan font-bold uppercase tracking-widest">Oferta Especial</span>
      </div>
      <h4 class="text-sm font-bold text-white leading-tight mt-0.5">Acelera tu carrera en IA x10</h4>
      <p class="text-[10px] text-gray-mist line-clamp-1">Consigue el Pack de Arquitecto ahora.</p>
    </div>

    <!-- Botón / Flecha -->
    <div class="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-cyber-cyan group-hover:text-deep-space transition-colors">
      →
    </div>
  </a>
</template>

<script setup>
// No props needed for now, it's a static promo
</script>

<style scoped>
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 5s ease infinite;
}
</style>
