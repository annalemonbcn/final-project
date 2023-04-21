<template>
  <div id="task-details">
    <div class="task-row">
      <h2>{{ task.title }}</h2>
      <p id="task-status">{{ task.status }}</p>
    </div>
    <div>
      <p id="task-user">{{ task.user }}</p>
      <p id="task-date">{{ task.date }}</p>
    </div>
    <div>
      Description: description
    </div>
    <div>
      <p id="task-flag">{{ task.flag }}</p>
      <p id="task-favourites">{{ task.favourites }}</p>
    </div>
  </div>
</template>

<script>
import TasksStore from '../stores/tasks';
import { mapActions } from 'pinia';

export default {
  name: 'TaskDetails',
  data() {
    return {
      task: {
        title: '',
        status: '',
        user: '',
        date: '',
        description: '',
        flag: null,
        favourites: null
      }
    }
  },
  methods: {
    ...mapActions(TasksStore, ['_getSingleTask']),

    _setInfo(info){
      this.task.title = info.title;
      this.task.status = info.status;
      this.task.user = info.user;
      this.task.date = info.date;
      this.task.flag = info.flag;
      this.task.favourites = info.favourites;
    }    
  },
  created(){
    this._setInfo(this._getSingleTask(this.$route.params.taskTitle)[0]);
  }
}
</script>

<style scoped>
  #task-details{
    display: flex;
    flex-flow: column nowrap;
    /* justify-content: space-between; */
    gap: 30px;
    
    background-color: #ebeded;

    box-sizing: border-box;
    padding: 30px 50px;
    min-width: 50%;
    border-radius: 25px;
  }
  #task-details > *{
    display: flex;
    flex-flow: row nowrap;
    gap: 30px;
    align-items: center;
  }
  #task-details .task-row{
    justify-content: space-between;
  }
</style>