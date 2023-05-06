<template>
  <div class="container user">
    <div id="main-info">
      <h1 class="title">Sign up</h1>
      <p class="subtitle">Sign up and start managing your tasks!</p>
      <form action="" @submit.prevent class="connect">
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
        <p class="warn"></p>
        <button class="btn btn-primary" type="button" @click="_handleSignUp" @keyup.enter="_handleSignUp">Sign Up</button>
      </form>
      <div class="connect-change">
        <router-link to="/auth/sign-in">Already a user? Click here to <u>Login</u></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import UserStore from '@/stores/user.js'

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
    ...mapActions(UserStore, [
      '_validateEmail',
      '_validatePassword',
      '_showError',
      '_removeError',
      'signUp'
    ]),

    async _handleSignUp() {
      // Reset errors and fields
      this._removeError()
      document.querySelector('input#input-email').classList.remove('error')
      document.querySelector('input#input-password').classList.remove('error')
      document.querySelector('input#input-confirmPassword').classList.remove('error')

      // Validate email
      if (!this._validateEmail(this.email)) {
        this._showError('Enter a valid email!')
        document.querySelector('input#input-email').classList.add('error')
        return
      }
      // Validate password
      if (!this._validatePassword(this.password) || !this._validatePassword(this.confirmPassword)) {
        this._showError('Password must be at least 6 characters long.')
        document.querySelector('input#input-password').classList.add('error')
        document.querySelector('input#input-confirmPassword').classList.add('error')
        return
      }
      if (this.password !== this.confirmPassword) {
        this._showError('Passwords do not match!')
        document.querySelector('input#input-password').classList.add('error')
        document.querySelector('input#input-confirmPassword').classList.add('error')
        return
      }

      // If valid, continue signup
      const userData = { email: this.email, password: this.password }
      try {
        await this.signUp(userData)
        this.$router.push({ name: 'home' })
      } catch (error) {
        this._showError(error.message)
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
