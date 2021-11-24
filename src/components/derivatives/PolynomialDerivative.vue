<template>                   
  <div>                 

    <!-- introduction here -->
    <v-container fluid :style="value.style_css.introduction_container">
    <v-row>
      <v-col md="12">
        <h2 style="margin:0; padding:0;">Derivatives of polynomials</h2>
        <div v-show="toggleIntroduction" style="overflow:auto" :style="value.style_css.introduction">
          <div v-katex="introduction" />
        </div>
      </v-col>
    </v-row>
  </v-container>

    <!-- question here -->                                
    <v-container fluid :style="value.style_css.question_container">               
      <v-row>   
        <v-col cols="12" style="margin-top:0">    
          <v-btn class="buttons-class mr-6 blue white--text" :style="value.style_css.button" @click="newExample">
            <span>new <br> example</span>
          </v-btn>
          
          <v-btn class="buttons-class blue white--text" v-show="toggleIntroduction" :style="value.style_css.button" @click="toggleIntroduction =! toggleIntroduction">
            <span>hide <br> introduction</span>
          </v-btn>

          <v-btn class="buttons-class blue white--text" v-show="toggleIntroduction==false" :style="value.style_css.button" @click="toggleIntroduction =! toggleIntroduction">
            <span>show <br> introduction</span>
          </v-btn>
      </v-col>

        <v-col cols="12">              
          <div style="overflow:auto" :style="value.style_css.question">             
            <div class="katex-class" v-katex="question" />                
          </div>                                   
      </v-col>              
    </v-row>
  </v-container>

  <div :style="value.style_css.linebreak"><hr style="width:90%; margin-left:20px"></div>
  <!-- solutions here -->
  <v-container fluid :style="value.style_css.solution_container">
    <v-row>
      <v-col md="12">
        <div style="overflow:auto" :style="value.style_css.solution">
          <div class="katex-class" v-katex="solution"/>
        </div>
      </v-col>
    </v-row>
  </v-container>  

  <!-- answer here -->
  <v-container fluid :style="value.style_css.answer">
    <v-row>
      <v-col md="12">
          <div class="katex-class" style="overflow:auto" v-katex="answer"/>
      </v-col>
    </v-row>
  </v-container>       

  </div>
</template>

<script>
import polynomial from '../../mixins/polynomials/Polynomial'
import general from '../../mixins/general/General'
export default {
  mixins:[general, polynomial],
  props:['value'],
    data(){
        return{
          introduction:'',
          question:'',
          toggleIntroduction:true,
          solution:'',
          answer:'',
          a:undefined, b:undefined, c:undefined,  
          d:undefined, e:undefined, f:undefined
        }
    },
    beforeMount(){
      this.newExample()
    },
    computed:{
    returnNewQuiz(){
      return this.$store.getters.getnewExample
    }
  },
  watch:{
    returnNewQuiz(){
      this.newExample()
    }
  },
    methods:{
      showAnswer(){
        let text = '\\begin{aligned}' + 
        '\\text{Show that the answer is }' +
        this.polyDerivatives(this.a, this.b, this.c, this.d, this.e, this.f) +
        '\\end{aligned}'
        this.answer = text
      },
      displayQuestion(){
        let text='\\begin{aligned}' + 
        '&\\text{Compute the derivative of the polynomial}\\\\' + 
        '&\\hspace{.5cm}f(x)=' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) +
        '\\end{aligned}'
        this.question = text
    },
    displaySolution(){
      let sol = '\\begin{aligned}' + 
      '&\\text{To find the derivative of }f(x)\\text{ denoted as }f^{\'}(x)\\text{ or }\\frac{df(x)}{dx}\\\\' +
      '&\\text{we would use the rule which says given }f(x)=ax^n\\\\' + 
      '&\\text{where a is a constant and n is a real number then}\\\\' +
      '&f^{\'}(x)=anx^{n-1}\\\\' +
      '&\\text{Also remember that the derivative of a constant is always }0\\\\' +
      '&f(x)=' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + '\\\\' +
      '&f^{\'}(x)=\\frac{df(x)}{dx}=' + this.polyDerivatives(this.a, this.b, this.c, this.d, this.e, this.f) +
      '\\end{aligned}'
      this.solution = sol
    },
        newExample(){
          this.a = this.findRandom(-10, 10)
          this.b = this.findRandom(-10, 10)
          this.c = this.findRandom(-10, 10)
          this.d = this.findRandom(-10, 10)
          this.e = this.findRandom(-10, 10)
          this.f = this.findRandom(-10, 10)
          this.topicIntro()
        this.displayQuestion()
        this.displaySolution()
        this.showAnswer()
        },

        topicIntro(){
            let text='\\begin{aligned}' + 
            '&\\text{ Polynomials contain multiple terms, added or subtracted together.}\\\\' + 
            '&\\text{To differentiate the polynomial, differentiate each term separately.}\\\\' + 
            '&\\text{Find the below following properties of derivatives}\\\\' +
            '&1.\\frac{d}{dx}k=0' + '\\text{, where k is a constant}\\\\' +
            '&2.\\frac{d}{dx}x^n=nx^{n-1}' + '\\text{where n is a real number}\\\\' +
            '&3.\\frac{d}{dx}[k.f(x)]=k\\frac{df}{dx}' + '\\text{where k is a constant}\\\\' +
            '&4.\\frac{d}{dx}[f(x)+g(x)]=\\frac{df}{dx}+\\frac{dg}{dx}' + '\\text{where n is a real number}\\\\' +
            '\\end{aligned}'
            this.introduction = text
        },
    }
}
</script>

<style>

</style>