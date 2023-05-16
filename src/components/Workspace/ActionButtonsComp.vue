<template>
  <div id="actionButtons">
    <div>
      <router-link to="/task/add-task">
        <button class="btn btn-primary"><fa icon="fa-solid fa-plus" /> New Task</button>
      </router-link>
    </div>
    <div id="percentage" v-if="totalTasksCount > 0"> 
      {{ percentTasksDone }}% done ({{ completedTasksCount }} of {{ totalTasksCount }} tasks complete)
    </div>
    
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import TasksStore from '../../stores/tasks';

export default {
  name: 'ActionButtons',
  computed: {
    ...mapState(TasksStore, ['tasks', 'completedTasks']), // --> getters!

    totalTasksCount(){
      return this.tasks.length;
    },
    completedTasksCount(){
      return this.completedTasks.length;
    },
    percentTasksDone(){
      return (Math.floor((this.completedTasksCount * 100 / this.totalTasksCount) * 10) / 10).toFixed(2);
    }
  },
  methods: {
    ...mapActions(TasksStore, ['_addTask']),
  }
}
</script>

<style scoped>
  #actionButtons{
    margin-top: 50px;    
  }
  @media(min-width: 768px){
    #actionButtons{
    margin-top: 0;
    display: flex;
    flex-direction: row;
    gap: 30px;
    align-items: center;
  }

  }
  button.btn{
    font-size: 18px;
  }
  #actionButtons #percentage{
    display: none;
  }
  @media(min-width: 768px){
    #actionButtons #percentage{
      display: block;
    }
  }
</style>