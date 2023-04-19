<template>
  <div class="singleTaskList">
    <p>{{ title }}</p>
    <SingleTask />
    <SingleTask />
  </div>
</template>

<script>
import SingleTask from './SingleTaskComp.vue' 

export default {
  name: 'SingleTaskList',
  data() {
    return {
      title: 'Component Title',
    }
  },
  components: {
    SingleTask
  }
}
</script>

<style scoped>
.singleTaskList {
  border: 1px solid black;
  border-radius: 15px;
}
</style>
