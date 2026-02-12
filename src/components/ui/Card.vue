<template>
  <!-- Card espacial con glassmorphism -->
  <div
    :class="[
      'transition-all duration-300',
      variantClasses,
      hoverable ? 'hover:-translate-y-1 hover:shadow-glow-cyan cursor-pointer' : '',
      glowing ? 'glow-cyan' : ''
    ]"
    @click="$emit('click', $event)"
  >
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'space', validator: v => ['space', 'level', 'character'].includes(v) },
  hoverable: { type: Boolean, default: false },
  glowing: { type: Boolean, default: false }
})

defineEmits(['click'])

const variantClasses = computed(() => ({
  space: 'card-space',
  level: 'card-level',
  character: 'card-character'
})[props.variant])
</script>
