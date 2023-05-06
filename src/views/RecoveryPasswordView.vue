<template>
  <div class="container user">
    <div id="main-info">
      <h1 class="title">Password recovery</h1>
      <p class="subtitle">Enter your new password below:</p>

      <form action="" @submit.prevent class="connect">
        <div class="container-input">
          <input
            id="input-password"
            type="password"
            name="password"
            placeholder="Password"
            v-model="password"
          /><br />
        </div>
        <div class="container-input">
          <input
            id="input-confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            v-model="confirmPassword"
          />
        </div>
        <p class="warn"></p>
        <button class="btn btn-primary" type="button" @click="_handleUpdatePassword" @keyup.enter="_handleUpdatePassword">
          Reset password
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import UserStore from '../stores/user'

export default {
  name: 'RecoveryPasswordView',
  data() {
    return {
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    ...mapActions(UserStore, [
      '_validatePassword',
      '_showError',
      '_showSuccess',
      '_removeError',
      '_updateuser'
    ]),

    async _handleUpdatePassword() {
      // Reset errors and fields
      this._removeError()
      document.querySelector('input#input-password').classList.remove('error')
      document.querySelector('input#input-confirmPassword').classList.remove('error')

      // Validate password
      if (!this._validatePassword(this.password)) {
        this._showError('Password must be at least 6 characters long.')
        document.querySelector('input#input-password').classList.add('error')
        return
      }
      if (this.password !== this.confirmPassword) {
        this._showError('Passwords do not match!')
        document.querySelector('input#input-password').classList.add('error')
        document.querySelector('input#input-confirmPassword').classList.add('error')
        return
      }

      // If valid, continue update user
      try {
        await this._updateuser(this.password)
        this._showSuccess(
          "Password updated! You'll be redirected to your dashboard in a few seconds.)"
        )
        setTimeout(() => {
          this.$router.push({ name: 'home' })
        }, 2000)
      } catch (error) {
        this._showError(error.message)
      }
    }
  }
}
</script>

<style scoped>
.container {
  background-image: url('@/img/bg_RECOVERY.jpg');
}
</style>
