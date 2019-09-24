<template>
  <div>
    <v-toolbar
      flat
      app
      style="padding-left:256px;"
    >
      <v-spacer></v-spacer>
      <v-toolbar-title style="padding-right:10px;">{{userName}}</v-toolbar-title>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-avatar>
              <v-img alt="f" src="https://static-cdn.jtvnw.net/user-default-pictures/0ecbb6c3-fecb-4016-8115-aa467b7c36ed-profile_image-70x70.jpg"></v-img>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            @click="logout"
          >
            <v-list-item-title>로그아웃</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer
      color="blue-grey darken-2"
      permanent
      v-model="drawer"
      app
      dark
    >
      <v-list color="blue-grey darken-3">
        <v-list-item @click="godashboard">
          <v-list-item-content>
            <v-list-item-title>Mujinjang BOT</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list style="padding-top: 0px;">
        <v-list-item @click="godashboard">
          <v-list-item-content>
            <v-list-item-title>대시보드</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="gocommand">
          <v-list-item-content>
            <v-list-item-title>트위치 명령어 관리</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="godefaultqa">
          <v-list-item-content>
            <v-list-item-title>pre-defined Questions</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="gocustomqa">
          <v-list-item-content>
            <v-list-item-title>custom Q&A</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="goautofaq">
          <v-list-item-content>
            <v-list-item-title>automatic FAQ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-btn color="primary" @click="open" fab dark style="width: 60px;  height: 60px;  position: fixed;  right: 25px; bottom: 50px;">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <ChattingRoom v-if="this.isOpen===true" v-on:close="closeChatting">
    </ChattingRoom>
    <!-- <v-navigation-drawer
      v-model="right"
      app
      clipped
      right
      width = "450px"
    >
      <ChatRoom/>
    </v-navigation-drawer> -->



  </div>
</template>

<script>
  import axios from 'axios';
  // import ChatRoom from './ChatRoom.vue';
  import ChattingRoom from '@/components/ChattingRoom.vue'
  export default {
    components: {
      ChattingRoom,
    },
    props: ['pageinfo'],
    data: () => ({
      alignment:'center',
      justify:'center',
      message: '',
      dialog: false,
      drawer: null,
      isOpen: false,
      userName:"openkmj",
      imgURL:"https://static-cdn.jtvnw.net/user-default-pictures/0ecbb6c3-fecb-4016-8115-aa467b7c36ed-profile_image-70x70.jpg",
      }),

    created(){
    },
    methods: {
      godashboard(){
        this.$router.push({name:'dashboard'})
      },
      gocommand(){
        this.$router.push({name:'command'})
      },
      gocustomqa(){
        this.$router.push({name:'customQA'})
      },
      godefaultqa(){
        this.$router.push({name:'predefinedQA'})
      },
      goautofaq(){
        this.$router.push({name:'autoFAQ'})
      },
      logout(){
        this.$router.push({name:'home'})
      },

      open(){
        this.isOpen = true
      },
      closeChatting(){
        this.isOpen = false
      }
      // sendMessage () {
      //   this.message = ''
      // }
    }
  }



</script>
