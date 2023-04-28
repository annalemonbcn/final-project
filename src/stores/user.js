import { defineStore } from 'pinia';
import supabase from '../supabase/index.js'

export default defineStore('userStore', {
  state(){
    return{
      user: undefined,
    }
  },
  actions: {
    async fetchUser(){
      const { data: { user } } = await supabase.auth.getUser();

      this.user = user;
    },
    async signUp({ email, password }){
      const { data: { user }, error } = await supabase.auth.signUp({
        email, 
        password
      });

      if(error){
        throw error;
      }
      if(user){
        this.user = user;
      }
    },
    async signIn({ email, password }){
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email, password
      });

      if(error){
        throw error;
      }
      this.user = user;
    },
    async signOut(){
      const { error } = await supabase.auth.signOut();
      if(error){
        throw error;
      }
      this.user = null;
    }
  }
})