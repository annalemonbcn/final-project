<template>
  <h1>Sign-in</h1>
  <form action="" @submit.prevent>
    <div>
      <label for="email">Email: </label>
      <input type="text" name="email" placeholder="example@example.com" v-model="email">
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" name="password" placeholder="****" v-model="password">
    </div>
    <button type="button" @click="_handleSignIn">Sign In</button>
  </form>
  <router-link to="/auth/sign-up">Sign Up</router-link>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import UserStore from '@/stores/user.js'

export default{
  name: 'SignIn',
  data(){
    return{
      email: '',
      password: ''
    }
  },
  computed: {
    ...mapState(UserStore, ['user']),
  },
  methods: {
    ...mapActions(UserStore, ['signIn']),
    async _handleSignIn(){
      const userData = { email: this.email, password: this.password }
      try{
        await this.signIn(userData)
        this.$router.push({ name: 'home' })
      } catch (error){
        console.error(error) // --> handle error
      }
    }
  }
}
</script>