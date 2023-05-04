<template>
  <div class="container">
    <div id="main-info">
      <h1 class="title">Sign up</h1>
      <p class="subtitle">Sign up and start managing your tasks</p>
      <form action="" @submit.prevent class="connect">
        <div>
          <input type="text" name="email" placeholder="Email" v-model="email">
        </div>
        <div>
          <input type="password" name="password" placeholder="Password" v-model="password"><br>
          <input type="password" name="confirmPassword" placeholder="Confirm password" v-model="confirmPassword">
        </div>
        <button class="btn btn-primary" type="button" @click="_handleSignUp">Sign Up</button>
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
 
export default{
  name: 'SignIn',
  data(){
    return{
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    ...mapState(UserStore, ['user']),
  },
  methods: {
    ...mapActions(UserStore, ['signUp']),
    async _handleSignUp(){

      if(this.password === this.confirmPassword){
        const userData = { email: this.email, password: this.password };
        try{
          await this.signUp(userData);
          this.$router.push({ name: 'home' });
        } catch (error){
          console.error(error); // --> handle error
        }
      } else {
        console.log("Passwords don't match. Try again!") // --> handle error
      }
    }
  }
}
</script>