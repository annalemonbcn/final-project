<template>
  <div id="project-title">
    <div>
      <h1>{{ projectTitle}}</h1>
      <p>{{ projectDescription }}</p>
    </div>
    <div id="percent">{{ percent }}% done ({{ `${tasksDone} of ${totalTasks} tasks done` }})</div>
  </div>
</template>

<script>
export default {
  name: 'ProjectTitle',
  data() {
    return {
      projectTitle: 'Project title',
      projectDescription: 'This is the project brief description',
      totalTasks: 6,
      tasksDone: 2,
      percent: null
    }
  },
  methods: {
    _calculatePercent() {
      this.percent = ((this.tasksDone / this.totalTasks) * 100).toFixed(2)
    }
  },
  created() {
    this._calculatePercent()
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
