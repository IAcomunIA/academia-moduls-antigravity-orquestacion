<template>
  <div ref="container" class="relative h-[400vh]">
    <!-- Sticky Background Layer (Canvas) -->
    <div class="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0C1A]">
      <canvas ref="canvas" class="w-full h-full object-cover"></canvas>

      <!-- Loading State overlay -->
      <div
        v-if="loading"
        class="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0C1A] z-50 transition-opacity duration-1000"
        :class="{ 'opacity-0': !loading, 'pointer-events-none': !loading }"
      >
        <div class="w-16 h-16 border-4 border-cyber-cyan border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-white font-heading text-sm tracking-[0.3em] uppercase">
          Cargando Energía...
        </p>
        <div class="w-48 h-1 bg-gray-200 dark:bg-white/10 rounded-full mt-4 overflow-hidden">
          <div
            class="h-full bg-cyber-cyan transition-all duration-300"
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
            backgroundColor: `rgba(10, 12, 26, ${bgOpacity * 0.8})`,
            opacity: overlayOpacity,
            transform: `scale(${scaleValue}) translateY(${translateYValue}px)`
          }"
        >
          <!-- Badge -->
          <div
            class="inline-flex items-center px-4 py-1.5 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-xs font-bold mb-2 backdrop-blur-md relative mx-auto shadow-glow-cyan-sm animate-pulse-slow"
          >
            <span class="flex h-1.5 w-1.5 rounded-full bg-cyber-cyan mr-2 animate-pulse"></span>
            {{ i18n.t('hero.badge') }}
          </div>

          <!-- Headline -->
          <h1 class="text-3xl sm:text-4xl lg:text-6xl font-black leading-[1.1] text-balance drop-shadow-2xl relative font-heading uppercase tracking-tighter">
            <span class="text-cyber-cyan/60 block mb-4 font-bold tracking-[0.4em] text-[10px] sm:text-xs">{{ i18n.t('hero.subtitle') }}</span>
            <span class="text-white block mb-2">{{ i18n.t('hero.headlineMain') }}</span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-white to-soft-purple">
              {{ i18n.t('hero.headlineSub') }}
            </span>
          </h1>

          <!-- Subtitle -->
          <div class="space-y-4 max-w-4xl mx-auto mt-8">
            <p class="text-lg md:text-2xl text-white font-black tracking-tight leading-none uppercase italic opacity-90">
                {{ i18n.t('hero.subHeadline') }}
            </p>
            <p class="text-base md:text-lg text-gray-mist leading-relaxed text-balance relative font-medium opacity-80 decoration-cyber-cyan/30 underline-offset-4">
                {{ i18n.t('hero.description') }}
            </p>
          </div>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row gap-6 justify-center pt-10 relative">
            <button
              @click="handleStart"
              class="relative group px-12 py-5 bg-black rounded-full font-heading font-black text-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] overflow-hidden"
            >
              <!-- Animated Border Gradient -->
              <div class="absolute inset-0 bg-gradient-to-r from-cyber-cyan via-soft-purple to-cyber-cyan bg-[length:200%_100%] animate-gradient-x opacity-100 p-[2px]">
                <div class="w-full h-full bg-[#0A0C1A] rounded-full group-hover:bg-[#121633] transition-colors duration-500"></div>
              </div>
              
              <!-- Button Content Overlay -->
              <div class="relative flex items-center justify-center gap-3 z-10">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-cyber-cyan shadow-[0_0_10px_#00F0FF]"></span>
                </span>
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80 group-hover:from-cyber-cyan group-hover:to-white transition-all duration-500">
                  {{ i18n.t('hero.ctaEnter') }}
                </span>
              </div>
              
              <!-- Subtle Scanning Line -->
              <div class="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent top-0 -translate-y-full group-hover:animate-scan z-20"></div>
            </button>

            <a
              href="#academy-flow"
              class="px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-full font-heading font-bold text-lg hover:bg-white/10 hover:border-white/30 transition-all flex items-center justify-center gap-3 group"
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
import { ref, onMounted, onUnmounted } from 'vue'
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

const frameCount = 200
const images = []
let imagesLoaded = 0

// Use public folder path
const getFramePath = (index) => {
  const num = String(index).padStart(3, '0')
  return `/assets/img/frames-img/ezgif-frame-${num}.png`
}

const handleImageError = (e) => {
    // Fallback or hide if character images are missing in public
    e.target.style.display = 'none'
}

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image()
    img.src = getFramePath(i)
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
      // console.error(`Error cargando frame: ${img.src}`)
      imagesLoaded++ 
    }
    // Optimization: Decode image to avoid jank during first frame render
    if (img.decode) {
        img.decode().catch(() => {}).then(() => {
            images[i - 1] = img
        })
    } else {
        images[i - 1] = img
    }
  }
}

const render = () => {
  if (!canvas.value) return 
  const ctx = canvas.value.getContext('2d')

  // Get container dimensions relative to viewport
  const rect = container.value.getBoundingClientRect()
  
  // The animation should play while the container is in view.
  // We want the frames to cover the entire scrollable distance of the container.
  // Since the container is 600vh, and the sticky content is 100vh,
  // the scrollable distance is 500vh.
  
  const scrollableDistance = rect.height - window.innerHeight
  
  // Determine how far we've scrolled into the container
  // rect.top is 0 when the container is at the very top of the viewport.
  // As we scroll down, rect.top becomes negative.
  // effectively: scrolledAmount = -rect.top
  const scrolledAmount = -rect.top
  
  // Calculate fraction (0 to 1)
  let fraction = scrolledAmount / scrollableDistance
  
  // Clamp fraction between 0 and 1
  fraction = Math.max(0, Math.min(1, fraction))
  
  scrollFraction.value = fraction

  // Visual Effects
  blurValue.value = Math.max(0, 20 * (1 - (fraction * 1.2))) // Disappears slower
  bgOpacity.value = Math.max(0, 0.8 * (1 - (fraction * 0.8)))
  overlayOpacity.value = Math.max(0, 1 - (fraction * 1.5)) // Text stays longer (up to 66% scroll) 
  
  scaleValue.value = 1 + (fraction * 0.3)
  translateYValue.value = fraction * -50 // Move up less drastically
  
  // Frame Selection
  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(fraction * (frameCount - 1))
  )

  if (images[frameIndex] && images[frameIndex].complete) {
    drawFrame(ctx, images[frameIndex])
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

  // Dark background for canvas
  ctx.fillStyle = '#0A0C1A'
  ctx.fillRect(0, 0, c.width, c.height)
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
}

const onScroll = () => {
  requestAnimationFrame(render)
}

onMounted(() => {
  preloadImages()
  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', render)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', render)
})
</script>

<style scoped>
.glass-card {
  /* Optimization for smoother animation */
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
</style>
