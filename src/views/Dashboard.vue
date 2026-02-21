<template>
  <div class="min-h-screen px-4 py-8 md:py-12 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-dark-bg dark:to-deep-space transition-colors duration-500">
    <div class="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div class="flex flex-col md:flex-row items-center gap-6 mb-8 bg-white dark:bg-deep-space/40 p-6 rounded-card border border-slate-200 dark:border-soft-purple/20 shadow-card-light dark:shadow-none backdrop-blur-sm">
        <div class="relative group cursor-pointer">
          <div class="absolute inset-0 bg-cyan-200 dark:bg-cyber-cyan/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <Astronaut :color="userStore.astronautColor" size="lg" class="relative z-10 transition-transform group-hover:scale-105" />
        </div>
        
        <div class="text-center md:text-left flex-1">
          <h1 class="font-heading font-bold text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 dark:from-cyber-cyan to-purple-600 dark:to-white mb-2">
            {{ i18n.t('dashboard.welcome') }} {{ userStore.username }}
          </h1>
          <div class="flex flex-wrap justify-center md:justify-start gap-3">
            <span class="bg-purple-100 dark:bg-soft-purple/20 border border-purple-200 dark:border-soft-purple/40 text-purple-700 dark:text-light-purple px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {{ i18n.t('ranks.' + userStore.currentRank) }}
            </span>
            <span class="bg-cyan-50 dark:bg-cyber-cyan/10 border border-cyan-200 dark:border-cyber-cyan/30 text-cyan-700 dark:text-cyber-cyan px-3 py-1 rounded-full text-xs font-code">
              ID: AG-{{ Math.floor(Math.random() * 10000) }}
            </span>
          </div>
        </div>

        <div class="text-right hidden md:block">
           <p class="text-[10px] text-slate-500 dark:text-gray-dim uppercase mb-1 font-bold tracking-wider">{{ i18n.t('dashboard.statusLabel') }}</p>
           <div class="flex items-center gap-2 text-emerald-600 dark:text-success-green text-sm font-bold">
             <span class="w-2 h-2 rounded-full bg-emerald-500 dark:bg-success-green animate-pulse"></span>
             {{ i18n.t('dashboard.online') }}
           </div>
        </div>
      </div>

      <div class="lg:hidden">
        <MobileAdBanner />
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="space" class="bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-cyan-300 dark:hover:border-cyber-cyan/50 transition-colors group shadow-card-light dark:shadow-none">
          <div class="text-center transform group-hover:-translate-y-1 transition-transform">
            <p class="text-3xl mb-2 filter drop-shadow-md">{{ userStore.currentRankIcon }}</p>
            <p class="text-lg font-heading font-bold text-cyan-600 dark:text-cyber-cyan group-hover:text-cyan-700 dark:group-hover:text-white transition-colors">{{ i18n.t('ranks.' + userStore.currentRank) }}</p>
            <p class="text-[10px] text-slate-500 dark:text-gray-mist mt-1 uppercase font-bold tracking-wide">{{ i18n.t('dashboard.currentRank') }}</p>
          </div>
        </Card>
        <Card variant="space" class="bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-cyan-300 dark:hover:border-cyber-cyan/50 transition-colors group shadow-card-light dark:shadow-none">
          <div class="text-center transform group-hover:-translate-y-1 transition-transform">
            <p class="text-3xl font-heading font-bold text-cyan-600 dark:text-cyber-cyan mb-2 group-hover:text-cyan-700 dark:group-hover:text-white transition-colors">{{ userStore.xp }}</p>
            <p class="text-[10px] text-slate-500 dark:text-gray-mist mt-1 uppercase font-bold tracking-wide">{{ i18n.t('dashboard.accumulatedXp') }}</p>
          </div>
        </Card>
        <Card variant="space" class="bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-fuchsia-300 dark:hover:border-neon-magenta/50 transition-colors group shadow-card-light dark:shadow-none">
          <div class="text-center transform group-hover:-translate-y-1 transition-transform">
            <p class="text-3xl font-heading font-bold text-fuchsia-600 dark:text-neon-magenta mb-2">{{ gameStore.streak }}🔥</p>
            <p class="text-[10px] text-slate-500 dark:text-gray-mist mt-1 uppercase font-bold tracking-wide">{{ i18n.t('dashboard.dailyStreak') }}</p>
          </div>
        </Card>
        <Card variant="space" class="bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 hover:border-purple-300 dark:hover:border-soft-purple/50 transition-colors group shadow-card-light dark:shadow-none">
          <div class="text-center transform group-hover:-translate-y-1 transition-transform">
            <p class="text-3xl font-heading font-bold text-purple-600 dark:text-soft-purple mb-2">{{ gameStore.totalBadges }}</p>
            <p class="text-[10px] text-slate-500 dark:text-gray-mist mt-1 uppercase font-bold tracking-wide">{{ i18n.t('dashboard.badges') }}</p>
          </div>
        </Card>
      </div>

      <Card variant="space" class="bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 shadow-card-light dark:shadow-none">
        <div class="flex justify-between items-end mb-2">
           <h3 class="text-sm font-bold text-slate-700 dark:text-white uppercase tracking-wider">{{ i18n.t('dashboard.levelProgress') }}</h3>
           <span class="text-xs text-cyan-600 dark:text-cyber-cyan font-code">{{ userStore.progresoRango }}%</span>
        </div>
        <XPBar />
        <p class="text-[10px] text-slate-500 dark:text-gray-mist mt-3 text-right">
          {{ i18n.t('dashboard.xpMissing') }} <span class="text-slate-700 dark:text-white font-bold">{{ userStore.xpParaSiguienteRango - userStore.xp }} XP</span> {{ i18n.t('dashboard.forNextRank') }}
        </p>
      </Card>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="space-y-4">
          <h2 class="font-heading font-semibold text-xl text-slate-800 dark:text-white flex items-center gap-2">
            <span class="text-cyan-600 dark:text-cyber-cyan">◈</span> {{ i18n.t('dashboard.trainingModules') }}
          </h2>

          <div 
            v-for="modulo in modulesStore.modulos" 
            :key="modulo.id"
            class="p-5 bg-white dark:bg-deep-space/60 rounded-xl border relative overflow-hidden group transition-all shadow-card-light dark:shadow-none"
            :class="modulo.desbloqueado ? 'border-slate-200 dark:border-soft-purple/30 hover:border-cyan-300 dark:hover:border-cyber-cyan/50' : 'border-slate-200 dark:border-gray-dim/20 opacity-60 grayscale'"
          >
            <div class="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span class="text-6xl">{{ modulo.icono }}</span>
            </div>
            
            <div class="relative z-10">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-3">
                  <span class="text-2xl">{{ modulo.icono }}</span>
                  <div>
                    <h3 class="font-bold text-slate-800 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyber-cyan transition-colors">{{ i18n.t('modules.' + modulo.id + '.title') }}</h3>
                    <p class="text-xs text-slate-500 dark:text-gray-mist">{{ i18n.t('modules.' + modulo.id + '.desc') }}</p>
                  </div>
                </div>
                
                <div class="flex flex-col items-end gap-1">
                  <template v-if="modulo.bloqueadoPorPro">
                    <span class="text-[10px] px-2 py-0.5 rounded-full font-bold border bg-amber-50 dark:bg-amber-500/20 border-amber-300 dark:border-amber-500/50 text-amber-600 dark:text-amber-500 flex items-center gap-1">
                      PACK PRO 💎
                    </span>
                  </template>
                  <template v-else-if="modulo.desbloqueado">
                    <span
                      class="text-[10px] px-2 py-0.5 rounded-full font-bold border"
                      :class="modulo.niveles.every(n => n.completado)
                        ? 'bg-emerald-50 dark:bg-success-green/20 border-emerald-300 dark:border-success-green/50 text-emerald-600 dark:text-success-green'
                        : 'bg-purple-50 dark:bg-soft-purple/20 border-purple-300 dark:border-soft-purple/50 text-purple-600 dark:text-soft-purple'"
                    >
                      {{ modulo.niveles.every(n => n.completado) ? i18n.t('dashboard.moduleCompleted') : i18n.t('dashboard.moduleInProgress') }}
                    </span>
                  </template>
                  <span v-else class="text-[10px] px-2 py-0.5 rounded-full font-bold border bg-slate-100 dark:bg-gray-dim/20 border-slate-300 dark:border-gray-dim/50 text-slate-500 dark:text-gray-dim">
                    {{ i18n.t('dashboard.moduleBlocked') }} 🔒
                  </span>
                </div>
              </div>
              
              <ProgressBar
                v-if="modulo.desbloqueado"
                :value="modulo.niveles.filter(n => n.completado).length"
                :max="modulo.niveles.length"
                :showPercentage="true"
                color="cyan"
                size="sm"
                class="mb-4"
              />

              <div v-if="modulo.desbloqueado" class="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  <div
                  v-for="nivel in modulo.niveles"
                  :key="nivel.id"
                  class="text-center p-2 rounded-lg transition-colors border"
                  :class="nivel.completado ? 'bg-cyan-50 dark:bg-cyber-cyan/10 border-cyan-200 dark:border-cyber-cyan/20' : 'bg-slate-50 dark:bg-dark-void/50 border-slate-200 dark:border-white/5'"
                  :title="nivel.titulo"
                >
                  <span class="text-lg block mb-1">{{ nivel.icono }}</span>
                  <div v-if="nivel.completado" class="text-[10px] flex justify-center gap-[1px]">
                    <span v-for="i in 3" :key="i" :class="i <= nivel.estrellas ? 'text-amber-500' : 'text-slate-300 dark:text-slate-700'">★</span>
                  </div>
                  <div v-else class="text-slate-400 dark:text-gray-dim text-[8px] uppercase tracking-tighter">
                    {{ nivel.desbloqueado ? i18n.t('dashboard.available') : i18n.t('dashboard.locked') }}
                  </div>
                </div>
              </div>
              
              <div class="mt-4 pt-4 border-t border-slate-100 dark:border-white/5 text-center">
                 <router-link 
                   v-if="modulo.desbloqueado"
                   :to="modulo.niveles.find(n => !n.completado)?.ruta || modulo.niveles[0].ruta" 
                   class="text-sm text-cyan-600 dark:text-cyber-cyan hover:text-cyan-700 dark:hover:text-white transition-colors font-medium"
                 >
                   {{ modulo.niveles.every(n => n.completado) ? i18n.t('dashboard.reviewModule') : i18n.t('dashboard.continueMission') }} →
                 </router-link>
                 <button 
                   v-else-if="modulo.bloqueadoPorPro"
                   @click="userStore.showAccessModal = true"
                   class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                 >
                   <span>DESBLOQUEAR PACKPRO</span>
                   <span class="text-sm">💎</span>
                 </button>
                 <span v-else class="text-xs text-slate-400 dark:text-gray-dim italic">
                   Completa el módulo anterior para continuar
                 </span>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="font-heading font-semibold text-xl text-slate-800 dark:text-white flex items-center gap-2">
              <span class="text-purple-600 dark:text-soft-purple">🏆</span> {{ i18n.t('dashboard.trophyHall') }}
            </h2>
            <span class="text-xs bg-slate-100 dark:bg-deep-space px-2 py-1 rounded border border-slate-200 dark:border-gray-dim/30 text-slate-500 dark:text-gray-mist">
              {{ gameStore.totalBadges }} / {{ gameStore.badgesConInfo.length }}
            </span>
          </div>

          <Card variant="space" class="bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 min-h-[300px] shadow-card-light dark:shadow-none">
            <div class="grid grid-cols-4 sm:grid-cols-5 gap-4">
              <div
                v-for="badge in gameStore.badgesConInfo"
                :key="badge.id"
                class="flex flex-col items-center gap-2 group relative p-2 rounded-xl transition-all hover:bg-slate-50 dark:hover:bg-white/5"
                :title="badge.desbloqueado ? badge.nombre : 'Bloqueado'"
              >
                <div
                  class="w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 relative"
                  :class="badge.desbloqueado
                    ? 'bg-gradient-to-br from-purple-100 to-cyan-50 dark:from-deep-purple/50 dark:to-cyber-cyan/20 border border-purple-200 dark:border-cyber-cyan/50 shadow-md dark:shadow-glow-cyan-sm group-hover:scale-110'
                    : 'bg-slate-100 dark:bg-dark-void border border-slate-200 dark:border-gray-dim/20 opacity-30 grayscale'"
                >
                  {{ badge.desbloqueado ? badge.icono : '?' }}
                  
                  <div v-if="badge.desbloqueado" class="absolute inset-0 bg-cyan-200/30 dark:bg-cyber-cyan/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                
                <span 
                  class="text-[10px] text-center leading-tight max-w-[60px] truncate transition-colors"
                  :class="badge.desbloqueado ? 'text-slate-600 dark:text-gray-mist group-hover:text-slate-800 dark:group-hover:text-white' : 'text-slate-400 dark:text-gray-dim'"
                >
                  {{ badge.desbloqueado ? badge.nombre : '???' }}
                </span>
              </div>
            </div>
            
            <div v-if="gameStore.totalBadges === 0" class="text-center py-12 text-slate-400 dark:text-gray-dim text-sm italic">
              {{ i18n.t('dashboard.emptyBadges') }}
            </div>
          </Card>
        </div>
      </div>

      <div class="border-t border-slate-200 dark:border-gray-dim/20 pt-8 mt-12 flex justify-center">
        <button 
          @click="confirmarReinicio"
          class="text-xs text-red-500/70 hover:text-red-500 dark:text-error-red/70 dark:hover:text-error-red hover:underline transition-colors flex items-center gap-2"
        >
          🗑️ {{ i18n.t('dashboard.resetProgress') }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useGameStore } from '@/stores/game'
import { useModulesStore } from '@/stores/modules'
import { useI18nStore } from '@/stores/i18n'
import { useRouter } from 'vue-router'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import XPBar from '@/components/game/XPBar.vue'
import Astronaut from '@/components/game/Astronaut.vue'
import MobileAdBanner from '@/components/layout/MobileAdBanner.vue'

const userStore = useUserStore()
const gameStore = useGameStore()
const modulesStore = useModulesStore()
const i18n = useI18nStore()
const router = useRouter()

function confirmarReinicio() {
  const confirmMessage = i18n.t('dashboard.resetConfirm')
  if (confirm(confirmMessage)) {
    userStore.resetear()
    if (gameStore.resetear) {
        gameStore.resetear()
    } else {
        localStorage.removeItem('antigravity-game')
    }
    modulesStore.resetear()
    
    window.location.href = '/'
  }
}
</script>
