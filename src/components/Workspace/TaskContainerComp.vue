<template>
  <div class="task-container">
    <TaskComp
      v-for="(task, index) in tasks"
      :key="index"
      :title="task.title"
      :status="task.status"
      :initials="task.user"
      :date="task.date"
    />
  </div>
</template>

<script>
import TaskComp from './TaskComp.vue'

export default {
  name: 'TaskStatus',
  data() {
    return {
      tasks: [
        {
          title: 'Task num 1',
          status: 'Pending',
          user: 'AA',
          date: '20/04/2023'
        },
        {
          title: 'Task num 2',
          status: 'Done',
          user: 'AB',
          date: '23/04/2023'
        },
        {
          title: 'Task num 3',
          status: 'Pending',
          user: 'AC',
          date: '28/04/2023'
        },
        {
          title: 'Task num 4',
          status: 'Done',
          user: 'AD',
          date: '22/04/2023'
        },
        {
          title: 'Task num 5',
          status: 'Done',
          user: 'AE',
          date: '26/04/2023'
        }
      ]
    }
  },
  components: {
    TaskComp
  }
}
</script>

<style scoped></style>