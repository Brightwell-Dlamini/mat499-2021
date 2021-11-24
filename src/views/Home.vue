<template>
<div>
  <v-container fluid :class="[background==true ? 'home' : 'binded-settings']">
    <v-row>
      <v-col cols="12">
        <div>

        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="8">
        <div class="row-2">
          <v-col cols="12">
            <template>
              <v-card class="mx-auto" color="#26c6da" dark max-width="400">
                <v-card-title>
                  <v-icon large left>
                    mdi-twitter
                  </v-icon>
                  <span class="text-h6 font-weight-light">Twitter</span>
                </v-card-title>
              <v-card-text class="text-h5 font-weight-bold">
                "Are you looking for enough Maths examples to practise with?
                Find my 2021 Final Year Mathematics project on 
                simulating Limits and dirivatives."
              </v-card-text>
              <v-card-actions>
                <v-list-item class="grow">
                  <v-list-item-avatar color="grey darken-3">
                    <v-img class="elevation-6" alt="" src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>Siyabonga Dlamini</v-list-item-title>
                  </v-list-item-content>
                  <v-row align="center" justify="end">
                    <v-icon class="mr-1">
                      mdi-heart
                    </v-icon>
                    <span class="subheading mr-2">137</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">
                      mdi-share-variant
                    </v-icon>
                    <span class="subheading">24</span>
                  </v-row>
                </v-list-item>
              </v-card-actions>
              </v-card>
            </template>
          </v-col>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <div class="row-3">
          <p>
            I would like to take the opportunity to thank everyone who has made
            my years at <a href="#uneswa">Uneswa</a> remarkable over the years. Truth be told, it has 
            never been an easy one, but patience has brought me this far. 
          </p>
          <p>
            All thanks to my friends, family for motivating me to achieve this 
            final year project I present today. Overall I want to honor my supervisor, 
            <a href="#sandile">Prof S.S Motsa</a> who has been my anchor in achieving this projects. Hope
            with time I will find the need to persue my project at my Master's Level. 
          </p>
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" class="mb-16">
          <v-col md="3">
            <template>
              <v-card class="mx-auto" max-width="344">
                <v-img alt="image not found" src="../assets/uneswa.jpg" height="200px"></v-img>
                <v-card-title id="uneswa">
                  University of Eswatini
                </v-card-title>
                <v-card-subtitle>
                  The University Of Choice in Africa
                </v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </template>
          </v-col>
          <v-col md="3">
            <template>
              <v-card class="mx-auto" max-width="344">
                <v-img src="../assets/sandile.jpg" height="200px"></v-img>
                <v-card-title id="sandile">
                  Prof Sandile Motsa
                </v-card-title>
                <v-card-subtitle>
                  My Project Supervisor
                </v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </template>
          </v-col>
          
          <v-col md="3">
            <template>
              <v-card class="mx-auto" max-width="344">
                <v-img src="../assets/siyabonga.jpg" height="200px"></v-img>
                <v-card-title>
                  Siyabonga Dlamini
                </v-card-title>
                <v-card-subtitle>
                  Uneswa Final Year Student
                </v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </template>
          </v-col>
    </v-row>
  </v-container>

  <v-container class="mb-16">
    <v-row justify="center">
      <v-col cols="8">
        <div>
          <p>
            Simply share the Maths Web Application by generating QR Code
            for specific topic.
          </p>
          <br>
          <qrcode :value="qrUrl" :size="100" :foreground="qrColor" level="H" />
          <br>
          <ul>
            <li @click="generateQR(topic)" v-for="topic in topics" :key="topic.index">
              {{topic.index+1}}-{{topic.name}}
            </li>
          </ul>
          
        </div>
      </v-col>
    </v-row>
  </v-container>
</div> 
</template>

<script>
import qrcode from 'qrcode.vue'
export default {
  components:{
    qrcode
  },
  data(){
    return{
      background : '',
      qrColor:'',
      qrUrl:location.protocol + location.host,
      topics:[
        {
          index:0,
          name:'Limits of Polynomials'
        },
        {
          index:1,
          name:'Limits of Rational Functions'
        },
        {
          index:2,
          name:'Limits of Radical Functions'
        },
        {
          index:3,
          name:'Limits of Exponential Functions'
        },
        {
          index:4,
          name:'Polynomials Derivatives'
        },
        {
          index:5,
          name:'Exponential Derivatives'
        },
        {
          index:6,
          name:'Logarithmic Derivatives'
        },
        {
          index:7,
          name:'Quiz'
        }
      ]
    }
  },
  beforeMount(){
    this.background = this.getImageSetting 
    if(this.getQrSetting)this.qrColor = '#2f55b2'
    else this.qrColor = '#000000'
  },
  computed:{
    getImageSetting(){
      return this.$store.getters.getImageSettings
    },
    getQrSetting(){
      return this.$store.getters.getQrSettings
    },
    
  },
  watch:{
    getImageSetting(val){
      this.background = val
    },
    getQrSetting(val){
      if(val)this.qrColor = '#2f55b2'
      else this.qrColor = '#000000'
    },
  },
  methods:{
    generateQR(a){
      this.qrUrl = location.protocol + location.host
      if(a.index==0){
        this.qrUrl = this.qrUrl + '/limits/polynomials'
      }
      else if(a.index==1){
        this.qrUrl = this.qrUrl + '/limits/rational'
      }
      else if(a.index==2){
        this.qrUrl = this.qrUrl + '/limits/radicals'
      }
      else if(a.index==3){
        this.qrUrl = this.qrUrl + '/limits/exponentials'
      }
      else if(a.index==4){
        this.qrUrl = this.qrUrl + '/derivatives/polynomials'
      }
      else if(a.index==5){
        this.qrUrl = this.qrUrl + '/derivatives/exponentials'
      }
      else if(a.index==6){
        this.qrUrl = this.qrUrl + '/derivatives/logarithms'
      }
      else if(a.index==7){
        this.qrUrl = this.qrUrl + '/quiz'
      }
      window.alert(`QR Code for ${a.name} generated`)
    }
  }
}
</script>

<style scoped>

.home{
  margin: 40px 0 0px 0;
  width: 100%;
  background-image: url('../assets/backup.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
}
.binded-settings{
  margin: 40px 0 0px 0;
  width: 100%;
  background-image: url('../assets/backup2.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
}
.row-2{
  margin-top: 100px;
}
.row-3{
  margin-top: 50px;
}
p,ul, li{
  font-size: 20px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
li{
  color: green;
  margin-bottom: 15px;
}
</style>