<template>
  <!-- Modal overlay con animación -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click.self="cerrable && $emit('close')"
      >
        <!-- Fondo oscuro -->
        <div class="absolute inset-0 bg-dark-void/90 backdrop-blur-sm" />

        <!-- Contenido del modal -->
        <div class="relative bg-deep-space border border-cyber-cyan/30 rounded-2xl p-6 md:p-8 max-w-lg w-full animate-slide-up shadow-glow-cyan">
          <!-- Botón cerrar -->
          <button
            v-if="cerrable"
            class="absolute top-4 right-4 text-gray-mist hover:text-white transition-colors"
            @click="$emit('close')"
            aria-label="Cerrar modal"
          >
            ✕
          </button>

          <!-- Título -->
          <h2 v-if="titulo" class="font-heading font-bold text-xl text-cyber-cyan mb-4">
            {{ titulo }}
          </h2>

          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, required: true },
  titulo: { type: String, default: '' },
  cerrable: { type: Boolean, default: true }
})

defineEmits(['close'])
</script>
