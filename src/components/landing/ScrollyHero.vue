<template>
  <div ref="container" class="relative h-[400vh]">
    <!-- Sticky Background Layer (Canvas) -->
    <div class="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#0A0C1A] transition-colors duration-500">
      <canvas ref="canvas" class="w-full h-full object-cover"></canvas>

      <!-- Loading State overlay -->
      <div
        v-if="loading"
        class="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0A0C1A] z-50 transition-opacity duration-1000"
        :class="{ 'opacity-0': !loading, 'pointer-events-none': !loading }"
      >
        <div class="w-16 h-16 border-4 border-cyan-500 dark:border-cyber-cyan border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-slate-800 dark:text-white font-heading text-sm tracking-[0.3em] uppercase">
          Cargando Energía...
        </p>
        <div class="w-48 h-1 bg-slate-200 dark:bg-white/10 rounded-full mt-4 overflow-hidden">
          <div
            class="h-full bg-cyan-500 dark:bg-cyber-cyan transition-all duration-300"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <!-- Hero Overlay -->
      <div 
        class="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none"
      >
        <!-- Floating Character Left -->
        <div
          class="absolute left-4 lg:left-20 top-1/4 w-32 md:w-64 animate-float opacity-80 pointer-events-none hidden md:block"
          :style="{ opacity: overlayOpacity }"
        >
          <img
            src="/assets/img/un__astrnauta_personaje_antigravedad.png"
            alt="Agente Anti-Gravity"
            class="w-full h-auto drop-shadow-2xl transform -rotate-12"
            @error="handleImageError"
          />
        </div>

        <!-- Floating Character Right -->
        <div
          class="absolute right-4 lg:right-24 bottom-1/4 w-32 md:w-64 animate-float animation-delay-2000 opacity-80 pointer-events-none hidden md:block"
            :style="{ opacity: overlayOpacity }"
        >
          <img
            src="/assets/img/astronauta_personaje_con_casco_flotando.png"
            alt="Agente Explorador"
            class="w-full h-auto drop-shadow-2xl transform rotate-12"
            @error="handleImageError"
          />
        </div>

        <!-- Glass Text Container -->
        <div
          class="max-w-6xl mx-auto space-y-6 p-8 md:p-12 rounded-[32px] pointer-events-auto text-center glass-card border-none transition-all duration-100"
          :style="{
            backdropFilter: `blur(${blurValue}px)`,
            backgroundColor: isDark 
              ? `rgba(10, 12, 26, ${bgOpacity * 0.8})`
              : `rgba(255, 255, 255, ${bgOpacity * 0.9})`,
            opacity: overlayOpacity,
            transform: `scale(${scaleValue}) translateY(${translateYValue}px)`
          }"
        >
          <!-- Badge -->
          <div
            class="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-100 dark:bg-cyber-cyan/10 border border-cyan-300 dark:border-cyber-cyan/30 text-cyan-600 dark:text-cyber-cyan text-xs font-bold mb-2 backdrop-blur-md relative mx-auto shadow-lg dark:shadow-glow-cyan-sm animate-pulse-slow"
          >
            <span class="flex h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyber-cyan mr-2 animate-pulse"></span>
            {{ i18n.t('hero.badge') }}
          </div>

          <!-- Headline -->
          <h1 class="text-3xl sm:text-4xl lg:text-6xl font-black leading-[1.1] text-balance drop-shadow-2xl relative font-heading uppercase tracking-tighter">
            <span class="text-cyan-600/60 dark:text-cyber-cyan/60 block mb-4 font-bold tracking-[0.4em] text-[10px] sm:text-xs">{{ i18n.t('hero.subtitle') }}</span>
            <span class="text-slate-800 dark:text-white block mb-2">{{ i18n.t('hero.headlineMain') }}</span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-slate-800 dark:via-white to-purple-500 dark:to-soft-purple">
              {{ i18n.t('hero.headlineSub') }}
            </span>
          </h1>

          <!-- Subtitle -->
          <div class="space-y-4 max-w-4xl mx-auto mt-8">
            <p class="text-lg md:text-2xl text-slate-800 dark:text-white font-black tracking-tight leading-none uppercase italic opacity-90">
                {{ i18n.t('hero.subHeadline') }}
            </p>
            <p class="text-base md:text-lg text-slate-600 dark:text-gray-mist leading-relaxed text-balance relative font-medium opacity-80 decoration-cyan-500/30 dark:decoration-cyber-cyan/30 underline-offset-4">
                {{ i18n.t('hero.description') }}
            </p>
          </div>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center pt-10 relative">
            <button
              @click="handleStart"
              class="relative group px-12 py-5 bg-slate-800 dark:bg-black rounded-full font-heading font-black text-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] dark:hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] overflow-hidden"
            >
              <!-- Animated Border Gradient -->
              <div class="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 dark:from-cyber-cyan dark:via-soft-purple dark:to-cyber-cyan bg-[length:200%_100%] animate-gradient-x opacity-100 p-[2px]">
                <div class="w-full h-full bg-slate-100 dark:bg-[#0A0C1A] rounded-full group-hover:bg-white dark:group-hover:bg-[#121633] transition-colors duration-500"></div>
              </div>
              
              <!-- Button Content Overlay -->
              <div class="relative flex items-center justify-center gap-3 z-10">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 dark:bg-cyber-cyan opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 dark:bg-cyber-cyan shadow-[0_0_10px_#06B6D4] dark:shadow-[0_0_10px_#00F0FF]"></span>
                </span>
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-white/80 group-hover:from-cyan-600 group-hover:to-slate-800 dark:group-hover:from-cyber-cyan dark:group-hover:to-white transition-all duration-500">
                  {{ i18n.t('hero.ctaEnter') }}
                </span>
              </div>
              
              <!-- Subtle Scanning Line -->
              <div class="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 dark:via-cyber-cyan to-transparent top-0 -translate-y-full group-hover:animate-scan z-20"></div>
            </button>

            <a
              href="#academy-flow"
              class="px-10 py-5 bg-slate-100/80 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white rounded-full font-heading font-bold text-lg hover:bg-slate-200 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/30 transition-all flex items-center justify-center gap-3 group"
            >
              <span class="opacity-70 group-hover:opacity-100 transition-opacity tracking-widest text-sm uppercase">{{ i18n.t('hero.ctaMissions') }}</span>
              <i class="fas fa-chevron-down text-xs opacity-40 group-hover:opacity-100 group-hover:translate-y-1 transition-all"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useI18nStore } from '@/stores/i18n'

