<template>
  <div class="container user">
    <div id="main-info">
      <h1 class="title">Sign up</h1>
      <p class="subtitle">Sign up and start managing your tasks!</p>
      <form action="" @submit.prevent class="connect">
        <div class="container-input">
          <input type="text" name="email" placeholder="Email" v-model="email">
        </div>
        <div class="container-input">
          <input type="password" name="password" placeholder="Password" v-model="password"><br>
        </div>
        <div class="container-input">
          <input type="password" name="confirmPassword" placeholder="Confirm password" v-model="confirmPassword">
        </div>
        <p class="warn textError">{{ textError }}</p>
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
      confirmPassword: '',
      textError: '',
      textSuccess: ''
    }
  },
  computed: {
    ...mapState(UserStore, ['user']),
  },
  methods: {
    ...mapActions(UserStore, ['signUp']),
    async _handleSignUp(){

      if(this.password.length >= 6){
        if(this.password === this.confirmPassword){
          const userData = { email: this.email, password: this.password };
          try{
            await this.signUp(userData);
            this.$router.push({ name: 'home' });
          } catch (error){
            console.error(error); // --> handle error
          }
        } 
        else {
          this.textError = 'Passwords do not match!'
          document.querySelector('.textError').style.display = 'block';
        }
      }
      else {
        this.textError = 'Password must be at least 6 characters long';
        document.querySelector('.textError').style.display = 'block';
      }
      
    }
  }
}
</script>

<style scoped>
.warn.textError{
  margin-bottom: 30px;
}
div.container-input:nth-child(2){
  margin-bottom: 15px;
}
</style>