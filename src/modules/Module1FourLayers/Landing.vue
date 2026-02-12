<template>
  <!-- Landing del Módulo 1: Las 4 Capas -->
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="max-w-lg w-full text-center space-y-8 animate-slide-up">
      <!-- Icono del módulo -->
      <div class="text-6xl">🏗️</div>

      <h1 class="font-heading font-bold text-3xl text-gradient-cyan">
        Módulo 1: Las 4 Capas
      </h1>
      <p class="text-gray-mist leading-relaxed">
        Descubre la arquitectura fundamental de Antigravity.
        Domina las 4 capas que hacen posible a los agentes de IA:
        <span class="text-white font-medium">Directivas, Orquestador, Agentes y Output</span>.
      </p>

      <!-- Info del módulo -->
      <div class="flex justify-center gap-6 text-sm">
        <div class="text-center">
          <p class="text-cyber-cyan font-heading font-bold">4</p>
          <p class="text-gray-mist text-xs">Niveles</p>
        </div>
        <div class="text-center">
          <p class="text-soft-purple font-heading font-bold">600</p>
          <p class="text-gray-mist text-xs">XP Total</p>
        </div>
        <div class="text-center">
          <p class="text-neon-magenta font-heading font-bold">15-20</p>
          <p class="text-gray-mist text-xs">Minutos</p>
        </div>
      </div>

      <!-- Personajes del módulo -->
      <div class="card-space">
        <p class="text-xs text-gray-mist mb-3 font-heading">PERSONAJES QUE CONOCERÁS</p>
        <div class="grid grid-cols-4 gap-3">
          <div class="text-center">
            <span class="text-2xl">🏛️</span>
            <p class="text-xs text-gray-mist mt-1">El Maestro</p>
          </div>
          <div class="text-center">
            <span class="text-2xl">🎭</span>
            <p class="text-xs text-gray-mist mt-1">El Coordinador</p>
          </div>
          <div class="text-center">
            <span class="text-2xl">🤖</span>
            <p class="text-xs text-gray-mist mt-1">El Equipo</p>
          </div>
          <div class="text-center">
            <span class="text-2xl">📡</span>
            <p class="text-xs text-gray-mist mt-1">El Comunicador</p>
          </div>
        </div>
      </div>

      <Button size="lg" @click="$router.push('/module-1/level-1')">
        Comenzar Módulo →
      </Button>

      <router-link to="/map" class="block text-sm text-gray-dim hover:text-gray-mist transition-colors">
        ← Volver al Mapa
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/ui/Button.vue'
</script>
