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
      if (window.innerWidth < 1024) {
        this.$refs.navComp.showHeader = false
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
  #board {
    width: calc(100% - 90px);
    padding: 40px;
    left: 90px;
  }
}
#task-info {
  display: flex;
  flex-flow: column nowrap;
  gap: 70px;
  margin-top: 30px;
}
@media (min-width: 1024px) {
  #task-info {
    flex-flow: row nowrap;
    margin-top: 50px;
  }
  #task-info > div {
    padding: 30px;
  }
}

.info-right {
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;

  min-height: 100vh;
  position: absolute;
  top: 54%;
  transform: translateY(-50%);
  width: 100%;
  left: 0;

  z-index: 1000;

  background-color: var(--active-text);
  box-sizing: border-box;
  padding: 30px 10px;
}
@media(min-width: 390px){
  .info-right{
    top: 50%;
    padding: 30px 20px;
  }
}
@media (min-width: 768px){
  .info-right {
    padding: 30px;
  }
}
@media (min-width: 1024px) {
  .info-right {
    display: block;

    /* background-color: var(--secondary-text); */
    padding: 30px 0;
    width: auto;
    width: 45%;
    min-height: auto;
    position: static;
    transform: none;

    z-index: auto;
  }
}

.task-row {
  background-color: var(--secondary-text);
  padding: 30px;
  border-radius: 15px;
}

.task-row form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.task-row form p {
  color: var(--active-text);
}

.task-row form .specs-container {
  padding: 0 15px;
  background-color: var(--grey-light);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
}

.task-row form .specs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 60px;
  border-bottom: 1px solid rgba(10, 53, 69, 0.2);
}
.task-row form .specs.task-flag {
  border: 0;
}
@media (max-width: 1023px) {
}

input.task-view-title {
  font-size: 20px;
  width: 100%;
}
.specs #spec-date{
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  min-height: 1.2em; 
}
.modal-back {
  position: relative;
  left: 30px;
}
@media (min-width: 1024px) {
  .modal-back {
    display: none;
  }
}
</style>
