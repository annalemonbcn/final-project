<template>
  <div class="info-right">
    <div id="task-add">
      <!-- <h2>Add task</h2> -->
      <div>
        <input id="task-add-name" type="text" name="title" placeholder="Task name" v-model="task.title">
      </div>
      <textarea name="description" id="" placeholder="Write something" v-model="task.description"></textarea>
      <div>
        <input name="date" type="date" v-model="task.date">
        <select id="task-add-status" name="status" v-model="task.status">
          <option disabled value="Status">Status</option>
          <option value="Pending">Pending</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <div>
        <select name="flag" v-model="task.flag">
          <option disabled value="flag">Impediment</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select id="task-add-favourite" name="favourite" v-model="task.favourite">
          <option disabled value="favourite">Favourite</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <button @click="_createNewTask">Add task</button>
    </div>
  </div>
</template>

<script>
import TasksStore from '../stores/tasks';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'AddTaskView',
  components: {

  },
  data(){
    return {
      task: {
        title: '',
        status: '',
        description: '',
        user: '',
        date: '',
        flag: false,
        favourite: false,
      }
    }
  },
  methods: {
    ...mapActions(TasksStore, ['_addTask', '_getPendingTasks']),

    _createNewTask() {
      // Add task
      this._addTask(this.task);
      // Reset fields
      this._reset();
      console.log(this.tasks);
    },
    _reset(){
      this.task = {
        title: '',
        status: '',
        description: '',
        user: '',
        date: '',
        flag: false,
        favourite: false,
      }
    }
  },
  computed: {
    ...mapState(TasksStore, ['tasks']),
  }
}
</script>

<style scoped>
  #task-add{
    display: flex;
    flex-flow: column nowrap;
    gap: 30px;
  }
  input, textarea{
    background-color: transparent;
    border: 0;
    border-bottom: 2px solid var(--tertiary-color);

    font-size: 16px;
    font-family: Roboto;
  }
  input#task-add-name{
    font-size: 30px;
    width: 100%;
  }
  textarea {
    resize: none;
    height: 60px;
  }
  select#task-add-status, select#task-add-favourite{
    margin-left: 30px;
  }
</style>