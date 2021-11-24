<template>
  <div>
      <!-- introduction section -->
      <v-container fluid style="margin-top:70px;">
          <v-row>
              <v-col md="8">
                  <h2>Test my progress</h2> <br>
                  <p>
                      This part is designed for you to test your understanding on
                      the topics that you have already covered. If you feel like
                      there is a topic that you don't understand, you can simply press here
                      for more practise 
                  </p>
              </v-col>
              <v-col cols="12">
                  <v-btn @click="newQuiz" class="blue white--text">
                      New Quiz
                  </v-btn>
              </v-col>
          </v-row>
      </v-container>

      <!-- quiz section -->
      <v-container fluid>
          <v-row>
              <v-col cols="12">
                  <div v-for="(one, index) in array" :key="index">
                      <br>
                      <h4>Question {{index+1}}</h4>
                      <polynomial-limit v-show="one==1" :value="the_prop"/>                  
                      <exponential-limit v-show="one==2" :value="the_prop"/>
                      <radical-limit v-show="one==3" :value="the_prop"/>
                      <rational-limit v-show="one==4" :value="the_prop"/>
                      <polynomial-derivative v-show="one==5" :value="the_prop"/>
                      <exponential-derivative v-show="one==6" :value="the_prop"/>
                      <logarithmic-derivative v-show="one==7" :value="the_prop"/>
                  </div>
              </v-col>
          </v-row>
      </v-container>
  </div>
</template>

<script>
import general from '../mixins/general/General'
import PolynomialLimit from '../components/limits/PolynomialLimit.vue'
import RadicalLimit from '../components/limits/RadicalLimit.vue'
import RationalLimit from '../components/limits/RationalLimit.vue'
import ExponentialLimit from '../components/limits/ExponentialLimit.vue'
import ExponentialDerivative from '../components/derivatives/ExponentialDerivative.vue'
import LogarithmicDerivative from '../components/derivatives/LogarithmicDerivative.vue'
import PolynomialDerivative from '../components/derivatives/PolynomialDerivative.vue'
export default {
    mixins:[general],
        components:{
                PolynomialLimit,
                RadicalLimit,
                RationalLimit,
                ExponentialLimit,
                ExponentialDerivative,
                LogarithmicDerivative,
                PolynomialDerivative

        },
        data(){
        return{
            array:[1,2,3,4,5,6,7],
            toggle:false,
            interval:{},
            displayQuiz:true,
            value:0,
            ran:4,
            the_prop:{
                style_css:{
                    linebreak:{
                        'display':'none'
                    },
                    introduction_container:{
                        'display':'none'
                    },
                    question_container:{
                        'margin':'0 0 0 11px',
                        'padding-bottom':'0',
                        'margin-bottom':'0',
                        'padding-top':'0'
                    },
                    question:{
                        'padding':'0px 0 0 0',
                        'font-size':'19px',
                        'margin-top':'0'
                    },
                    solution_container:{
                        'display':'none'
                    },
                    button:{
                        'display':'none'
                    },
                    answer:{
                        'margin-top':'0',
                        'padding':'0',
                        'padding-left':'25px'
                    }
                }
            }
        }
    },
    beforeMount(){
        window.document.title='quiz'
        this.newQuiz()
    },
    mounted(){
        this.newQuiz()
    },
    methods:{
      newQuiz(){
          //Now display the quiz
          this.displayQuiz = true
          let a = [1,2,3,4,5,6,7]
          this.array = this.shuffleArray(a)
          this.toggle =! this.toggle
          this.$store.commit('setNewExample', this.toggle)
      },
  },
  watch:{
      value(val){
          let array = [10,20,30,40,50,60,70,80, 90,100]
          if(val==array[this.ran]){
              this.newQuiz()
              clearInterval(this.interval)
              this.value=0
          }
      }
  }

}
</script>

<style scoped>
p{
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 19px;
}
.buttons-class{
    display: none;
}
#circular-spinner{
    position: fixed;
    top: 350px;
}
.v-progress-circular {
  margin: 1rem;
}
@media only screen and (max-width: 600px) {
  #circular-spinner{
    position: fixed;
    top: 440px;
  }
}
</style>