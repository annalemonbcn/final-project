<template>
  <div id="actionButtons">
    <button @click="_createNewTask">New Task</button>
  </div>
</template>

<script>
export default {
  name: 'ActionButtons',
  data() {
    return {

    }
  },
  methods: {
    _createNewTask(){
      console.log('Button new task');
    }
  }
}
</script>

<style scoped>
  #actionButtons{
    margin-top: 30px;
  }
</style>