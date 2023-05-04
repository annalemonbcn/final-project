<template>
  <div class="container user">
    <div id="main-info">
      <h1 class="title">Forgot password?</h1>
      <p class="subtitle">Enter your email and you will receive a link to set a new password.</p>
      <form action="" @submit.prevent class="connect">
        <div class="container-input">
          <input type="text" id="input-email" name="email" placeholder="Email" v-model="email">
          <p class="warn textError">{{ textError }}</p>
          <p class="warn textSuccess">{{ textSuccess }}</p>
        </div>
        <button class="btn btn-primary" type="button" @click="_handleResetPassword">Send recovery link</button>
      </form>
      <div class="connect-change">
        <router-link to="/auth/sign-up"><fa icon="fa-solid fa-circle-arrow-right" /> New user? Click here to <u>Sign Up</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import UserStore from '@/stores/user.js'

export default{
  name: 'ForgotPasswordView',
  data(){
    return{
      email: '',
      textError: '',
      textSuccess: 'Email sent!'
    }
  },
  methods: {
    ...mapActions(UserStore, ['_resetPassword']),

    _handleResetPassword(){
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      let continueFlag = false;

      // Email validation
      if(regex.test(this.email)){
        
        // Reset ERROR in html fields
        document.querySelector('#input-email').classList.remove('error');
        this.textError = '';
        document.querySelector('.textError').style.display = 'none';

        // Update flag
        continueFlag = true;
      }
      else {
        // Set ERROR in html fields
        document.querySelector('#input-email').classList.add('error');
        this.textError = 'Enter a valid email!';
        document.querySelector('.textError').style.display = 'block';
      }

      if(continueFlag){
        // Call method to reset password
        if(this._resetPassword(this.email)){
          // Text success
          document.querySelector('input#input-email').style.display = 'none';
          document.querySelector('.textSuccess').style.display = 'block';
          document.querySelector('.btn').disabled = true;

        } 
        else {
          this.textError = 'There has been an error sending the request.<br>Please try again.'
          document.querySelector('.textError').style.display = 'block';
        }
      }
      
    }
  }
}
</script>

<style scoped>
</style>