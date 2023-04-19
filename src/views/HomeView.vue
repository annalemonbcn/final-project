<template>
  <main class="row">
    <ProjectTitle />
    <TaskContainer />
  </main>
</template>

<script>
import ProjectTitle from '../components/ProjectTitleComp.vue'
import TaskContainer from '../components/TaskContainerComp.vue'

export default {
  name: 'HomeView',
  components: {
    ProjectTitle,
    TaskContainer
  }
}
</script>