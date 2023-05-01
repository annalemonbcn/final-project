<template>
  <NavComp />
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
import NavComp from '@/components/Navigation/NavComp.vue'
import ProjectTitle from '@/components/Workspace/ProjectTitleComp.vue'
import ActionButtons from '@/components/Workspace/ActionButtonsComp.vue'
import TasksContainer from '@/components/Workspace/TaskContainerComp.vue'

export default {
  name: 'HomeView',
  components: {
    NavComp,
    ProjectTitle,
    ActionButtons,
    TasksContainer
  }
}
</script>

<style>
#board {
  width: 100%;
  padding: 70px 100px 70px 200px;
}

#task-info {
  display: flex;
  flex-flow: row nowrap;
  gap: 100px;
  margin-top: 50px;
}

.info-right {
  background-color: #ebeded;
  box-sizing: border-box;
  padding: 30px 50px;
  min-width: 50%;
  border-radius: 25px;
}

#task-add {
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
}
input,
textarea {
  background-color: transparent;
  outline: none;
  border: 0;
  border-bottom: 2px solid var(--tertiary-color);

  font-size: 16px;
  font-family: Roboto;
}
input#task-add-name {
  font-size: 30px;
  width: 100%;
}
textarea {
  resize: none;
  height: 60px;
}
select#task-add-status,
select#task-add-favourite {
  margin-left: 30px;
}
</style>
