<template>
  <div id="actionButtons">
    <router-link to="/task/add-task">
      <button class="btn btn-primary"><fa icon="fa-solid fa-plus" /> New Task</button>
    </router-link>
    
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import TasksStore from '../../stores/tasks';

export default {
  name: 'ActionButtons',
  data() {
    return {

    }
  },
  methods: {
    ...mapActions(TasksStore, ['_addTask']),
  }
}
</script>

<style scoped>
  #actionButtons{
    margin-top: 70px;
  }
  @media(min-width: 1024px){
    #actionButtons{
    margin-top: 0;
  }

  }
  button.btn{
    font-size: 20px;
  }
</style>