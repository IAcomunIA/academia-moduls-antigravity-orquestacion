<template>
  <!-- Panel de teoría con pestañas interactivas -->
  <div class="card-space">
    <!-- Pestañas -->
    <div class="flex gap-1 mb-6 border-b border-gray-dim/20 pb-2 overflow-x-auto">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap"
        :class="activeTab === index
          ? 'bg-cyber-cyan/10 text-cyber-cyan border-b-2 border-cyber-cyan'
          : 'text-gray-mist hover:text-white hover:bg-white/5'
        "
        @click="activeTab = index"
      >
        {{ tab.titulo }}
      </button>
    </div>

    <!-- Contenido de la pestaña activa -->
    <div class="min-h-[200px]">
      <Transition name="fade" mode="out-in">
        <div :key="activeTab" class="animate-fade-in">
          <!-- Título de la sección -->
          <h3 class="font-heading font-bold text-lg text-white mb-3">
            {{ tabs[activeTab].titulo }}
          </h3>

          <!-- Contenido renderizado como texto con formato -->
          <div class="prose prose-invert max-w-none">
            <div
              v-for="(bloque, i) in tabs[activeTab].contenido"
              :key="i"
              class="mb-4"
            >
              <!-- Párrafo normal -->
              <p v-if="bloque.tipo === 'texto'" class="text-gray-mist leading-relaxed text-sm">
                {{ bloque.valor }}
              </p>

              <!-- Bloque de código -->
              <div v-else-if="bloque.tipo === 'codigo'" class="input-code whitespace-pre-wrap text-xs mb-4">
                {{ bloque.valor }}
              </div>

              <!-- Lista de puntos -->
              <ul v-else-if="bloque.tipo === 'lista'" class="space-y-2 ml-4">
                <li
                  v-for="(item, j) in bloque.items"
                  :key="j"
                  class="text-gray-mist text-sm flex items-start gap-2"
                >
                  <span class="text-cyber-cyan mt-0.5">▹</span>
                  <span>{{ item }}</span>
                </li>
              </ul>

              <!-- Tip/destacado -->
              <div v-else-if="bloque.tipo === 'tip'" class="flex gap-3 p-4 bg-soft-purple/10 border border-soft-purple/30 rounded-xl">
                <span class="text-lg">💡</span>
                <p class="text-sm text-light-purple">{{ bloque.valor }}</p>
              </div>

              <!-- Imagen/Asset visual -->
              <div v-else-if="bloque.tipo === 'imagen'" class="my-6 relative group overflow-hidden rounded-xl border border-white/10 shadow-massive">
                <img :src="bloque.valor" :alt="bloque.caption || 'Visual Asset'" class="w-full object-cover max-h-[300px] transform group-hover:scale-105 transition-transform duration-700" />
                <div v-if="bloque.caption" class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p class="text-[10px] text-gray-mist uppercase tracking-widest text-center">{{ bloque.caption }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Navegación entre tabs -->
    <div class="flex justify-between mt-6 pt-4 border-t border-gray-dim/20">
      <button
        v-if="activeTab > 0"
        class="btn-ghost text-sm"
        @click="activeTab--"
      >
        ← Anterior
      </button>
      <div v-else />
      <button
        v-if="activeTab < tabs.length - 1"
        class="btn-ghost text-sm"
        @click="activeTab++"
      >
        Siguiente →
      </button>
      <button
        v-else
        class="btn-primary text-sm"
        @click="$emit('complete')"
      >
        Continuar al Ejercicio →
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true
    // Cada tab: { titulo, contenido: [{ tipo: 'texto'|'codigo'|'lista'|'tip', valor?, items? }] }
  }
})

defineEmits(['complete'])

const activeTab = ref(0)

// Emitir evento de lectura de teoría (para tracking XP)
watch(activeTab, () => {
  // El componente padre puede trackear el progreso
})
</script>
