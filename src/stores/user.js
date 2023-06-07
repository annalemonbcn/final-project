import { defineStore } from 'pinia'
import supabase from '../supabase/index.js'

export default defineStore('userStore', {
  state() {
    return {
      user: undefined
    }
  },
  actions: {
    async fetchUser() {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      this.user = user
    },
    async signUp({ email, password }) {
      const {
        data: { user },
        error
      } = await supabase.auth.signUp({
        email,
        password
      })

      if (error) {
        throw error
      }
      if (user) {
        this.user = user
      }
    },
    async signIn({ email, password }) {
      const {
        data: { user },
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        throw error
      }
      this.user = user
    },
    async signInWithGoogle() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // redirectTo: '/'
        }      
      })
      if (error) {
        throw error
      }
    },
    async signOut() {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      this.user = null
    },
    async _updateuser(password) {
      const { data, error } = await supabase.auth.updateUser({
        password
      })

      console.log(data)

      if (error) {
        console.error(error)
        return error
      }
      return true
    },
    async _resetPassword(email) {
      console.log(email)
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://comforting-kangaroo-be4400.netlify.app/recovery-password/'
      })

      if (error) {
        throw error
      }
    },
    _validateEmail(email) {
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return regexEmail.test(email)
    },
    _validatePassword(password) {
      return password.length >= 6
    },
  }
})
