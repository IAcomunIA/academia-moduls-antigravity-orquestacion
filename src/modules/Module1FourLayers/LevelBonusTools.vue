<template>
  <!-- Bonus: Herramientas y Trucos -->
  <div class="min-h-screen px-4 py-8 md:py-12">
    <div class="max-w-4xl mx-auto">

      <!-- Header -->
      <div class="flex items-center gap-3 mb-8 animate-fade-in">
        <span class="text-3xl">🛠️</span>
        <div>
          <h1 class="font-heading font-bold text-2xl text-cyber-cyan">{{ content.title }}</h1>
          <p class="text-sm text-gray-mist">{{ content.description }}</p>
        </div>
      </div>

      <!-- Content Sections -->
      <div class="space-y-12">
        <section v-for="(section, idx) in content.sections" :key="section.id" class="animate-slide-up" :style="{ animationDelay: `${idx * 0.1}s` }">
          <h2 class="text-xl font-bold text-white mb-4 border-l-4 border-soft-purple pl-3">{{ section.title }}</h2>
          <p class="text-gray-mist mb-6">{{ section.content }}</p>

          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="(slide, sIdx) in section.slides" :key="sIdx" class="card-level hover:scale-[1.02] transition-transform">
              
              <!-- Icon/Type Indicator -->
              <div class="mb-3 flex items-center justify-between">
                <span v-if="slide.type === 'concept'" class="text-xs font-bold text-cyber-cyan bg-cyber-cyan/10 px-2 py-1 rounded">CONCEPTO</span>
                <span v-if="slide.type === 'code'" class="text-xs font-bold text-success-green bg-success-green/10 px-2 py-1 rounded">CÓDIGO</span>
                <span v-if="slide.type === 'tip'" class="text-xs font-bold text-soft-purple bg-soft-purple/10 px-2 py-1 rounded">TIP PRO</span>
              </div>

              <h3 class="text-lg font-bold text-white mb-2">{{ slide.title }}</h3>
              
              <div v-if="slide.type === 'code'" class="bg-deep-space p-3 rounded-lg border border-white/10 font-code text-xs text-gray-300 overflow-x-auto whitespace-pre-wrap">
                {{ slide.code }}
              </div>
              <p v-else class="text-sm text-gray-mist leading-relaxed">{{ slide.content }}</p>
            </div>
          </div>
        </section>
      </div>

      <!-- Quiz Section -->
      <section class="mt-16 pt-8 border-t border-white/10 animate-fade-in">
        <h2 class="text-2xl font-heading font-bold text-center text-white mb-8">Comprobación de Sistemas</h2>
        
        <div class="max-w-2xl mx-auto card-level p-8">
          <p class="text-lg text-white mb-6 font-medium text-center">{{ content.quiz.question }}</p>

          <div class="space-y-3">
             <button
              v-for="(option, idx) in content.quiz.options"
              :key="idx"
              class="w-full text-left p-4 rounded-xl border transition-all duration-200"
              :class="getQuizOptionClass(idx)"
              :disabled="quizAnswered"
              @click="checkAnswer(idx)"
            >
              <span class="font-bold mr-2">{{ ['A', 'B', 'C', 'D'][idx] }}.</span>
              {{ option }}
              <span v-if="quizAnswered && idx === content.quiz.correctAnswer" class="float-right text-success-green">✓</span>
            </button>
          </div>

          <div v-if="quizAnswered" class="mt-6 text-center animate-fade-in">
            <p :class="isCorrect ? 'text-success-green' : 'text-error-red'" class="font-bold mb-2">
              {{ isCorrect ? '¡Correcto!' : 'Incorrecto' }}
            </p>
            <p class="text-sm text-gray-mist mb-6">{{ content.quiz.explanation }}</p>
            
            <Button size="lg" @click="finishLevel" class="w-full">
              Completar Entrenamiento 🏆
            </Button>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useGameStore } from '@/stores/game'
import Button from '@/components/ui/Button.vue'
import content from './content/level-bonus-tools.json'

const router = useRouter()
const userStore = useUserStore()
const gameStore = useGameStore()

const quizAnswered = ref(false)
const selectedOption = ref(null)
const isCorrect = ref(false)

function checkAnswer(idx) {
  selectedOption.value = idx
  quizAnswered.value = true
  isCorrect.value = (idx === content.quiz.correctAnswer)

  if (isCorrect.value) {
    userStore.addXP(50)
    gameStore.unlockBadge('ingeniero-contexto')
  }
}

function getQuizOptionClass(idx) {
  if (!quizAnswered.value) {
    return 'border-gray-dim/30 hover:border-cyber-cyan text-gray-mist hover:text-white hover:bg-white/5'
  }
  
  if (idx === content.quiz.correctAnswer) {
    return 'border-success-green bg-success-green/10 text-white'
  }
  
  if (idx === selectedOption.value && !isCorrect.value) {
    return 'border-error-red bg-error-red/10 text-white'
  }
  
  return 'border-gray-dim/30 text-gray-dim opacity-50'
}

function finishLevel() {
  router.push('/map')
}
</script>
