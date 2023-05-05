<template>
  <!-- <header>
    <nav>

      <div class="nav-border-bottom">
        <router-link to="/">
          <img src="@/img/a_faire.png" alt="logo" class="logo" />
        </router-link>
      </div>

      <div id="nav-main">
        <p class="hide">Welcome, {{ user.email }}!</p>
        <div id="mainNavigation">
          <router-link to="/" class="active">
            <fa icon="fa-circle-dot" />
          </router-link>

          <button @click="handleSignOut">Log out</button>
        </div>
      </div>

    </nav>
  </header> -->
  <header>
    <div>
      <router-link to="/">
        <!-- <img src="@/img/logo.png" alt="logo" class="logo smallLogo" />
        <img src="@/img/a_faire.png" alt="logo" class="logo hide" /> -->
        <div>Welcome, {{ user.email }}</div>
      </router-link>
    </div>
    <nav>
      <ul>
        <li>
          <router-link to="/" class="active">
            <fa icon="fa-solid fa-code" /> <span class="hide">Tasks</span>
          </router-link>
        </li>
        <li>
          <a href="#">
            <fa icon="fa-solid fa-font-awesome" /> <span class="hide">Flagged tasks</span>
          </a>
        </li>
        <li>
          <a href="#">
            <fa icon="fa-regular fa-bell" /> <span class="hide">Notifications</span>
          </a>
        </li>
        <li>
          <a href="#">
            <fa icon="fa-solid fa-chart-line" /> <span class="hide">Analytics</span>
          </a>
        </li>
      </ul>
    </nav>
    <div>
      <ul>
        <li>
          <a @click="handleSignOut">
            <fa icon="fa-solid fa-code" /> <span class="hide">Log out</span>
          </a>
        </li>
        <li>
          <a href="#">
            <fa icon="fa-solid fa-gear" /> <span class="hide">Settings</span>
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import UserStore from '@/stores/user'

export default {
  name: 'HeaderComp',
  computed: {
    ...mapState(UserStore, ['user'])
  },
  methods: {
    ...mapActions(UserStore, ['signOut']),

    async handleSignOut() {
      try {
        await this.signOut()
        this.$router.push({ name: 'sign-in' })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
header {
  box-sizing: border-box;
  padding: 25px;

  background-color: blue;

  height: 100vh;
  width: 90px;

  position: fixed;
  top: 0;
  left: 0;

  transition: all 0.3s ease;
}

/** HOVER **/
header:hover {
  background-color: red;
  width: 320px;
}
header:hover .hide {
  display: block;
}
header:hover .logo.smallLogo{
  display: none;
}
/*************/
.hide {
  display: none;
}
header .logo{
  width: 100%;
}
header .logo.hide{
  width: 30%;
}

header nav{
  margin-top: 30px;
}

header ul{
  list-style-type: none;
}
/* 
header nav {
  height: 100%;

  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
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
} */
</style>
