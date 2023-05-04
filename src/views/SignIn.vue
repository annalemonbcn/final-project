<template>
  <!-- https://www.figma.com/file/d1OI5eCagifyaeVTS70YaW/Login-Page-design-(Community)?node-id=0-1&t=NYn4fDM90f6ZRCYm-0 -->
  <div class="container">
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
          <p id="main-text" @click="_handleResetPassword">Forgot password?</p>
          <p class="warn textSuccess">{{ textSuccess }}</p>
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
    ...mapActions(UserStore, ['signIn','_resetPassword']),
    async _handleSignIn(){
      const userData = { email: this.email, password: this.password }
      try{
        await this.signIn(userData)
        this.$router.push({ name: 'home' })
      } catch (error){
        console.error(error) // --> handle error
      }
    },
    _handleResetPassword(){
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if(regex.test(this.email)){
        // Reset html fields
        document.querySelector('#input-email').classList.remove('error');
        this.textError = '';
        document.querySelector('.textError').style.display = 'none';
    
        // Call method
        if(this._resetPassword(this.email)){
          // Reset email input
          this.email = '';

          // Text success
          document.querySelector('#main-text').style.display = 'none';
          document.querySelector('.textSuccess').style.display = 'block';
        } else {
          this.textError = 'There has been an error sending the request.<br>Please try again.'
          document.querySelector('.textError').style.display = 'block';
        }
        
      } else {
        // Set html fields
        document.querySelector('#input-email').classList.add('error');
        this.textError = 'Enter a valid email!';
        document.querySelector('.textError').style.display = 'block';
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
  #connect-forgot p#main-text{
    color: var(--green-accent);
    font-size: 14px;
    cursor: pointer;
  }
</style>