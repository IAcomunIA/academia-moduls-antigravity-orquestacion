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
    <!-- Global Header -->
    <TheHeader />

    <!-- Contenido principal -->
    <template v-if="userStore.onboardingCompleted && !esLanding">
      <div 
        class="flex-1 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 px-4 relative z-10 transition-all duration-500 pt-24"
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
        :class="{ 'pt-0': esLanding }"
      >
        <router-view v-slot="{ Component }">
          <transition name="page">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </template>



    <!-- Footer Global -->
    <TheFooter />

    <!-- Notificación de badge -->
    <BadgeNotification />

    <!-- Modal de Acceso Restringido -->
    <AccessCodeModal :is-open="userStore.showAccessModal" @close="userStore.showAccessModal = false" />
  </div>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useModulesStore } from '@/stores/modules'
import BadgeNotification from '@/components/game/BadgeNotification.vue'
import AccessCodeModal from '@/components/game/AccessCodeModal.vue'
import SidebarLeft from '@/components/layout/SidebarLeft.vue'
import SidebarRight from '@/components/layout/SidebarRight.vue'
import TheHeader from '@/components/layout/TheHeader.vue'
import TheFooter from '@/components/layout/TheFooter.vue'

const route = useRoute()
const userStore = useUserStore()
const modulesStore = useModulesStore()

// Detectar si estamos en la Landing Page
const esLanding = computed(() => route.path === '/')

// === GUARDIA DE ACCESO ===
watch(
  () => route.path,
  (newPath) => {
    // Si la ruta comienza con /module-
    if (newPath.startsWith('/module-')) {
      // Extraer el ID del módulo (ej: /module-0/... -> module-0)
      const moduleId = newPath.split('/')[1]
      
      const moduloObj = modulesStore.modulos.find(m => m.id === moduleId)

      if (moduloObj?.bloqueadoPorPro) {
        userStore.showAccessModal = true
      }
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
