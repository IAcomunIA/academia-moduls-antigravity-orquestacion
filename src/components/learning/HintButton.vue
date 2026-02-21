<template>
  <div class="relative">
    <button
      class="btn-secondary text-sm flex items-center gap-2"
      :disabled="sinHints"
      @click="pedirHint"
    >
      <span>💡</span>
      <span>Pista {{ hintsUsados }}/{{ hints.length }}</span>
    </button>

    <Transition name="fade">
      <div
        v-if="hintActual"
        class="absolute top-full mt-2 left-0 right-0 min-w-[280px] md:min-w-[320px] p-4 bg-white dark:bg-dark-void border border-amber-200 dark:border-warning-yellow/30 rounded-xl shadow-2xl z-50 animate-slide-down"
      >
        <div class="flex items-start gap-3">
          <span class="text-lg">💡</span>
          <div class="flex-1">
            <p class="text-xs text-amber-600 dark:text-warning-yellow font-semibold mb-1">Pista {{ hintsUsados }}</p>
            <p class="text-sm text-slate-600 dark:text-gray-mist leading-relaxed">{{ hintActual }}</p>
          </div>
          <button
            class="text-slate-400 dark:text-gray-dim hover:text-slate-600 dark:hover:text-white text-xs"
            @click="hintActual = ''"
          >
            ✕
          </button>
        </div>

        <p v-if="hintsUsados >= 2" class="text-xs text-amber-500/70 dark:text-warning-yellow/70 mt-2 text-right">
          ⚠️ Usar más pistas reduce tus estrellas
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  hints: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['hint-used'])

const hintsUsados = ref(0)
const hintActual = ref('')

const sinHints = computed(() => hintsUsados.value >= props.hints.length)

function pedirHint() {
  if (sinHints.value) return

  hintActual.value = props.hints[hintsUsados.value]
  hintsUsados.value++
  emit('hint-used', hintsUsados.value)
}
</script>
