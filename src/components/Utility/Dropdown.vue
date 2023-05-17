<template>
  <div @click="isOpen = !isOpen">
    <div class="mobile-options">
      <fa icon="fa-solid fa-ellipsis" />
    </div>
    <div class="dropdown-list" v-if="isOpen">
      <div v-for="(item, i) in items" :key="i" class="dropdown-list-item">
        <a :href="item.link"><fa :icon="item.icon" /> {{ item.title }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'dropdown',
  data(){
    return {
      isOpen: false
    }
  },
  props: {
    items: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.dropdown-list{
  position: absolute;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 5px;

  box-sizing: border-box;
  background-color: white;
  border: 1px solid var(--secondary-color);
  border-radius: 12px;
  padding: 8px 12px;
  width: 130px;

  z-index: 10000;
}

.dropdown-list a{
  font-size: 14px;
}

.dropdown-list a svg{
  margin-right: 5px;
}
</style>