import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    adminName:"",
    globalSettings:{
      apiUrl:"http://127.0.0.1:8090"
    }
  },
  mutations: {
    setAdminName(state,value){
      return state.adminName=value
    },
    setGlobalSettings(state,value){
      return state.globalSettings=value
    }
  },
  actions: {

  }
})
