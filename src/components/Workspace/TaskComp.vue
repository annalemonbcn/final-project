<template>
  <router-link :to="`/task/${url}`" class="task" :class="status === false ? 'pending' : 'done'">
    <p class="task-title">{{ title }}</p>
    <p class="task-date">{{ limitDate }}</p>
    <div>
      <fa class="task-status" icon="fa-circle-xmark" v-if="status === false"/>
      <fa class="task-status" icon="fa-solid fa-circle-check" v-else />
    </div>
  </router-link> 
</template>

<script>
export default {
  name: 'SingleTask',
  props: {
    title: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    limitDate: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    created(){
      console.log(this.task_id);
    }
  }
}
</script>

<style scoped>
.task {
  font-size: 14px;

  padding: 10px 20px;
  border-bottom: 1px solid var(--tertiary-color);

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  color: var(--tertiary-accent);

  transition: all .2s ease-in-out;
}

.task:hover{
  transform: scale(1.05);
}

.task .task-date{
  padding-right: 20px;
}

.task.pending{
  background-color: orange;
}
.task.done{
  background-color: lightgreen;
  text-decoration: line-through;
}
</style>
