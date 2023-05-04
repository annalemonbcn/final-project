<template>
  <div class="container">
    <div id="main-info">
      <h1 class="title">Sign in</h1>
      <p class="subtitle">Sign in and start managing your tasks!</p>
      <form action="" @submit.prevent class="connect">
        <div>
          <input type="text" name="email" placeholder="Email" v-model="email">
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" v-model="password">
        </div>
        <div id="connect-forgot">
          <a href="#">Forgot password?</a>
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
      password: ''
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
  .container{
  background-image: url('@/img/bg_login.jpg');
  }

  #connect-forgot{
    text-align: center;
    margin-bottom: 25px;
  }
  #connect-forgot a{
    color: var(--green-accent);
    font-size: 14px;
  }
</style>