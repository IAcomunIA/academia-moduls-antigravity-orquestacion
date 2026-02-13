<template>
  <div class="landing-page bg-white dark:bg-dark-bg text-gray-900 dark:text-white transition-colors duration-500">
    
    <div id="scrolly-top"></div>
    <!-- Hero Scrollytelling -->
    <ScrollyHero @start="handleStart" />

    <!-- Sección Concepto -->
    <section id="concept" class="py-32 bg-white dark:bg-[#0A0C1A] text-gray-900 dark:text-white relative overflow-hidden">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-cyber-cyan/5 blur-[120px] rounded-full"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
          <h2 class="text-4xl lg:text-5xl font-black mb-6 tracking-tight font-heading uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-700 dark:from-cyber-cyan dark:via-white dark:to-white drop-shadow-sm">{{ i18n.t('concept.title') }}</h2>
          <p class="text-xl text-gray-600 dark:text-gray-mist leading-relaxed">
            {{ i18n.t('concept.description') }}
          </p>
        </div>

            <div class="grid md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="glass-card p-10 rounded-[2rem] border border-gray-200 dark:border-white/5 hover:border-cyber-cyan/30 transition-all group hover:-translate-y-2 bg-white/50 dark:bg-white/5 shadow-sm dark:shadow-none">
            <div class="w-16 h-16 bg-cyber-cyan/20 dark:bg-cyber-cyan/10 text-cyan-700 dark:text-cyber-cyan rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
              <i class="fas fa-layer-group"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{{ i18n.t('concept.card1Title') }}</h3>
            <p class="text-gray-600 dark:text-gray-mist leading-relaxed">
              {{ i18n.t('concept.card1Desc') }}
            </p>
          </div>

          <!-- Card 2 -->
          <div class="glass-card p-10 rounded-[2rem] border border-white/5 hover:border-soft-purple/30 transition-all group hover:-translate-y-2">
            <div class="w-16 h-16 bg-soft-purple/20 dark:bg-soft-purple/10 text-purple-700 dark:text-soft-purple rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
              <i class="fas fa-robot"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{{ i18n.t('concept.card2Title') }}</h3>
            <p class="text-gray-600 dark:text-gray-mist leading-relaxed">
              {{ i18n.t('concept.card2Desc') }}
            </p>
          </div>

          <!-- Card 3 -->
          <div class="glass-card p-10 rounded-[2rem] border border-white/5 hover:border-amber-500/30 transition-all group hover:-translate-y-2">
            <div class="w-16 h-16 bg-amber-500/20 dark:bg-amber-500/10 text-amber-700 dark:text-amber-500 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform">
              <i class="fas fa-rocket"></i>
            </div>
            <h3 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{{ i18n.t('concept.card3Title') }}</h3>
            <p class="text-gray-600 dark:text-gray-mist leading-relaxed">
              {{ i18n.t('concept.card3Desc') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Sin Humo -->
    <section class="py-32 bg-gray-50 dark:bg-black/40 border-y border-gray-200 dark:border-white/5 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="space-y-8">
            <h2 class="text-4xl lg:text-5xl font-black leading-tight font-heading uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-700 dark:from-cyber-cyan dark:via-white dark:to-white drop-shadow-sm">
              {{ i18n.t('sinHumo.title') }}
            </h2>
            <p class="text-xl text-gray-mist leading-relaxed">
              {{ i18n.t('sinHumo.subtitle') }}
            </p>
            
            <div class="space-y-6 pt-4">
                <div class="flex gap-5 group text-left">
                  <div class="flex-shrink-0 w-12 h-12 bg-cyber-cyan/20 dark:bg-cyber-cyan/10 text-cyan-700 dark:text-cyber-cyan rounded-xl flex items-center justify-center group-hover:bg-cyber-cyan group-hover:text-black transition-all shadow-sm dark:shadow-none">
                    <i class="fas fa-code"></i>
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ i18n.t('sinHumo.card1Title') }}</h4>
                    <p class="text-gray-600 dark:text-gray-mist text-sm leading-relaxed">{{ i18n.t('sinHumo.card1Desc') }}</p>
                  </div>
                </div>
                <div class="flex gap-5 group text-left">
                  <div class="flex-shrink-0 w-12 h-12 bg-soft-purple/20 dark:bg-soft-purple/10 text-purple-700 dark:text-soft-purple rounded-xl flex items-center justify-center group-hover:bg-soft-purple group-hover:text-white transition-all shadow-sm dark:shadow-none">
                    <i class="fas fa-project-diagram"></i>
                  </div>
                  <div>
                    <h4 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{{ i18n.t('sinHumo.card2Title') }}</h4>
                    <p class="text-gray-600 dark:text-gray-mist text-sm leading-relaxed">{{ i18n.t('sinHumo.card2Desc') }}</p>
                  </div>
                </div>
            </div>
          </div>
          
          <div class="relative group">
            <div class="absolute -inset-4 bg-gradient-to-r from-cyber-cyan to-soft-purple rounded-[3rem] blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img 
              src="/assets/img/sin_humo_construccion_real.png" 
              alt="Construcción Real" 
              class="relative z-10 rounded-3xl shadow-2xl border border-white/10 grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Sección Temario -->
    <section id="curriculum" class="py-32 bg-white dark:bg-[#0A0C1A]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
           <div class="relative order-2 lg:order-1">
             <div class="absolute -top-10 -left-10 w-40 h-40 bg-soft-purple/20 blur-[80px] rounded-full"></div>
             <img 
               src="/assets/img/temario_arquitectura_capas.png" 
               alt="Arquitectura" 
               class="relative z-10 w-full rounded-2xl shadow-massive transform hover:scale-[1.03] transition-transform duration-500"
             />
           </div>
           
           <div class="space-y-10 order-1 lg:order-2">
             <h2 class="text-4xl font-black font-heading uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-cyan-600 dark:from-white dark:via-soft-purple dark:to-cyber-cyan drop-shadow-sm">{{ i18n.t('curriculum.title') }}</h2>
             <div class="space-y-8">
                <div class="flex gap-6 text-left">
                  <div class="flex-shrink-0 w-10 h-10 bg-cyber-cyan text-black font-bold flex items-center justify-center rounded-full text-lg shadow-glow-cyan-sm">1</div>
                  <div>
                    <h4 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ i18n.t('curriculum.mod1Title') }}</h4>
                    <p class="text-gray-600 dark:text-gray-mist">{{ i18n.t('curriculum.mod1Desc') }}</p>
                  </div>
                </div>
                <div class="flex gap-6 text-left">
                  <div class="flex-shrink-0 w-10 h-10 bg-soft-purple text-white font-bold flex items-center justify-center rounded-full text-lg shadow-glow-purple-sm">2</div>
                  <div>
                    <h4 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ i18n.t('curriculum.mod2Title') }}</h4>
                    <p class="text-gray-600 dark:text-gray-mist">{{ i18n.t('curriculum.mod2Desc') }}</p>
                  </div>
                </div>
                <div class="flex gap-6 text-left">
                  <div class="flex-shrink-0 w-10 h-10 bg-amber-500 text-black font-bold flex items-center justify-center rounded-full text-lg shadow-glow-amber-sm">3</div>
                  <div>
                    <h4 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ i18n.t('curriculum.mod3Title') }}</h4>
                    <p class="text-gray-600 dark:text-gray-mist">{{ i18n.t('curriculum.mod3Desc') }}</p>
                  </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </section>

    <!-- System in Action Section (DEMO) -->
    <section id="demo" class="py-32 bg-white dark:bg-[#0A0C1A] relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-dark-bg/5 dark:from-dark-bg via-transparent to-dark-bg/5 dark:to-dark-bg pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center mb-16 space-y-4">
                <h2 class="text-4xl lg:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 dark:from-cyber-cyan dark:via-white dark:to-cyber-cyan drop-shadow-sm">{{ i18n.t('demo.title') }}</h2>
                <p class="text-xl text-gray-600 dark:text-gray-mist max-w-2xl mx-auto">{{ i18n.t('demo.subtitle') }}</p>
            </div>

            <div class="relative rounded-[2.5rem] overflow-hidden shadow-glow-cyan/20 border border-white/10 bg-black aspect-video max-w-5xl mx-auto group">
                <!-- Demo Video Slider (Simulated with images for now) -->
                <img src="/assets/img/miniatura-youtube.png" alt="Demo Anti-Gravity 1"
                    class="absolute inset-0 w-full h-full object-cover animate-pulse-slow opacity-60 group-hover:opacity-40 transition-opacity duration-700">
                
                <div class="absolute inset-0 flex items-center justify-center group-hover:bg-cyber-cyan/5 transition-colors cursor-pointer relative z-10">
                    <div class="w-24 h-24 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 group-hover:bg-cyber-cyan group-hover:text-black transition-all duration-500 text-white">
                        <i class="fas fa-play text-2xl"></i>
                    </div>
                </div>
                
                <!-- Simulated Code/Terminal Background -->
                <div class="absolute bottom-0 left-0 w-full p-8 font-mono text-xs md:text-sm text-cyber-cyan/80 z-20 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <div class="flex items-center gap-2 mb-2 border-b border-white/5 pb-2">
                        <span class="w-2 h-2 rounded-full bg-red-500"></span>
                        <span class="w-2 h-2 rounded-full bg-yellow-500"></span>
                        <span class="w-2 h-2 rounded-full bg-green-500"></span>
                        <span class="ml-2 text-[10px] text-gray-500 uppercase tracking-widest">Antigravity - Terminal v2.0.1</span>
                    </div>
                    <code class="block space-y-1">
                        <span class="text-gray-500">></span> antigravity init --mode=expert<br>
                        <span class="text-gray-500">></span> <span class="text-white">[INFO]</span> Initializing Cortex Swarm...<br>
                        <span class="text-gray-500">></span> <span class="text-green-400">[SUCCESS]</span> Agent 1 (Architect) connected.<br>
                        <span class="text-gray-500">></span> <span class="text-green-400">[SUCCESS]</span> Agent 2 (Developer) connected.<br>
                        <span class="text-gray-500">></span> <span class="text-green-400">[SUCCESS]</span> Agent 3 (Reviewer) ready.<br>
                        <span class="text-gray-500">></span> Deploying workflow at 14:02:22<br>
                        <span class="animate-pulse text-cyber-cyan">_</span>
                    </code>
                </div>
            </div>
        </div>
    </section>

    <!-- Section: Academy Roadmap -->
    <section id="academy-flow" class="py-32 bg-white dark:bg-black/60 relative overflow-hidden border-y border-gray-100 dark:border-white/5">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyber-cyan/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center mb-20">
                <Badge class="mx-auto mb-4" :text="i18n.t('roadmap.badge')" />
                <h2 class="text-4xl lg:text-6xl font-black mb-6 font-heading uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-700 dark:from-cyber-cyan dark:via-white dark:to-soft-purple drop-shadow-md">{{ i18n.t('roadmap.title') }}</h2>
                <p class="text-xl text-gray-600 dark:text-gray-mist max-w-3xl mx-auto">
                    {{ i18n.t('roadmap.subtitle') }}
                </p>
            </div>

            <div class="grid md:grid-cols-4 gap-4">
                <!-- Step 1 -->
                <div class="glass-card p-8 rounded-3xl border border-gray-200 dark:border-white/5 bg-white/50 dark:bg-white/5 hover:border-cyber-cyan/30 transition-all hover:-translate-y-2 group">
                    <div class="text-xs font-bold text-cyber-cyan mb-4 uppercase tracking-widest">Nivel 01</div>
                    <div class="w-12 h-12 bg-cyber-cyan/20 dark:bg-cyber-cyan/10 text-cyan-700 dark:text-cyber-cyan rounded-xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform shadow-sm dark:shadow-none">
                        <i class="fas fa-terminal"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ i18n.t('roadmap.step1Title') }}</h3>
                    <p class="text-gray-600 dark:text-gray-mist text-sm leading-relaxed">{{ i18n.t('roadmap.step1Desc') }}</p>
                </div>

                <!-- Step 2 -->
                <div class="glass-card p-8 rounded-3xl border border-gray-200 dark:border-white/5 bg-white/50 dark:bg-white/5 hover:border-soft-purple/30 transition-all hover:-translate-y-2 group">
                    <div class="text-xs font-bold text-soft-purple mb-4 uppercase tracking-widest">Nivel 02</div>
                    <div class="w-12 h-12 bg-soft-purple/10 text-soft-purple rounded-xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                        <i class="fas fa-brain"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ i18n.t('roadmap.step2Title') }}</h3>
                    <p class="text-gray-600 dark:text-gray-mist text-sm leading-relaxed">{{ i18n.t('roadmap.step2Desc') }}</p>
                </div>

                <!-- Step 3 -->
                <div class="glass-card p-8 rounded-3xl border border-gray-200 dark:border-white/5 bg-white/50 dark:bg-white/5 hover:border-amber-500/30 transition-all hover:-translate-y-2 group">
                    <div class="text-xs font-bold text-amber-500 mb-4 uppercase tracking-widest">Nivel 03</div>
                    <div class="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform">
                        <i class="fas fa-tools"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ i18n.t('roadmap.step3Title') }}</h3>
                    <p class="text-gray-600 dark:text-gray-mist text-sm leading-relaxed">{{ i18n.t('roadmap.step3Desc') }}</p>
                </div>

                <!-- Step 4 -->
                <div class="glass-card p-8 rounded-3xl border border-gray-200 dark:border-white/5 bg-white/50 dark:bg-white/5 hover:border-green-500/30 transition-all hover:-translate-y-2 group">
                    <div class="text-xs font-bold text-green-500 mb-4 uppercase tracking-widest">Boss Level</div>
                    <div class="w-12 h-12 bg-green-500/20 dark:bg-green-500/10 text-green-700 dark:text-green-500 rounded-xl flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform shadow-sm dark:shadow-none">
                        <i class="fas fa-crown"></i>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ i18n.t('roadmap.step4Title') }}</h3>
                    <p class="text-gray-600 dark:text-gray-mist text-sm leading-relaxed">{{ i18n.t('roadmap.step4Desc') }}</p>
                </div>
            </div>

            <div class="mt-20 text-center">
              <button
                @click="handleStart"
                class="relative group px-16 py-8 bg-black rounded-full font-heading font-black text-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] overflow-hidden"
              >
                <!-- Animated Border Gradient -->
                <div class="absolute inset-0 bg-gradient-to-r from-cyber-cyan via-soft-purple to-cyber-cyan bg-[length:200%_100%] animate-gradient-x opacity-100 p-[3px]">
                  <div class="w-full h-full bg-[#0A0C1A] dark:bg-[#0A0C1A] rounded-full group-hover:bg-[#121633] transition-colors duration-500"></div>
                </div>
                
                <!-- Button Content Overlay -->
                <div class="relative flex items-center justify-center gap-4 z-10">
                  <span class="relative flex h-4 w-4">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-cyan opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-4 w-4 bg-cyber-cyan shadow-[0_0_15px_#00F0FF]"></span>
                  </span>
                  <span class="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90 group-hover:from-cyber-cyan group-hover:to-white transition-all duration-500 uppercase tracking-tighter">
                    {{ i18n.t('nav.startNow') }}
                  </span>
                </div>
                
                <!-- Subtle Scanning Line -->
                <div class="absolute inset-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent top-0 -translate-y-full group-hover:animate-scan z-20"></div>
              </button>
            </div>
        </div>
    </section>

    <!-- Sección Producto / Bundle -->
    <section id="product" class="py-32 bg-white/5 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-cyan/5 to-transparent"></div>
      
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16 space-y-4">
          <Badge class="mx-auto" text="OFERTA DE LANZAMIENTO" />
          <h2 class="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-purple-800 dark:from-cyber-cyan dark:via-white dark:to-soft-purple drop-shadow-md">{{ i18n.t('landing.packTitle') }}</h2>
          <p class="text-gray-600 dark:text-gray-mist text-xl max-w-2xl mx-auto">{{ i18n.t('landing.packSub') }}</p>
        </div>

        <div class="relative group max-w-5xl mx-auto">
          <!-- Personajes decorativos -->
          <div class="absolute -top-16 -right-16 w-48 h-48 animate-float hidden lg:block">
            <img src="/assets/img/astronauta_personaje_con_casco_flotando.png" class="w-full opacity-80" />
          </div>
          <div class="absolute -bottom-16 -left-16 w-56 h-56 animate-float-rev hidden lg:block">
            <img src="/assets/img/un__astrnauta_personaje_antigravedad.png" class="w-full opacity-60" />
          </div>

          <div class="bg-white dark:bg-dark-card rounded-[3rem] shadow-massive border border-gray-200 dark:border-white/5 overflow-hidden">
            <div class="grid lg:grid-cols-2">
              <!-- Content Left -->
              <div class="p-10 lg:p-16 flex flex-col justify-center">
                <div class="mb-8">
                  <h3 class="text-4xl font-black text-gray-900 dark:text-white mb-2">{{ i18n.t('landing.ebookTitle') }}</h3>
                  <p class="text-cyber-cyan font-bold tracking-widest text-sm uppercase">{{ i18n.t('landing.lifetime') }}</p>
                </div>

                <ul class="space-y-4 mb-10">
                  <li class="flex items-center gap-4 text-lg">
                    <span class="text-green-400 font-bold">✓</span>
                    <span class="text-gray-700 dark:text-gray-200">{{ i18n.t('landing.feature1') }}</span>
                  </li>
                  <li class="flex items-center gap-4 text-lg">
                    <span class="text-green-400 font-bold">✓</span>
                    <span class="text-gray-700 dark:text-gray-200">{{ i18n.t('landing.feature2') }}</span>
                  </li>
                  <li class="flex items-center gap-4 text-lg">
                    <span class="text-green-400 font-bold">✓</span>
                    <span class="text-gray-700 dark:text-gray-200">{{ i18n.t('landing.feature3') }}</span>
                  </li>
                  <li class="flex items-center gap-4 text-lg">
                    <span class="text-green-400 font-bold">✓</span>
                    <span class="text-gray-700 dark:text-gray-200">{{ i18n.t('landing.feature4') }}</span>
                  </li>
                </ul>

                <div class="flex items-end gap-5 mb-10 pb-8 border-b border-gray-200 dark:border-white/10">
                  <div>
                    <span class="text-gray-400 dark:text-gray-500 line-through text-lg">Regular: $49</span>
                    <div class="flex items-baseline gap-2">
                      <span class="text-6xl font-black text-gray-900 dark:text-white">$9.99</span>
                      <span class="text-gray-500 dark:text-gray-400">USD</span>
                    </div>
                  </div>
                  <div class="bg-green-400/10 text-green-400 px-4 py-1.5 rounded-full text-sm font-bold mb-2 border border-green-400/20 uppercase">
                    {{ i18n.t('landing.savings') }}
                  </div>
                </div>

                  <div class="space-y-4">
                  <a 
                    href="https://ko-fi.com/s/a2f7374844" 
                    target="_blank"
                    class="w-full py-5 bg-gradient-to-r from-cyber-cyan to-soft-purple text-dark-bg font-black text-xl rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] shadow-glow-cyan"
                  >
                    {{ i18n.t('landing.ctaBuy') }}
                    <i class="fas fa-arrow-right"></i>
                  </a>
                  <p class="text-center text-xs text-gray-500">{{ i18n.t('landing.guarantee') }}</p>
                </div>
              </div>

              <!-- Content Right (Book Preview) -->
              <div class="bg-gradient-to-br from-cyber-cyan/20 to-soft-purple/20 flex items-center justify-center p-12 overflow-hidden relative">
                <div class="absolute inset-0 opacity-10 blur-3xl bg-cyber-cyan"></div>
                <div class="relative z-10 w-72 lg:w-96 transform rotate-6 hover:rotate-0 transition-transform duration-700 drop-shadow-massive">
                  <img 
                    src="/assets/img/libro-antigravity-con-postura-diferenteremovebg-preview.png" 
                    alt="Ebook Pro" 
                    class="w-full h-auto rounded-r-xl shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useI18nStore } from '@/stores/i18n'
import ScrollyHero from '@/components/landing/ScrollyHero.vue'
import Badge from '@/components/ui/Badge.vue'

const router = useRouter()
const userStore = useUserStore()
const i18n = useI18nStore()

const handleStart = () => {
  if (userStore.onboardingCompleted) {
    router.push('/dashboard')
  } else {
    // Si no ha completado el onboarding, vamos a la vista de Onboarding (que crearé)
    router.push('/onboarding')
  }
}
</script>

<style scoped>
.landing-page {
  font-family: 'Inter', sans-serif;
}

.shadow-massive {
  box-shadow: 0 30px 60px -12px rgba(0, 0, 0, 0.5), 0 18px 36px -18px rgba(0, 0, 0, 0.5);
}

.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
}

.dark .glass-card {
  background: rgba(255, 255, 255, 0.02);
}

@keyframes float-rev {
  0%, 100% { transform: translateY(0) rotate(12deg); }
  50% { transform: translateY(-30px) rotate(15deg); }
}

.animate-float-rev {
  animation: float-rev 7s infinite ease-in-out;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

@keyframes gradient-x {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient-x {
  animation: gradient-x 3s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(1000%); }
}

.animate-scan {
  animation: scan 2s linear infinite;
}

/* Custom Scrollbar for Landing */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0A0C1A;
}
::-webkit-scrollbar-thumb {
  background: #1E2442;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #2A325A;
}
</style>
