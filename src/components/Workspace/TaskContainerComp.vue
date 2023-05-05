<template>
  <div v-if="loading">Loading tasks...</div>
  <div class="task-container-grouper">
    <div class="task-container" v-if="!loading && pendingTasks">
      <p>Pending tasks</p>
      <TaskComp 
        v-for="(task, index) in pendingTasks"
        :key="index"
        :title="task.title"
        :limitDate="task.limit_date"
        :url="task.url"
        :status="task.is_complete"
      />
    </div>
    <div class="task-container" v-if="!loading && completedTasks">
      <p>Done tasks</p>
      <TaskComp 
        v-for="(task, index) in completedTasks"
        :key="index"
        :title="task.title"
        :limitDate="task.limit_date"
        :url="task.url"
        :status="task.is_complete"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import TasksStore from '@/stores/tasks'

import TaskComp from './TaskComp.vue'

export default {
  name: 'TaskContainerComp',
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
    ...mapState(TasksStore, ['tasks','completedTasks', 'pendingTasks']),
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
.task-container-grouper{
  display: flex;
  flex-direction: column;
  gap: 40px;
  min-width: 45%;
}

</style>