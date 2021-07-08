/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-05-03 14:54:09
 * @LastEditors: stride
 * @LastEditTime: 2021-05-20 22:13:46
 */
export default {
  namespaced: true,
  state: {
    // from 是否可见、
    visible: false,
    visibleSec:false
  },
  mutations: {
    setVisible(state, val) {
      state.visible = val
    },
    setVisibleSec(state,val){
      state.visibleSec = val
    }
  },
  actions: {
    getVisible(store, val) {
      store.commit('setVisible', val)
    },
    getVisibleSec(store, val) {
      store.commit('setVisibleSec', val)
    },
  }
}
