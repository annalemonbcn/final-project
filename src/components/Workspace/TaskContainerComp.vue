<template>

  <div v-if="this.pendingTasks.length === 0 && this.completedTasks.length === 0" class="warn empty">
    <router-link to="/task/add-task">
      You haven't added any tasks yet! Click to add a new task and get started :)
    </router-link></div>

  <div v-else-if="loading">Loading tasks...</div>
  <div v-else-if="!loading" class="task-container-grouper">
    <div class="task-container" v-if="pendingTasks">
      <p class="task-container-title"><fa icon="fa-regular fa-clipboard" /> To-Do</p>
      <TaskComp 
        v-for="(task, index) in pendingTasks"
        :key="index"
        :title="task.title"
        :url="task.url"
        :status="task.is_complete"
      />
    </div>
    <div class="task-container" v-if="completedTasks">
      <p class="task-container-title"><fa icon="fa-solid fa-clipboard-check" /> Done</p>
      <TaskComp 
        v-for="(task, index) in completedTasks"
        :key="index"
        :title="task.title"
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
    ...mapState(TasksStore, ['completedTasks', 'pendingTasks']),
  },
  methods: {
    ...mapActions(TasksStore, ['_fetchTasks']),
  },
  async mounted(){
    try{
      await this._fetchTasks();
    } catch(error){
      this.warnText = error.message;
      document.querySelector('.warn').classList.add('textError', 'fetchError');
    } finally {
      this.loading = false;
    }
  }
  
}
</script>

<style scoped>
.warn{
  display: block;
}
.warn.textError.fetchError{
  font-size: 18px !important;
}
.warn.empty{
  cursor: pointer;
  font-size: 18px !important;
}
.warn.empty a{
  color: var(--green-accent) !important;
}

.task-container-grouper{
  display: flex;
  flex-direction: column;
  gap: 40px;
}
@media(min-width: 1024px){
  .task-container-grouper{
    min-width: 30%;
  }
}
.task-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
@media(min-width: 1024px){
  .task-container{
    gap: 15px
  }
}

.task-container-title{
  font-size: 20px;
  font-weight: 700;
}
@media(min-width: 768px){
  .task-container-title{
    font-size: 22px;
  }
}
</style>