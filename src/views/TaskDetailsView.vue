<template>
  <div class="info-right" id="task-details">
    <div class="task-row">
      <form id="task-details" action="" @submit.prevent>
        <input class="task-view-name" type="text" name="title" v-model="task.title" @input="formHasChanged = true"/>
        <textarea name="description" class="task-view-description" v-model="task.description"
        @input="formHasChanged = true"></textarea>
        <div>
          <input name="date" type="date" v-model="task.limit_date" @input="formHasChanged = true" />
          <div class="task-status">
            <p :class="statusClass">{{ statusClass }}</p>
          </div>
        </div>
        <div class="task-flag">
          <fa icon="fa-regular fa-flag" @click="_alternateFlag(task.id, task.is_flagged)" v-if="task.is_flagged" class="is_flagged" />
          <fa icon="fa-regular fa-flag" @click="_alternateFlag(task.id, task.is_flagged)" v-else class="is_not_flagged" />
        </div>
        <button :disabled="!formHasChanged" @click="_updateTask(task)">Update task</button>
        <button @click="_alternateDone(task.id, task.is_complete)">Mark as done/undone</button>
        <button @click="_deleteTask(task.id)">Delete</button>
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
      task: {
        title: '',
        user_id: '',
        is_complete: null,
        url: '',
        limit_date: '',
        description: '',
        is_flagged: null,
        id: null        
      },
      formHasChanged: false,
    }
  },
  computed: {
    ...mapState(TasksStore, ['tasks']),

    statusClass(){
      if(this.task.is_complete === false){
        return 'pending'
      }
      return 'done'
    },
  },
  methods: {
    ...mapActions(TasksStore, ['_getSingleTask', '_alternateDone', '_alternateFlag','_updateTask','_deleteTask']),

    _setInfo(info) {
      this.task.title = info.title
      this.task.user_id = info.user_id
      this.task.is_complete = info.is_complete
      this.task.url = info.url
      this.task.limit_date = info.limit_date
      this.task.description = info.description
      this.task.is_flagged = info.is_flagged
      this.task.favourite = info.is_favourite
      this.task.id = info.id
    },
  },
  created() {
    this._setInfo(this._getSingleTask(this.$route.params.taskUrl));

    this.$watch(
      () => this.$route.params,
      (newParams) => {
        if (this.$route.params.taskUrl) {
          this._setInfo(this._getSingleTask(newParams.taskUrl))
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