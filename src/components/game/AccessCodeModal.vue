<template>
  <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-dark-void/90 backdrop-blur-sm transition-opacity" @click="shakeModal"></div>

    <!-- Modal Content -->
    <div 
      class="relative bg-deep-space border border-cyber-cyan/30 rounded-2xl p-8 max-w-md w-full shadow-glow-cyan overflow-hidden"
      :class="{ 'animate-shake': isShaking }"
    >
      <!-- Decorative Elements -->
      <div class="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/10 blur-3xl rounded-full pointer-events-none"></div>

      <div class="relative z-10 text-center space-y-6">
        <div class="text-4xl animate-bounce">🔒</div>
        
        <div>
          <h2 class="text-2xl font-heading font-bold text-white mb-2">Acceso Restringido</h2>
          <p class="text-gray-mist text-sm">Esta zona de entrenamiento requiere un Código de Invitado autorizado.</p>
        </div>

        <div class="space-y-4">
          <input 
            v-model="code"
            type="text" 
            placeholder="Introduce tu código (ej: PACKPRO)" 
            class="input-code w-full text-center uppercase tracking-widest text-lg py-3"
            @keyup.enter="validateCode"
            :disabled="isValidating"
          />
          
          <p v-if="error" class="text-error-red text-xs font-bold animate-pulse">{{ error }}</p>
        </div>

        <div class="flex flex-col gap-3">
          <Button size="lg" @click="validateCode" :disabled="!code || isValidating" class="w-full">
            {{ isValidating ? 'Verificando...' : 'Desbloquear Acceso 🚀' }}
          </Button>
          
          <button 
            @click="cancel" 
            class="text-xs text-gray-dim hover:text-white underline transition-colors"
          >
            Volver a la Base
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Button from '@/components/ui/Button.vue'

const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['close'])

const router = useRouter()
const userStore = useUserStore()

const code = ref('')
const error = ref('')
const isValidating = ref(false)
const isShaking = ref(false)

function validateCode() {
  if (!code.value) return

  isValidating.value = true
  error.value = ''

  // Simular pequeña espera de red para realismo
  setTimeout(() => {
    const success = userStore.redeemCode(code.value.toUpperCase().trim())
    
    if (success) {
      // Éxito
      userStore.addXP(50) // Bonus por desbloquear
      emit('close')
    } else {
      // Error
      error.value = 'Código de acceso inválido. Intenta de nuevo.'
      shakeModal()
    }
    isValidating.value = false
  }, 800)
}

function shakeModal() {
  isShaking.value = true
  setTimeout(() => { isShaking.value = false }, 500)
}

function cancel() {
  router.push('/dashboard')
  emit('close') // En caso de que se use para cerrar sin redirigir, pero aquí queremos echarle si no tiene código
}
</script>

<style scoped>
.animate-shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>
