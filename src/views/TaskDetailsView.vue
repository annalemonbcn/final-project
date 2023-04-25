<template>
  <div class="info-right" id="task-details">
    <div class="task-row">
      <h2>{{ title }}</h2>
      <p id="task-status">{{ status }}</p>
    </div>
    <div>
      <p id="task-user">{{ user }}</p>
      <p id="task-date">{{ date }}</p>
    </div>
    <div>
      Description: description
    </div>
    <div>
      <p id="task-flag">{{ flag }}</p>
      <p id="task-favourites">{{ favourites }}</p>
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
      // task: {
        title: 'Title',
        status: '',
        user: '',
        date: '',
        description: '',
        flag: null,
        favourites: null
      // }
    }
  },
  methods: {
    ...mapActions(TasksStore, ['_getSingleTask']),

    _setInfo(info){
      this.title = info.title;
      this.status = info.status;
      this.user = info.user;
      this.date = info.date;
      this.flag = info.flag;
      this.favourites = info.favourites;
    }    
  },
  created(){
    this._setInfo(this._getSingleTask(this.$route.params.taskTitle));

    this.$watch(
      () => this.$route.params,
      (newParams) => {
        if(this.$route.params.taskTitle){
          this._setInfo(this._getSingleTask(newParams.taskTitle));
        }
      }
    )
  }
}
</script>

<style scoped>
  #task-details{
    display: flex;
    flex-flow: column nowrap;
    /* justify-content: space-between; */
    gap: 30px;
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