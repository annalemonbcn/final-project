<template>
  <main id="board">
    <ProjectTitle />
    <ActionButtons />
    <div id="task-info">
      <TasksGrouper />
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import ProjectTitle from '../components/Workspace/ProjectTitleComp.vue';
import ActionButtons from '../components/Workspace/ActionButtonsComp.vue';
import TasksGrouper from '../components/Workspace/TaskContGrouperComp.vue';

export default {
  name: 'HomeView',
  components: {
    ProjectTitle,
    ActionButtons,
    TasksGrouper
  }
}
</script>

<style>
  #board{
    width: 100%;
    padding: 70px 100px 70px 200px;
  }

  #task-info{
    display: flex;
    flex-flow: row nowrap;
    gap: 100px;

    margin-top: 50px;
  }
</style>