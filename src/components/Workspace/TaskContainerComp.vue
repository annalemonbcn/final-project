<template>
  <div class="task-container">
    <p>{{ title }}</p>
    <TaskComp
      v-for="(task, index) in tasksFiltered"
      :key="index"
      :title="task.title"
      :status="task.status"
      :initials="task.user"
      :date="task.date"
      :url="task.url"
      @remove-task="onRemoveTask"
    />
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import TasksStore from '../../stores/tasks'

import TaskComp from './TaskComp.vue'

export default {
  name: 'TaskStatus',
  data(){
    return {
      tasksFiltered: []
    }
  },
  methods: {
    ...mapActions(TasksStore, ['_getPendingTasks', '_getDoneTasks']),

    onRemoveTask(taskTitle){
      this.tasksFiltered = this.tasksFiltered.filter(task => task.title !== taskTitle);
    }
  },
  created(){
    if(this.status === 'Pending'){
      this.tasksFiltered = this._getPendingTasks();
    } else if (this.status === 'Done'){
      this.tasksFiltered = this._getDoneTasks();
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  components: {
    TaskComp
  }
}
</script>

<style scoped>
.task-container {
  margin-top: 30px;
}
</style>
