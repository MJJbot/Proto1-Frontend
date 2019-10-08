<template>
  <v-app id="inspire">

    <streamer pageinfo='pre-defined Questions'>
    </streamer>

    <v-content>
      <v-card height="96" class="d-flex pa-2" outlined tile>
        pre-defined Questions
      </v-card>
      <v-container
        class="fill-height"
        fluid
      >
        <div class="mx-auto">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="questions"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            :search="cur_category.key"
            class="elevation-1"
            disable-sort
            hide-default-footer
            @page-count="pageCount = $event"
          >
          <!-- <v-data-table
            show-select
            item-key="Question"
            v-model="selected"
            :headers="headers"
            :items="questions"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            class="elevation-1"
            disable-sort
            hide-default-footer
            @page-count="pageCount = $event"
          > -->
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Pre-defined Q&A</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-toolbar-text>스트리밍 중 자주 나오는 질문들에 대한 답변을 만들어 보세요.</v-toolbar-text>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title class="headline grey lighten-3">
                      <span class="headline">"{{editedItem.type}}" 관련 질문</span>
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
              <v-select
                v-model="cur_category"
                :items="category"
                item-text="name"
                item-value="name"
                label="선택"
                return-object
                single-line
              ></v-select>
              <!-- <v-text-field v-model="search" label="Search!" class="mx-4"></v-text-field> -->
            </template>
            <template v-slot:item.action="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>

              <v-icon
                small
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:no-data>
              질문을 추가하세요.
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
      selected: [],
      search: '이',
      cur_category: {name:'전체',key:''},
      category: [{name:'전체',key:''}, {name:'일반 프로필',key:'일반 프로필'},{name:'방송 설정',key:'방송 설정'},{name:'장비 설정',key:'장비 설정'},{name:'게임 설정',key:'게임 설정'}],
      headers: [
          {
            text: '질문 유형',
            align: 'left',
            value: 'type',
            width:'200px'
          },
          { text: '명령어', value: 'Command', width:'150px',},
          { text: '질문 예시', value: 'Question', width:'200px',},
          { text: '답변 예시', filterable: false, value: 'Answer', width:'300px',},
          { text: 'Actions', value: 'action',}
      ],
      questions: [
        {type:"일반 프로필 - 이름",Question:"이름이 뭐에요?",Command:"!이름",Answer:"게임 방송하는 김민재라고합니다.",c_id:"1"},
        {type:"일반 프로필 - 나이",Question:"나이가 어떻게 되세요?",Command:"!나이",Answer:"21살입니다.",c_id:"1"},
        {type:"방송 설정 - 게임",Question:"오늘 게임 뭐해요?",Command:"!오늘게임",Answer:"1부 롤, 2부 하스스톤입니다.",c_id:"2"},
        {type:"장비 설정 - 마우스",Question:"마우스 뭐 쓰세요?",Command:"!마우스",Answer:"",c_id:"3"},
        {type:"일반 프로필 - 롤티어",Question:"지금 롤 티어가 어디임?",Command:"!롤티어",Answer:"",c_id:"3"}
      ],
      editedIndex: -1,
      editedItem: {
        type:'',
        Question: '',
        Answer: '',
        Command: ''
      },
      defaultItem: {
        type:'',
        Question: '',
        Answer: '',
        Command: ''
      },
      datas:[],}),


    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created: function() {
      // this.update()
    },

    methods: {
      update () {
        const api = axios.create({
          withCredentials: true
        });
        api.get('http://211.254.217.44:8893/predefinedQA')
        .then((result) => {
          if(result.data.sessionValid){
            this.questions = result.data.QAlist
            this.userName = result.data.userName
            this.imgURL = result.data.userImg
            for(var i in result.data.category){
              this.category = [],
              this.category.push({name:i,key:i})
            }
            this.category = result.data.category
            for(var i in this.question){
              i.type = this.category[c_id] +' - ' + i.type
            }
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
        api.put('http://211.254.217.44:8893/predefinedQA/'+this.questions[this.editedIndex].id, this.editedItem)
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
    }
  }



</script>
