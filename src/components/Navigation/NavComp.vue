<template>
  <header>
    <nav>
      <div>
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
          <router-link to="/logout">
            <fa icon="arrow-right-from-bracket" />
          </router-link>
        </div>
      </div>
      <div>
        <UserLogo />
        <!-- <router-link to="/my-account">
           <UserLogo /> 
          <div id="nav-user-id">AE</div> 
        </router-link> -->
      </div>
    </nav>
  </header>
</template>

<script>
import UserLogo from '../Account/UserLogoComp.vue'

export default {
  name: 'HeaderComp',
  components: UserLogo
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
  max-width: 80px;
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

header #nav-user-id {
  border: 1px solid #6b707d;
  border-radius: 50px;
  padding: 12px;
}
</style>
