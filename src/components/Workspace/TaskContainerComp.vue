<template>
  <div class="task-container">
    <p>My tasks</p>
    <TaskComp
      v-for="(task, index) in tasks"
      :key="index"
      :title="task.title"
      :status="task.status"
      :date="task.date"
      :url="task.url"
      @remove-task="onRemoveTask"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import TasksStore from '@/stores/tasks'

import TaskComp from './TaskComp.vue'

export default {
  name: 'TaskStatus',
  components: {
    TaskComp
  },
  computed: {
    ...mapState(TasksStore, ['tasks'])
  },
  methods: {
    onRemoveTask(taskTitle){
      this.tasksFiltered = this.tasksFiltered.filter(task => task.title !== taskTitle);
    }
  },
}
</script>

<style scoped>
.task-container {
  width: 50%;
  margin-top: 30px;
}
</style>