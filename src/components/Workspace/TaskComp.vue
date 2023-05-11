<template>
  <router-link :to="`/task/${id}`" class="task" :class="status === false ? 'pending' : 'done'">
    <p class="task-title">{{ title }}</p>
    <div class="icon-container">
      <div class="icon">
        <fa class="task-priority" icon="fa-solid fa-circle-exclamation" v-if="is_flagged"/>
      </div>
      <div class="icon">
        <fa class="task-status" icon="fa-regular fa-circle" v-if="status === false"/>
        <fa class="task-status task-done" icon="fa-solid fa-circle-check" v-else />
      </div>
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
    id: {
      type: Number,
      required: true
    },
    is_flagged: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.task {
  color: var(--active-text);
  background-color: var(--secondary-text);
  border-radius: 12px;
  padding: 10px 15px;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  transition: all .2s ease-in-out;
}
@media(min-width: 768px){
  .task{
    padding: 15px 25px;
  }
}

.task:hover{
  transform: scale(1.05);
}

.task p.task-title{
  font-size: 16px;
}
.task .svg-inline--fa{
  height: 1.4rem;
}
.task .task-status.task-done{
  color: var(--green-accent);
}
.task .icon-container {
  display: flex;
    gap: 20px;
}
.task .icon-container .icon{
  width: 23px;
  height: 23px;
}
</style>