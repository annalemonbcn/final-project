<template>
  <div class="info-right" id="task-details">
    <router-link to="/" class="modal-back">
      <fa icon="fa-solid fa-arrow-left" class="arrow-back"/>
    </router-link>
    <div class="task-row">
      <form action="" @submit.prevent>
        <input class="task-view-name" type="text" name="title" v-model="taskDetail.title" @input="formHasChanged = true"/>
        
        <div class="specs-container">
          <div class="task-status specs">
            <p>Status</p>
            <p :class="taskDetail.is_complete ? 'done' : 'pending'">{{ taskDetail.is_complete === true ? 'Done' : 'Pending' }}</p>
          </div>
          <div class="specs" id="spec-date">
            <p>Date</p>
            <input name="date" type="date" v-model="taskDetail.limit_date" @input="formHasChanged = true" />
          </div>
          <div class="task-flag specs" @click="_alternateFlag(taskDetail.id, taskDetail.is_flagged)">
            <p>Priority</p>
            <p><fa icon="fa-solid fa-triangle-exclamation" /> {{ taskDetail.is_flagged ? 'Non-priority' : 'Urgent' }}</p>
            <p class="tooltip">Tap to change the priority</p>
          </div>
        </div>
        <div>
          <p>Description:</p>
          <textarea name="description" class="task-view-description" v-model="taskDetail.description"
          @input="formHasChanged = true"></textarea>
        </div>

        <div class="form-actions">
          <button v-if="formHasChanged" class="btn" @click="_updateTask(task)">Update task</button>
          <button class="btn" @click="_alternateFlag(taskDetail.id, taskDetail.is_flagged)">
            <fa icon="fa-solid fa-triangle-exclamation" />
              Mark as {{ taskDetail.is_flagged ? 'non-priority' : 'urgent' }}</button>
          <button class="btn" @click="_alternateDone(taskDetail.id, taskDetail.is_complete)">
            <fa icon="fa-regular fa-circle-check" />
              Mark as {{ taskDetail.is_complete ? 'undone' : 'done' }}</button>
          <button class="btn" @click="_deleteTask(taskDetail.id)"><fa icon="fa-regular fa-trash-can" /> Delete task</button>
        </div>
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
.info-right#task-details {
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
}
#task-details .task-row {
  /* background-color: var(--secondary-text); */
  padding: 30px;
  border-radius: 15px;
}
.task-row form{
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.task-row form p{
  color: var(--active-text);
}
.task-row form .specs-container{
  padding: 0 15px;
  background-color: var(--secondary-text);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
}

.task-row form .specs{
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 60px;
  border-bottom: 1px solid rgba(10, 53, 69, 0.2);
}
.task-row form .specs:last-child{
  border: 0;
}
.task-row form .form-actions{
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.task-row form .task-flag{
  position: relative;
  cursor: pointer;
}
.task-row form .task-flag .tooltip{
  display: none;
}
.task-row form .task-flag:hover + .tooltip {
  display: block;
}

.tooltip {
  padding: 18px 32px;
  background: #fff;
  position: relative;
  min-width: 150px;
  max-width: 180px;
  border-radius: 5px;
  text-align: center;
  filter: drop-shadow(0 3px 5px #ccc);
  line-height: 1.5;
}
.tooltip:after {
  content: "";
  position: absolute;
  bottom: -9px;
  left: 50%;
  margin-left: -9px;
  width: 18px;
  height: 18px;
  background: white;
  transform: rotate(45deg);
}
</style>