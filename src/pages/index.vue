<template>
  <el-container>
    <el-header class="header">K_UI</el-header>
    <el-container>
      <el-aside class="aside">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1">
            <router-link to="/button">按钮</router-link>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.header {
  line-height: 60px;
  border-bottom: 1px solid #dcdfe6;
}
.aside {
  width: 200px;
}
</style>
