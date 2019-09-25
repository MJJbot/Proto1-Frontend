<template>
  <v-app id="inspire">

    <streamer pageinfo='custom Q&A'>
    </streamer>

    <v-content>
      <v-card height="96" class="d-flex pa-2" outlined tile>
        custom Q&A
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
                <v-toolbar-title>Q&A</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-toolbar-text>나만의 Q&A를 만들어 보세요.</v-toolbar-text>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">Q&A 추가</v-btn>
                  </template>
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
            text: '질문',
            align: 'left',
            value: 'Question',
            width:'300px'
          },
          { text: '명령어', value: 'Command', width:'200px',},
          { text: '답변', value: 'Answer', width:'300px',},
          { text: 'Actions', value: 'action',}
      ],
      questions: [],
      editedIndex: -1,
      editedItem: {
        Question: '',
        Command:'',
        Answer: ''
      },
      defaultItem: {
        Question: '',
        Command: '',
        Answer: ''
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
        api.get('http://211.254.217.44:8893/customQA')
        .then((result) => {
          this.questions = result.data
        })
      },
      editItem (item) {
        this.editedIndex = this.questions.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.questions.indexOf(item)
        // confirm('Are you sure you want to delete this item?') &&
        axios.delete('http://211.254.217.44:8892/api/v1/command/'+this.questions[index].id)
        .then(()=>{
          this.update()
        })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          axios.put('http://211.254.217.44:8892/api/v1/command/'+this.questions[this.editedIndex].id, this.editedItem)
          .then(()=>{
            this.update()
          })
        } else {
          axios.post('http://211.254.217.44:8892/api/v1/command',this.editedItem)
          .then(()=>{
            this.update()
          })
        }
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
