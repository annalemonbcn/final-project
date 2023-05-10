<template>
  <div id="project-title">
    <div>
      <h1>Welcome back, {{ user.email }}!</h1>
      <p>Here are your tasks:</p>
    </div>
  </div>
</template>

<script>
import UserStore from '@/stores/user.js';
import { mapState } from 'pinia';

export default {
  name: 'ProjectTitle',
  computed: {
    ...mapState(UserStore, ['user']),
  }
}
</script>

<style scoped>
#project-title {
  width: 100%;

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-end;

  border-bottom: 1px dotted var(--tertiary-color);
  padding-bottom: 20px;
}
</style>