const i18n = useI18nStore()
const emit = defineEmits(['start'])

const handleStart = () => {
  emit('start')
}

const container = ref(null)
const canvas = ref(null)
const loading = ref(true)
const progress = ref(0)

// Dynamic values for overlay
const scrollFraction = ref(0)
const blurValue = ref(20)
const bgOpacity = ref(0.7)
const overlayOpacity = ref(1)
const scaleValue = ref(1)
const translateYValue = ref(0)

// Theme detection
const isDark = ref(true)

const checkTheme = () => {
  isDark.value = document.documentElement.classList.contains('dark')
}

// Observer for theme changes
let themeObserver = null

const frameCount = 200
const images = ref([])
let imagesLoaded = 0

// Get frame path based on theme
const getFramePath = (index, dark) => {
  const num = String(index).padStart(3, '0')
  if (dark) {
    return `/assets/img/frames-img/ezgif-frame-${num}.png`
  } else {
    return `/assets/img/frames-light/${num}.png`
  }
}

const handleImageError = (e) => {
    e.target.style.display = 'none'
}

const preloadImages = () => {
  // Reset state
  images.value = []
  imagesLoaded = 0
  loading.value = true
  progress.value = 0
  
  const currentIsDark = isDark.value
  
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image()
    img.src = getFramePath(i, currentIsDark)
    img.onload = () => {
      imagesLoaded++
      progress.value = (imagesLoaded / frameCount) * 100

      if (imagesLoaded === frameCount) {
        setTimeout(() => {
          loading.value = false
          requestAnimationFrame(render)
        }, 500)
      }
    }
    img.onerror = () => {
      imagesLoaded++
      progress.value = (imagesLoaded / frameCount) * 100
      
      if (imagesLoaded === frameCount) {
        setTimeout(() => {
          loading.value = false
          requestAnimationFrame(render)
        }, 500)
      }
    }
    
    if (img.decode) {
        img.decode().catch(() => {}).then(() => {
            images.value[i - 1] = img
        })
    } else {
        images.value[i - 1] = img
    }
  }
}

