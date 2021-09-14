module.exports = {
  lang: 'zh-cn',
  title: 'CRM SaaS',
  description: 'Vite & Vue powered static site generator.',

  themeConfig: {
    repo: 'vuejs/vitepress',
    docsDir: 'docs',

    editLinks: true,
    editLinkText: '在 GitHub 上编辑此页面',
    lastUpdated: '最后更新时间',

    algolia: {
      apiKey: 'c57105e511faa5558547599f120ceeba',
      indexName: 'vitepress'
    },

    carbonAds: {
      carbon: 'CEBDT27Y',
      custom: 'CKYD62QM',
      placement: 'vuejsorg'
    },

    nav: [
      { text: 'Guide', link: '/guide/techstack', activeMatch: '^/$|^/guide/' }
      // {
      //   text: 'Config Reference',
      //   link: '/config/basics',
      //   activeMatch: '^/config/'
      // },
      // {
      //   text: 'Release Notes',
      //   link: 'https://github.com/vuejs/vitepress/releases'
      // }
    ],

    sidebar: {
      '/codestyle/': getGuideSidebar(),
      '/config/': getConfigSidebar(),
      '/': getGuideSidebar()
    }
  }
}

function getGuideSidebar() {
  return [
    {
      text: '指引',
      children: [
        { text: '技术栈介绍', link: '/guide/techstack' },
        { text: '开始', link: '/guide/start' },
        { text: 'vue3快速上手', link: '/guide/vue3' },
        { text: 'TS快速上手', link: '/guide/ts' },
        { text: 'vue2迁移到vue3', link: '/guide/vue2tovue3' }
      ]
    },
    {
      text: '代码风格指南',
      children: [
        { text: 'js规范', link: '/codestyle/js' },
        { text: 'vue规范', link: '/codestyle/vue' },
        { text: 'css规范', link: '/codestyle/css' },
        { text: 'html规范', link: '/codestyle/html' }
      ]
    }
  ]
}

function getConfigSidebar() {
  return [
    {
      text: 'App Config',
      children: [{ text: 'Basics', link: '/config/basics' }]
    },
    {
      text: 'Theme Config',
      children: [
        { text: 'Homepage', link: '/config/homepage' },
        { text: 'Algolia Search', link: '/config/algolia-search' },
        { text: 'Carbon Ads', link: '/config/carbon-ads' }
      ]
    }
  ]
}
