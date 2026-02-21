<template>
  <div class="flex items-center gap-3">
    <span class="text-lg" :title="i18n.t('ranks.' + userStore.currentRank)">{{ userStore.currentRankIcon }}</span>

    <div class="flex-1">
      <div class="flex justify-between items-center mb-1">
        <span class="text-xs font-heading font-semibold text-purple-600 dark:text-soft-purple">{{ i18n.t('ranks.' + userStore.currentRank) }}</span>
        <span class="text-xs text-slate-500 dark:text-gray-mist">{{ userStore.xp }} / {{ userStore.xpParaSiguienteRango }} XP</span>
      </div>
      <ProgressBar
        :value="userStore.progresoRango"
        :max="100"
        size="sm"
        color="cyan"
        :animated="true"
      />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useI18nStore } from '@/stores/i18n'
import ProgressBar from '@/components/ui/ProgressBar.vue'

const userStore = useUserStore()
const i18n = useI18nStore()
</script>
