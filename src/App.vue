<template>
  <NavComp />
  <router-view></router-view>
</template>

<script>
import NavComp from './components/Navigation/NavComp.vue';

export default {
  name: 'App',
  components: {
    NavComp,
  }
}
</script>

<style scoped>

</style>