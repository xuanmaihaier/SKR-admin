/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-27 22:51:51
 * @LastEditors: stride
 * @LastEditTime: 2021-04-30 19:32:51
 */
export default {
  namespaced: true,
  state: {
    // from 是否可见
    visible: false,
    // 点击添加购物车的from
    VisibleSec: false,
    // 点击下一步的from
    VisibleThr: false,
    listact: {},
    length: 0,
    lengthsec: 0
  },
  mutations: {
    setVisible(state, val) {
      state.visible = val
    },
    setVisibleSec(state, val) {
      state.VisibleSec = val
    },
    setVisibleThr(state, val) {
      state.VisibleThr = val
    },
    setListAct(state, val) {
      state.listact = val
    },
    setLength(state, val) {
      state.length = val
    },
    setLengthsec(state, val) {
      state.lengthsec = val
    }
  },
  actions: {
    getVisible(store, val) {
      store.commit('setVisible', val)
    },
    getVisibleSec(store, val) {
      store.commit('setVisibleSec', val)
    },
    getVisibleThr(store, val) {
      store.commit('setVisibleThr', val)
    },
    getListAct(store, val) {
      store.commit('setListAct', val)
    },
    getLength(store, val) {
      store.commit('setLength', val)
    },
    getLengthsec(store, val) {
      store.commit('setLengthsec', val)
    }
  }
}
