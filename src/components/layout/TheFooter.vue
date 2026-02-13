<template>
  <footer class="bg-dark-void border-t border-white/5 pt-16 pb-8 text-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <!-- Brand -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🚀</span>
            <span class="text-xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-soft-purple uppercase tracking-tighter">
              Antigravity Academy
            </span>
          </div>
          <p class="text-gray-600 dark:text-gray-mist leading-relaxed">
            Construyendo la próxima generación de ingenieros de IA. Arquitecturas reales para problemas reales.
          </p>
          <div class="flex gap-4 pt-2">
            <!-- Social Placeholders -->
             <a href="#" class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-cyber-cyan/20 hover:text-cyber-cyan transition-all">
               <span class="text-xs">𝕏</span>
             </a>
             <a href="#" class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-soft-purple/20 hover:text-soft-purple transition-all">
               <span class="text-xs">GH</span>
             </a>
          </div>
        </div>

        <!-- Links 1 -->
        <div>
          <h4 class="font-heading font-bold text-white mb-6 uppercase tracking-widest text-xs opacity-60">Plataforma</h4>
          <ul class="space-y-3 text-gray-mist">
            <li><router-link to="/" class="hover:text-cyber-cyan transition-colors">Inicio</router-link></li>
            <li><router-link to="/map" v-if="userStore.onboardingCompleted" class="hover:text-cyber-cyan transition-colors">Mapa Estelar</router-link></li>
            <li><a href="#" class="hover:text-cyber-cyan transition-colors">Changelog</a></li>
          </ul>
        </div>

        <!-- Links 2 -->
        <div>
           <h4 class="font-heading font-bold text-white mb-6 uppercase tracking-widest text-xs opacity-60">Recursos</h4>
           <ul class="space-y-3 text-gray-mist">
             <li><a href="#" class="hover:text-cyber-cyan transition-colors">Documentación</a></li>
             <li><a href="#" class="hover:text-cyber-cyan transition-colors">Comunidad</a></li>
             <li><a href="#" class="hover:text-cyber-cyan transition-colors">Soporte</a></li>
           </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="font-heading font-bold text-white mb-6 uppercase tracking-widest text-xs opacity-60">Legal</h4>
          <ul class="space-y-3 text-gray-mist">
            <li><a href="#" class="hover:text-cyber-cyan transition-colors">Términos</a></li>
            <li><a href="#" class="hover:text-cyber-cyan transition-colors">Privacidad</a></li>
            <li><a href="#" class="hover:text-cyber-cyan transition-colors">Licencia</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-dim font-mono text-xs">
        <p>© 2026 Antigravity Academy. All rights reserved.</p>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span>Sistemas Operativos</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>
