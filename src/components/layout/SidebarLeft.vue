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
    <div class="relative group cursor-pointer overflow-hidden rounded-2xl border border-white/10 hover:border-cyber-cyan/50 transition-all">
      <div class="absolute inset-0 bg-gradient-to-t from-deep-space via-transparent to-transparent z-10"></div>
      <img src="@/assets/ads/antigravity-book.png" alt="Ebook Antigravity" class="w-full h-auto transform group-hover:scale-105 transition-transform duration-500" />
      <div class="absolute bottom-0 left-0 right-0 p-4 z-20">
        <span class="bg-cyber-cyan text-deep-space text-[10px] font-bold px-2 py-0.5 rounded mb-1 inline-block">PREMIUM</span>
        <h4 class="font-bold text-white leading-tight">Domina el Agente</h4>
        <p class="text-xs text-gray-mist mt-1">El Ebook oficial de Antigravity.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import Astronaut from '@/components/game/Astronaut.vue'
import Button from '@/components/ui/Button.vue'

const userStore = useUserStore()
</script>
