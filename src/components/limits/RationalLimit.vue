<template>                   
  <div>                 

    <!-- introduction here -->
    <v-container fluid :style="value.style_css.introduction_container">
    <v-row>
      <v-col md="12">
        <h2 style="margin:0; padding:0;">Evaluating limits involving rational functions</h2>
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
          
          <v-btn class="buttons-class blue white--text" :style="value.style_css.button" @click="toggleIntroduction =! toggleIntroduction" v-show="toggleIntroduction">
            <span>hide <br> introduction</span>
          </v-btn>

          <v-btn class="buttons-class blue white--text" :style="value.style_css.button" @click="toggleIntroduction =! toggleIntroduction" v-show="toggleIntroduction==false">
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
        <div  style="overflow:auto" :style="value.style_css.solution">
          <div class="katex-class" v-katex="solution"/>
        </div>
      </v-col>
    </v-row>
  </v-container>  

  <!-- answer here -->
  <v-container fluid :style="value.style_css.answer">
    <v-row>
      <v-col md="12">
        <div style="overflow:auto">
          <div class="katex-class" v-katex="answer"/>
        </div>
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
      LHL:'',
      RHL:'',
      // in this case the below are like (ax+b)(cx+d)
      a:undefined, b:undefined, c:undefined, d:undefined, 
      e:undefined, f:undefined, g:undefined, h:undefined,
      approach: undefined,
      ran:1
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
    
    expandPoly(a, b, c, d){
      // (ax+b)(cx+d) = acx^2 + (ad+bc)x + bd
      let array = []
      array[0] = a*c;
      array[1] = a*d + b*c
      array[2] = b*d
      return array
    },
    newExample(){
      this.randomPoly()
      this.topicIntro()
      this.displayQuestion()
      this.displaySolution()
      this.showAnswer()
      
    },
    randomPoly(){
      // as x appraches 
      this.approach = this.findRandom(-5, 5)
      this.RHL=this.approach+.01
      this.LHL=this.approach-.01
      this.ran= this.findRandom(1,3)
      // case where g(a) is not equal 0
      if(this.ran==1){
        this.a = this.findRandom(-4, 4, 0)
        this.b = this.findRandom(-4, 4)
        if(this.a*this.approach+this.b==0) this.b = this.b + 1
        this.c = this.findRandom(-4, 5)
        this.d = this.findRandom(-4, 4)
        if(this.c*this.approach+this.d==0) this.d = this.d + 1
        this.e = this.findRandom(-4, 4)
        this.f = this.findRandom(-4, 4)
        if(this.e*this.approach+this.f==0) this.f = this.f + 1
        this.g = this.findRandom(-4, 4)
        this.h = this.findRandom(-4, 4)
        if(this.g*this.approach+this.h==0) this.h = this.h + 1
      }
      // case where g(a)==0 
      else if(this.ran==2){
        this.a = this.findRandom(-4, 4, 0)
        this.b = this.findRandom(-4, 4)
        if(this.a*this.approach+this.b==0) this.b = this.b + 1
        this.c = this.findRandom(-4, 4)
        this.d = this.findRandom(-4, 4)
        if(this.c*this.approach+this.d==0) this.d = this.d + 1
        this.e = this.findRandom(-4, 4, 0)
        this.f = -1*(this.e*this.approach)
        this.g = this.findRandom(-4, 4)
        this.h = this.findRandom(-4, 4, 0)
        // alert(`this is the second case`)
      }
      // case where f(a) = g(a) = 0
      else if(this.ran==3){
        this.a = this.findRandom(-4, 4, 0)
        this.b = this.findRandom(-4, 4)
        if(this.a*this.approach+this.b==0) this.b = this.b + 1
        this.c = this.findRandom(-4, 4, 0)
        if(this.c*this.approach+this.d==0) this.d = this.d + 1
        this.d = -1*(this.c*this.approach)
        this.e = this.c
        this.f = this.d
        this.g = this.findRandom(-4, 4)
        this.h = this.findRandom(-4, 4, 0)
        // window.alert(`this is the last and third chance`)
      }
    
    },
    topicIntro(){
      let text='\\begin{aligned}' + 
      '&\\text{A rational function is a quotent of 2 polynomials, that is  }\\\\' + 
      '&\\hspace{1.5cm}\\frac{f(x)}{g(x)}\\\\' +
      '&\\text{where both }f(x)\\text{ and }g(x)\\text{ are polynomials. When evaluating }\\\\' + 
      '&\\text{the limit of a rational function there are 3 possible cases}\\\\' +
      '&\\text{that can arise}\\\\ \\\\' + 
      '&\\text{\\textbf{Case 1: }If }g(a)=0\\text{, then }\\\\'  +
      '&\\hspace{1.5cm} \\lim_{x\\to a} \\frac{f(x)}{g(x)}=\\frac{f(a)}{g(a)}\\\\ \\\\' +
      '&\\text{\\textbf{Case 2: }If }g(a)=0\\text{ but }f(a)=0\\text{, then there is a vertical}\\\\'  +
      '&x=a\\text{ asymptote at and the LHL and RHL must be examined}\\\\' +
      '&\\text{to determine the limit. If the limit exist the only possible}\\\\' + 
      '&\\text{limits are }\\infty\\text{ and }-\\infty\\\\ \\\\' +
      '&\\text{\\textbf{Case 3: }If }f(a)=g(a)=0\\text{, then direct substitution gives}\\\\'  +
      '&\\hspace{1.5cm} \\lim_{x\\to a} \\frac{f(x)}{g(x)}=\\frac{f(a)}{g(a)}=\\frac{0}{0}\\\\' +
      '&\\text{which is referred as the \\textbf{inderminate form.}The indeterminate}\\\\' + 
      '&\\text{form }\\left[\\frac{0}{0}\\right]' +
      '\\text{implies that there is a common factor of }(x-a)\\\\' +
      '&\\text{ between }f(x)\\text{ and }g(x).' +
      '\\text{To find the limit we must first simplify}'  + 
      '\\end{aligned}'
      this.introduction = text
    },
    displayQuestion(){
      
      let text='\\begin{aligned}' + 
      '&\\text{Evaluate the limit of the  rational fraction }\\\\' +
      '&\\lim_{x \\to' + this.approach + '}\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
      this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}' +
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
        '&\\lim_{x \\to' + this.approach + '}\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +
        '&\\text{We will simply apply direct substitution into the rational fraction }\\\\' +
        '&\\lim_{x \\to' + this.approach + '}\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +
        '&=\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d).replace(/x/g, '(' + this.approach + ')') + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h).replace(/x/g, '(' + this.approach + ')') + '}\\\\' +
        '&=\\frac{' + this.calculatePowers(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d, this.approach) + '}{' +
        this.calculatePowers(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h, this.approach) + '}\\\\' +
        '&=\\frac{' + this.calculateAnswer(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.calculateAnswer(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +
        '&=' + this.simplfyFraction(this.calculateAnswer(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d), this.calculateAnswer(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h)) +         
        '\\end{aligned}'
        this.solution = text
      }
      else if(this.ran==2){
        text='\\begin{aligned}' + 
        '&\\lim_{x \\to' + this.approach + '}\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +
        '&\\text{We will simply apply direct substitution into the rational fraction }\\\\' +
        '&\\lim_{x \\to' + this.approach + '}\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +
        '&=\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d).replace(/x/g, '(' + this.approach + ')') + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h).replace(/x/g, '(' + this.approach + ')') + '}\\\\' +
        '&=\\frac{' + this.calculatePowers(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d, this.approach) + '}{' +
        this.calculatePowers(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h, this.approach) + '}\\\\' +
        '&=\\frac{' + this.calculateAnswer(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.calculateAnswer(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +

        '&\\text{The above results show that there is a vertical asymptote at }x=' + this.approach + '\\\\' +
        '&\\text{We have to find the Right Hand Limit(RHL) and the }\\\\' +
        '&\\text{Left Hand Limit(LHL) to find the limit of the function}\\\\\\\\' +
        '&\\text{For the RHL, we need to test using a number very close to }' + this.approach + '\\\\' +
        '&\\text{from the right side. We will take }' + this.RHL + '\\\\' + 
        '&=\\lim_{x \\to' + this.approach + '^+}\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +
        '&\\lim_{x \\to' + this.RHL + '}\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +
        '&=\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d).replace(/x/g, '(' + this.RHL + ')') + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h).replace(/x/g, '(' + this.RHL + ')') + '}\\\\' +
        '&=' + this.substitutePolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d, this.RHL)/
        this.substitutePolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h, this.RHL) + '\\\\ \\\\' +
        
        '&\\text{And then, for the LHL, we need to test using a number very close to }' + this.approach + '\\\\' +
        '&\\text{from the left side. We will take }' + this.LHL + '\\\\' + 
        '&=\\lim_{x \\to' + this.approach + '^-}\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +
        '&\\lim_{x \\to' + this.LHL + '}\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +
        '&=\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d).replace(/x/g, '(' + this.LHL + ')') + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h).replace(/x/g, '(' + this.LHL + ')') + '}\\\\' +
        '&=' + (this.substitutePolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d, this.LHL))/
        (this.substitutePolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h, this.LHL)) + 
        '\\end{aligned}'

        let lhl = (this.substitutePolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d, this.LHL))/
        (this.substitutePolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h, this.LHL))
        let rhl = (this.substitutePolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d, this.LHL))/
        (this.substitutePolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h, this.RHL))
        let ans = '\\\\ \\begin{aligned}'
        if(lhl*rhl<0){
          ans = ans + 
          '&\\text{Since LHL and RHL are approaching opposite ends, one to the }\\\\' +
          '&\\text{negative, one to the positive, hence the limit is undefined}' +
          '\\end{aligned}'
        }
        else if(lhl*rhl>0 && lhl>0){
          ans = ans + 
          '&\\text{Since both LHL and RHL are approaching positive infinity, }\\\\' +
          '&\\text{hence answer is }+\\infty' +
          '\\end{aligned}'
        }
        else if(lhl*rhl>0 && lhl<0){
          ans = ans + 
          '&\\text{Since both LHL and RHL are approaching negative infinity, }\\\\' +
          '&\\text{hence answer is }-\\infty' +
          '\\end{aligned}'
        }
       this.solution = text + ans
      }
      else if(this.ran==3){
         text='\\begin{aligned}' + 
        '&\\lim_{x \\to' + this.approach + '}\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +
        '&\\text{We will simply apply direct substitution into the rational fraction }\\\\' +
        '&\\lim_{x \\to' + this.approach + '}\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +
        '&=\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d).replace(/x/g, '(' + this.approach + ')') + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h).replace(/x/g, '(' + this.approach + ')') + '}\\\\' +
        '&=\\frac{' + this.calculatePowers(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d, this.approach) + '}{' +
        this.calculatePowers(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h, this.approach) + '}\\\\' +
        '&=\\frac{' + this.calculateAnswer(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.calculateAnswer(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +
        '&\\text{Since we got the indeterminate form }\\left[\\frac{0}{0}\\right]\\text{ implies that there }\\\\' +
        '&\\text{is a common factor of }(' + this.showPolynomial(0, 0, 0, 0, 1, (-1*this.approach)) + ')\\text{ between numerator and denominator}\\\\' +
        '&\\text{Hence we will simplfy first to factor out the }(' + this.showPolynomial(0, 0, 0, 0, 1, (-1*this.approach)) + ')\\\\ \\\\' +
        '&=\\lim_{x \\to' + this.approach + '}\\frac{' + this.showPolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d) + '}{' +
        this.showPolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h) + '}\\\\' +
        '\\end{aligned}'

        var simplfy = '\\\\\\begin{aligned}' 
        if(this.c!=1){
        simplfy = simplfy + '&=\\lim_{x \\to' + this.approach + '}\\frac{' + this.c + '(' + this.showPolynomial(0, 0, 0, 0, 1, -1*this.approach) + ')(' + this.showPolynomial(0, 0, 0, 0, this.a, this.b) + ')}{' + this.e +  
        '(' + this.showPolynomial(0, 0, 0, 0, 1, -1*this.approach) + ')(' + this.showPolynomial(0, 0, 0, 0, this.g, this.h) + ')}\\\\' + 
       '&=\\lim_{x \\to' + this.approach + '}\\frac{\\cancel{' + this.c + '(' + this.showPolynomial(0, 0, 0, 0, 1, -1*this.approach) + ')}(' + this.showPolynomial(0, 0, 0, 0, this.a, this.b) + ')}{\\cancel{' + this.e +  
        '(' + this.showPolynomial(0, 0, 0, 0, 1, -1*this.approach) + ')}(' + this.showPolynomial(0, 0, 0, 0, this.g, this.h) + ')}\\\\' + 
       '&\\text{After cancealing the common factors we get the below and }\\\\' +
        '&\\text{we can reapply direct substitution}\\\\' + 
        '&=\\lim_{x \\to' + this.approach + '}\\frac{' + this.showPolynomial(0, 0, 0, 0, this.a, this.b) + '}{' +
        this.showPolynomial(0, 0, 0, 0, this.g, this.h) + '}\\\\' +
        '&=\\frac{' + this.calculatePowers(0,0,0,0,this.a,this.b, this.approach) + 
        '}{' + this.calculatePowers(0, 0, 0, 0, this.g, this.h, this.approach) + '}\\\\' +
        '&=\\frac{' + this.calculateAnswer(0,0,0,0,this.a,this.b, this.approach) + 
        '}{' + this.calculateAnswer(0, 0, 0, 0, this.g, this.h, this.approach) + '}\\\\' + 
        '&=' + this.simplfyFraction(this.calculateAnswer(0,0,0,0,this.a,this.b, this.approach), this.calculateAnswer(0, 0, 0, 0, this.g, this.h, this.approach))
      }
      else{
        simplfy = simplfy +        
        '&=\\lim_{x \\to' + this.approach + '}\\frac{\\cancel{' + '(' + this.showPolynomial(0, 0, 0, 0, 1, -1*this.approach) + ')}(' + this.showPolynomial(0, 0, 0, 0, this.a, this.b) + ')}{\\cancel{' + 
        '(' + this.showPolynomial(0, 0, 0, 0, 1, -1*this.approach) + ')}(' + this.showPolynomial(0, 0, 0, 0, this.g, this.h) + ')}\\\\' + 
       '&\\text{After cancealing the common factors we get the below and }\\\\' +
        '&\\text{we can reapply direct substitution}\\\\' + 
        '&=\\lim_{x \\to' + this.approach + '}\\frac{' + this.showPolynomial(0, 0, 0, 0, this.a, this.b) + '}{' +
        this.showPolynomial(0, 0, 0, 0, this.g, this.h) + '}\\\\' +
        '&=\\frac{' + this.calculatePowers(0,0,0,0,this.a,this.b, this.approach) + 
        '}{' + this.calculatePowers(0, 0, 0, 0, this.g, this.h, this.approach) + '}\\\\' +
        '&=\\frac{' + this.calculateAnswer(0,0,0,0,this.a,this.b, this.approach) + 
        '}{' + this.calculateAnswer(0, 0, 0, 0, this.g, this.h, this.approach) + '}\\\\' + 
        '&=' + this.simplfyFraction(this.calculateAnswer(0,0,0,0,this.a,this.b, this.approach), this.calculateAnswer(0, 0, 0, 0, this.g, this.h, this.approach))
      }
      this.solution = text + simplfy.concat('\\end{aligned}')
      }
    },
    showAnswer(){
      let answer 
      if(this.ran==1){
        answer = this.simplfyFraction(this.calculateAnswer(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d), this.calculateAnswer(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h))
      }
      else if(this.ran==2){
        let lhl = (this.substitutePolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d, this.LHL))/
        (this.substitutePolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h, this.LHL))
        let rhl = (this.substitutePolynomial(0, 0, 0, this.a*this.c, this.a*this.d+this.b*this.c, this.b*this.d, this.LHL))/
        (this.substitutePolynomial(0, 0, 0, this.e*this.g, (this.e*this.h+this.f*this.g), this.f*this.h, this.RHL))
        if(lhl*rhl<0){
          answer = '\\text{undefined}'
        }
        else if(lhl*rhl>0 && lhl>0){
          answer = '+\\infty'
        }
        else if(lhl*rhl>0 && lhl<0){
          answer = '-\\infty'
        }
      }
      else if(this.ran==3){
        answer = this.simplfyFraction(this.calculateAnswer(0,0,0,0,this.a,this.b, this.approach), this.calculateAnswer(0, 0, 0, 0, this.g, this.h, this.approach))
      }
      let ans = '\\begin{aligned}' + 
      '\\text{Show that the answer is }' + answer 
      this.answer = ans.concat('\\end{aligned}')
    }
  }
}
</script>

<style scoped>

</style>