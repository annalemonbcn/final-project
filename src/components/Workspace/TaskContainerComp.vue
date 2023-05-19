<template>
  <div v-if="loading">Loading tasks...</div>
  <div v-else-if="!pendingTasks.length && !completedTasks.length"
    class="warn empty"
  >
    <router-link to="/task/add-task">
      You haven't added any tasks yet! Click to add a new task and get started :)
    </router-link>
  </div>
  <div v-else-if="!loading" class="task-container-grouper">
    <div class="task-container" v-if="pendingTasks">
      <div class="task-container-title" @click="hideShowElements">
        <div>
          <fa icon="fa-solid fa-angle-down" data-status="pending" v-if="showPending"></fa>
          <fa icon="fa-solid fa-angle-right" data-status="pending" v-else></fa>
        </div>
        <p data-status="pending">To-Do</p>
      </div>
      <div class="taskGrouper pending" v-show="showPending">
        <TaskComp
          v-for="(task, index) in pendingTasks"
          :key="index"
          :title="task.title"
          :id="task.id"
          :status="task.is_complete"
          :is_flagged="task.is_flagged"
        />
      </div>
    </div>
    <div class="task-container" v-if="completedTasks">
      <div class="task-container-title" @click="hideShowElements">
        <div>
          <fa icon="fa-solid fa-angle-down" data-status="done" v-if="showDone"></fa>
          <fa icon="fa-solid fa-angle-right" data-status="done" v-else></fa>
        </div>
        <p data-status="done">Done</p>
      </div>
      <div class="taskGrouper done" v-show="showDone">
        <TaskComp
          v-for="(task, index) in completedTasks"
          :key="index"
          :title="task.title"
          :id="task.id"
          :status="task.is_complete"
          :is_flagged="task.is_flagged"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import TasksStore from '@/stores/tasks'
import TaskComp from './TaskComp.vue'

export default {
  name: 'TaskContainerComp',
  components: {
    TaskComp
  },
  data() {
    return {
      loading: true,
      showPending: true,
      showDone: true
    }
  },
  computed: {
    ...mapState(TasksStore, ['completedTasks', 'pendingTasks']) // --> getters!
  },
  methods: {
    ...mapActions(TasksStore, ['_fetchTasks']),

    hideShowElements(event) {
      const elementClicked = event.target;
      const elementToShowHide = document.querySelector(`.taskGrouper.${elementClicked.dataset.status}`);

      // Add/remove class "hidden"
      if(elementToShowHide.classList.contains('hidden')){
        elementToShowHide.classList.remove('hidden')
      } else {
        elementToShowHide.classList.add('hidden')
      }

      // Alter reactive var to show/hide
      if(elementClicked.dataset.status === 'pending'){
        setTimeout( () => {
          this.showPending = !this.showPending;
        }, 200)
      }
      if(elementClicked.dataset.status === 'done'){
        setTimeout( () => {
          this.showDone = !this.showDone;
        }, 200)
      }

    }
  },
  async mounted() {
    try {
      await this._fetchTasks()
    } catch (error) {
      this.warnText = error.message
      document.querySelector('.warn').classList.add('textError', 'fetchError')
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.warn {
  display: block;
}
.warn.textError.fetchError {
  font-size: 18px !important;
}
.warn.empty {
  cursor: pointer;
  font-size: 18px !important;
}
.warn.empty a {
  color: var(--green-accent) !important;
}

.task-container-grouper {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
@media (min-width: 1024px) {
  .task-container-grouper {
    min-width: 30%;
  }
}
.task-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task-container-title {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
}
.task-container-title p{
  font-size: 20px;
  font-weight: 700;
}
@media (min-width: 768px) {
  .task-container-title p{
    font-size: 22px;
  }
}

.taskGrouper {
  display: flex;
  flex-direction: column;
  gap: 15px;

  visibility: visible;
  opacity: 1;
  transition: visibility 0.2s, opacity 0.2s;
}

.taskGrouper.hidden {
  /* Estilos al ocultar */
  visibility: hidden;
  opacity: 0;
}
</style>