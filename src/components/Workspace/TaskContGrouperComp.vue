<template>
  <div id="tasks-container-grouper">
    <TaskContainer v-for="status in statusLists" :key="status"
    title="Pending" />
    <TaskContainer title="Done" />
  </div>
</template>

<script>
import TaskContainer from './TaskContainerComp.vue';

export default {
  name: 'TasksGrouper',
  data() {
    return {
      statusLists: ['pending, done']
    }
  },
  components: {
    TaskContainer,
  }
}
</script>

<style>
  #tasks-container-grouper{
    width: 40%;
  }

  #tasks-container-grouper .user-initials{
    padding: 5px;
    font-size: 12px;
  }
</style>