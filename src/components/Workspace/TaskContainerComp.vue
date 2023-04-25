<template>
  <div class="task-container">
    <p>{{ title }}</p>
    <TaskComp
      v-for="(task, index) in tasksFiltered"
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
import TasksStore from '../../stores/tasks'

import TaskComp from './TaskComp.vue'

export default {
  name: 'TaskStatus',
  data(){
    return {
      tasksFiltered: []
    }
  },
  computed: {
    ...mapState(TasksStore, ['pendingTasks', 'doneTasks']),
  },
  methods: {
    ...mapActions(TasksStore, ['_getTasksBy','_getPendingTasks', '_getDoneTasks']),

    onRemoveTask(taskTitle){
      this.tasksFiltered = this.tasksFiltered.filter(task => task.title !== taskTitle);
    }
  },
  created(){
    if(this.status === 'Pending'){
      this._getTasksBy(this.status);
      this.tasksFiltered = this.pendingTasks;
    } else if (this.status === 'Done'){
      this._getTasksBy(this.status);
      this.tasksFiltered = this.doneTasks;
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
