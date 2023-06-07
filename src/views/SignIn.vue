<template>
  <!-- https://www.figma.com/file/d1OI5eCagifyaeVTS70YaW/Login-Page-design-(Community)?node-id=0-1&t=NYn4fDM90f6ZRCYm-0 -->
  <div class="container user">
    <div id="main-info">
      <h1 class="title">Sign in</h1>
      <p class="subtitle">Sign in and start managing your tasks!</p>
      <form action="" @submit.prevent @keyup.enter="_handleSignIn" class="connect">
        <div class="container-input">
          <input type="text" id="input-email" name="email" placeholder="Email" v-model="email" />
        </div>
        <div class="container-input">
          <input type="password"
            id="input-password"
            name="password"
            placeholder="Password"
            v-model="password"
          /> 
          <fa class="icon-mayus" icon="fa-regular fa-circle-up" v-show="bloqMayusOn"/>
        </div>
        <p class="warn"></p>
        <div id="connect-forgot">
          <router-link to="/auth/forgot-password">Forgot password?</router-link>
        </div>
        <button class="btn btn-primary" type="button" @click="_handleSignIn">Login</button>
      </form>
      <div class="signin-oauth">
        <p>Or you can also...</p>
        <button class="btn btn-oauth" @click="_handleSignInWithGoogle"><img src="@/assets/google-icon.png" alt="" /> Sign in with Google</button>
      </div>
      <div class="connect-change">
        <router-link to="/auth/sign-up"
          ><fa icon="fa-solid fa-circle-arrow-right" /> New user? Click here to
          <u>Sign Up</u></router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import UserStore from '@/stores/user.js'
import { showError, removeError, showSuccess } from '@/assets/utils.js'

export default {
  name: 'SignIn',
  data() {
    return {
      email: '',
      password: '',
      bloqMayusOn: false,
      toast: null
    }
  },
  computed: {
    ...mapState(UserStore, ['user'])
  },
  methods: {
    ...mapActions(UserStore, ['_validateEmail', '_validatePassword', 'signIn', 'signInWithGoogle']),

    async _handleSignIn() {
      // Reset errors and fields
      removeError()
      document.querySelector('input#input-email').classList.remove('error')
      document.querySelector('input#input-password').classList.remove('error')

      // Validate email
      if (!this._validateEmail(this.email)) {
        showError('Enter a valid email!')
        document.querySelector('input#input-email').classList.add('error')
        return
      }
      // Validate password
      if (!this._validatePassword(this.password)) {
        showError('Password must be at least 6 characters long.')
        document.querySelector('input#input-password').classList.add('error')
        return
      }

      // If valid, continue login
      const userData = { email: this.email, password: this.password }
      try {
        await this.signIn(userData)
        showSuccess('Welcome back :)')
        // Hide elements
        document.querySelector('#connect-forgot').style.display = 'none'
        document.querySelector('.btn.btn-primary').disabled = true
        // Redirect to home
        setTimeout(() => {
          this.$router.push({ name: 'home' })
        }, 2000)
      } catch (error) {
        showError(error.message)
      }
    },
    async _handleSignInWithGoogle() {
      // --> HERE
      // desenvolupar un missatge de welcome
      try {
        await this.signInWithGoogle();
      }
      catch(error){
        showError(error.message)
      }
    },
  },
  mounted() {
    // Bloq mayus ON
    const inputPassword = document.querySelector('input#input-password')

    const checkCapsLock = (event) => {
      this.bloqMayusOn = event.getModifierState('CapsLock');
    }
    
    inputPassword.addEventListener('keyup', checkCapsLock)
  }
}
</script>

<style scoped>
body {
  overflow-y: hidden !important;
}
#connect-forgot {
  text-align: center;
  margin-bottom: 15px;
}
#connect-forgot a {
  color: var(--green-accent);
  font-size: 14px;
  cursor: pointer;
}
.signin-oauth{
  margin-top: 30px;
  text-align: center
}
.signin-oauth p{
  font-size: 14px;
}
</style>
