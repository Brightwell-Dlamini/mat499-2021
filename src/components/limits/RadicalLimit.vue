<template>                   
  <div>                 

    <!-- introduction here -->
    <v-container fluid :style="value.style_css.introduction_container">
    <v-row>
      <v-col md="12">
        <h2 style="margin:0; padding:0;">Evaluating functions involving radical functions </h2>
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
          <div class="katex-class" style="overflow:auto" :style="value.style_css.question">             
            <div v-katex="question" />                
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
      let ans = this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)
      let the_surd = this.simplySurds(ans)
      let text = '\\begin{aligned}\\text{Show that the answer is }\\end{aligned}'
      if(this.ran==1){
        var surds = '\\begin{aligned}'
        if(the_surd.a==1 && the_surd.b==0)surds = surds + '0 \\end{aligned}' 
        else if(the_surd.a==1 && the_surd.b==1)  surds = surds + '1 \\end{aligned}'
        else if(the_surd.a>1 && the_surd.b==1)  surds = surds  + the_surd.a + '\\end{aligned}'
        else if(the_surd.a>1 && the_surd.b>1)  surds = surds  + the_surd.a + '\\sqrt{' + the_surd.b + '}\\end{aligned}'
        else if(the_surd.a==1 && the_surd.b>1)  surds = surds + '&=\\sqrt{' + this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f) + '}' + '\\end{aligned}'
      }
      else if(this.ran==2){
        let ans = this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)
        let the_surd = this.simplySurds(ans)
        surds = '\\begin{aligned}'
        if(the_surd.a==1 && the_surd.b==0)surds = surds + '0 \\end{aligned}' 
        else if(the_surd.a==1 && the_surd.b==1)  surds = surds + this.coefficient +  '\\end{aligned}'
        else if(the_surd.a>1 && the_surd.b==1)
        surds = surds + the_surd.a*this.coefficient + '\\end{aligned}'
        else if(the_surd.a>1 && the_surd.b>1)
        surds = surds + the_surd.a*this.coefficient + '\\sqrt{' + the_surd.b + '}' + '\\end{aligned}'
        else if(the_surd.a==1 && the_surd.b>1)  surds = surds + this.coefficient + '\\sqrt{' + this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f) + '}' + '\\end{aligned}'
      }
      this.answer = text + surds
    },
    newExample(){
      this.randomPoly()
      this.displayQuestion()
      this.displaySolution()
      this.showAnswer()
      this.$store.commit('setMixedLimits', 1)
    },
    randomPoly(){
      // as x appraches 
      this.approach = this.findRandom(-7, 6)
      
      this.ran = this.findRandom(1, 2)

      if(this.ran==1){
        // radical with no coefficient
        this.a = 0
        this.b = 0
        this.c = 0
        this.d = this.findRandom(-10, 10)
        this.e = this.findRandom(-10, 10)
        this.f = this.findRandom(-18, 17)
        if(this.d==0&&this.e==0&&this.f==0)this.d=2
        if(this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)<0){
          this.d=-1*this.d
          this.e=-1*this.e
          this.f=-1*this.f
        }
      }

      if(this.ran==2){
        // radical with coeffiecient
        this.coefficient = this.findRandom(-10, 10, 0)
        if(this.coefficient==-1||this.coefficient==1)this.coefficient=4
        this.a = 0
        this.b = 0
        this.c = 0
        this.d = this.findRandom(-10, 10)
        this.e = this.findRandom(-10, 10)
        this.f = this.findRandom(-18, 17)
        if(this.d==0&&this.e==0&&this.f==0){
          this.d=2
          this.e=-1
        }
        if(this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)<0){
          this.d=-1*this.d
          this.e=-1*this.e
          this.f=-1*this.f
        }
      }
      
    },
    topicIntro(){
      let text='\\begin{aligned}' + 
      '&\\text{This section demonstrates more examples on finding the }\\\\' +
      '&\\text{limits of functions. We are looking at radical functions.}\\\\' +
      '&\\text{Direct substitution will apply here.}' +
      '\\end{aligned}'
      this.introduction = text
    },
    displayQuestion(){
      if(this.ran==1){
          var text='\\begin{aligned}' + 
          '&\\text{Evaluate}\\\\' +
          '&\\lim_{x \\to' + this.approach + '}\\sqrt{' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + '}' +
          '\\end{aligned}'
      }
      else{
          text='\\begin{aligned}' + 
          '&\\text{Evaluate}\\\\' +
          '&\\lim_{x \\to' + this.approach + '}{' + this.coefficient + '\\sqrt{' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + '}}' +
          '\\end{aligned}'
      }
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
      // if ran is 1 it means sqrt(x+3), then when ran is 2 then 4sqrt(x+3)
 
      if(this.ran==1){
        var text='\\begin{aligned}' + 
        '&\\lim_{x \\to' + this.approach + '}\\sqrt{' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + '}\\\\' +
        '&\\text{We will apply direct substituting of }' + this.approach + 
        '\\text{ into the function }\\\\' +
        '&=\\lim_{x \\to' + this.approach + '}\\sqrt{' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + '}' + '\\\\' +
        '&=\\sqrt{' + this.showPolynomial(this.a, this.b,this.c ,this.d ,this.e, this.f).replace(/x/g, '(' + this.approach + ')') + '}\\\\' +
        '&=\\sqrt{' + this.calculatePowers(this.a,this.b,this.c,this.d,this.e,this.f,this.approach) + '}\\\\' + 
        '&=\\sqrt{' + this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f) + '}' + 
        '\\end{aligned}'
        let ans = this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)
        let the_surd = this.simplySurds(ans)
        var surds = '\\\\ \\begin{aligned}'
        if(the_surd.a==1 && the_surd.b==0)surds = surds + '&=0 \\end{aligned}' 
        else if(the_surd.a==1 && the_surd.b==1)  surds = surds + '&=1 \\end{aligned}'
        else if(the_surd.a>1 && the_surd.b==1)  surds = surds + '&=' + the_surd.a + '\\end{aligned}'
        else if(the_surd.a>1 && the_surd.b>1)  surds = surds + '&=' + the_surd.a + '\\sqrt{' + the_surd.b + '}\\end{aligned}'
        else if(the_surd.a==1 && the_surd.b>1)  surds = surds + '' + '\\end{aligned}'
      }
      else if(this.ran==2){
        text='\\begin{aligned}' + 
        '&\\lim_{x \\to' + this.approach + '}' + this.coefficient + '\\sqrt{' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + '}\\\\' +
        '&\\text{We will apply direct substituting of }' + this.approach + 
        '\\text{ into the function }\\\\' +
        '&=' + this.coefficient + '\\lim_{x \\to' + this.approach + '}\\sqrt{' + this.showPolynomial(this.a, this.b, this.c, this.d, this.e, this.f) + '}' + '\\\\' +
        '&=' + this.coefficient + '\\sqrt{' + this.showPolynomial(this.a, this.b,this.c ,this.d ,this.e, this.f).replace(/x/g, '(' + this.approach + ')') + '}\\\\' +
        '&=' + this.coefficient + '\\sqrt{' + this.calculatePowers(this.a,this.b,this.c,this.d,this.e,this.f,this.approach) + '}\\\\' + 
        '&=' + this.coefficient + '\\sqrt{' + this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f) + '}' + 
        '\\end{aligned}'
        let ans = this.calculateAnswer(this.a,this.b,this.c,this.d,this.e,this.f)
        let the_surd = this.simplySurds(ans)
        surds = '\\\\ \\begin{aligned}'
        if(the_surd.a==1 && the_surd.b==0)surds = surds + '&=0 \\end{aligned}' 
        else if(the_surd.a==1 && the_surd.b==1)  surds = surds + '&=' + this.coefficient +  '\\end{aligned}'
        else if(the_surd.a>1 && the_surd.b==1)
        surds = surds + '&=' + this.coefficient + '\\left(' + the_surd.a + '\\right)\\\\' + 
        '&=' + the_surd.a*this.coefficient + '\\end{aligned}'
        else if(the_surd.a>1 && the_surd.b>1)
        surds = surds + '&=' + this.coefficient + '\\left(' + the_surd.a + '\\sqrt{' + the_surd.b + '}' + '\\right)\\\\' + 
        '&=' + the_surd.a*this.coefficient + '\\sqrt{' + the_surd.b + '}' + '\\end{aligned}'
        else if(the_surd.a==1 && the_surd.b>1)  surds = surds + '' + '\\end{aligned}'

      }
      
      this.solution = text + surds

    },
  }
}
</script>

<style scoped>


</style>