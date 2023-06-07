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
            @keyup="checkCapsLock($event, 'password')"
          />
          <fa class="icon-mayus" icon="fa-regular fa-circle-up" v-show="bloqMayusOnPassword" />
          <br />
        </div>
        <div class="container-input">
          <input
            type="password"
            id="input-confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            v-model="confirmPassword"
            @keyup="checkCapsLock($event, 'confirmPassword')"
          />
          <fa class="icon-mayus" icon="fa-regular fa-circle-up" v-show="bloqMayusOnConfirmPassword" />
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
      <div class="signin-oauth">
        <p>Or you can also...</p>
        <button class="btn btn-oauth" @click="_handleSignUpWithGoogle">
          <img src="@/assets/google-icon.png" alt="" /> Sign up with Google
        </button>
      </div>
      <p class="warn"></p>
      <div class="connect-change">
        <router-link to="/auth/sign-in"
          ><fa icon="fa-solid fa-circle-arrow-right" /> Already a user? Click here to
          <u>Login</u></router-link
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
      confirmPassword: '',
      bloqMayusOnPassword: false,
      bloqMayusOnConfirmPassword: false
    }
  },
  computed: {
    ...mapState(UserStore, ['user'])
  },
  methods: {
    ...mapActions(UserStore, ['_validateEmail', '_validatePassword', 'signUp', 'signInWithGoogle']),

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
    },
    async _handleSignUpWithGoogle() {
      // --> HERE
      // desenvolupar un missatge de welcome
      try {
        await this.signInWithGoogle()
      } catch (error) {
        showError(error.message)
      }
    },
    checkCapsLock(event, input) {
      if (event.getModifierState('CapsLock')) {
        if (input === 'password') {
          this.bloqMayusOnPassword = true;
        } else if (input === 'confirmPassword') {
          this.bloqMayusOnConfirmPassword = true;
        }
      } else {
        if (input === 'password') {
          this.bloqMayusOnPassword = false;
        } else if (input === 'confirmPassword') {
          this.bloqMayusOnConfirmPassword = false;
        }
      }
    }
  },
  mounted() {
    // Bloq mayus ON
    const inputPassword = document.querySelector('input#input-password')
    const confirmPassword = document.querySelector('input#input-confirmPassword')

    const checkCapsLock = (event) => {
      this.bloqMayusOn = event.getModifierState('CapsLock');
    }
    
    inputPassword.addEventListener('keyup', checkCapsLock)
    confirmPassword.addEventListener('keyup', checkCapsLock)
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
.signin-oauth {
  margin-top: 30px;
  text-align: center;
}
.signin-oauth p {
  font-size: 16px;
}
</style>
