<template>
  <div class="min-h-screen bg-light-bg dark:bg-deep-space bg-stars relative flex flex-col theme-transition">
    <div class="fixed inset-0 pointer-events-none z-0">
      <div
        v-for="i in 15"
        :key="i"
        class="absolute w-0.5 h-0.5 bg-cyber-cyan rounded-full animate-twinkle dark:block hidden"
        :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          opacity: Math.random() * 0.6 + 0.2
        }"
      />
    </div>

    <TheHeader />

    <template v-if="userStore.onboardingCompleted && !esLanding">
      <div 
        class="flex-1 max-w-[1600px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 px-4 relative z-10 transition-all duration-500 pt-24"
      >
        <aside class="hidden lg:block lg:col-span-2 xl:col-span-2 space-y-6 sticky top-24 h-fit">
          <SidebarLeft />
        </aside>

        <main class="lg:col-span-8 xl:col-span-8">
           <router-view v-slot="{ Component }">
            <transition name="page">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>

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

    <TheFooter />

    <BadgeNotification />

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

const esLanding = computed(() => route.path === '/')

watch(
  () => route.path,
  (newPath) => {
    if (newPath.startsWith('/module-')) {
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
  color: #94A3B8;
}
.nav-link:hover {
  color: #00F0FF;
}
.router-link-active {
  color: #00F0FF;
}

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
