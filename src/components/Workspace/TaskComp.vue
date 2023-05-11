<template>
  <router-link :to="`/task/${id}`" class="task" :class="status === false ? 'pending' : 'done'">
    <p class="task-title">{{ title }}</p>
    <div class="icon-container">
      <div class="icon">
      </div>
      <div class="icon" @click.prevent="_handleAlternateDone">
        <fa class="task-status task-pending" :icon="pendingIcon" @mouseover="updatePendingIcon" @mouseleave="resetPendingIcon" v-if="!status" />
        <fa class="task-status task-done" :icon="doneIcon" @mouseover="updateDoneIcon" @mouseleave="resetDoneIcon" v-else />
      </div>
    </div>
  </router-link> 
</template>

<script>
import { mapActions } from 'pinia'
import TasksStore from '@/stores/tasks'
import { useToast } from "vue-toastification";

export default {
  name: 'SingleTask',
  data() {
    return {
      pendingIconClass: 'fa-regular fa-circle',
      doneIconClass: 'fa-solid fa-circle-check'
    }
  },
  computed: {
    pendingIcon() {
      return `fa ${this.pendingIconClass}`;
    },
    doneIcon(){
      return `fa ${this.doneIconClass}`;
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    is_flagged: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    ...mapActions(TasksStore, ['_alternateDone']),

    async _handleAlternateDone(){
      console.log(`id --> ${this.id}, status --> ${this.status}`);
      try {
        await this._alternateDone(this.id, this.status)
        this.toast.success("Task updated!");
      } catch (error) {
        this.toast.error(error.message)
      }
    },

    updatePendingIcon() {
      if (window.matchMedia("(min-width: 1200px)").matches) {
        if (!this.status) {
          this.pendingIconClass = "fa-solid fa-circle-check";
        }
      }
    },
    resetPendingIcon() {
      if (window.matchMedia("(min-width: 1200px)").matches) {
        this.pendingIconClass = "fa-regular fa-circle";
      } 
    },
    updateDoneIcon(){
      if (window.matchMedia("(min-width: 1200px)").matches) {
        if (this.status) {
          this.doneIconClass = "fa-regular fa-circle";
        }
      }
    },
    resetDoneIcon() {
      if (window.matchMedia("(min-width: 1200px)").matches) {
        this.doneIconClass = "fa-solid fa-circle-check";
      }
    },

  }, created() {
    this.toast = useToast();
  }
}
</script>

<style scoped>
.task {
  color: var(--active-text);
  background-color: var(--secondary-text);
  border-radius: 12px;
  padding: 10px 15px;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  transition: all .2s ease-in-out;
}
@media(min-width: 768px){
  .task{
    padding: 15px 25px;
  }
}

.task:hover{
  transform: scale(1.05);
}

.task p.task-title{
  font-size: 16px;
}
.task .svg-inline--fa{
  height: 1.4rem;
}
.task .task-status.task-done{
  color: var(--green-accent);
}
.task .icon-container {
  display: flex;
    gap: 20px;
}
.task .icon-container .icon{
  width: 23px;
  height: 23px;
}
</style>