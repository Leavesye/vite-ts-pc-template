<template>
  <h1>编辑</h1>
  <el-form
    label-width="80px"
    :model="form"
  >
    <el-form-item label="姓名">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="年龄">
      <el-input v-model="form.age" />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleSave"
      >保存</el-button>
      <el-button @click="handleCancel">
        取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="tsx">
import { defineComponent, onMounted, ref, toRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  getMemberById,
  createMember,
  updateMember
} from '@/api/customer/member'

export default defineComponent({
  setup() {
    // 声明响应式变量
    const form = ref({
      name: '',
      age: null
    })

    // 导入hook
    const router = useRouter() // 获取路由跳转方法
    const { query } = useRoute() // 获取路由参数

    // 声明methods
    const handleSave = async () => {
      const { id } = query
      let save = (params: any): any => {}
      let p = {}
      if (id) {
        save = updateMember
        p = {
          ...form.value,
          id: id
        }
      } else {
        save = createMember
        p = form.value
      }
      const res = await save(p).catch(e => console.log(e))
      console.log(res)
      router.go(-1)
    }

    const handleCancel = () => {
      router.go(-1)
    }

    // 生命周期钩子
    onMounted(async () => {
      const res = await getMemberById(query).catch(e => console.log(e))
      form.value = res.data
    })
    return {
      form,
      handleSave,
      handleCancel
    }
  }
})
</script>
