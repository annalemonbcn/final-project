<template>
  <div class="task-container">
    <p>{{ title }}</p>
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
import { mapState, mapActions } from 'pinia'
import TasksStore from '../../stores/tasks'

import TaskComp from './TaskComp.vue'

export default {
  name: 'TaskStatus',
  data(){
    return {
      tasks: []
    }
  },
  methods: {
    ...mapActions(TasksStore, ['_getPendingTasks', '_getDoneTasks'])
  },
  created(){
    if(this.status === 'Pending'){
      this.tasks = this._getPendingTasks();
    } else if (this.status === 'Done'){
      this.tasks = this._getDoneTasks();
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
