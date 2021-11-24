<template>                   
  <div>                 
    <!-- introduction here -->
    <v-container fluid :style="value.style_css.introduction_container">
    <v-row>
      <v-col md="12">
        <h2 style="margin:0; padding:0;">Evaluating functions involving radical functions </h2>
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
      <v-col md="12" style="overflow:auto">
          <div class="katex-class"  v-katex="answer"/>
      </v-col>
    </v-row>
  </v-container>       

  </div>
</template>


<script>
import polynomial from '../../mixins/polynomials/Polynomial'
import General from '../../mixins/general/General'

export default {
  props:['value'],
  components:{
    
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
      ran:1,
      coefficient:4,
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
      let text = '\\begin{aligned}\\text{Show that the answer is }\\end{aligned}'
      if(this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)>0)
        var second = '\\begin{aligned}e^{' + (this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)) + '}\\end{aligned}'
        else if(this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)==0)
        second = '\\begin{aligned}1 \\end{aligned}'
        else if(this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)<0)
        second = '\\begin{aligned}\\frac{1}{e^{' + (-1*this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)) + '}}\\end{aligned}'
        this.answer=text + second
    },
    newExample(){
      this.randomPoly()
      this.displayQuestion()
      this.displaySolution()
      this.showAnswer()
      this.$store.commit('setMixedLimits', 2)
      
    },
    randomPoly(){
      // as x appraches 
      this.approach = this.findRandom(-7, 6)
      
      this.a = 0
      this.b = 0
      this.c = 0
      this.d = 0
      this.e = this.findRandom(-10, 10, 0)
      this.f = this.findRandom(-18, 17)
      if(this.e==0)this.e=2   
      
    },
    topicIntro(){
      let text='\\begin{aligned}' + 
      '&\\text{This section demonstrates more examples on finding the }\\\\' +
      '&\\text{limits of functions. Here we are looking at exponential functions}\\\\' +
      '&\\text{We will simply apply direct substitution.}' + 
      '\\end{aligned}'
      this.introduction = text
    },
    displayQuestion(){
        let text='\\begin{aligned}' + 
        '&\\text{Evaluate}\\\\' +
        '&\\lim_{x \\to' + this.approach + '}e^{' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + '}' +
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
        let text='\\begin{aligned}' + 
        '&\\lim_{x \\to' + this.approach + '}e^{' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + '}\\\\' +
        '&\\text{Applying direct substituting of }' + this.approach + 
        '\\text{ into the exponential function }\\\\' +
        '&=\\lim_{x \\to' + this.approach + '}e^{' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + '}' + '\\\\' +
        '&=e^{' + this.showPolynomial(this.a, this.b,this.c ,this.d ,this.e, this.f).replace(/x/g, '(' + this.approach + ')') + '}\\\\' +
        '&=e^{' + this.calculatePowers(this.a,this.b,this.c,this.d,this.e,this.f,this.approach) + '}\\\\' + 
        '&=e^{' + this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f) + '}' + 
        '\\end{aligned}'
        if(this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)>0)
        var second = ''
        else if(this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)==0)
        second = '\\\\ \\begin{aligned}&=1 \\end{aligned}'
        else if(this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)<0)
        second = '\\\\\\begin{aligned}&=\\frac{1}{e^{' + (-1*this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)) + '}}\\end{aligned}'
        this.solution = text + second

    },
  }
}
</script>

<style>

</style>