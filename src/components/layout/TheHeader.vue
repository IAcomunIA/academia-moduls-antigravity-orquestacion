<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled || !isLanding ? 'bg-deep-space/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent border-transparent'
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3 group focus:outline-none z-50">
        <span class="text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">🚀</span>
        <span class="font-heading font-bold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-soft-purple group-hover:to-white transition-all duration-300">
          Antigravity Academy
        </span>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-6">
        <!-- Landing Links -->
        <template v-if="isLanding && !userStore.onboardingCompleted">
          <a href="#scrolly-top" class="nav-link">{{ i18n.t('nav.home') }}</a>
          <a href="#concept" class="nav-link">{{ i18n.t('nav.methodology') }}</a>
          <a href="#curriculum" class="nav-link">{{ i18n.t('nav.curriculum') }}</a>
          <a href="#product" class="nav-link">{{ i18n.t('nav.product') }}</a>
          <button 
            @click="handleStart"
            class="px-6 py-2 bg-gradient-to-r from-cyber-cyan to-soft-purple text-white font-bold rounded-full text-sm hover:shadow-lg hover:shadow-cyber-cyan/20 transition-all transform hover:-translate-y-0.5"
          >
            {{ i18n.t('nav.startNow') }}
          </button>
        </template>

        <!-- Dashboard Links -->
        <template v-else>
          <router-link to="/" class="nav-link" active-class="text-cyber-cyan font-bold">{{ i18n.t('nav.home') }}</router-link>
          
          <template v-if="userStore.onboardingCompleted">
             <router-link to="/map" class="nav-link" active-class="text-cyber-cyan font-bold">{{ i18n.t('nav.starMap') }}</router-link>
             <router-link to="/dashboard" class="nav-link" active-class="text-cyber-cyan font-bold">{{ i18n.t('nav.commandShip') }}</router-link>
             
             <!-- User Stats -->
             <div class="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 ml-4">
                <div class="flex flex-col items-end leading-none">
                  <span class="text-[10px] text-gray-mist uppercase tracking-wider font-bold">{{ userStore.currentRank }}</span>
                </div>
                <div class="h-4 w-[1px] bg-white/10"></div>
                <span class="text-xs font-bold text-cyber-cyan font-code">{{ userStore.xp }} XP</span>
             </div>
          </template>
        </template>

        <!-- Language Switcher -->
        <div class="flex items-center gap-2 ml-4 px-2 py-1 bg-white/5 rounded-full border border-white/10">
          <button 
            @click="i18n.setLocale('es')" 
            class="w-6 h-6 flex items-center justify-center rounded-full transition-all"
            :class="i18n.currentLocale === 'es' ? 'bg-cyber-cyan/20 ring-1 ring-cyber-cyan' : 'opacity-40 hover:opacity-100'"
            title="Español"
          >
            <span class="text-xs">🇪🇸</span>
          </button>
          <button 
            @click="i18n.setLocale('en')" 
            class="w-6 h-6 flex items-center justify-center rounded-full transition-all"
            :class="i18n.currentLocale === 'en' ? 'bg-cyber-cyan/20 ring-1 ring-cyber-cyan' : 'opacity-40 hover:opacity-100'"
            title="English"
          >
            <span class="text-xs">🇺🇸</span>
          </button>
          <button 
            @click="i18n.setLocale('pt')" 
            class="w-6 h-6 flex items-center justify-center rounded-full transition-all"
            :class="i18n.currentLocale === 'pt' ? 'bg-cyber-cyan/20 ring-1 ring-cyber-cyan' : 'opacity-40 hover:opacity-100'"
            title="Português (Brasil)"
          >
            <span class="text-xs">🇧🇷</span>
          </button>
        </div>

        <ThemeToggle class="ml-2" />
      </div>

      <!-- Mobile Menu Button -->
      <button 
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden text-white p-2 z-50 focus:outline-none"
      >
        <span class="text-2xl">{{ mobileMenuOpen ? '✕' : '☰' }}</span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div 
      v-show="mobileMenuOpen"
      class="absolute inset-0 top-0 h-screen bg-deep-space/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 animate-fade-in md:hidden"
    >
        <template v-if="isLanding && !userStore.onboardingCompleted">
          <a href="#scrolly-top" @click="mobileMenuOpen = false" class="text-xl font-bold text-white">{{ i18n.t('nav.home') }}</a>
          <a href="#concept" @click="mobileMenuOpen = false" class="text-xl font-bold text-white">{{ i18n.t('nav.methodology') }}</a>
          <a href="#curriculum" @click="mobileMenuOpen = false" class="text-xl font-bold text-white">{{ i18n.t('nav.curriculum') }}</a>
          <a href="#product" @click="mobileMenuOpen = false" class="text-xl font-bold text-white">{{ i18n.t('nav.product') }}</a>
          <button @click="handleStart(); mobileMenuOpen = false" class="px-8 py-3 bg-cyber-cyan text-black font-bold rounded-full">
            {{ i18n.t('nav.startNow') }}
          </button>
        </template>
        <template v-else>
          <router-link to="/" @click="mobileMenuOpen = false" class="text-xl font-bold text-white">{{ i18n.t('nav.home') }}</router-link>
          <router-link to="/map" @click="mobileMenuOpen = false" class="text-xl font-bold text-white">{{ i18n.t('nav.starMap') }}</router-link>
          <router-link to="/dashboard" @click="mobileMenuOpen = false" class="text-xl font-bold text-white">{{ i18n.t('nav.commandShip') }}</router-link>
        </template>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useI18nStore } from '@/stores/i18n'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const i18n = useI18nStore()

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

const isLanding = computed(() => route.path === '/' && !userStore.onboardingCompleted)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const handleStart = () => {
  if (userStore.onboardingCompleted) {
    router.push('/dashboard')
  } else {
    // Scroll to product or start onboarding flow
    const productSection = document.getElementById('product')
    if (productSection) {
        productSection.scrollIntoView({ behavior: 'smooth' })
    } else {
       // If we aren't on landing for some reason, go there
       router.push('/')
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.nav-link {
  color: #94A3B8; /* gray-mist */
  font-size: 0.875rem;
  font-weight: 500;
  transition: color 0.2s;
}
.nav-link:hover {
  color: #00F0FF; /* cyber-cyan */
}
.router-link-active {
  color: #00F0FF;
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
