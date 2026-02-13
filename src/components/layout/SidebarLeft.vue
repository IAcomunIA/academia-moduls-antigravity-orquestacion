<template>
  <div class="space-y-6">
    <!-- Perfil Resumen -->
    <div class="card-level p-6 text-center">
       <div class="relative inline-block mb-4">
         <Astronaut :color="userStore.astronautColor" size="md" />
         <div class="absolute -bottom-2 -right-2 bg-cyber-cyan text-deep-space text-xs font-bold px-2 py-0.5 rounded-full">
           {{ userStore.currentRank }}
         </div>
       </div>
       <h3 class="text-xl font-bold text-white">{{ userStore.username }}</h3>
       <p class="text-cyber-cyan font-code text-sm">{{ userStore.xp }} XP</p>
       
       <router-link to="/map" class="mt-4 block w-full">
         <Button size="sm" class="w-full">Ir al Mapa 🗺️</Button>
       </router-link>
    </div>

    <!-- Publicidad Ebook -->
    <a 
      href="https://ko-fi.com/s/a2f7374844" 
      target="_blank" 
      class="relative block group cursor-pointer overflow-hidden rounded-2xl border border-white/10 hover:border-cyber-cyan/50 transition-all shadow-lg hover:shadow-cyber-cyan/20"
    >
      <!-- Overlay de contraste mejorado -->
      <div class="absolute inset-0 bg-gradient-to-t from-deep-space via-deep-space/40 to-transparent z-10 opacity-80 group-hover:opacity-90 transition-opacity"></div>
      
      <img 
        src="@/assets/ads/antigravity-book.png" 
        alt="Ebook Antigravity" 
        class="w-full h-auto transform group-hover:scale-110 transition-transform duration-700 ease-out" 
      />
      
      <div class="absolute bottom-0 left-0 right-0 p-5 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <span class="bg-cyber-cyan text-deep-space text-[10px] font-bold px-2 py-0.5 rounded mb-2 inline-block tracking-tighter shadow-glow-cyan-sm">TOP SELLER</span>
        <h4 class="font-heading font-bold text-white text-lg leading-tight drop-shadow-md">Domina el Agente</h4>
        <p class="text-xs text-gray-mist mt-1 mb-3 line-clamp-1 group-hover:text-white transition-colors">Guía definitiva de Antigravity.</p>
        
        <!-- Botón CTA -->
        <div class="mt-2 py-2 px-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-center text-xs font-bold text-white group-hover:bg-cyber-cyan group-hover:text-deep-space transition-all">
          Ver eBook →
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import Astronaut from '@/components/game/Astronaut.vue'
import Button from '@/components/ui/Button.vue'

const userStore = useUserStore()
</script>
