<template>
  <div class="container user">
    <div id="main-info">
      <h1 class="title">Sign up</h1>
      <p class="subtitle">Sign up and start managing your tasks!</p>
      <form action="" @submit.prevent @keyup.enter="_handleSignUp" class="connect">
        <div class="container-input">
          <input type="text" id="input-email" name="email" placeholder="Email" v-model="email" />
        </div>
        <div class="container-input">
          <input
            type="password"
            id="input-password"
            name="password"
            placeholder="Password"
            v-model="password"
          /><br />
        </div>
        <div class="container-input">
          <input
            type="password"
            id="input-confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            v-model="confirmPassword"
          />
        </div>
        <button
          class="btn btn-primary"
          type="button"
          @click="_handleSignUp"
          @keyup.enter="_handleSignUp"
        >
          Sign Up
        </button>
      </form>
      <p class="warn"></p>
      <div class="connect-change">
        <router-link to="/auth/sign-in">Already a user? Click here to <u>Login</u></router-link>
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
      confirmPassword: ''
    }
  },
  computed: {
    ...mapState(UserStore, ['user'])
  },
  methods: {
    ...mapActions(UserStore, ['_validateEmail', '_validatePassword', 'signUp']),

    async _handleSignUp() {
      // Reset errors and fields
      removeError()
      document.querySelector('input#input-email').classList.remove('error')
      document.querySelector('input#input-password').classList.remove('error')
      document.querySelector('input#input-confirmPassword').classList.remove('error')

      // Validate email
      if (!this._validateEmail(this.email)) {
        showError('Enter a valid email!')
        document.querySelector('input#input-email').classList.add('error')
        return
      }
      // Validate password
      if (!this._validatePassword(this.password) || !this._validatePassword(this.confirmPassword)) {
        showError('Password must be at least 6 characters long.')
        document.querySelector('input#input-password').classList.add('error')
        document.querySelector('input#input-confirmPassword').classList.add('error')
        return
      }
      if (this.password !== this.confirmPassword) {
        showError('Passwords do not match!')
        document.querySelector('input#input-password').classList.add('error')
        document.querySelector('input#input-confirmPassword').classList.add('error')
        return
      }

      // If valid, continue signup
      const userData = { email: this.email, password: this.password }
      try {
        await this.signUp(userData)
        // Show message ok
        document.querySelector('.connect').style.display = 'none'
        document.querySelector('.btn.btn-primary').disabled = true
        showSuccess('Done! Check your inbox and confirm your email to continue :)')
        // this.$router.push({ name: 'home' })
      } catch (error) {
        showError(error.message)
      }
    }
  }
}
</script>

<style scoped>
.warn.textError {
  margin-bottom: 30px;
}
div.container-input:nth-child(2) {
  margin-bottom: 15px;
}
</style>
