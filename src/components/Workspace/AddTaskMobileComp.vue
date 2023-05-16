<template>
  <div id="addTask">
    <router-link to="/task/add-task">
      <fa icon="fa-solid fa-plus" />
    </router-link>
  </div>
</template>

<script>

</script>

<style>
#addTask{
  background-color: var(--green-accent);
  width: 50px;
  height: 50px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  position: absolute;
  top: auto;
  left: auto;
  bottom: 80px;
  right: 50px;
}

#addTask a{
  width: 100%;
  display: block;
  text-align: center;
  color: white;
}
</style>