import Vue from 'vue'   
import Vuex from 'vuex'   
    
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    topicDialog:false,
    mixedLimits:2,
    newExa:false,
    settings:false,
    settingFeatures:{
      imageSetting:false,
      qrSettings:false
    }
  },
  
  getters:{
  
    getnewExample(state){
      return state.newExa
    },
    getDialogPop(state){
      return state.topicDialog
    },
    getMixedLimits(state){
      return state.mixedLimits
    },
    getSettings(state){
      return state.settings
    },
    getQrSettings(state){
      return state.settingFeatures.qrSettings 
    },
    getImageSettings(state){
      return state.settingFeatures.imageSetting 
    },
  },
  mutations: {
    setQrSettings(state, payload){
      state.settingFeatures.qrSettings = payload
    },
    setImageSettings(state, payload){      
      state.settingFeatures.imageSetting = payload
    },
    showSettings(state, payload){
      state.settings = payload
    },
    setTopicPop(state, payload){
      state.topicDialog = payload
    },
    setMixedLimits(state, payload){
      state.mixedLimits=payload
    },
    setNewExample(state,payload){
      state.newExa = payload
    }
  
  },

  actions: {
    // autoSignin({commit}, payload){
    //   commit('setUser', payload);
    // },
    // onLogout({commit}){
    //   firebase.auth().signOut();
    //   commit('setUser', null);
    // },


  },

  modules: {
  }
})
