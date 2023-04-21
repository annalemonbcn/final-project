<template>
  <div id="project-title">
    <div>
      <h1>{{ projectTitle}}</h1>
      <p>{{ projectDescription }}</p>
    </div>
    <div id="percent">{{ `${percent}` }}% done ({{ `${tasksDone} of ${totalTasks} tasks done` }})</div>
  </div>
</template>

<script>
import TasksStore from '../../stores/tasks'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'ProjectTitle',
  data() {
    return {
      projectTitle: 'Project title',
      projectDescription: 'This is the project brief description',
      totalTasks: null,
      tasksDone: null,
      percent: null
    }
  },
  computed: {
    ...mapState(TasksStore, ['totalCount', 'totalDoneTasks', 'totalPendingTasks'])
  },
  methods: {
    ...mapActions(TasksStore, ['_getTotalTasksCount', '_getDoneTasksCount']),

    _calculatePercent() {
      const integer = Math.floor(this.tasksDone / this.totalTasks * 100)
      const decimal = (this.tasksDone / this.totalTasks * 100) - integer;
      this.precent = decimal < 0.5 ? integer : integer + 1;
    }
  },
  created() {
    // Get count of total tasks and tasks done
    this.totalTasks = this._getTotalTasksCount();
    this.tasksDone = this._getDoneTasksCount();

    // Calculate percent
    this._calculatePercent();
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
