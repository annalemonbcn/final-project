<template>
  <div class="info-right" id="task-details">
    <router-link to="/" class="modal-back">
      <fa icon="fa-solid fa-arrow-left" class="arrow-back" />
    </router-link>
    <div class="task-row" v-if="taskDetail">
      <form action="" @submit.prevent>
        <input
          class="task-view-title"
          type="text"
          name="title"
          v-model="newTaskDetail.title"
          @input="formHasChanged = true"
        />

        <div class="specs-container" :class="colorClass">
          <div
            class="task-status specs"
            @click="_handleAlternateDone"
          >
            <p>Status</p>
            <p>
              {{ taskDetail.is_complete === true ? 'Done' : 'Pending' }}
            </p>
          </div>
          <p class="tooltip tt-status">Click to change the status</p>
          <div class="specs spec-date">
            <p>Limit date</p>
            <VueDatePicker id="limitDate" v-model="newTaskDetail.limit_date" :enable-time-picker="false" />
          </div>
          <div
            class="task-flag specs"
            @click="_handeAlternateFlag"
          >
            <p>Priority</p>
            <p>{{ taskDetail.is_flagged ? 'Urgent' : 'Non-priority' }}</p>
          </div>
          <p class="tooltip tt-priority">Click to change the priority</p>
        </div>
        <div class="task-description">
          <p>Description:</p>
          <textarea
            name="description"
            class="task-view-description"
            v-model="newTaskDetail.description"
            @input="formHasChanged = true"
          ></textarea>
        </div>

        <div class="form-actions">
          <button v-if="formHasChanged" class="btn btn-update" @click="_handleUpdateTask">
            Update task
          </button>
          <button class="btn" @click="_alternateFlag(taskDetail.id, taskDetail.is_flagged)">
            <fa icon="fa-solid fa-triangle-exclamation" />
            Mark as {{ taskDetail.is_flagged ? 'non-priority' : 'urgent' }}
          </button>
          <button
            class="btn"
            :class="taskDetail.is_complete ? 'undone' : 'btn-primary'"
            @click="_alternateDone(taskDetail.id, taskDetail.is_complete)"
          >
            <fa icon="fa-regular fa-circle-check" />
            Mark as {{ taskDetail.is_complete ? 'undone' : 'done' }}
          </button>
          <button class="btn" @click="_handleDeleteTask">
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
import { useToast } from "vue-toastification";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'TaskDetails',
  components: {
    VueDatePicker
  },
  data() {
    return {
      formHasChanged: false,
      taskUrl: '',
      newTaskDetail: {
        title: '',
        limit_date: null,
        description: ''
      },
    }
  },
  computed: {
    ...mapState(TasksStore, ['tasks', 'getTaskById']),

    taskDetail() {
      const result = this.getTaskById(this.taskUrl);
      if(result){
        this.newTaskDetail.title = result.title;
        this.newTaskDetail.limit_date = result.limit_date;
        this.newTaskDetail.description = result.description;
      }
      return result;
    },
    colorClass() {
      if(!this.taskDetail){
        return ''
      }
      if (this.taskDetail.is_complete) {
        return 'bg_green'
      } else if (!this.taskDetail.is_complete && !this.taskDetail.is_flagged) {
        return 'bg_grey'
      } else if (!this.taskDetail.is_complete && this.taskDetail.is_flagged) {
        return 'bg_red'
      }
    }
  },
  methods: {
    ...mapActions(TasksStore, ['_alternateDone', '_alternateFlag', '_updateTask', '_deleteTask']),

    async _handleDeleteTask() {
      if(confirm('Are you sure to delete this task?')){
        // Continue delete task
        try {
          await this._deleteTask(this.taskDetail.id)
          this.toast.success("Task deleted!");
          this.$router.push({ name: 'home' })
        } catch (error) {
          this.toast.error(error.message)
        }
      }
    },
    async _handleUpdateTask(){
      try {
        await this._updateTask(this.taskDetail.id, this.newTaskDetail)
        this.toast.success("Task updated!");
        this.formHasChanged = false;
      } catch (error) {
        this.toast.error(error.message)
      }
    },
    async _handeAlternateFlag(){
      try {
        await this._alternateFlag(this.taskDetail.id, this.taskDetail.is_flagged)
        this.toast.success("Task updated!");
      } catch (error) {
        this.toast.error(error.message)
      }
    },
    async _handleAlternateDone(){
      try {
        await this._alternateDone(this.taskDetail.id, this.taskDetail.is_complete)
        this.toast.success("Task updated!");
      } catch (error) {
        this.toast.error(error.message)
      }
    }
  },
  created() {
    this.toast = useToast();

    this.taskUrl = this.$route.params.taskUrl
    console.log(this.taskUrl);

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
/* @media (min-width: 1024px) {
  #task-details form .form-actions {
     justify-content: center; 
  }
} */

#task-details form .specs-container {
  position: relative;
}

#task-details form .task-status,
#task-details form .task-flag {
  position: relative;
  cursor: pointer;
}

.tooltip.tt-priority {
  right: 10px;
  bottom: -35px;
}
.task-flag:hover + .tooltip.tt-priority {
  opacity: 1;
}
.tooltip.tt-priority:after {
  top: -5px;
  right: 20px;
}

.tooltip.tt-status {
  top: -35px;
  right: 10px;
}
.task-status:hover + .tooltip.tt-status {
  opacity: 1;
}
.tooltip.tt-status:after {
  bottom: -5px;
  right: 20px;
}

.messageError {
  height: 20px;
  max-height: 40px;
}
</style>