<template>
 <div id="app">
   <v-app light>
    <v-content>
      <v-container fill-height>
        <!-- <v-parallax src="../assets/img.png" height="600"> -->
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img src="../assets/img.png" height="200" style="margin-bottom:8px;">
            <h1 class="black--text mb-2 display-1 text-center">Moozinzang BOT</h1>
            <div class="black--text subheading mb-4 text-center">{{userName}}님 안녕하세요.</div>
            <v-btn
              class="mt-12"
              color="blue lighten-2"
              dark
              large
              href=""
            >1대1 질문 채팅
            </v-btn>
            <v-btn
              class="mt-12"
              color="blue lighten-2"
              dark
              large
              @click="logout"
            >
              로그아웃
            </v-btn>

          </v-layout>
        <!-- </v-parallax> -->
      </v-container>

    </v-content>
  </v-app>
 </div>
</template>
<script>
  import axios from 'axios';

  export default {
  data(){
    return {
      userName:"openkmj"
    }
  },
  created(){

  },
  methods: {
    logout(){
      // axios.get()
      this.$router.push({name:'home'})
    },
    hi(){
      // axios.get('some api url', {withCredentials: true});
      axios.get('http://211.254.217.44:8892/accounts/twitch/login')
    }
  }
}
</script>
