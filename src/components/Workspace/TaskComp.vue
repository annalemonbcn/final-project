<template>
  <router-link :to="`/task/${url}`" class="task" :class="status === false ? 'pending' : 'done'">
    <p class="task-title">{{ title }}</p>
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
  color: var(--active-text);
  background-color: var(--secondary-text);
  border-radius: 12px;
  padding: 15px;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;

  transition: all .2s ease-in-out;
}
@media(min-width: 768px){
  .task{
    padding: 25px;
  }
}

.task:hover{
  transform: scale(1.05);
}

.task p.task-title{
  font-size: 18px;
}
.task .svg-inline--fa{
  height: 1.4rem;
}
</style>
