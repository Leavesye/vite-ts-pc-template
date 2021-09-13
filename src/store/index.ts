import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state() {
    return {
      lang: 'zh'
    }
  },
  mutations: {
    changeLang(state: any, lang) {
      console.log(lang, 222)
      state.lang = lang
    }
  },
  actions: {
    changeLang({ commit }, lang) {
      console.log(lang, 1111)
      commit('changeLang', lang)
    }
  }
})

export default store
