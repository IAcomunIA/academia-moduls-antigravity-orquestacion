<template>
  <!-- Página 404: Ruta no encontrada -->
  <div class="min-h-screen flex flex-col items-center justify-center px-4 text-center">
    <div class="space-y-6 max-w-md animate-slide-up">
      <!-- Astronauta perdido -->
      <div class="text-7xl animate-float">🛸</div>

      <h1 class="font-heading font-bold text-3xl md:text-4xl text-gradient-cyan">
        ¡Nave perdida!
      </h1>

      <p class="text-gray-mist leading-relaxed">
        Parece que esta coordenada galáctica no existe.
        <br>No te preocupes, te llevaremos de vuelta a la base.
      </p>

      <!-- Código de error estilizado -->
      <div class="inline-flex items-center gap-2 bg-deep-space/60 px-4 py-2 rounded-full border border-error-red/30">
        <span class="w-2 h-2 bg-error-red rounded-full animate-glow-pulse" />
        <span class="text-xs font-code text-error-red">ERROR 404 — Ruta no encontrada</span>
      </div>

      <!-- Acciones -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Button size="lg" @click="volverAlInicio">
          🚀 Volver al Inicio
        </Button>
        <button
          class="btn-ghost text-sm"
          @click="$router.back()"
        >
          ← Retroceder
        </button>
      </div>

      <!-- Sugerencia -->
      <div class="card-space mt-8">
        <p class="text-xs text-gray-dim mb-2 font-heading">RUTAS DISPONIBLES</p>
        <div class="flex flex-wrap gap-2 justify-center">
          <router-link
            v-for="ruta in rutasDisponibles"
            :key="ruta.path"
            :to="ruta.path"
            class="px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200
                   border-soft-purple/30 text-gray-mist hover:border-cyber-cyan hover:text-cyber-cyan
                   hover:bg-cyber-cyan/5"
          >
            {{ ruta.icono }} {{ ruta.nombre }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Button from '@/components/ui/Button.vue'

const router = useRouter()

// Rutas sugeridas para el usuario perdido
const rutasDisponibles = [
  { path: '/', nombre: 'Inicio', icono: '🏠' },
  { path: '/map', nombre: 'Mapa', icono: '🗺️' },
  { path: '/dashboard', nombre: 'Nave de Comando', icono: '🚀' },
  { path: '/module-1', nombre: 'Módulo 1', icono: '🏗️' }
]

function volverAlInicio() {
  router.push('/')
}
</script>
