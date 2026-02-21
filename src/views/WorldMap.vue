<template>
  <div class="min-h-screen px-4 py-8 md:py-12 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-dark-bg dark:to-deep-space transition-colors duration-500">
    <div class="max-w-2xl mx-auto">
      <div class="lg:hidden mb-8">
        <MobileAdBanner />
      </div>

      <div v-for="(modulo, mIndex) in modulesStore.modulos" :key="modulo.id" class="mb-20">
        <div class="text-center mb-12" :class="{ 'opacity-50 grayscale': !modulo.desbloqueado }">
          <div class="flex items-center justify-center gap-2 mb-2">
            <span class="text-3xl">{{ modulo.icono }}</span>
            <h2 class="font-heading font-bold text-2xl text-gradient-cyan">
              {{ modulo.titulo }}
            </h2>
          </div>
          <p class="text-slate-500 dark:text-gray-mist text-sm max-w-md mx-auto">
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
          <div v-else class="mt-4 inline-block px-3 py-1 rounded-full bg-red-50 dark:bg-error-red/10 border border-red-200 dark:border-error-red/20 text-red-600 dark:text-error-red text-[10px] uppercase font-bold tracking-widest">
            🔒 Módulo Bloqueado
          </div>
        </div>

        <div class="relative flex flex-col items-center gap-4" :class="{ 'pointer-events-none': !modulo.desbloqueado }">
          <div v-for="(nivel, index) in modulo.niveles" :key="nivel.id" class="flex flex-col items-center">
            <div
              v-if="index > 0"
              class="w-0.5 h-12 mb-4"
              :class="nivel.desbloqueado ? 'bg-gradient-to-b from-cyan-500 to-purple-500 dark:from-cyber-cyan dark:to-soft-purple' : 'bg-slate-200 dark:bg-gray-dim/30'"
            />

            <LevelNode :nivel="nivel" />
          </div>

          <div v-if="mIndex < modulesStore.modulos.length - 1" class="w-1 h-20 mt-4 bg-dashed-line opacity-20" />
        </div>
      </div>

      <div class="mt-8 text-center">
        <router-link to="/dashboard" class="btn-ghost text-sm text-slate-600 dark:text-gray-mist">
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
import MobileAdBanner from '@/components/layout/MobileAdBanner.vue'

const modulesStore = useModulesStore()
</script>
