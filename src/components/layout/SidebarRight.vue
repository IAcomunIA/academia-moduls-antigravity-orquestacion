<template>
  <div class="space-y-6">
    <!-- Publicidad Pack Pro -->
    <div class="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10 hover:border-soft-purple/50 transition-all">
      <div class="absolute inset-0 bg-gradient-to-t from-deep-space via-transparent to-transparent z-10"></div>
      <img src="@/assets/ads/antigravity-pack.png" alt="Pro Pack AI" class="w-full h-auto transform group-hover:scale-105 transition-transform duration-500" />
      <div class="absolute bottom-0 left-0 right-0 p-4 z-20">
        <span class="bg-soft-purple text-white text-[10px] font-bold px-2 py-0.5 rounded mb-1 inline-block">OFERTA</span>
        <h4 class="font-bold text-white leading-tight">Pack PRO IA</h4>
        <p class="text-xs text-gray-mist mt-1">Acelera tu workflow x10.</p>
      </div>
    </div>

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
