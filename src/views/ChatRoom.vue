<template>
  <div id="scrollplz" class="inner-wrap" fluid fill-height inner-wrap>
    <div id='hi'>
      <v-list v-auto-scroll="chattings">
        <transition-group name="list">
          <div v-for="chat in chattings" :key="chat.Question">
            <v-list-item>
              <v-list-item-action>
                <v-avatar color="blue" size="40">
                  <span class="white--text">유저</span>
                </v-avatar>
              </v-list-item-action>
              <v-list-item-content>
                <p class="font-weight-bold" style="margin-bottom: 0px;">{{chat.Question}}</p>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="chat.Message!=''">
              <v-list-item-content>
                <div class="text-right">
                  <p class="font-weight-bold" style="margin-bottom: 0px;">{{chat.Message}}</p>
                </div>
              </v-list-item-content>
              <v-list-item-action style="margin-left: 32px;">
                <v-avatar color="red" size="40">
                  <span class="white--text">챗봇</span>
                </v-avatar>
              </v-list-item-action>
            </v-list-item>
            <v-divider></v-divider>
          </div>
        </transition-group>
      </v-list>
      <v-list id='hi' style="padding-bottom:60px;">
      </v-list>
    </div>
    <Message-From v-on:submitMessage="sendMessage" class="msg-form" ></Message-From>
  </div>
</template>



<script>
import MessageForm from '@/components/Chat/MessageForm.vue';
import axios from 'axios';

export default {
  directives:{
    'auto-scroll':{
      update: (el) => {
        // this.chattings.append({
        //   Speaker:"제발",
        //   Message:"후"
        // })
        setTimeout(() => {
          el.scrollTop = el.scrollHeight;
        }, 0);
      },
    }
  },
  name: 'ChatRoom',
  data() {
    return {
      chattings:[]
    };
  },
  components: {
    'Message-From': MessageForm,
  },

  methods: {
    scroll() {
      var scroll = document.getElementById('scrollplz')
      scroll.scrollTop = scroll.scrollHeight
    },
    pushMsgData(data) {
      this.chattings.push(data)
    },
    post(data){
      axios.post('http://211.254.217.44:8892/api/v1/chat',data)
      .then((result) => {
        if(result.data.Message==="404"){
          result.data.Message=""
        }
        this.chattings.push(Object.assign(result.data,{Question:data.Message}))

      })
    },
    sendMessage(Message) {
      this.post({
        Speaker:"질문",
        Message
      });
      this.scroll();
    },
  },
};
</script>

<style>
  .msg-form {
    position:absolute;
    bottom: -28px;
    left: 0;
    right: 0;
  }
  .msg-list {
    position:absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 60px;
    overflow-x: scroll;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(30px);
  }
  .inner-wrap {
    width: 100%;
  }
</style>
