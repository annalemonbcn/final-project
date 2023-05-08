<template>
  <div class="info-right" id="task-details">
    <router-link to="/" class="modal-back">
      <fa icon="fa-solid fa-arrow-left" class="arrow-back" />
    </router-link>
    <div class="task-row">
      <form action="" @submit.prevent>
        <input
          class="task-view-title"
          type="text"
          name="title"
          v-model="taskDetail.title"
          @input="formHasChanged = true"
        />

        <div class="specs-container">
          <div class="task-status specs" @click="_alternateDone(taskDetail.id, taskDetail.is_complete)">
            <p>Status</p>
            <p>
              {{ taskDetail.is_complete === true ? 'Done' : 'Pending' }}
            </p>
          </div>
          <p class="tooltip tt-status">Click to change the status</p>
          <div class="specs spec-date">
            <p>Limit date</p>
            <input
              name="date"
              type="date"
              v-model="taskDetail.limit_date"
              @input="formHasChanged = true"
            />
          </div>
          <div
            class="task-flag specs"
            @click="_alternateFlag(taskDetail.id, taskDetail.is_flagged)"
          >
            <p>Priority</p>
            <p>{{ taskDetail.is_flagged ? 'Non-priority' : 'Urgent' }}</p>
          </div>
          <p class="tooltip tt-priority">Click to change the priority</p>
        </div>
        <div>
          <p>Description:</p>
          <textarea
            name="description"
            class="task-view-description"
            v-model="taskDetail.description"
            @input="formHasChanged = true"
          ></textarea>
        </div>

        <div class="form-actions">
          <button v-if="formHasChanged" class="btn" @click="_updateTask(taskDetail)">
            Update task
          </button>
          <button class="btn" @click="_alternateFlag(taskDetail.id, taskDetail.is_flagged)">
            <fa icon="fa-solid fa-triangle-exclamation" />
            Mark as {{ taskDetail.is_flagged ? 'urgent' : 'non-priority' }}
          </button>
          <button
            class="btn"
            :class="taskDetail.is_complete ? 'undone' : 'btn-primary'"
            @click="_alternateDone(taskDetail.id, taskDetail.is_complete)"
          >
            <fa icon="fa-regular fa-circle-check" />
            Mark as {{ taskDetail.is_complete ? 'undone' : 'done' }}
          </button>
          <button class="btn" @click="_deleteTask(taskDetail.id)">
            <fa icon="fa-regular fa-trash-can" /> Delete task
          </button>
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

    taskDetail() {
      return this.getTaskById(this.taskUrl)
    }
  },
  methods: {
    ...mapActions(TasksStore, ['_alternateDone', '_alternateFlag', '_updateTask', '_deleteTask'])
  },
  created() {
    this.taskUrl = this.$route.params.taskUrl

    this.$watch(
      () => this.$route.params,
      (newParams) => {
        if (this.$route.params.taskUrl) {
          this.taskUrl = this.$route.params.taskUrl
        }
      }
    )
  }
}
</script>

<style scoped>
#task-details form .form-actions {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
@media (min-width: 1024px){
  #task-details form .form-actions {
    flex-direction: row;
  }
}

#task-details form .specs-container{
  position: relative;
}

#task-details form .task-status, #task-details form .task-flag {
  position: relative;
  cursor: pointer;
}


.tooltip.tt-priority{
  right: 10px;
  bottom: -35px;
}
.task-flag:hover + .tooltip.tt-priority {
  opacity: 1;
}
.tooltip.tt-priority:after{
  top: -5px;
  right: 20px;
}

.tooltip.tt-status{
  top: -35px;
  right: 10px;
}
.task-status:hover + .tooltip.tt-status {
  opacity: 1;
}
.tooltip.tt-status:after{
  bottom: -5px;
  right: 20px;
}
</style>