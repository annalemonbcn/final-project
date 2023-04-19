<template>
  <header class="row">
    <nav>
      <div class="mainLinks">
        <router-link to="/">
          <img src="../img/a_faire.png" alt="logo" class="logo" />
        </router-link>
        <router-link to="/my-account">
          <fa icon="user" />
          My account</router-link>
      </div>
      <div>
        <router-link to="/logout">
          <fa icon="arrow-right-from-bracket" />
          Logout
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'HeaderComp',
}
</script>

<style scoped>
  img.logo{
    max-width: 100px;
  }
  header nav {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  header nav .mainLinks{
    display: flex;
    align-items: center;
  }
  header nav .mainLinks a{
    margin: 0 10px;
  }
</style>