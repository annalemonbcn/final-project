<template>
  <h1>Sign-up</h1>
  <form action="">
    <div>
      <label for="email">Email: </label>
      <input type="text" name="email" placeholder="example@example.com" v-model="email">
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" name="password" placeholder="****" v-model="password"><br>
      <label for="confirmPassword">Confirm password:</label>
      <input type="password" name="confirmPassword" placeholder="****" v-model="confirmPassword">

    </div>
    <button type="button" @click="_handleSignUp">Sign Up</button>
  </form>
  
  <router-link to="/auth/sign-in">Sign In</router-link>
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