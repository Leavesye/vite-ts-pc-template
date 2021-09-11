
<template>
<el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {

  }
})
</script>
<style scoped>
</style>

