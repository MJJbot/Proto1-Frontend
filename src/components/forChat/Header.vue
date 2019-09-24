<template>
    <div class="header-container" :style="{background: colors.header.bg}">
        <div class="header-title">
            <p class="header-title-text" :style="{color: colors.header.text}">{{ chatTitle }}</p>
        </div>

        <div v-if="!hideCloseButton" class="header-exit">
            <a class="header-exit-button" @click="close"><v-icon name="x" base-class="icon-close-chat" :style="{width: closeButtonIconSize}">mdi-close</v-icon></a>
        </div>
    </div>
</template>
<script>

export default {
    props:{
        colors: {
            type: Object,
            required: true
        },
        borderStyle: {
            type: Object,
            required: false,
            default: () =>{
                return {
                    topLeft: "10px",
                    topRight: "10px",
                    bottomLeft: "10px",
                    bottomRight: "10px",
                }
            }
        },
        hideCloseButton: {
            type: Boolean,
            required: false,
            default: false
        },
        closeButtonIconSize: {
            type: String,
            required: false,
            default: "15px"
        }
    },
    computed: {
        participants: function(){
            return this.$store.state.participants;
        },
        myself: function(){
            return this.$store.state.myself;
        },
        chatTitle: function(){
            return this.$store.state.chatTitle;
        }
    },
    methods: {
      close(){
        this.$emit('close');
      }
    }
}
</script>

<style scoped>
.header-container{
    /* background: #d30303; */
    height: 60px;
    display: flex;
    padding: 0 20px 0 10px;
    align-items: center;
    -webkit-box-shadow:  0px 2px 20px 2px rgba(90, 90, 90, 0.47);
    box-shadow: 0px 2px 20px 2px rgba(90, 90, 90, 0.47);
    z-index: 5;
}
.header-title{
    padding: 10px;
    flex:1;
    text-align: left;
}

.header-title-text{
    /* color: #fff; */
    margin-bottom: 0px;
}

.header-exit{

}

.header-paticipants-text{
    color: #e4e4e4;
    font-size: 12px;
    margin-top: 5px;
    max-height: 30px;
    overflow: hidden;
}

.header-exit-button{
    text-decoration: none;
    color: #fff;
    width: 20px;
}

.icon-close-chat{
    color:#fff;
    width: 100%;
}
.icon-close-chat:hover{
    color:rgb(238, 121, 121)
}

</style>
