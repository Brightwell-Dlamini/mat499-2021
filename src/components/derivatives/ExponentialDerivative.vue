<template>                   
  <div>                 

    <!-- introduction here -->
    <v-container fluid :style="value.style_css.introduction_container">
      <v-row>
        <v-col md="12">
          <h2 style="margin:0; padding:0;">Derivatives of exponential functions</h2>
          <div v-show="toggleIntroduction" style="overflow:auto" :style="value.style_css.introduction">
            <div class="katex-class" v-katex="introduction" />
            <span class="mord">When&nbsp;finding&nbsp;the&nbsp;derivactive&nbsp;of&nbsp;exponentials,&nbsp;we&nbsp;use&nbsp;the&nbsp;below&nbsp;rule</span>
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
          test:'',
          ran:1,
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
      this.testinghere()
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
      testinghere(){
        this.test = '\\text{this is the beginnign of good things this is the beginnign of good thingsthis is the beginnign of good thingsthis is the beginnign of good thingsthis is the beginnign of good thingsthis is the beginnign of good things}'
      },
      showAnswer(){
        let ans = '\\begin{aligned}' + 
        '\\text{Show that the answer is }'
        if(this.d==0 && this.e==1)
        ans = ans + 'e^{' +  this.showPolynomial(0,0,0,this.d,this.e,this.f) + '}'
        else if(this.d==0 && this.e==-1)
        ans = ans + '-e^{' +  this.showPolynomial(0,0,0,this.d,this.e,this.f) + '}'
        else if(this.d==0 || this.e==0)
        ans =  ans + this.polyDerivatives(0,0,0,this.d,this.e,this.f) + 'e^{' +  this.showPolynomial(0,0,0,this.d,this.e,this.f) + '}'
        else
        ans = ans + '(' + this.polyDerivatives(0,0,0,this.d,this.e,this.f) + ')' + 'e^{' +  this.showPolynomial(0,0,0,this.d,this.e,this.f) + '}'
        this.answer = ans.concat('\\end{aligned}')
        
      },
      displayQuestion(){
        let text='\\begin{aligned}' + 
        '&\\text{Compute the derivative of the exponential function}\\\\' + 
        '&\\hspace{.5cm}f(x)=e^{' + this.showPolynomial(0,0,0,this.d,this.e,this.f) + '}' +
        '\\end{aligned}'
        this.question = text
    },
    displaySolution(){
      let sol = '\\begin{aligned}' + 
      '&\\text{Using the rule,  }\\frac{d}{dx}e^{g(x)}=g^{\'}(x)e^{g(x)}\\\\' +
      '&\\text{where in our case  }g(x)=' + this.showPolynomial(0,0,0,this.d,this.e,this.f) + '\\\\' +
      '&\\text{Differentiating }g(x)\\text{ results into }g^{\'}=' + this.polyDerivatives(0,0,0,this.d,this.e,this.f) + '\\\\' +
      '&\\text{Hence }\\frac{df}{dx}(x)=\\frac{d}{dx}e^{' + this.showPolynomial(0,0,0,this.d,this.e,this.f) + '}\\\\&\\hspace{2cm}='
      let ans 
      if(this.d==0 && this.e==1)
      ans = 'e^{' +  this.showPolynomial(0,0,0,this.d,this.e,this.f) + '}'
      else if(this.d==0 && this.e==-1)
      ans = '-e^{' +  this.showPolynomial(0,0,0,this.d,this.e,this.f) + '}'
      else if(this.d==0 || this.e==0)
      ans =  this.polyDerivatives(0,0,0,this.d,this.e,this.f) + 'e^{' +  this.showPolynomial(0,0,0,this.d,this.e,this.f) + '}'
      else 
      ans = '(' + this.polyDerivatives(0,0,0,this.d,this.e,this.f) + ')' + 'e^{' +  this.showPolynomial(0,0,0,this.d,this.e,this.f) + '}'
      
      this.solution = sol + ans + '\\end{aligned}'
    },
        newExample(){
          this.a = 0
          this.b = 0
          this.c = 0
          this.d = this.findRandom(-10, 10)
          this.e = this.findRandom(-10, 10)
          this.f = this.findRandom(-10, 10)
          if(this.d==0 && this.e==0)this.e=-3
          this.topicIntro()
          this.displayQuestion()
          this.displaySolution()
          this.showAnswer()
        },

        topicIntro(){
            let text='\\begin{aligned}' + 
            '&\\text{When finding the derivactive of exponentials, we use the below rule}\\\\' +
            '&\\hspace{.5cm}\\frac{d}{dx}e^{g(x)}=g^{\'}(x)e^{g(x)}' +
            '\\end{aligned}'
            this.introduction = text
        },
    }
}
</script>

<style scoped>

</style>