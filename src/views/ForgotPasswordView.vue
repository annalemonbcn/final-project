<template>
  <div class="container user">
    <div id="main-info">
      <h1 class="title">Forgot password?</h1>
      <p class="subtitle">Enter your email and you will receive a link to set a new password.</p>
      <form action="" @submit.prevent @keyup.enter="_handleResetPassword" class="connect">
        <div class="container-input">
          <input type="text" id="input-email" name="email" placeholder="Email" v-model="email">
        </div>
        <p class="warn"></p>
        <button class="btn btn-primary" type="button" @click="_handleResetPassword" @keyup.enter="_handleResetPassword">Send recovery link</button>
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
    ...mapActions(UserStore, ['_validateEmail','_showError','_showSuccess','_removeError','_resetPassword']),

    async _handleResetPassword(){
      // Reset errors and fields
      this._removeError()
      document.querySelector('input#input-email').classList.remove('error')

      // Validate email
      if(!this._validateEmail(this.email)) {
        this._showError('Enter a valid email!');
        document.querySelector('input#input-email').classList.add('error');
        return;
      }

      // If valid, continue reset password
      try{
        await this._resetPassword(this.email);
        // Hide input && show success message
        document.querySelector('input#input-email').style.display = 'none';
        document.querySelector('.btn').disabled = true;
        this._showSuccess('E-mail sent! Check your inbox :)')
      }
      catch (error) {
        this._showError(error.message);
      }
    }
  }
}
</script>

<style scoped>
.warn{
  margin-bottom: 30px;
}
</style>