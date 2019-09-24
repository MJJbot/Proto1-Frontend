<template>
    <div ref="contaierMessageDisplay" class="contaier-message-display" @scroll="updateScrollState">
        <div v-for="(message, index) in messages" :key="index" class="message-container" :class="{'my-message': message.myself, 'other-message': !message.myself}">
            <div class="message-text" :style="{background: !message.myself?colors.message.others.bg: colors.message.myself.bg}">
                <p v-if="!message.myself" class="message-username">{{getParticipantById(message.participantId).name}}</p>
                <p v-else class="message-username">{{myself.name}}</p>
                <p>{{message.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    data(){
        return {
            updateScroll: false
        }
    },
    props:{
        colors: {
            type: Object,
            required: true
        },
    },
    computed: {
        ...mapGetters([
            'getParticipantById'
        ]),
        messages: function(){
            return this.$store.state.messages;
        },
        myself: function(){
            return this.$store.state.myself;
        }
    },
    updated(){
        if(this.messages[this.messages.length-1].participantId == this.myself.id || this.updateScroll){
            let scrollDiv = this.$refs.contaierMessageDisplay
            scrollDiv.scrollTop = scrollDiv.scrollHeight
            this.updateScroll = false;
        }
    },
    methods:{
        updateScrollState: function({ target: { scrollTop, clientHeight, scrollHeight }}){
            if (scrollTop + clientHeight >= scrollHeight) {
                this.updateScroll = true;
            }else{
                this.updateScroll = false;
            }
        }
    }
}
</script>

<style scoped>
.contaier-message-display{
    flex: 1;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    max-height: 100%;
}
.message-text{
    background: #fff;
    padding: 6px 10px;
    border-radius: 15px;
    margin: 5px 0 5px 0;
    max-width: 70%;
    overflow-wrap: break-word;
    text-align: left;
    white-space: pre-wrap;
}

.message-text > p {
    margin: 5px 0 5px 0;
    height: 100%;
}

.my-message{
    justify-content: flex-end;
    padding-right: 15px;
    align-items: flex-end;
}

.other-message{
    justify-content: flex-start;
    padding-left: 15px;
    align-items: flex-start;
}

.other-message >.message-text{
    /* background: #fb4141;  */
    color: #000000;
    border-bottom-left-radius: 0px;
}

.my-message >.message-text{
    border-bottom-right-radius: 0px;
}
.message-container{
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

.message-username{
    font-size: 10px;
    font-weight: bold;
}
</style>
