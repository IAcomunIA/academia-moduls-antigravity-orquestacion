<template>
  <div class="space-y-6">
    <a 
      href="https://ko-fi.com/s/a2f7374844" 
      target="_blank" 
      class="relative block group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 hover:border-purple-300 dark:hover:border-soft-purple/50 transition-all shadow-card-light dark:shadow-lg dark:hover:shadow-soft-purple/20"
    >
      <div class="absolute inset-0 bg-gradient-to-t from-slate-800 dark:from-deep-space via-slate-800/40 dark:via-deep-space/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity"></div>
      
      <img 
        src="@/assets/promos/antigravity-pack.png" 
        alt="Pro Pack AI" 
        class="w-full h-auto transform group-hover:scale-110 transition-transform duration-700 ease-out" 
      />
      
      <div class="absolute bottom-0 left-0 right-0 p-5 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <span class="bg-fuchsia-500 dark:bg-neon-magenta text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block tracking-tighter">OFERTA LIMITADA</span>
        <h4 class="font-heading font-bold text-white text-lg leading-tight drop-shadow-md">Pack PRO IA</h4>
        <p class="text-xs text-slate-300 dark:text-gray-mist mt-1 mb-3 line-clamp-1 group-hover:text-white transition-colors">Acelera tu workflow x10 hoy.</p>
        
        <div class="mt-2 py-2 px-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-center text-xs font-bold text-white group-hover:bg-purple-500 dark:group-hover:bg-soft-purple group-hover:text-white transition-all">
          Conseguir Pack →
        </div>
      </div>
    </a>

    <div class="card-level p-5">
      <h4 class="text-xs font-bold text-slate-500 dark:text-gray-dim uppercase mb-4">Ecosistema Antigravity</h4>
      <ul class="space-y-3">
        <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-mist hover:text-slate-800 dark:hover:text-white cursor-pointer transition-colors">
          <span class="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyber-cyan"></span>
          Agent Orchestrator
        </li>
        <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-mist hover:text-slate-800 dark:hover:text-white cursor-pointer transition-colors">
          <span class="w-2 h-2 rounded-full bg-purple-500 dark:bg-soft-purple"></span>
          Nexus Memory Core
        </li>
        <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-mist hover:text-slate-800 dark:hover:text-white cursor-pointer transition-colors">
          <span class="w-2 h-2 rounded-full bg-pink-500"></span>
          Prompt Engineer Kit
        </li>
        <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-mist hover:text-slate-800 dark:hover:text-white cursor-pointer transition-colors">
          <span class="w-2 h-2 rounded-full bg-amber-400"></span>
          Auto-Coder Bot
        </li>
        <li class="flex items-center gap-3 text-sm text-slate-600 dark:text-gray-mist hover:text-slate-800 dark:hover:text-white cursor-pointer transition-colors">
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          Sentinel Security
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
</script>
