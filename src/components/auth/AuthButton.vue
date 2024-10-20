<template>
  <button :class="`btn ${variant}`" :type="type" @click="onClick">
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'btn-primary'
  },
  type: {
    type: String,
    default: 'button'
  }
})

const emit = defineEmits(['click'])

const onClick = () => emit('click')
</script>
