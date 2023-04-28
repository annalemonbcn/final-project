<template>
  <!-- <router-link :to="`/task/${url}`" class="task"> -->
    <p class="task-title">{{ title }}</p>
    <!-- <p class="task-status">{{ status }}</p> -->
    <!-- <p class="task-date">{{ date }}</p> -->
    <!-- <button @click="_removeTask()">Remove</button>
  </router-link> -->
</template>

<script>
import UserLogo from '../Account/UserLogoComp.vue'

export default {
  name: 'SingleTask',
  components: {
    UserLogo
  },
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      required: true
    },
    // status: {
    //   type: String,
    //   required: true
    // },
    // date: {
    //   type: String,
    //   required: true
    // },
    // url: {
    //   type: String,
    //   required: true
    // }
  },
  methods: {
    _removeTask() {
      this.$emit('remove-task', this.title)
    }
  },
  components: {
    UserLogo
  }
}
</script>

<style scoped>
.task {
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

.task .task-status.pending {
  background-color: orange;
}
</style>
