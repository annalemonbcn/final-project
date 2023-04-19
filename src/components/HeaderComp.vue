<template>
  <header>
    <nav>
      <div>
        <router-link to="/">
          <img src="../img/a_faire.png" alt="logo">
          Home
        </router-link>
        <router-link to="/my-account">
          <img src="" alt="login icon">
          My account</router-link>
      </div>
      <div>
        <router-link to="/logout">
          <img src="" alt="logout icon">
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
  header nav {
    display: flex;
    flex-flow: row nowrap;
    width: 100vw;
    justify-content: space-between;
  }
</style>