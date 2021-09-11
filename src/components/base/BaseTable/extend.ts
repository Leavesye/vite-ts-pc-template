export default {
  props: {
    params: {
      type: Object
    },
    render: {
      type: Function
    }
  },
  setup({ render, params }) {
    return (h: Function) => render(h, params)
  }
}
