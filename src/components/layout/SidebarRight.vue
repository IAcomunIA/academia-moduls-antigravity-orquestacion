<template>
  <div class="space-y-6">
    <!-- Publicidad Pack Pro -->
    <a 
      href="https://ko-fi.com/s/a2f7374844" 
      target="_blank" 
      class="relative block group cursor-pointer overflow-hidden rounded-2xl border border-white/10 hover:border-soft-purple/50 transition-all shadow-lg hover:shadow-soft-purple/20"
    >
      <!-- Overlay de contraste mejorado -->
      <div class="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity"></div>
      
      <img 
        src="@/assets/ads/antigravity-pack.png" 
        alt="Pro Pack AI" 
        class="w-full h-auto transform group-hover:scale-110 transition-transform duration-700 ease-out" 
      />
      
      <div class="absolute bottom-0 left-0 right-0 p-5 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <span class="bg-neon-magenta text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block tracking-tighter shadow-glow-magenta-sm">OFERTA LIMITADA</span>
        <h4 class="font-heading font-bold text-white text-lg leading-tight drop-shadow-md">Pack PRO IA</h4>
        <p class="text-xs text-gray-mist mt-1 mb-3 line-clamp-1 group-hover:text-white transition-colors">Acelera tu workflow x10 hoy.</p>
        
        <!-- Botón CTA -->
        <div class="mt-2 py-2 px-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-center text-xs font-bold text-white group-hover:bg-soft-purple group-hover:text-white transition-all">
          Conseguir Pack →
        </div>
      </div>
    </a>

    <!-- Lista de Productos -->
    <div class="card-level p-5">
      <h4 class="text-xs font-bold text-gray-dim uppercase mb-4">Ecosistema Antigravity</h4>
      <ul class="space-y-3">
        <li class="flex items-center gap-3 text-sm text-gray-mist hover:text-white cursor-pointer transition-colors">
          <span class="w-2 h-2 rounded-full bg-cyber-cyan"></span>
          Agent Orchestrator
        </li>
        <li class="flex items-center gap-3 text-sm text-gray-mist hover:text-white cursor-pointer transition-colors">
          <span class="w-2 h-2 rounded-full bg-soft-purple"></span>
          Nexus Memory Core
        </li>
        <li class="flex items-center gap-3 text-sm text-gray-mist hover:text-white cursor-pointer transition-colors">
          <span class="w-2 h-2 rounded-full bg-pink-500"></span>
          Prompt Engineer Kit
        </li>
        <li class="flex items-center gap-3 text-sm text-gray-mist hover:text-white cursor-pointer transition-colors">
          <span class="w-2 h-2 rounded-full bg-yellow-400"></span>
          Auto-Coder Bot
        </li>
        <li class="flex items-center gap-3 text-sm text-gray-mist hover:text-white cursor-pointer transition-colors">
          <span class="w-2 h-2 rounded-full bg-green-400"></span>
          Sentinel Security
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
</script>
