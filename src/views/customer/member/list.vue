<template>
  <h1>{{ t('message.Home') }}</h1>
  <h1>{{ aboutUs }}</h1>
  <el-button
    type="primary"
    @click="handleCreate"
  >新增</el-button>
  <el-form
    :inline="true"
    :model="search"
    class="demo-form-inline"
  >
    <el-form-item label="姓名">
      <el-input
        v-model="search.name"
        placeholder="姓名"
      />
    </el-form-item>
    <el-form-item label="年龄">
      <el-input
        v-model="search.age"
        placeholder="年龄"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="handleSearch"
      >查询</el-button>
    </el-form-item>
  </el-form>
  <BaseTable :table="tableData" />
  <el-pagination
    layout="prev, pager, next"
    :total="50"
  />
</template>

<script lang="tsx">
import { defineComponent, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessageBox, ElMessage } from 'element-plus'
import { getMembers, removeMember } from '@/api/customer/member'

// 接口约束查询条件
interface ISearchForm {
  name: string;
  age: number | null;
}

export default defineComponent({
  setup() {
    // hook函数
    const { t } = useI18n()
    const router = useRouter()

    // 响应式变量
    const search: ISearchForm = reactive({
      name: '',
      age: null
    })

    const tableData = reactive({
      data: [],
      columns: [
        {
          label: '姓名',
          render(h, scope) {
            return <span style='color: red'>{scope.row.name}</span>
          }
        },
        { label: '年龄', prop: 'age' },
        {
          label: '操作',
          render(h, scope) {
            return (
              <>
                <el-link
                  style='margin-right: 10px'
                  type='primary'
                  onClick={() => handleEdit(scope.row)}
                >
                  编辑
                </el-link>
                <el-link
                  type='primary'
                  onClick={() => handleConfirmRemove(scope.row)}
                >
                  删除
                </el-link>
              </>
            )
          }
        }
      ]
    })

    // 计算属性
    const aboutUs = computed(() => t('message.About'))

    // methods方法
    const handleSearch = async () => {
      const res = await getMembers(search).catch(e => console.log(e))
      console.log(res.data, 'res')
      tableData.data = res.data
    }

    const handleCreate = () => {
      router.push(`/customer/member-edit`)
    }

    const handleEdit = row => {
      const { id } = row
      router.push(`/customer/member-edit?id=${id}`)
    }

    const handleConfirmRemove = row => {
      ElMessageBox.alert('确定要删除吗？', '删除', {
        confirmButtonText: '确定',
        callback: action => {
          handleRemove(row)
          ElMessage({
            type: 'info',
            message: '删除成功'
          })
        }
      })
    }

    const handleRemove = async row => {
      console.log(row)
      await removeMember(row.id)
      handleSearch()
    }

    // 生命周期钩子
    onMounted(async () => {
      handleSearch()
    })

    return {
      search,
      tableData,
      aboutUs,
      t,
      handleCreate,
      handleSearch,
      handleConfirmRemove
    }
  }
})
</script>
