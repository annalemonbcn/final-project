<template>
  <!-- https://www.figma.com/file/d1OI5eCagifyaeVTS70YaW/Login-Page-design-(Community)?node-id=0-1&t=NYn4fDM90f6ZRCYm-0 -->
  <div class="container user">
    <div id="main-info">
      <h1 class="title">Sign in</h1>
      <p class="subtitle">Sign in and start managing your tasks!</p>
      <form action="" @submit.prevent class="connect">
        <div class="container-input">
          <input type="text" id="input-email" name="email" placeholder="Email" v-model="email">
          <p class="warn textError">{{ textError }}</p>
        </div>
        <div class="container-input">
          <input type="password" id="input-password" name="password" placeholder="Password" v-model="password">
        </div>
        <div id="connect-forgot">
          <router-link to="/auth/forgot-password">Forgot password?</router-link>
          
        </div>
        <button class="btn btn-primary" type="button" @click="_handleSignIn">Login</button>
      </form>
      <div class="connect-change">
        <router-link to="/auth/sign-up"><fa icon="fa-solid fa-circle-arrow-right" /> New user? Click here to <u>Sign Up</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import UserStore from '@/stores/user.js'

export default{
  name: 'SignIn',
  data(){
    return{
      email: '',
      password: '',
      textError: '',
      textSuccess: 'Email sent!'
    }
  },
  computed: {
    ...mapState(UserStore, ['user']),
  },
  methods: {
    ...mapActions(UserStore, ['signIn']),
    async _handleSignIn(){
      const userData = { email: this.email, password: this.password }
      try{
        await this.signIn(userData)
        this.$router.push({ name: 'home' })
      } catch (error){
        console.error(error) // --> handle error
      }
    }
  }
}
</script>

<style scoped>
  

  #connect-forgot{
    text-align: center;
    margin-bottom: 25px;
  }
  #connect-forgot a{
    color: var(--green-accent);
    font-size: 14px;
    cursor: pointer;
  }
</style>