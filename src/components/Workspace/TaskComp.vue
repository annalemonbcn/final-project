<template>
    <router-link :to="`/task/${titleURL}`" class="task">
      <p class="task-title">{{ title }}</p>
      <p class="task-status">{{ status }}</p>
      <p class="task-user">
        <UserLogo :initials="initials" />
      </p>
      <p class="task-date">{{ date }}</p>
      <button @click="_removeTask(this)">Remove</button>
    </router-link>
</template>

<script>
import { mapActions } from 'pinia'
import TasksStore from '../../stores/tasks';
import UserLogo from '../Account/UserLogoComp.vue';

export default {
  name: 'SingleTask',
  data() {
    return{
      titleURL: ''
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    initials: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
  },
  methods: {
    ...mapActions(TasksStore, ['_removeTask']),
    _titleToUrl(){
      this.titleURL = this.title.toLowerCase().split(' ').join('_');
    }
  },
  created(){
    this._titleToUrl();
  },
  components: {
    UserLogo,
  }
}
</script>

<style scoped>
  .task{
    font-size: 14px;

    padding: 10px 20px;
    border-bottom: 1px solid var(--tertiary-color);

    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    color: var(--tertiary-accent);
  }

  /* .task > *{
    flex-grow: 1;
  } */

  .task .task-status.pending{
    background-color: orange;
  }
</style>