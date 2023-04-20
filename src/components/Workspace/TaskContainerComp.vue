<template>
  <div class="task-container">
    <TaskComp />
    <TaskComp />
    <TaskComp />
  </div>
</template>

<script>
import TaskComp from './TaskComp.vue';

export default {
  name: 'TaskStatus',
  data() {
    return {
      tasks: [
        {
          title: 'Task num 1',
          status: 'Pending',
          user: 'AE',
          date: '20/04/2023'
        },
        {
          title: 'Task num 2',
          status: 'Pending',
          user: 'AE',
          date: '20/04/2023'
        },
        {
          title: 'Task num 3',
          status: 'Pending',
          user: 'AE',
          date: '20/04/2023'
        },
        {
          title: 'Task num 4',
          status: 'Pending',
          user: 'AE',
          date: '20/04/2023'
        },
        {
          title: 'Task num 5',
          status: 'Pending',
          user: 'AE',
          date: '20/04/2023'
        },
      ]
    }
  },
  components: {
    TaskComp,
  }
}
</script>

<style scoped>
</style>