<template>
  <div class="container user">
    <div id="main-info">
      <h1 class="title">Password recovery</h1>
      <p class="subtitle">Enter your new password below:</p>

      <form action="" @submit.prevent class="connect">
        <div class="container-input">
          <input type="password" name="password" placeholder="Password" v-model="password" /><br />
        </div>
        <div class="container-input">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            v-model="confirmPassword"
          />
        </div>
        <button class="btn btn-primary" type="button" @click="_handleUpdatePassword">
          Reset password
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import UserStore from '../stores/user';

export default {
  name: 'RecoveryPasswordView',
  data() {
    return {
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    ...mapActions(UserStore, ['_updateuser']),

    async _handleUpdatePassword() {
      if (this.password.length >= 6) {

        if (this.password === this.confirmPassword) {

          if(this._updateuser(this.password)){
            console.log('Password updated');
            setTimeout(() => {
              this.$router.push({ name: 'home' });
            }, 5000)
            
          }

        }
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
