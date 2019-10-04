<template>
  <v-app id="inspire">
    <streamer pageinfo='dashboard'>
    </streamer>
    <v-content>
      <v-card height="96" class="d-flex pa-2" outlined tile>
        home
        <v-spacer/>
        <div v-if="!bot" class="mx-auto">
          <v-btn
            color="primary"
            dark
            @click="botIn"
            @click.stop="dialog = true"
          >
            입장하기
          </v-btn>
        </div>
        <div v-else class="mx-auto">
          <v-btn
            color="primary"
            dark
            @click="botOut"
          >
            퇴장하기
          </v-btn>
        </div>
      </v-card>
      <v-container class="fill-height" fluid>
        <v-row>
          <v-card class="mx-auto">
            <div style='padding:10px'>
              <h2>Chat</h2>
              <iframe frameborder="0"
                scrolling="no"
                id="chat_embed"
                src="https://www.twitch.tv/embed/openkmj/chat"
                height="400"
                width="350">
              </iframe>
            </div>
          </v-card>
        </v-row>

      </v-container>

      <v-footer
        color="white"
        >
        <span>Mujinjang</span>
        <v-spacer></v-spacer>
        <span>&copy; 2019</span>
      </v-footer>
    </v-content>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title class="headline">
          봇을 입장시켰습니다.
        </v-card-title>
        <v-card-text>
          트위치 채팅창에서 "/mod mzz"를 입력해주세요.
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue darken-1" text @click="dialog = false">
            닫기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn color="primary" @click="open" fab dark style="width: 60px;  height: 60px;  position: fixed;  right: 25px; bottom: 50px;">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <ChattingRoom v-if="this.isOpen===true" v-on:close="closeChatting">
    </ChattingRoom>


  </v-app>
</template>

<script>
  import axios from 'axios';
  // import ChatRoom from './ChatRoom.vue';
  import ChattingRoom from '@/components/ChattingRoom.vue'
  import streamer from '@/components/streamer.vue'
  export default {
    components: {
      ChattingRoom,
      streamer
    },
    props: {
      source: String,
    },
    data: () => ({
      alignment:'center',
      justify:'center',
      message: '',
      dialog: false,
      drawer: null,
      isOpen: false,
      bot:false,
      userName:"None",
      imgURL:"https://static-cdn.jtvnw.net/user-default-pictures/0ecbb6c3-fecb-4016-8115-aa467b7c36ed-profile_image-70x70.jpg",
      }
    ),

    created(){
      const api = axios.create({
          withCredentials: true
        });
      api.get('http://211.254.217.44:8893/user_session')
      .then((result) => {
        if(result.data.sessionValid){
          this.userName = result.data.userName
          api.get('http://211.254.217.44:8893/dashboard')
          .then((result) => {
            this.imgURL = result.data.userImg
            this.bot = result.data.botIn
          })
        }
        else{
          this.$router.push({name:'home'})
        }
      })
    },
    methods: {
      botIn(){
        this.bot = true
      },
      botOut(){
        this.bot = false
      },
      nothing() {


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
