<template>
  <router-link :to="`/task/${url}`" class="task" :class="statusClass">
    <p class="task-title">{{ title }}</p>
    <fa class="task-status" icon="fa-circle-xmark" v-if="status === false"/>
    <fa class="task-status" icon="fa-solid fa-circle-check" v-else />
    <!-- <p class="task-date">{{ date }}</p> -->
    <!-- <button @click="_removeTask()">Remove</button> -->
  </router-link> 
</template>

<script>
export default {
  name: 'SingleTask',
  data() {
    return {
      statusClass: ''
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      required: true
    },
    // date: {
    //   type: String,
    //   required: true
    // },
    url: {
      type: String,
      required: true
    }
  },
  methods: {
    // _removeTask() {
    //   this.$emit('remove-task', this.title)
    // }
    _setStatus(){
      
      if(this.status === false){
        this.statusClass = 'pending'
        // this.statusCheck = `<fa icon="fa-circle-check" />
      } else {
        this.statusClass = 'done'
      }      
    }
  },
  created(){
    this._setStatus();
    
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
  gap: 2rem;
  color: var(--tertiary-accent);

  transition: all .2s ease-in-out;
}

.task:hover{
  transform: scale(1.05);
}

/* .task > *{
    flex-grow: 1;
  } */
.task.pending{
  background-color: orange;
}
.task.done{
  background-color: lightgreen;
  text-decoration: line-through;
}
</style>
