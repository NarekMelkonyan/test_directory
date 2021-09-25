import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  param: [],
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },

  getDirectoryList(state, payload){
    state.param.push(payload)
  }
}

const actions = {
  addDirectory(context, payload){
    context.commit('getDirectoryList', payload)
  }
}

const getters = {
  getLists(state){
    return state.param
  }

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})