import { onBeforeUnmount, onMounted, ref } from 'vue'

export default function getXY() {
  const x = ref('0')
  const y = ref('0')
  // 如果这个文件是ts， e的类型应该是 MouseEvent
  const pageHander = e => {
    console.log(e)
    x.value = e.pageX
    y.value = e.pageY
  }
  // 需要使用生命周期函数，页面加载完成
  onMounted(() => {
    window.addEventListener('click', pageHander)
  })

  // 在页面即将卸载时，移除事件的监听
  onBeforeUnmount(() => {
    window.removeEventListener('click', pageHander)
  })
  return { x, y }
}
