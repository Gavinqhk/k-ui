<template>
  <div class="kui-preview">
    <section class="demo-container">
      <component :is="com" />
    </section>
    <section class="code-container">
      <div :class="`source-code ${codeVisible ? 'show' : ''}`">
        <pre class="language-html"><code class="language-html">{{PreviewSourceCode}}</code></pre>
      </div>
      <div class="preview-bottom">
        <p @click="showSourceCode">查看代码</p>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { computed } from '@vue/reactivity'
import { onMounted, shallowRef, nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'

import Prism from 'prismjs'
import '../assets/style/prism.css'

const props = defineProps({
  name: {
    require: true,
    type: String,
    default: ''
  }
})
const com = shallowRef()
const sourceCode = shallowRef('')
const codeVisible = ref(false)
const routeName = useRoute().name
import(`../../docs/${String(routeName)}/${props.name}.vue`).then(module => {
  com.value = module.default
})
const PreviewSourceCode = computed(() => {
  return sourceCode.value.replace(/'\.\.\/\.\.\/index'/g, `'@tencent/my-kit'`)
})
const showSourceCode = () => {
  codeVisible.value = !codeVisible.value
}
onMounted(async () => {
  sourceCode.value = (await import(`../../docs/${String(routeName)}/${props.name}.vue?raw`)).default
  await nextTick()
  Prism.highlightAll()
})
</script>
<style scoped lang="scss">
.source-code {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.5s;
  &.show {
    max-height: 500px;
    overflow: auto;
  }
}
.kui-preview {
  border: 4px;
  border: 1px dashed #e7e7e7;
  padding: 15px 15px 0;
  .demo-container {
    margin: 15px;
  }
}
.preview-bottom p {
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-top: 1px dashed #e7e7e7;
  cursor: pointer;
}
</style>