const render = () => {
  if (!canvas.value) return 
  const ctx = canvas.value.getContext('2d')

  const rect = container.value.getBoundingClientRect()
  
  const scrollableDistance = rect.height - window.innerHeight
  const scrolledAmount = -rect.top
  
  let fraction = scrolledAmount / scrollableDistance
  fraction = Math.max(0, Math.min(1, fraction))
  
  scrollFraction.value = fraction

  // Visual Effects
  blurValue.value = Math.max(0, 20 * (1 - (fraction * 1.2)))
  bgOpacity.value = Math.max(0, 0.8 * (1 - (fraction * 0.8)))
  overlayOpacity.value = Math.max(0, 1 - (fraction * 1.5))
  
  scaleValue.value = 1 + (fraction * 0.3)
  translateYValue.value = fraction * -50
  
  // Frame Selection
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(fraction * (frameCount - 1))
  )

  if (images.value[frameIndex] && images.value[frameIndex].complete) {
    drawFrame(ctx, images.value[frameIndex])
  }
}

const drawFrame = (ctx, img) => {
  const c = canvas.value
  const canvasWidth = c.clientWidth
  const canvasHeight = c.clientHeight

  if (c.width !== canvasWidth || c.height !== canvasHeight) {
    c.width = canvasWidth
    c.height = canvasHeight
  }

  const imgRatio = img.width / img.height
  const canvasRatio = c.width / c.height

  let drawWidth, drawHeight, offsetX, offsetY

  if (imgRatio > canvasRatio) {
    drawHeight = c.height
    drawWidth = c.height * imgRatio
    offsetX = (c.width - drawWidth) / 2
    offsetY = 0
  } else {
    drawWidth = c.width
    drawHeight = c.width / imgRatio
    offsetX = 0
    offsetY = (c.height - drawHeight) / 2
  }

  // Background color based on theme
  ctx.fillStyle = isDark.value ? '#0A0C1A' : '#F8FAFC'
  ctx.fillRect(0, 0, c.width, c.height)
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
}

const onScroll = () => {
  requestAnimationFrame(render)
}

// Watch for theme changes
watch(isDark, () => {
  preloadImages()
})

onMounted(() => {
  // Check initial theme
  checkTheme()
  
  // Setup observer for theme changes
  themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'class') {
        const wasDark = isDark.value
        checkTheme()
        // Only reload if theme actually changed
        if (wasDark !== isDark.value) {
          preloadImages()
        }
      }
    })
  })
  
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
  
  preloadImages()
  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', render)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', render)
  if (themeObserver) {
    themeObserver.disconnect()
  }
})
</script>

<style scoped>
.glass-card {
  will-change: transform, opacity, backdrop-filter;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(-12deg); }
  50% { transform: translateY(-20px) rotate(-10deg); }
}

@keyframes float-rev {
  0%, 100% { transform: translateY(0) rotate(12deg); }
  50% { transform: translateY(-20px) rotate(14deg); }
}

.animate-float {
  animation: float 6s infinite ease-in-out;
}

.animation-delay-2000 {
  animation-delay: 2s;
  animation-name: float-rev;
}

@keyframes gradient-x {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient-x {
  animation: gradient-x 3s ease infinite;
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(1000%); }
}

.animate-scan {
  animation: scan 2s linear infinite;
}
</style>
