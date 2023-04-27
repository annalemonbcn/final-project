<template>
  <main id="board">
    <ProjectTitle />
    <ActionButtons />

    <div id="task-info">
      <TasksContainer />
      <router-view></router-view>
    </div>

  </main>
</template>

<script>
import ProjectTitle from '@/components/Workspace/ProjectTitleComp.vue';
import ActionButtons from '@/components/Workspace/ActionButtonsComp.vue';
import TasksContainer from '@/components/Workspace/TaskContainerComp.vue';

export default {
  name: 'HomeView',
  components: {
    ProjectTitle,
    ActionButtons,
    TasksContainer
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

  .info-right{
    background-color: #ebeded;
    box-sizing: border-box;
    padding: 30px 50px;
    min-width: 50%;
    border-radius: 25px;
  }
</style>