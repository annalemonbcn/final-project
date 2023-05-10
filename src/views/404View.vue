<template>
  <div id="not-found">
    <div>
      <h1>404</h1>
      <h2>Page not found</h2>
    </div>
    <p>
      <router-link to="/">
        <fa icon="fa-solid fa-arrow-left" /> Go to homepage
      </router-link>
    </p>
  </div>
</template>

<script>

export default{
  name: '404View'
}
</script>

<style scoped>
#not-found{
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 70px;

  background-image: url('@/img/bg_recovery.jpg');
}

#not-found > div{
  text-align: center;
}
#not-found > div h1{
  margin-bottom: 20px;
}
#not-found a{
  color: var(--green-accent);
  font-size: 20px;
}
</style>