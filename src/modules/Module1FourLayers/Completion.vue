<template>
  <!-- Pantalla de completitud del Módulo 1 -->
  <div class="min-h-screen flex items-center justify-center px-4 py-12">
    <div class="max-w-lg w-full text-center space-y-8 animate-slide-up">
      <!-- Celebración -->
      <div class="text-6xl">🎊🚀🎊</div>

      <h1 class="font-heading font-bold text-3xl md:text-4xl text-gradient-cyan">
        ¡Módulo 1 Completado!
      </h1>

      <p class="text-gray-mist">
        Has dominado las <span class="text-white font-medium">4 Capas fundamentales</span>
        de la arquitectura Antigravity.
      </p>

      <!-- Personajes celebrando -->
      <div class="flex justify-center gap-3">
        <Astronaut color="cyan" size="sm" />
        <Astronaut color="magenta" size="sm" />
        <Astronaut color="purple" size="sm" />
      </div>

      <!-- Resumen de progreso -->
      <Card variant="space">
        <h3 class="font-heading font-semibold text-sm text-cyber-cyan mb-4">RESUMEN DE TU PROGRESO</h3>

        <div class="space-y-3">
          <div
            v-for="nivel in modulesStore.modulo1.niveles"
            :key="nivel.id"
            class="flex items-center justify-between p-3 bg-deep-space/50 rounded-lg"
          >
            <div class="flex items-center gap-3">
              <span>{{ nivel.icono }}</span>
              <span class="text-sm text-white">{{ nivel.titulo }}</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-xs">
                <span v-for="i in 3" :key="i">{{ i <= nivel.estrellas ? '⭐' : '☆' }}</span>
              </span>
              <span
                class="text-xs px-2 py-0.5 rounded-full"
                :class="nivel.completado
                  ? 'bg-success-green/20 text-success-green'
                  : 'bg-gray-dim/20 text-gray-dim'"
              >
                {{ nivel.completado ? '✅' : '—' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Stats finales -->
        <div class="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-dim/20">
          <div class="text-center">
            <p class="text-xl font-heading font-bold text-cyber-cyan">{{ userStore.xp }}</p>
            <p class="text-xs text-gray-mist">XP Total</p>
          </div>
          <div class="text-center">
            <p class="text-xl font-heading font-bold text-soft-purple">{{ gameStore.totalBadges }}</p>
            <p class="text-xs text-gray-mist">Badges</p>
          </div>
          <div class="text-center">
            <p class="text-xl font-heading font-bold text-neon-magenta">{{ userStore.currentRank }}</p>
            <p class="text-xs text-gray-mist">Rango</p>
          </div>
        </div>
      </Card>

      <!-- Diálogo final -->
      <div class="card-character">
        <p class="text-xs text-soft-purple font-heading mb-2">🏛️ El Maestro</p>
        <p class="text-gray-mist text-sm leading-relaxed">
          "Felicidades, <span class="text-cyber-cyan font-semibold">{{ userStore.username }}</span>.
          Has dominado las 4 capas: Directivas, Orquestador, Agentes y Output."
        </p>
        <p class="text-gray-mist text-sm leading-relaxed mt-2">
          "Ahora eres un verdadero Arquitecto de Agentes. El siguiente módulo te espera..."
        </p>
      </div>

      <!-- Acciones -->
      <div class="flex flex-col gap-3">
        <Button size="lg" @click="$router.push('/dashboard')">
          🚀 Ver Nave de Comando
        </Button>
        <router-link to="/map" class="btn-ghost text-sm">
          ← Volver al Mapa
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useGameStore } from '@/stores/game'
import { useModulesStore } from '@/stores/modules'
import Astronaut from '@/components/game/Astronaut.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

const userStore = useUserStore()
const gameStore = useGameStore()
const modulesStore = useModulesStore()
</script>
