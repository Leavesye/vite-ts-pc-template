<template>
  <i class="iconfont icon-chengbenguanli" />
  <common-table :table="tableData" />
</template>

<script setup lang="tsx">

const tableData = {
  data: [{ date: '2021-11-12', name: 'ys', address: '上海' }],
  columns: [
    {
      label: '日期',
      render(h, scope) {
        console.log(scope, 888)
        return <span style='color: red'>{scope.row.date}</span>
      }
    },
    { label: '姓名', prop: 'name' },
    { label: '地址', prop: 'address' }
  ]
}
</script>
