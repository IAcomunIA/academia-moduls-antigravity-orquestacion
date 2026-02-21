<template>
  <div class="card-space">
    <div class="flex gap-1 mb-6 border-b border-slate-200 dark:border-gray-dim/20 pb-2 overflow-x-auto">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 whitespace-nowrap"
        :class="activeTab === index
          ? 'bg-cyan-100 dark:bg-cyber-cyan/10 text-cyan-600 dark:text-cyber-cyan border-b-2 border-cyan-500 dark:border-cyber-cyan'
          : 'text-slate-500 dark:text-gray-mist hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
        "
        @click="activeTab = index"
      >
        {{ tab.titulo }}
      </button>
    </div>

    <div class="min-h-[200px]">
      <Transition name="fade" mode="out-in">
        <div :key="activeTab" class="animate-fade-in">
          <h3 class="font-heading font-bold text-lg text-slate-800 dark:text-white mb-3">
            {{ tabs[activeTab].titulo }}
          </h3>

          <div class="prose prose-slate dark:prose-invert max-w-none">
            <div
              v-for="(bloque, i) in tabs[activeTab].contenido"
              :key="i"
              class="mb-4"
            >
              <p v-if="bloque.tipo === 'texto'" class="text-slate-600 dark:text-gray-mist leading-relaxed text-sm">
                {{ bloque.valor }}
              </p>

              <div v-else-if="bloque.tipo === 'codigo'" class="input-code whitespace-pre-wrap text-xs mb-4 bg-slate-800 dark:bg-slate-900 text-slate-200">
                {{ bloque.valor }}
              </div>

              <ul v-else-if="bloque.tipo === 'lista'" class="space-y-2 ml-4">
                <li
                  v-for="(item, j) in bloque.items"
                  :key="j"
                  class="text-slate-600 dark:text-gray-mist text-sm flex items-start gap-2"
                >
                  <span class="text-cyan-500 dark:text-cyber-cyan mt-0.5">▹</span>
                  <span>{{ item }}</span>
                </li>
              </ul>

              <div v-else-if="bloque.tipo === 'tip'" class="flex gap-3 p-4 bg-purple-50 dark:bg-soft-purple/10 border border-purple-200 dark:border-soft-purple/30 rounded-xl">
                <span class="text-lg">💡</span>
                <p class="text-sm text-purple-600 dark:text-light-purple">{{ bloque.valor }}</p>
              </div>

              <div v-else-if="bloque.tipo === 'imagen'" class="my-6 relative group overflow-hidden rounded-xl border border-slate-200 dark:border-white/10 shadow-lg">
                <img :src="bloque.valor" :alt="bloque.caption || 'Visual Asset'" class="w-full object-cover max-h-[300px] transform group-hover:scale-105 transition-transform duration-700" />
                <div v-if="bloque.caption" class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-900/80 dark:from-black/80 to-transparent">
                  <p class="text-[10px] text-slate-300 dark:text-gray-mist uppercase tracking-widest text-center">{{ bloque.caption }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="flex justify-between mt-6 pt-4 border-t border-slate-200 dark:border-gray-dim/20">
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
  }
})

defineEmits(['complete'])

const activeTab = ref(0)

watch(activeTab, () => {
})
</script>
