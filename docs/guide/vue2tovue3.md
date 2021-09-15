# vue2 升级到 vue3

对于现有的 Vue2.x 项目，如果想要平滑的升级到 Vue3，在不使用一些新特性的情况下，改动还不算很大，需要关注以下问题。

## Vue3 中移除的一些 API 和方法

### 取消 KeyboardEvent.keyCode

在 Vue2.x 中，绑定键盘事件会用到如下代码：

```html
<!-- keyCode version -->
<input v-on:keyup.13="submit" />

<!-- alias version -->
<input v-on:keyup.enter="submit" />
```

或者是：

```js
Vue.config.keyCodes = {
  f1: 112
}
<!-- keyCode version -->
<input v-on:keyup.112="showHelpText" />

<!-- custom alias version -->
<input v-on:keyup.f1="showHelpText" />
```

在事件中，给 keyup 配置一个指定按钮的 keyCode(数字)在 Vue3 中将不会生效，但是依然可以使用别名，例如：

```html
<input v-on:keyup.delete="confirmDelete" />
```

### 移除 on off 和 $once 方法

在 Vue2.x 中可以通过 EventBus 的方法来实现组件通信：

```js
var EventBus = new Vue()
Vue.prototype.$EventBus = EventBus
...
this.$EventBus.$on()  this.$EventBus.$emit()
```

这种用法在 Vue3 中就不行了，在 Vue3 中移除了 on off 等方法（参考 rfc），而是推荐使用 mitt 方案来代替：

```js
import mitt from 'mitt'
const emitter = mitt()
// listen to an event
emitter.on('foo', e => console.log('foo', e))
// fire an event
emitter.emit('foo', { a: 'b' })
```

### 移除 filters

在 Vue3 中，移除了组件的 filters 项，可以使用 methods 的或者 computed 来进行替代：

```vue
<template>
  <p>{{ accountBalance | currencyUSD }}</p>
</template>
<script>
export default {
  filters: {
    currencyUSD(value) {
      return '$' + value
    }
  }
}
</script>
```

替换为：

```vue
<template>
  <p>{{ accountInUSD }}</p>
</template>

<script>
export default {
  props: {
    accountBalance: {
      type: Number,
      required: true
    }
  },
  computed: {
    accountInUSD() {
      return '$' + this.accountBalance
    }
  }
}
</script>
```

### 移除 inline-template

在 Vue2.x 中，在父组件引入子组件时，会用到 inline-template 来使子组件的内容也得到展示，参考这里，例如：

```vue
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```

在 Vue3 中，这个功能将被移除，目前 inline-template 使用的并不多，这里就不再过多讲解。

## Vue3 中改变的 API 和写法

### 根实例初始化:

在 2.x 中通过 new Vue()的方法来初始化：

```js
import App from './App.vue'
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

在 3.x 中 Vue 不再是一个构造函数，通过 createApp 方法初始化：

```js
import App from './App.vue'
createApp(App).use(store).mount('#app')
```

### 全局 API 调用方式改变

在 Vue2.x 中，大部分全局 API 都是通过 Vue.xxx 或者 Vue.abc()方式调用，例如：

```js
import Vue from 'vue'

Vue.mixin()

Vue.use()
```

而在 Vue3 中，这些方式将会改变，取而代之的是如下：

```js
import { createApp } from 'vue'

const app = createApp({})

app.mixin()

app.use()

...
```

同时，可以只引入一些需要的 API，不需要的不用引入，这样也符合 Three Shaking 的要求，例如：

```js
import { nextTick, reactive, onMounted } from 'vue'

nextTick(() => {})
onMounted(() => {})
```

由于 Vue3 中全局 API 都会通过 app.xxx 的方法调用，所以之前通过 Vue.prototype.xxx 绑定的全局方法和变量将无法使用，可以采用如下方式来代替：

```js
//在main.js中：
app.config.globalProperties.http = function () {}

//在vue组件中：
this.http()
```

### render 方法修改

在 Vue2.x 中，有时会自定义 render 方法来返回模板内容，如下：

```js
export default {
  render(h) {
    return h('div')
  }
}
```

在 Vue3 中，h 通过 vue 来引入，如下：

```js
import { h } from 'vue'

export default {
  render() {
    return h('div')
  }
}
```

### 新的异步组件创建方式

在 Vue2.x 中，尤其是在 Vue Router 中，会经常使用到异步组件，借助 webpack 的打包方式，可以将一个组件的代码进行异步获取，例如：

```js
const asyncPage = () => import('./NextPage.vue')

