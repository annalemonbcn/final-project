<template>
  <div class="info-right">
    <form id="task-add" action="" @submit.prevent>
      <div>
        <input
          id="task-add-name"
          type="text"
          name="title"
          placeholder="Task name"
          v-model="task.title"
        />
      </div>
      <textarea
        name="description"
        id=""
        placeholder="Write something"
        v-model="task.description"
      ></textarea>
      <div>
        <input name="date" type="date" v-model="task.limit_date" />
        <select id="task-add-status" name="status" v-model="task.is_complete">
          <option disabled value="Status">Is complete</option>
          <option value="false">False</option>
          <option value="true">True</option>
        </select>
      </div>
      <div>
        <select name="flag" v-model="task.is_flagged">
          <option disabled value="flag">Impediment</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select id="task-add-favourite" name="favourite" v-model="task.if_favourite">
          <option disabled value="favourite">Favourite</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <button @click="_createNewTask">Add task</button>
    </form>
  </div>
</template>

<script>
import TasksStore from '@/stores/tasks'
import UserStore from '@/stores/user.js'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'AddTaskView',
  data() {
    return {
      task: {
        title: 'Testttt',
        // user_id: '15d3bf96-2fbb-403b-bb0f-900cfc725c1a',
        // user_id: '15d3bf96-2fbb-403b-bb0f-900cfc725c1a',
        is_complete: false,
        url: '',
        limit_date: null,
        description: 'agagadghn',
        is_flagged: false,
        if_favourite: false
      }
    }
  },
  methods: {
    ...mapActions(TasksStore, ['_addNewTask']),
    
    _createNewTask() {
      // Set url && user_id
      this._setUrl();
      this._setUser();

      // Add task
      this._addNewTask(this.task);

      // Reset fields
      this._resetFields();
    },
    _setUrl() {
      this.task.url = this.task.title.toLowerCase();

      if (this.task.url.includes(' ')) {
        this.task.url = this.task.url.split(' ').join('_');
      }
    },
    _setUser(){
      this.task.user_id = this.user.id;
    },
    _resetFields() {
      this.task = {
        title: '',
        user_id: '15d3bf96-2fbb-403b-bb0f-900cfc725c1a',
        is_complete: null,
        url: '',
        limit_date: '',
        description: '',
        is_flagged: false,
        if_favourite: false
      }
    }
  },
  computed: {
    ...mapState(TasksStore, ['tasks']),
    ...mapState(UserStore, ['user'])
  },
  created(){
    console.log(this.user.id)
  }
}
</script>

<style scoped>
#task-add {
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
}
input,
textarea {
  background-color: transparent;
  border: 0;
  border-bottom: 2px solid var(--tertiary-color);

  font-size: 16px;
  font-family: Roboto;
}
input#task-add-name {
  font-size: 30px;
  width: 100%;
}
textarea {
  resize: none;
  height: 60px;
}
select#task-add-status,
select#task-add-favourite {
  margin-left: 30px;
}
</style>
