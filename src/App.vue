<template>
<v-app>
  <!-- Place settings anywhere, won't affect app since the component is fixed -->
  <settings />
 <v-card>
 <!-- v-app-bar -->
  <v-app-bar color="black" fixed dark class="mb-12">
    <v-app-bar-nav-icon @click="drawer = true" />
    <v-toolbar-title class="white--text font-weight-bold">
      <button @click="routeHome">Maths Project</button>
    </v-toolbar-title>
    <v-spacer></v-spacer>
      <v-btn icon href="https://github.com/Siyabonga/siyabonga.git" target="_blank">
        <v-icon>mdi-github</v-icon> 
      </v-btn>
  </v-app-bar>
   

  <!-- navigation drawer here -->
 <v-navigation-drawer v-model="drawer" app temporary class="blue" width="200">
   <v-toolbar-title class="white--text mt-5 ml-3 font-weight-bold" >
      <button @click="routeHome()">Maths Project 2021</button>
    </v-toolbar-title>
  <v-list nav dense class="mt-11"> 
   <v-list-item-group v-model="group" active-class="brown text--white">

    <v-list-item @click="routeFunction(side)" v-for="side in sidebar" :key="side.index" class="mb-12">
     <v-list-item-icon>
      <v-icon class="white--text">{{side.icon}}</v-icon>
     </v-list-item-icon>
     <v-list-item-title class="white--text ml-0">{{side.name}}</v-list-item-title>
    </v-list-item>

    </v-list-item-group>
   </v-list>

   <!-- topics section -->
   <topics />

  </v-navigation-drawer>
 </v-card>

  
  <v-main>
    <v-container fluid id="router-container">
      <router-view></router-view>
    </v-container>
  </v-main>

</v-app>
</template>


<script>
import Settings from './components/Settings.vue'
import Topics from "./components/Topics.vue"

export default{
  components: { Topics, Settings },
  data(){
    return{
      drawer: false,
      group: 0,
      color:'',
      text:'',
      sidebar:[
        {
          icon:'mdi-home',
          name:'Home',
          index:0
        },
        {
          icon:'mdi-math-integral',
          name:'Topics',
          index:1
        },
        {
          icon:'mdi-eye-outline',
          name:'My Quiz',
          index:2
        },
        {
          icon:'mdi-cog-box',
          name:'My Settings',
          index:3
        },
      ]
    }
  },
  computed:{
    getTextSetting(){
      return this.$store.getters.getTextSettings
    }
  },
  watch:{
    getTextSetting(val){
      this.text = val
    }
  },
  methods:{
    routeHome(){
      this.$router.push('/')
    },
    routeFunction(val){
      if(val.index==0)this.$router.push('/')
      else if(val.index==1){
        this.$store.commit('setTopicPop', true)
      }
      else if(val.index==2)this.$router.push('/quiz')
      else if(val.index==3)this.$store.commit('showSettings', true)
    }
  }
}
</script>

<style>
#router-container{
  padding: 0;
}
.mord{
  padding-top: 23px;
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.katex-class{
  padding-top: 10px;
}
.binded-settings .katex-class{
  color: red;
  padding-top: 10px;
}
</style>