<template>
  <div @click="toogleDropdown">
    <div class="mobile-options">
      <fa icon="fa-solid fa-ellipsis" />
      <div class="dropdown-list" v-if="isOpen">
        <div class="dropdown-list-item">
          <router-link :to="url">
            <fa icon="fa-regular fa-pen-to-square" /> 
            Edit
          </router-link>
        </div>
        <div class="dropdown-list-item" @click="deleteTask">
          <a href="#">
            <fa icon="fa-regular fa-trash-can" /> 
            Delete
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dropdown',
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    deleteTask(){
      this.$emit('delete-task')
    },
    toogleDropdown(){
      this.isOpen = !this.isOpen
    },
    closeDropdown() {
      this.isOpen = false;
    }
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
}
</script>

<style>
.dropdown-list {
  position: absolute;
  right: 0;
  top: 37px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  box-sizing: border-box;
  background-color: white;
  border: 1px solid var(--secondary-color);
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 10px 15px;
  width: 130px;

  z-index: 100;
}

.dropdown-list-item{
  box-sizing: border-box;
  height: 30px;
}
.dropdown-list a {
  font-size: 16px;
}

.dropdown-list a svg {
  margin-right: 5px;
}
</style>
