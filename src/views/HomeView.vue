<template>
  <NavComp ref="navComp" />
  <main id="board" @click="hideHeader">
    <!-- <ProjectTitle /> -->
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
  },
  methods: {
    hideHeader() {
      if (window.innerWidth < 1024){
        this.$refs.navComp.showHeader = false;
      }
    }
  }
}
</script>

<style>
#board {
  width: 100%;
  min-height: 100vh;
  padding: 30px;
  box-sizing: border-box;
  position: relative;
  
  background-color: var(--active-text);
}
@media (min-width: 1024px) {
  #board{
    width: calc(100% - 90px);
    padding: 80px;
    left: 90px;

    background-color: var(--secondary-color);
  }
}
#task-info {
  display: flex;
  flex-flow: column nowrap;
  gap: 70px;
  margin-top: 50px;
}
@media(min-width: 1024px) {
  #task-info{
    flex-flow: row nowrap;
  }
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
input.task-view-name {
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
