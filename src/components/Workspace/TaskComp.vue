<template>
    <router-link to="/task/task1" class="task">
      <p class="task-title" >Task title</p>
      <p class="task-status pending">Pending</p>
      <p class="task-person">
        <UserLogo />
      </p>
      <p class="task-date">13/05/2023</p>
    </router-link>
</template>

<script>
import UserLogo from '../Account/UserLogoComp.vue';

export default {
  name: 'SingleTask',
  data() {
    return {

    }
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

  .task .task-status.pending{
    background-color: orange;
  }
</style>