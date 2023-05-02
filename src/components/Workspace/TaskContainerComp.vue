<template>
  <div v-if="loading">Loading tasks...</div>
  <div class="task-container" v-if="!loading && tasks">
    <p>My tasks</p>
    <TaskComp 
      v-for="(task, index) in tasks"
      :key="index"
      :title="task.title"
      :limitDate="task.limit_date"
      :url="task.url"
      :status="task.is_complete"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import TasksStore from '@/stores/tasks'

import TaskComp from './TaskComp.vue'

export default {
  name: 'TaskStatus',
  components: {
    TaskComp
  },
  data(){
    return{
      loading: true,
      url: ''
    }
  },
  computed: {
    ...mapState(TasksStore, ['tasks']),
  },
  methods: {
    ...mapActions(TasksStore, ['_fetchTasks']),
  },
  async mounted(){
    try{
      await this._fetchTasks();
    } catch(error){
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
  
}
</script>

<style scoped>
.task-container {
  width: 50%;
  margin-top: 30px;
}

</style>