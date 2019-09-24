<template>
  <div>
    <div  class="me" v-for="(msg,index) in chattings" v-bind:key="index">
      <v-list-tile v-if = "msg.from==='나'">
        <v-list-tile-action>
          <span>{{msg.from}}</span>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{msg.msg}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-else>
        <v-list-tile-action>
          <span>{{msg.from}}</span>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{msg.msg}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider inset></v-divider>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MessageList',
  props: ['chattings'],
  components: {
  }
};
</script>

<style>
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
.me {
  position:relative;
  left:15px;
}
</style>
