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
          <a href="#">
            <fa icon="fa-regular fa-bell" />
          </a>
          <a href="#">
            <fa icon="fa-regular fa-star" />
          </a>
        </div>
        <div>
          <!-- <router-link to="/logout">
            <fa icon="arrow-right-from-bracket" />
          </router-link> -->
        </div>
      </div>
      <div class="nav-border-top">
        <router-link to="/my-account">
          <UserLogo />
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
import UserLogo from '../Account/UserLogoComp.vue';

export default {
  name: 'HeaderComp',
  data() {
    return {};
  },
  components: {
    UserLogo,
  },
}
</script>

<style scoped>
header {
  box-sizing: border-box;

  background-color: #ebeded;
  height: 100vh;
  max-width: 100px;

  padding: 30px 10px;
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
