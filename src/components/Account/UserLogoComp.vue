<template>
  <div class="user-initials">{{ initials }}</div>
</template>

<script>
export default{
  name: 'UserLogo',
  data() {
    return {
      initials: 'AE'
    };
  },
}
</script>

<style>
  .user-initials {
    border: 2px solid var(--tertiary-accent);
    border-radius: 50px;
    padding: 12px;
    font-size: 16px;
  }
</style>