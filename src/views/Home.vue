<template>
 <div id="app">
   <v-app light>
    <v-content>
      <v-container fill-height>
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="../assets/img.png" height="200" style="margin-bottom:8px;">
            <h1 class="black--text mb-2 display-1 text-center">Moozinzang BOT</h1>
            <div class="black--text subheading mb-4 text-center"></div>
            <v-btn
              class="mt-12"
              color="blue lighten-2"
              dark
              large
              href="http://211.254.217.44:8893/auth/oauth/twitch"
            >스트리머 로그인
            </v-btn>
            <v-btn
              class="mt-12"
              color="blue lighten-2"
              dark
              large
              href="http://211.254.217.44:8893/auth/oauth/twitch"
            >시청자 로그인
            </v-btn>
            <router-link to="/dashboard">
              스트리머 페이지(개발용)
            </router-link>
            <router-link to="/donator">
              시청자 페이지(개발용)
            </router-link>


          </v-layout>
      </v-container>

    </v-content>
  </v-app>
 </div>
</template>
<script>
  import axios from 'axios';

  export default {
  data(){
    return {}
  },
  created(){

  },
  methods: {
    hi(){
      axios.get('http://211.254.217.44:8893/auth/oauth/twitch')
    }
  }
}
</script>
