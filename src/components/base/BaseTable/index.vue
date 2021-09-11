<template>
  <el-table :data="table.data" v-bind="$attrs">
    <template v-for="(column, index) of table.columns">
      <!-- render -->
      <el-table-column v-if="column.render" v-bind="column" :key="index">
        <template #default="scope">
          <extend :render="column.render" :params="scope" />
        </template>
      </el-table-column>
      <!-- no render -->
      <el-table-column v-else v-bind="column" :key="`${index}-esle`" />
    </template>
  </el-table>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import extend from './extend'

export default defineComponent({
  components: { extend },
  props: {
    table: {
      type: Object,
      default: {}
    }
  },
  setup(props) {
    // console.log(props,555)
  }
})
</script>
