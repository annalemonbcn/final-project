<template>
  <div id="nav-mobile" class="mobile" @click="toggleHeader">
    <fa icon="fa-solid fa-bars" />
  </div>

  <header v-show="showHeader">
    <div id="nav-user">
      <router-link to="/">
        <fa icon="fa-regular fa-user" /> <span class="hide">{{ user.email }}</span>
      </router-link>
      </div>
    <nav id="nav-main">
      <div>
        <ul>
          <li class="nav-item active">
            <router-link to="/">
              <fa icon="fa-solid fa-code" /> <span class="hide">Tasks</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#">
              <fa icon="fa-solid fa-font-awesome" /> <span class="hide">Urgent tasks</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#">
              <fa icon="fa-regular fa-bell" /> <span class="hide">Notifications</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#">
              <fa icon="fa-solid fa-chart-line" /> <span class="hide">Analytics</span>
            </a>
          </li>
        </ul>
      </div>

      <div id="nav-settings">
        <ul>
          <li class="nav-item" @click="handleSignOut">
            <a href="#">
              <fa icon="fa-solid fa-arrow-right-from-bracket" /> <span class="hide">Log out</span>
            </a>
          </li>
          <li class="nav-item">
            <a href="#"> <fa icon="fa-solid fa-gear" /> <span class="hide">Settings</span> </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import UserStore from '@/stores/user'

export default {
  name: 'HeaderComp',
  data() {
    return {
      showHeader: false
    }
  },
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
    },
    toggleHeader() {
      this.showHeader = !this.showHeader;
    }
  },
  created(){
    if (window.innerWidth > 1023){
      this.showHeader = true;
    }
  }
  
}
</script>

<style scoped>
/** HOVER **/
@media(min-width: 1024px){
  header:hover {
    width: 270px;
  }
  header:hover .hide {
    display: block;
  }
  header:hover .logo.smallLogo {
    display: none;
  }
}

/*************/

header {
  box-sizing: border-box;
  padding: 20px;

  background-color: white;

  height: 100vh;
  width: 220px;
  position: fixed;
  top: 0;
  left: 0;

  transition: all 0.3s ease;
  z-index: 99999;

  font-family: 'Lexend Deca', sans-serif;
}
@media (min-width: 768px) {
  header {
    padding: 25px;
  }
}
@media(min-width: 1024px){
  header {
    width: 90px;
  }
}

header #nav-user {
  margin-bottom: 30px;
  height: 55px;
  text-align: center;
  color: var(--primary-text);
}

header #nav-user span {
  font-size: 16px;
}

header ul {
  list-style-type: none;
}

header li {
  box-sizing: border-box;
  height: 40px;
  padding: 15px 10px;
  margin-top: 10px;

  display: flex;
  align-items: center;

  border-radius: 8px;
}

header .nav-item a {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}
header .nav-item.active {
  background-color: var(--secondary-color);
}

header #nav-settings {
  position: absolute;
  bottom: 70px;
}
@media(min-width: 768px){
  header #nav-settings {
    bottom: 90px;
  }
}
@media(min-width: 1200px){
  header #nav-settings {
    bottom: 20px;
  }
}

/* Responsive */
#nav-mobile {
  box-sizing: border-box;
  position: absolute;
  z-index: 80;
  padding: 30px;
  height: 25px;
  color: var(--green-accent);
}
@media (min-width: 1024px) {
  #nav-mobile,
  .mobile {
    display: none;
  }
}

.nav-item a span{
  color: var(--primary-text);
  font-size: 16px;
}
@media(min-width: 768px){
  .nav-item a span{
    font-size: 18px;
  }
}

.nav-item.active a, .nav-item.active a span{
  color: var(--green-accent);
}
</style>