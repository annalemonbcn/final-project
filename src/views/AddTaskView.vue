<template>
  <div class="info-right" id="task-add">
    <router-link to="/" class="modal-back">
      <fa icon="fa-solid fa-arrow-left" class="arrow-back" />
    </router-link>
    <div class="task-row">
      <form action="" @submit.prevent>
        <input
          class="task-view-title"
          type="text"
          name="title"
          placeholder="Task name"
          v-model="task.title"
        />
        <div class="specs-container">
          <div class="task-status specs">
            <p>Status</p>
            <select id="task-add-status" name="status" v-model="task.is_complete">
              <option value="false">Pending</option>
              <option value="true">Done</option>
            </select>
          </div>
          <div class="specs spec-date">
            <p>Limit date</p>
            <input name="date" type="date" v-model="task.limit_date" />
          </div>
          <div class="task-flag specs">
            <p>Priority</p>
            <select name="flag" v-model="task.is_flagged">
              <option value="false">Non-priority</option>
              <option value="true">Urgent</option>
            </select>
          </div>
        </div>
        <div>
          <p>Description:</p>
          <textarea
            name="description"
            class="task-view-description"
            placeholder="Write something"
            v-model="task.description"
          ></textarea>
        </div>
        <div class="add-task-button">
          <button class="btn btn-primary" @click="_createNewTask">Add task</button>
        </div>
      </form>
    </div>
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
        title: '',
        is_complete: false,
        url: '',
        limit_date: null,
        description: '',
        is_flagged: false
      }
    }
  },
  methods: {
    ...mapActions(TasksStore, ['_addNewTask']),

    _createNewTask() {
      // Set url && user_id
      this._setUrl()
      this._setUser()

      // Add task
      this._addNewTask(this.task)

      // Reset fields
      this._resetFields()
    },
    _setUrl() {
      this.task.url = this.task.title.toLowerCase()

      if (this.task.url.includes(' ')) {
        this.task.url = this.task.url.split(' ').join('_')
      }
    },
    _setUser() {
      this.task.user_id = this.user.id
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
        is_favourite: false
      }
    }
  },
  computed: {
    ...mapState(TasksStore, ['tasks']),
    ...mapState(UserStore, ['user'])
  }
}
</script>

<style scoped>
#task-add select{
  border: 0;
  background-color: transparent;
  font-size: 20px;
  line-height: 24px;
}
@media(min-width: 1024px){
  #task-add select{
    font-size: 16px;
    line-height: 20px;
  }
}
.add-task-button{
  text-align: center;
}
.add-task-button button{
  width: 100%;
}
@media(min-width: 768px){
  .add-task-button button{
    width: auto;
  }
}
</style>