const asyncPage = {
  component: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
}
```

在 Vue3 中，提供了 defineAsyncComponent()方法创建异步组件，同时可以返回一个 Promise 对象来自己控制加载完成时机，如下：

```js
import { defineAsyncComponent } from 'vue'

const asyncPageWithOptions = defineAsyncComponent({
  loader: () => import('./NextPage.vue'),
  delay: 200,
  timeout: 3000,
  error: ErrorComponent,
  loading: LoadingComponent
})

const asyncComponent = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      /* ... */
    })
)
```

### data 属性只支持 function

在 Vue2.x 中，根组件的 data 可以直接配置一个对象，子组件的 data 可以配置 function，然后返回一个对象，如下：

```vue
<!-- Object Declaration -->
<script>
const app = new Vue({
  data: {
    apiKey: 'a1b2c3'
  }
})
</script>

<!-- Function Declaration -->
<script>
const child = new Vue({
  data() {
    return {
      apiKey: 'a1b2c3'
    }
  }
})
</script>
```

在 Vue3 中，所有组件都只支持配置 function 返回一个对象的方式，如下：

```vue
<script>
import { createApp } from 'vue'

createApp({
  data() {
    return {
      apiKey: 'a1b2c3'
    }
  }
}).mount('#app')
</script>
```

### 使用自定义标签和 is 属性改动

在 Vue2.x 中，可以使用一些非 HTML 标准的标签（例如使用 Web Components），需要在 Vue 全局配置中声明忽略该标签，例如：

```js
;<plastic-button></plastic-button>

Vue.config.ignoredElements = ['plastic-button']
```

在 Vue3 中，同样支持自定义标签，声明时可以使用如下：

```js
const app = Vue.createApp({})
app.config.isCustomElement = tag => tag === 'plastic-button'
```

除了自定义标签的修改，在 Vue2.x 中，会用到动态组件 is，例如：

```html
<button is="plastic-button">Click Me!</button>
```

由于 is 的特性，这种写法在 Vue2.x 最终会被渲染成`<plastic-button>`组件，但是在 Vue3 中，只会把 is 当作一个普通的 props 属性，如果想实现 Vue2.x 一样的效果，可以使用 v-is，例如：

```html
<button v-is="plastic-button">Click Me!</button>

//result：

<plastic-button></plastic-button>
```

需要注意的是在特殊元素`<component>`上配置的 is 属性用法依然生效。
this.$scopedSlots替代为this.$slots

在 Vue2.x 的某些场景，特别是用到自定义 render 方法和插槽时，会用到 this.$scopedSlots 获取数据，例如：

```js
h(LayoutComponent, [
  h('div', { slot: 'header' }, this.header),
  h('div', { slot: 'content' }, this.content)
])

this.$scopedSlots.header
```

在 Vue3 中，this.$scopedSlots将会被移除，统一替代成this.$slots，例如：

```js
h(
  LayoutComponent,
  {},
  {
    header: () => h('div', this.header),
    content: () => h('div', this.content)
  }
)
this.$slots.header
```

### 自定义指令生命周期方法修改

在 Vue2.x 中，有时会自己创建自定义指令，例如：

```html
<p v-highlight="yellow">Highlight this text bright yellow</p>
```

在自定义指令中，可以使用 Vue 提供的一些声明周期方法，完成具体的逻辑，例如：

```js
Vue.directive('highlight', {
  bind(el, binding, vnode) {
    el.style.background = binding.value
  },
  inserted(),
  beforeUpdate(),
  update(),
  componentUpdated(),
  beforeUnmount(),
  unbind()
})
```

在 Vue3 中，主要对这些生命周期方法进行了调整，如下：

```js
Vue.directive('highlight', {
  beforeMount(el, binding, vnode) {
    // 对应bind
    el.style.background = binding.value
  },
  mounted() {}, // 对应inserted
  beforeUpdate() {}, // 新增
  updated() {}, // 对应update
  beforeUnmount() {}, // 新增
  unmounted() {} // 对应unbind
})
```

### watch 方法不再支持"点分隔"写法

在 Vue2.x 中，使用 watch 方法监听对象改变时，如果对象层级较深，可以采用“点分割”的写法，例如：

```js
var vm = new Vue({
  data: {
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    // watch vm.e.f's value: {g: 5}
    'e.f': function (val, oldVal) {
      /* ... */
    }
  }
})
```

这种写法在 Vue3 中将不在支持，包括使用实例方法 this.$watch。
