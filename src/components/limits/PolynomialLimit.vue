<template>                   
  <div>                 

    <!-- introduction here -->
    <v-container fluid :style="value.style_css.introduction_container">
    <v-row>
      <v-col md="12">
        <h2 style="margin:0; padding:0;">Evaluating limits involving polynomials</h2>
        <div v-show="toggleIntroduction" style="overflow:auto" :style="value.style_css.introduction">
          <div class="katex-class" v-katex="introduction" />
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
// import QrcodeVue from 'qrcode.vue'
import polynomial from '../../mixins/polynomials/Polynomial'
import General from '../../mixins/general/General'
export default {
  props:['value'],
  components:{
    // QrcodeVue
  },
  mixins:[polynomial, General],
  data(){
    return{
      toggleIntroduction:true,
      introduction:'',
      question : '',
      solution: '',
      answer:'',
      polynomialType:'',
      a:undefined, b:undefined, c:undefined, 
      d:undefined, e:undefined, f:undefined,
      approach: undefined,
      ran:1
    }
  },
  beforeMount(){
    this.randomPoly()
    this.topicIntro()
    this.displayQuestion()
    this.displaySolution()
    this.showAnswer()
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
      let ans = '\\begin{aligned}' +
      '\\text{Show that the answer is }' + 
      this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)
      this.answer = ans.concat('\\end{aligned}')
    },
    newExample(){
      this.randomPoly()
      this.displayQuestion()
      this.displaySolution()
      this.showAnswer()
    },
    randomPoly(){
      // as x appraches 
      this.approach = this.findRandom(-7, 6)
      this.ran = this.findRandom(1, 3)

      if(this.ran==1){
        // normal polynomial
        this.a = 0
        this.b = this.findRandom(-10, 10)
        this.c = this.findRandom(-10, 10)
        this.d = this.findRandom(-10, 10)
        this.e = this.findRandom(-10, 10)
        this.f = this.findRandom(-18, 17)
        if(this.b==0&&this.c==0&&this.d==0&&this.e==0){
          this.d=-3
          this.f=7
        }
      }

      if(this.ran==2){
        // linear polynomial
        this.a = 0
        this.b = 0
        this.c = 0
        this.d = 0
        this.e = this.findRandom(-11, 11)
        this.f = this.findRandom(-18, 17)
        if(this.e==0){
          // constant polynomial
          this.f = this.findRandom(-34, 34)
          this.ran = 3
          if(this.f==0)this.f=this.findRandom(-30, 30)
          if(this.f==0)this.f=3
        }
      }
  
    },
    topicIntro(){
      let text='\\begin{aligned}' + 
      '&\\text{If the function }f(x)\\text{ is a polynomial, then}\\\\' + 
      '&\\hspace{1.5cm}\\lim_{x\\to a} f(x) = f(a)\\\\' +
      '&\\text{In fact, this result is applicable for other non-polynomial}\\\\' + 
      '&\\text{functions, so as long as they are continuous. Note that the }\\\\' +
      '&\\text{limit of a constant is equal to the constant}' +
      '\\end{aligned}'
      this.introduction = text
    },
    
    displayQuestion(){
      let text='\\begin{aligned}' + 
      '&\\text{Evaluate the limit of the following polynomial }\\\\' +
      '&\\lim_{x \\to' + this.approach + '}(' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + ')' +
      '\\end{aligned}'
      this.question = text
    },

    calculateAnswer(a, b, c, d, e, f){
      let array = [a, b, c, d, e]
      let total=0
      for(let i=0; i<array.length; i++){
        total = total + array[i]*Math.pow(this.approach, (5-i))
      }
      return total + f
    },

    displaySolution(){
      // here we look for cases where the polynomial is a constant
 
      if(this.ran==1){
        var text='\\begin{aligned}' + 
        '&\\lim_{x \\to' + this.approach + '}(' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + ')' + '\\\\' +
        '&\\text{Since the above is a polynomial, we will directly substitute }' + this.approach + '\\\\' +
        '&\\text{into the polynomial}' + '\\\\' + 
        '&=\\lim_{x \\to' + this.approach + '}(' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + ')' + '\\\\' +
        '&=' + this.showPolynomial(this.a, this.b,this.c ,this.d ,this.e, this.f).replace(/x/g, '(' + this.approach + ')') + '\\\\' +
        '&=' + this.calculatePowers(this.a,this.b,this.c,this.d,this.e,this.f,this.approach) + '\\\\' + 
        '&=' + this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f) + 
        '\\end{aligned}'
      }
      else if(this.ran==2){
        text='\\begin{aligned}' + 
        '&\\lim_{x \\to' + this.approach + '}(' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + ')' + '\\\\' +
        '&\\text{Finding the limit of the linear polynomial as  }x\\text{ approaches }' + this.approach + '\\\\' + 
        '&\\text{is done by directly substituting }' + this.approach + '\\text{ into the linear function}\\\\' + 
        '&=\\lim_{x \\to' + this.approach + '}(' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + ')' + '\\\\' +
        '&=' + this.showPolynomial(this.a, this.b,this.c ,this.d ,this.e, this.f).replace(/x/g, '(' + this.approach + ')') + '\\\\' +
        '&=' + this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f) + 
        '\\end{aligned}'
      }
      else if(this.ran==3){
         text='\\begin{aligned}' + 
        '&\\lim_{x \\to' + this.approach + '}(' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + ')' + '\\\\' +
        '&\\text{The limit of a constant is equal to the }\\\\' + 
        '&\\text{constant regardless of the value x is approaching } \\\\' + 
        '&\\text{In this case the limit is therefore }' + this.f + '\\\\' +
        '&=\\lim_{x \\to' + this.approach + '}(' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + ')' + '\\\\' +
        '&=' + this.showPolynomial(this.a, this.b,this.c ,this.d ,this.e, this.f).replace(/x/g, '(' + this.approach + ')') + '\\\\' +
        '\\end{aligned}'
      }
      
      this.solution = text

    },
  }
}
</script>

<style scoped>
</style>