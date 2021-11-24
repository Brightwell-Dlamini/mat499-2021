<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="hideSetting"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="hideSetting"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-subheader>My User Settings</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Customize my app</v-list-item-title>
              <v-list-item-subtitle>Plese note that reloading the page will lead to default settings</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Available Settings</v-list-item-title>
              <v-list-item-subtitle>Sometimes the QR Code is not readable, you can change its color and try scanning again.<br>
                Another setting is the feature to change your homepage background image</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list
          three-line
          subheader
        >
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="image"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Background Image</v-list-item-title>
              <v-list-item-subtitle>Change background image from the default one</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="qrCode"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>QR Code Color</v-list-item-title>
              <v-list-item-subtitle>Change your QR Code color from the default to blue</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        image: false,
        qrCode:false
      }
    },
    computed:{
        getSetting(){
            return this.$store.getters.getSettings
        },
    },
    watch:{
        getSetting(val){
            this.dialog=val
        },
        image(val){
            this.$store.commit('setImageSettings',val)
        },
        qrCode(val){
            this.$store.commit('setQrSettings', val)
        },
    },
    methods:{
        hideSetting(){
            this.$store.commit('showSettings', false)
        }
    }
  }
</script>