<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      scrollable
      max-width="300px"
    >
      <v-card>
        <v-card-title>Select Topic</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group
            v-model="topic"
            column
          >
            <v-radio
              label="Limits of polynomials"
              value="0"
            ></v-radio> <br>
            <v-radio
              label="Limits of rational functions"
              value="1"
            ></v-radio> <br>

            <v-radio
              label="Limits of radical functions"
              value="2"
            ></v-radio> <br>

            <v-radio
              label="Limits of exponential functions"
              value="3"
            ></v-radio> <br>

            <v-radio
              label="Polynomials derivatives"
              value="4"
            ></v-radio> <br>

            <v-radio
              label="Exponential functions derivative"
              value="5"
            ></v-radio> <br>

            <v-radio
              label="Logarithmic functions derivatives"
              value="6"
            ></v-radio>

          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        topic: '',
        dialog:''
      }
    },
    methods:{
      
    },
    mounted(){
      
    },
    computed:{
      updateDialog(){
        return this.$store.getters.getDialogPop
      },
      
    },
    watch:{
      topic(val){
        if(val==0)this.$router.push('/limits/polynomials')
        else if(val==1)this.$router.push('/limits/rational')
        else if(val==2)this.$router.push('/limits/radicals')
        else if(val==3)this.$router.push('/limits/exponentials')
        else if(val==4)this.$router.push('/derivatives/polynomials')
        else if(val==5)this.$router.push('/derivatives/exponentials')
        else if(val==6)this.$router.push('/derivatives/logarithms')
      },
      updateDialog(val){
        this.dialog = val
      },
      dialog(val){
        this.$store.commit('setTopicPop', val)
      }
    }
  }
</script>

<style>

</style>