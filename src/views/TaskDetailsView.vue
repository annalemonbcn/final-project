<template>
  <div class="info-right" id="task-details">
    <div class="task-row">
      <form id="task-details" action="" @submit.prevent>
        <input class="task-view-name" type="text" name="title" v-model="taskDetail.title" @input="formHasChanged = true"/>
        <textarea name="description" class="task-view-description" v-model="taskDetail.description"
        @input="formHasChanged = true"></textarea>
        <div>
          <input name="date" type="date" v-model="taskDetail.limit_date" @input="formHasChanged = true" />
          <div class="task-status">
            <p :class="taskDetail.is_complete === true ? 'done' : 'pending'">{{ taskDetail.is_complete === true ? 'Done' : 'Pending' }}</p>
          </div>
        </div>
        <div class="task-flag">
          <fa icon="fa-regular fa-flag" @click="_alternateFlag(taskDetail.id, taskDetail.is_flagged)" v-if="taskDetail.is_flagged" class="is_flagged" />
          <fa icon="fa-regular fa-flag" @click="_alternateFlag(taskDetail.id, taskDetail.is_flagged)" v-else class="is_not_flagged" />
        </div>
        <button :disabled="!formHasChanged" @click="_updateTask(task)">Update task</button>
        <button @click="_alternateDone(taskDetail.id, taskDetail.is_complete)">Mark as done/undone</button>
        <button @click="_deleteTask(taskDetail.id)">Delete</button>
      </form>
    </div>
  </div>
</template>

<script>
import TasksStore from '@/stores/tasks'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'TaskDetails',
  data() {
    return {
      formHasChanged: false,
      taskUrl: ''
    }
  },
  computed: {
    ...mapState(TasksStore, ['tasks', 'getTaskById']),

    taskDetail(){
      return this.getTaskById(this.taskUrl);
    }
  },
  methods: {
    ...mapActions(TasksStore, ['_alternateDone', '_alternateFlag','_updateTask','_deleteTask']),
  },
  created() {
    this.taskUrl = this.$route.params.taskUrl;
    // this._setInfo(this._getSingleTask(this.$route.params.taskUrl));

    this.$watch(
      () => this.$route.params,
      (newParams) => {
        if (this.$route.params.taskUrl) {
          this.taskUrl = this.$route.params.taskUrl;
        }
      }
    )
  },
}
</script>

<style scoped>
#task-details {
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
}
#task-details > * {
  display: flex;
  flex-flow: row nowrap;
  gap: 30px;
  align-items: center;
}
#task-details .task-row {
  justify-content: space-between;
}
.task-flag{
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  padding: 5px;

  border-radius: 25px;
  border: 1px dotted black;

  cursor: pointer;
}
.task-flag svg{
  position: relative;
  left: 7px;
  
  transition: all .1s ease-in-out;
}
.task-flag svg.is_flagged{
  color: black;
}
.task-flag svg.is_not_flagged{
  color: transparent;
}
.task-flag svg.is_flagged:hover {
  color: transparent;
}
.task-flag svg.is_not_flagged:hover {
  color: black;
}

.task-status .pending {
  background-color: orange;
}
.task-status .done {
  background-color: lightgreen;
}

</style>