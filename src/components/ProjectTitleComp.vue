<template>
  <div class="container">
    <p id="projectTitle">{{ projectTitle }}</p>
    <div id="percentComplete">{{ percentComplete }} % complete ({{ tasksDone }}/{{ totalTasks }} tasks)</div>
  </div>
</template>

<script>
export default {
  name: 'ProjectTitle',
  data(){
    return {
      projectTitle: 'PROJECT TITLE',
      percentComplete: '',
      tasksDone: 2,
      totalTasks: 6
    }
  },
  methods: {
    _calculatePercentComplete(tasksDone, totalTasks){
      this.percentComplete = ((tasksDone/totalTasks)*100).toFixed(2); 
    }
  },
  created(){
    this._calculatePercentComplete(this.tasksDone, this.totalTasks);
  }
}
</script>

<style scoped>
  .container{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  #projectTitle{
    font-size: 24px;
  }
</style>