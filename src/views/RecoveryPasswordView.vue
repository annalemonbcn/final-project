<template>
  <div class="container user">
    <div id="main-info">
      <h1 class="title">Password recovery</h1>
      <p class="subtitle">Enter your new password below:</p>

      <form action="" @submit.prevent @keyup.enter="_handleUpdatePassword" class="connect">
        <div class="container-input">
          <input
            id="input-password"
            type="password"
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
            id="input-confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            v-model="confirmPassword"
            @keyup="checkCapsLock($event, 'confirmPassword')"
          />
          <fa class="icon-mayus" icon="fa-regular fa-circle-up" v-show="bloqMayusOnConfirmPassword" />
        </div>
        <p class="warn"></p>
        <button
          class="btn btn-primary"
          type="button"
          @click="_handleUpdatePassword"
          @keyup.enter="_handleUpdatePassword"
        >
          Reset password
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import UserStore from '../stores/user'
import { showError, removeError, showSuccess } from '@/assets/utils.js'

export default {
  name: 'RecoveryPasswordView',
  data() {
    return {
      password: '',
      confirmPassword: '',
      bloqMayusOnPassword: false,
      bloqMayusOnConfirmPassword: false
    }
  },
  methods: {
    ...mapActions(UserStore, ['_validatePassword', '_updateuser']),

    async _handleUpdatePassword() {
      // Reset errors and fields
      removeError()
      document.querySelector('input#input-password').classList.remove('error')
      document.querySelector('input#input-confirmPassword').classList.remove('error')

      // Validate password
      if (!this._validatePassword(this.password)) {
        showError('Password must be at least 6 characters long.')
        document.querySelector('input#input-password').classList.add('error')
        return
      }
      if (this.password !== this.confirmPassword) {
        showError('Passwords do not match!')
        document.querySelector('input#input-password').classList.add('error')
        document.querySelector('input#input-confirmPassword').classList.add('error')
        return
      }

      // If valid, continue update user
      try {
        await this._updateuser(this.password)
        showSuccess("Password updated! You'll be redirected to your dashboard in a few seconds.)")
        setTimeout(() => {
          this.$router.push({ name: 'home' })
        }, 2000)
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
  }
}
</script>

<style scoped>
.container {
  background-image: url('@/img/bg_recovery.jpg');
}
</style>
