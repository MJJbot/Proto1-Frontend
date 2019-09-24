<template>
    <div class="sc-chat-window">
      <Chat
      v-on:close="close"
      :participants="participants"
      :myself="myself"
      :messages="messages"
      :onMessageSubmit="onMessageSubmit"
      :chatTitle="chatTitle"
      :placeholder="placeholder"
      :colors="colors"
      :borderStyle="borderStyle"
      :hideCloseButton="hideCloseButton"
      :closeButtonIconSize="closeButtonIconSize"
      :submitIconSize="submitIconSize"/>
    </div>

</template>

<script>
  // import axios from 'axios';
  import Chat from './forChat/Chat.vue'
  export default {
    components: {
      Chat
    },
    data: () => ({
      participants: [
        {
          name: '무진장 봇',
          id: 1
        }
      ],
      myself: {
        name: '나',
        id: 2
      },
      messages: [
        {
          content: '방가방가',
          myself: true,
          participantId: 2,
        },
        {
          content: '안녕',
          myself: false,
          participantId: 1,
        }
      ],
      chatTitle: '테스트 해보기',
      placeholder: '채팅을 입력해보세요',
      colors:{
        header:{
          bg: '#a3a3a3',
          text: '#fff'
        },
        message:{
          myself: {
            bg: '#fff',
            text: '#bdb8b8'
          },
          others: {
            bg: '#fff',
            text: '#a3a3a3'
          }
        },
        submitIcon: '#b91010'
      },
      borderStyle: {
        topLeft: "10px",
        topRight: "10px",
        bottomLeft: "10px",
        bottomRight: "10px",
      },
      hideCloseButton: false,
      submitIconSize: "30px",
      closeButtonIconSize: "30px"
    }),


    methods: {
      onMessageSubmit: function(message){
        //here you can set any behavior
      },
      close(){
        this.$emit('close');
      }
    }
  }



</script>
<style>

.sc-chat-window {
  width: 370px;
  height: calc(100% - 120px);
  max-height: 590px;
  position: fixed;
  right: 15px;
  bottom: 45px;
  box-sizing: border-box;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.1);
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.3s ease-in-out;
  border-radius: 10px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
</style>
