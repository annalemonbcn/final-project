<template>
  <div class="singleTask">
    <router-link to="/list/task" class="title">Single Task Title</router-link>
  </div>
</template>

<script>
export default {
  name: 'SingleTask',
  data() {
    return {
      
    }
  }
}
</script>

<style scoped>
  .singleTask .title{
    margin-left: 30px;
  }
</style>
