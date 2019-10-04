<template>
  <v-app id="inspire">

    <streamer pageinfo='automatic FAQ'>
    </streamer>

    <v-content>
      <v-card height="96" class="d-flex pa-2" outlined tile>
        automatic FAQ
      </v-card>
      <v-container
        class="fill-height"
        fluid
      >
        <div class="mx-auto">
          <v-data-table
            :headers="headers"
            :items="questions"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            class="elevation-1"
            disable-sort
            hide-default-footer
            @page-count="pageCount = $event"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Automatic FAQ</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-toolbar-text>내 방송에서 자주 나오는 질문에 답변해보세요.</v-toolbar-text>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title class="headline grey lighten-3">
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field v-if="editedIndex===-1" v-model="editedItem.Question" label="질문"></v-text-field>
                            <v-text-field v-else v-model="editedItem.Question" disabled label="질문"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field v-model="editedItem.Command" label="명령어"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field v-model="editedItem.Answer" label="답변"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item)"
              >
                delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              자동 추가된 질문이 없습니다. 방송을 진행해주세요.
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination v-model="page" :length="pageCount"></v-pagination>
          </div>
        </div>
      </v-container>
      <v-footer
        color="white"
        >
        <span>Mujinjang</span>
        <v-spacer></v-spacer>
        <span>&copy; 2019</span>
      </v-footer>
    </v-content>
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
      drawer: null,
      isOpen: false,
      userName:"openkmj",
      imgURL:"https://static-cdn.jtvnw.net/user-default-pictures/0ecbb6c3-fecb-4016-8115-aa467b7c36ed-profile_image-70x70.jpg",
      page:1,
      pageCount:0,
      itemsPerPage:30,
      dialog: false,
      headers: [
          {
            text: '자주 나왔던 질문',
            align: 'left',
            value: 'Question',
            width:'300px'
          },
          { text: '명령어', value: 'Command', width:'150px',},
          { text: '답변', value: 'Answer', width:'200px',},
          { text: '모인 후원금', value: 'Donation', width:'100px',},
          { text: '질문 횟수', value: 'Number', width:'100px',},
          { text: 'Actions', value: 'action',}
      ],
      questions: [{Question:"",Answer:"",Donation:"",Number:"",Command:""}],
      editedIndex: -1,
      editedItem: {
        Question: '',
        Answer: '',
        Donation: '',
        Number: '',
        Command:''
      },
      defaultItem: {
        Question: '',
        Answer: '',
        Donation: '',
        Number: '',
        Command:''
      },
      datas:[],}),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '질문 추가' : '질문 수정'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created: function() {
      this.update()
    },

    methods: {
      update () {
        const api = axios.create({
          withCredentials: true
        });
        api.get('http://211.254.217.44:8893/automaticFAQ')
        .then((result) => {
          if(result.data.sessionValid){
            this.questions = result.data.QAlist
            this.userName = result.data.userName
            this.imgURL = result.data.userImg
          }
          else{
            this.$router.push({name:'home'})
          }

        })
      },
      editItem (item) {
        this.editedIndex = this.questions.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {

      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        const api = axios.create({
          withCredentials: true
        });
        api.put('http://211.254.217.44:8893/automaticFAQ/'+this.questions[this.editedIndex].id, this.editedItem)
        .then((result) => {
          this.update()
        })
        this.close()
      },

      nothing() {
        this.userName = "click!"

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
