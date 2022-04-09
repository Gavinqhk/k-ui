<template>
  <button class="k-button" @click="$emit('click', $event)">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineEmits(['click'])
</script>

<style scoped lang="scss">
.k-button {
  appearance: none;
  padding: 5px 10px;
  background: lightskyblue;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  &:hover {
    background: rgb(92, 185, 243, 0.8);
  }
  &:active {
    background: rgb(92, 185, 243);
  }
  &:not(:last-child) {
    margin-right: 15px;
  }
}
</style>
