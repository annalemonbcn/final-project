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
    <button @click="_markTaskDone">Mark as done</button>
  </div>
</template>

<script>
import TasksStore from '../stores/tasks';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'TaskDetails',
  data() {
    return {
      title: '',
      status: '',
      user: '',
      date: '',
      description: '',
      flag: null,
      favourites: null
    }
  },
  computed: {
    ...mapState(TasksStore, ['tasks', 'pendingTasks', 'doneTasks']),
  },
  methods: {
    ...mapActions(TasksStore, ['_getSingleTask', '_getDoneTasks']),

    _setInfo(info){
      this.title = info.title;
      this.status = info.status;
      this.user = info.user;
      this.date = info.date;
      this.flag = info.flag;
      this.favourites = info.favourites;
    },
    _markTaskDone(){ // --> Crear en store?
      if(this.status === 'Pending'){
        // Update local status
        this.status = 'Done'
        // Update tasks from store
        this.tasks[0].status = 'Done';
        // this._getDoneTasks();
        // console.log(this.tasks[0]);
      }
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