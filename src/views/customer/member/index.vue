<template>
  <h1>{{ t('message.Home') }}</h1>
  <h1>{{ aboutUs }}</h1>
  <i class="iconfont icon-chengbenguanli" />
  <BaseTable :table="tableData" />
</template>

<script lang="tsx">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import useXY from '@/hooks/useXY'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const { x, y } = useXY()
    const aboutUs = t('message.About')
    const tableData = {
      data: [{ date: '2021-11-12', name: 'ys', address: '上海' }],
      columns: [
        {
          label: '日期',
          render(h, scope) {
            console.log(scope, 888)
            return <span style='color: red'>111</span>
          }
        },
        { label: '姓名', prop: 'name' },
        { label: '地址', prop: 'address' }
      ]
    }

    return {
      tableData,
      t,
      aboutUs,
      x,
      y
    }
  }
})
</script>
