<template>
  <header>
    <nav>
      <div class="nav-border-bottom">
        <router-link to="/">
          <img src="../../img/a_faire.png" alt="logo" class="logo" />
        </router-link>
      </div>
      <div id="nav-main">
        <div id="mainNavigation">
          <router-link to="/" class="active">
            <fa icon="fa-circle-dot" />
          </router-link>

          <button @click="handleSignOut">Log out</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapActions } from 'pinia';
import UserStore from '@/stores/user';

import UserLogo from '../Account/UserLogoComp.vue';

export default {
  name: 'HeaderComp',
  components: {
    UserLogo,
  },
  methods: {
    ...mapActions(UserStore, ['signOut']),

    async handleSignOut(){
      try{
        await this.signOut();
        this.$router.push({ name: 'sign-in' })
      } catch(e){
        console.error(e);
      }
    }
  }
}
</script>

<style scoped>
header {
  box-sizing: border-box;
  padding: 30px 10px;

  background-color: #ebeded;

  height: 100vh;
  max-width: 100px;

  position: fixed;
  top: 0;
  left: 0;
}

header nav {
  height: 100%;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
}

header nav > div {
  padding-bottom: 10px;
}

header svg {
  height: 30px;
}

header nav img.logo {
  max-width: 70px;
}

header nav #nav-main {
  height: 70%;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
}

header nav #nav-main #mainNavigation {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.nav-border-bottom{
  border-bottom: 2px solid var(--tertiary-color);
  padding-bottom: 15px;
  width: 80%;
}

.nav-border-top{
  border-top: 2px solid var(--tertiary-color);
  padding-top: 15px;
  width: 80%;
}

.nav-border-top a{
  display: block;
  width: 45px;
  margin: 0 auto;

  color: var(--tertiary-accent);
  font-weight: 700;
}
</style>
