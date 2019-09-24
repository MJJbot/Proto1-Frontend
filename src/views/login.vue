<template>
  <v-app>
    로그인 시도중...
  </v-app>
</template>
<script>
  export default {
  data(){
    return {}
  },
  created(){
    
    this.$router.push('/dashboard')
  },
  methods: {

  }
}
</script>
