<template>
  <!-- Mapa de Niveles del Módulo 1 -->
  <div class="min-h-screen px-4 py-8 md:py-12">
    <div class="max-w-2xl mx-auto">
      <!-- Lista de Módulos -->
      <div v-for="(modulo, mIndex) in modulesStore.modulos" :key="modulo.id" class="mb-20">
        <!-- Header del Módulo -->
        <div class="text-center mb-12" :class="{ 'opacity-50 grayscale': !modulo.desbloqueado }">
          <div class="flex items-center justify-center gap-2 mb-2">
            <span class="text-3xl">{{ modulo.icono }}</span>
            <h2 class="font-heading font-bold text-2xl text-gradient-cyan">
              {{ modulo.titulo }}
            </h2>
          </div>
          <p class="text-gray-mist text-sm max-w-md mx-auto">
            {{ modulo.descripcion }}
          </p>

          <div v-if="modulo.desbloqueado" class="mt-4 max-w-xs mx-auto">
            <ProgressBar
              :value="mIndex === 0 ? modulesStore.progresoModulo1 : 0"
              :max="100"
              label="Progreso"
              :showPercentage="true"
              color="purple"
            />
          </div>
          <div v-else class="mt-4 inline-block px-3 py-1 rounded-full bg-error-red/10 border border-error-red/20 text-error-red text-[10px] uppercase font-bold tracking-widest">
            🔒 Módulo Bloqueado
          </div>
        </div>

        <!-- Mapa vertical de niveles del módulo -->
        <div class="relative flex flex-col items-center gap-4" :class="{ 'pointer-events-none': !modulo.desbloqueado }">
          <div v-for="(nivel, index) in modulo.niveles" :key="nivel.id" class="flex flex-col items-center">
            <!-- Camino luminoso -->
            <div
              v-if="index > 0"
              class="w-0.5 h-12 mb-4"
              :class="nivel.desbloqueado ? 'bg-gradient-to-b from-cyber-cyan to-soft-purple' : 'bg-gray-dim/30'"
            />

            <!-- Nodo del nivel -->
            <LevelNode :nivel="nivel" />
          </div>

          <!-- Separador entre módulos -->
          <div v-if="mIndex < modulesStore.modulos.length - 1" class="w-1 h-20 mt-4 bg-dashed-line opacity-20" />
        </div>
      </div>

      <!-- Enlace al dashboard -->
      <div class="mt-8 text-center">
        <router-link to="/dashboard" class="btn-ghost text-sm">
          🚀 Ver Nave de Comando
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModulesStore } from '@/stores/modules'
import LevelNode from '@/components/game/LevelNode.vue'
import XPBar from '@/components/game/XPBar.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import Button from '@/components/ui/Button.vue'

const modulesStore = useModulesStore()
</script>
