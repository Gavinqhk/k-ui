<template>
  <div class="button-wrapper">
    <k-button @click="handleClickBtn('k_button1')">按钮1</k-button>
    <k-button @click="handleClickBtn('k_button2')">按钮2</k-button>
    <k-button @click="handleClickBtn('k_button3')">按钮3</k-button>
    <k-button @click="handleClickBtn('k_button4')">按钮4</k-button>
  </div>
</template>

<script lang="ts" setup>
const handleClickBtn = (test: string) => {
  console.log(test)
}
</script>

<style></style>
