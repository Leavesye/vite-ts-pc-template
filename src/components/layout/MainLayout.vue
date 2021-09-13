<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <el-radio-group
        v-model="isCollapse"
        style="margin-bottom: 20px"
      >
        <el-radio-button :label="false">
          展开</el-radio-button>
        <el-radio-button :label="true">
          收起</el-radio-button>
      </el-radio-group>
      <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <i
              class="el-icon-location" />
            <span>客户</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              index="1-1"
              @click="linkTo('/customer/member')"
            >
              会员360</el-menu-item>
            <el-menu-item
              index="1-2"
              @click="linkTo('/customer/member-log')"
            >
              会员日志</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <i
              class="el-icon-location" />
            <span>忠诚度</span>
          </template>
          <el-menu-item index="2-4-1">
            等级规则</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-main>
      <el-header>
        <el-select
          v-model="curLang"
          placeholder="请选择语言"
          @change="handleLangChange"
        >
          <el-option
            v-for="item in langs"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-header>
      <router-view />
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    // 声明响应式变量
    const isCollapse = ref(false)
    const curLang = ref('zh')
    const langs = reactive([
      { label: '简体中文', value: 'zh' },
      { label: 'English', value: 'en' }
    ])

    // hook导入
    const router = useRouter()

    // 声明methods
    const linkTo = path => {
      router.push(path)
    }

    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }

    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }

    return {
      isCollapse,
      curLang,
      langs,
      linkTo,
      handleOpen,
      handleClose
    }
  },
  methods: {
    handleLangChange(lang) {
      this.curLang = lang
      this.$i18n.locale = lang
    }
  }
})
</script>
<style scoped></style>
