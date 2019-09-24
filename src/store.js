import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const resourceHost = ''
const enhanceAccessToeken = () => {
  const {accessToken} = localStorage
  if (!accessToken) return
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}
enhanceAccessToeken()

export default new Vuex.Store({
  state: {
    messages: [],
    myself:{},
    participants: [],
    chatTitle: '',
    placeholder: '',
    accessToken: null
  },
  mutations: {
    LOGIN (state, {accessToken}) {
      state.accessToken = accessToken
      localStorage.accessToken = accessToken
    },
    LOGOUT (state) {
      state.accessToken = null
    },
    newMessage: (state, message) => {
      state.messages = [...state.messages, message];
    },
    setParticipants: (state, participants) => {
      state.participants = participants;
    },
    setMyself: (state, myself) => {
      state.myself = myself;
    },
    setMessages: (state, messages) => {
      state.messages = messages;
    },
    setChatTitle: (state, title) => {
      state.chatTitle = title;
    },
    setPlaceholder: (state, placeholder) => {
      state.placeholder = placeholder;
    }
  },
  actions: {
    // LOGIN ({commit}, {email, password}) {
    //   return axios.post(`${resourceHost}/login`, {email, password})
    //     .then(({data}) => commit('LOGIN', data))
    //     axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
    // },
    LOGOUT ({commit}) {
      commit('LOGOUT')
    },
  },
  getters: {
    getParticipantById: (state) => (id) => {
      let curr_participant;
      state.participants.forEach(participant => {
        if(participant.id == id){
          curr_participant = participant;
        }
      })

      return curr_participant;
    }
  }
})
