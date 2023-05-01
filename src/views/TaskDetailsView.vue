<template>
  <div class="info-right" id="task-details">
    <div class="task-row">
      <input type="text" name="title" v-model="title" readonly>
      <div class="task-status">
        <p class="pending" v-if="status === false">Pending</p>
        <p class="done" v-else>Done</p>
      </div>
    </div> 
    <div>
      <p id="task-date">{{ limit_date }}</p>
    </div>
    <div>
      <textarea name="description" v-model="description" readonly></textarea>
    </div>
    <div>
      <fa class="task-favourite" icon="fa-solid fa-star" v-if="favourite === true"/>
      <fa class="task-flagged" icon="fa-regular fa-flag" v-if="flag === true"/>
    </div>
    <button @click="_editTask">Edit task</button>
    <button @click="_markTaskDone(task_id)">Mark as done</button>
  </div>
    <!-- <div class="task-row"> HERE
        <form id="task-details" action="" @submit.prevent>
          <input id="task-name" type="text" name="title" v-model="title">
        </form>
    </div> 
  </div> -->
</template>

<script>
import TasksStore from '@/stores/tasks';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'TaskDetails',
  data() {
    return {
      title: '',
      status: null,
      limit_date: '',
      description: '',
      flag: null,
      favourite: null,
      task_id: null
    }
  },
  computed: {
    ...mapState(TasksStore, ['tasks']),
  },
  methods: {
    ...mapActions(TasksStore, ['_getSingleTask','_markTaskDone']),

    _setInfo(info){
      this.title = info.title;
      this.status = info.is_complete;
      this.limit_date = info.limit_date;
      this.description = info.description;
      this.flag = info.is_flagged;
      this.favourite = info.is_favourite;
      this.task_id = info.id;
    },
  },
  created(){
    this._setInfo(this._getSingleTask(this.$route.params.taskUrl));

    this.$watch(
      () => this.$route.params,
      (newParams) => {
        if(this.$route.params.taskUrl){
          this._setInfo(this._getSingleTask(newParams.taskUrl));
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

  .task-status .pending{
    background-color: orange;
  }
  .task-status .done{
    background-color: lightgreen;
  }
</style>