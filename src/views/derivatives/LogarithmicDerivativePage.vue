<template>
  <div>
      <logarithmic-derivative :value="the_prop" />
  </div>
</template>
                    
<script>
import LogarithmicDerivative from '../../components/derivatives/LogarithmicDerivative.vue'
export default {
  components: {LogarithmicDerivative  },
  beforeMount(){
      window.document.title='Logarithmic Derivatives'
  },
  data(){
        return{
            the_prop:{
                style_css:{
                    linebreak:{
                        'display':'block'
                    },
                    introduction_container:{
                        'margin':'80px 0 0 0px',
                        'padding-bottom':'0px'
                    },
                    introduction:{
                        'padding':'20px 0 0px 0',
                        'color':'black',
                        'font-size':'19px',
                        'padding-bottom':'0',
                    },
                    question_container:{
                        'margin':'0 0 0 0px',
                    },
                    question:{
                        'padding':'20px 0 0 0',
                        'font-size':'19px',
                    },
                    solution_container:{
                        'margin':'15px 0 0 0px',
                    },
                    solution:{
                        'padding':'0',
                        'font-size':'19px'
                    },
                    button:{
                        'font-size':'12px',
                    },
                    answer:{
                        'font-size' :'30px',
                        'display':'none'
                    }
                }
            }
        }
    }
}
</script>

<style>

</style>