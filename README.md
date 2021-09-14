## 基于 vite + vue3 + ts 的后台管理项目

### 开发前置

1. 需要 Node.js 版本 >= 12.0.0
2. 安装[yarn](https://yarn.bootcss.com/docs/install/#windows-stable)
3. 复制一份`local-config-template.ts`文件并名命为 `local-config.ts`(本地个性化配置文件)
4. vscode 安装插件 Eslint、Prettier、Vetur
5. vscode 配置参考. `/文件/首选项/设置`

```json
{
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "typescript.updateImportsOnFileMove.enabled": "always",
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      // 对属性进行换行。
      // - auto: 仅在超出行长度时才对属性进行换行。
      // - force: 对除第一个属性外的其他每个属性进行换行。
      // - force-aligned: 对除第一个属性外的其他每个属性进行换行，并保持对齐。
      // - force-expand-multiline: 对每个属性进行换行。
      // - aligned-multiple: 当超出折行长度时，将属性进行垂直对齐。
      // Maximum number of line breaks to be preserved in one chunk (0 disables)
      "wrap_attributes": "force-expand-multiline",
      // "wrap_line_length": 40, //多少字符换行
      "max_preserve_newlines": 0
    }
  },
  // 保存时自动格式化
  "editor.formatOnSave": true,
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
  }
}
```

6. 命令行执行 `yarn docs:dev` 访问在线文档学习相关技术栈

### 开发

```
// 安装依赖包
yarn

// 启动开发环境
yarn dev

//构建生产环境
yarn build

// 预览生产环境
yarn preview

// eslint语法检查
yarn lint

// prettier格式化代码
yarn format

// 启动文档开发环境
yarn docs:dev

// 构建文档
yarn docs:build

// 预览构建文档
yarn docs:serve
```

### 项目目录结构

```
web
|── docs -- 项目文档 yarn docs:dev 可以开启本地编辑模式
|—— mock -- 数据模拟用于无后端服务模式下的本地调试
|—— public -- 网站公共资源
| |—— favicon.ico -- 浏览器标签快捷图标
|—— src -- 网站源码
| |—— api -- 所有请求
| |—— assets -- 放置字体图片等静态资源
| |—— components -- 通用组件目录
| | |—— base -- 组件基础设施（放置与具体业务无关的通用组件）
| | |—— layout -- 网站布局组件
| | |—— HelloWorld -- 一般业务组件
| |—— hooks -- 可复用的 js 业务逻辑
| |—— lang -- 多语言配置
| |—— router -- 路由配置
| |—— store -- vuex 状态管理
| |—— styles -- 网站样式文件目录
| |—— utils -- 网站工具方法目录
| |—— views -- 页面视图
| |—— App.vue -- vue 入口组件
| |—— env.d.ts -- ts 类型定义文件
| |—— main.ts -- 系统入口文件
|—— .env.development -- 开发环境变量配置
|—— .env.development.local -- 本地开发环境变量配置 不作为 git 提交项 防止冲突
|—— .env.production -- 生产打包环境变量配置
|—— .eslintignore -- 设置不需要 eslint 检查的文件
|—— .eslintrc.js -- eslint 规则配置文件
|—— .gitignore -- 设置不需要提交 git 的文件
|—— .prettierrc -- prettier 代码格式化规则配置
|—— index.html -- html
|—— local-config-template.ts -- 本地开发环境变量配置模板（作用 eg: 控制 mock 数据开关）
|—— local-config.ts -- 不作为 git 提交项 防止冲突(代码拉下来之后各自按照 local-config-template.ts 新建)
|—— nginx.conf -- 部署生产nginx配置参考
|—— package.json -- 包管理文件
|—— README.md -- 网站描述文件
|—— tsconfig.json -- ts 配置文件
|—— vite.config.ts -- vite 配置文件
```

### 相关文档

- [mock](https://github.com/anncwb/vite-plugin-mock)
- [vue3 官方文档](https://v3.cn.vuejs.org/)
- [vue-router4.0 官方文档](https://next.router.vuejs.org/)
- [vuex4.0 官方文档](https://next.vuex.vuejs.org/)
- [vite 官方文档](https://cn.vitejs.dev/)
- [ts 官方文档](https://www.tslang.cn/docs/home.html)
- [element-plus](https://element-plus.gitee.io/#/zh-CN)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [yarn](https://yarn.bootcss.com/)
