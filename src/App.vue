<template>
  <!-- Contenedor raíz con fondo espacial y estrellas -->
  <div class="min-h-screen bg-deep-space bg-stars relative flex flex-col">
    <!-- Partículas de fondo decorativas -->
    <div class="fixed inset-0 pointer-events-none z-0">
      <div
        v-for="i in 15"
        :key="i"
        class="absolute w-0.5 h-0.5 bg-cyber-cyan rounded-full animate-twinkle"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          opacity: Math.random() * 0.6 + 0.2
        }"
      />
    </div>

    <!-- Barra de navegación superior -->
    <nav
      v-if="mostrarNavbar"
      class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-dark-void/80 border-b border-cyber-cyan/20 transition-all duration-300"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <!-- Logo Inteligente -->
        <router-link 
          :to="rutaInicio" 
          class="flex items-center gap-3 group focus:outline-none"
        >
          <span class="text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">🚀</span>
          <span class="font-heading font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-soft-purple group-hover:to-white transition-all duration-300">
            Antigravity Academy
          </span>
        </router-link>

        <!-- Navegación principal -->
        <div class="flex items-center gap-6">
          <router-link
            to="/map"
            class="nav-link text-sm font-medium transition-colors duration-200 relative group"
            active-class="text-cyber-cyan font-bold"
          >
            Mapa Estelar
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyber-cyan transition-all duration-300 group-hover:w-full"></span>
          </router-link>
          
          <router-link
            to="/dashboard"
            class="nav-link text-sm font-medium transition-colors duration-200 relative group"
            active-class="text-cyber-cyan font-bold"
          >
            Nave de Comando
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-soft-purple transition-all duration-300 group-hover:w-full"></span>
          </router-link>

          <!-- Indicador de XP en la navbar -->
          <div
            v-if="userStore.username"
            class="hidden sm:flex items-center gap-3 bg-deep-space/80 px-4 py-1.5 rounded-full border border-soft-purple/30 shadow-lg shadow-purple-900/20"
          >
            <div class="flex flex-col items-end leading-none">
              <span class="text-[10px] text-gray-mist uppercase tracking-wider font-bold">{{ userStore.currentRank }}</span>
            </div>
            <div class="h-4 w-[1px] bg-gray-dim/40"></div>
            <span class="text-xs font-bold text-cyber-cyan font-code">{{ userStore.xp }} XP</span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <!-- Contenido principal -->
    <template v-if="userStore.onboardingCompleted">
      <div 
        class="flex-1 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 px-4 relative z-10 transition-all duration-500"
        :class="{ 'pt-24': mostrarNavbar }"
      >
        <!-- Left Sidebar -->
        <aside class="hidden lg:block lg:col-span-2 xl:col-span-2 space-y-6 sticky top-24 h-fit">
          <SidebarLeft />
        </aside>

        <!-- Main Content (Center) -->
        <main class="lg:col-span-8 xl:col-span-8">
           <router-view v-slot="{ Component }">
            <transition name="page">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>

        <!-- Right Sidebar -->
        <aside class="hidden lg:block lg:col-span-2 xl:col-span-2 space-y-6 sticky top-24 h-fit">
          <SidebarRight />
        </aside>
      </div>
    </template>

    <template v-else>
      <main 
        class="flex-1 relative z-10 transition-all duration-500"
        :class="{ 'pt-16': mostrarNavbar }"
      >
        <router-view v-slot="{ Component }">
          <transition name="page">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </template>



    <!-- Footer Global -->
    <Footer />

    <!-- Notificación de badge -->
    <BadgeNotification />

    <!-- Modal de Acceso Restringido -->
    <AccessCodeModal :is-open="showAccessModal" @close="showAccessModal = false" />
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import BadgeNotification from '@/components/game/BadgeNotification.vue'
import AccessCodeModal from '@/components/game/AccessCodeModal.vue'
import SidebarLeft from '@/components/layout/SidebarLeft.vue'
import SidebarRight from '@/components/layout/SidebarRight.vue'
import Footer from '@/components/layout/Footer.vue'

const route = useRoute()
const userStore = useUserStore()

// Mostrar navbar siempre si el usuario completó el onboarding, incluso en Home
const mostrarNavbar = computed(() => {
  if (userStore.onboardingCompleted) return true
  // Si no ha completado el onboarding, ocultar en Home (landing)
  if (route.path === '/') return false
  return true
})

// Ruta a la que lleva el logo: Siempre a Home
const rutaInicio = computed(() => {
  return '/'
})

// === GUARDIA DE ACCESO ===
const showAccessModal = ref(false)

// Vigilar cambios de ruta para proteger módulos
watch(
  () => route.path,
  (newPath) => {
    // Si la ruta comienza con /module- y el usuario no tiene acceso PRO
    if (newPath.startsWith('/module-') && !userStore.hasProAccess) {
      showAccessModal.value = true
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.nav-link {
  color: #94A3B8; /* gray-mist */
}
.nav-link:hover {
  color: #00F0FF; /* cyber-cyan */
}
.router-link-active {
  color: #00F0FF;
}

/* Transiciones de página */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
