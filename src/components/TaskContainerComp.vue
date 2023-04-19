<template>
  <div id="tasksColumn">
    <SingleTaskList />
    <SingleTaskList />
    <SingleTaskList />
  </div>
</template>

<script>
import SingleTaskList from './SingleTaskListComp.vue';

export default{
  name: 'TaskContainer',
  components: {
    SingleTaskList,
  }
}
</script>

<style scoped>
#tasksColumn{
  width: 35%;
}
</style>