<template>
  <div class="home">Home</div>
</template>

<script>
export default {
  name: 'Home',
  created() {
    this.$router.push('/dashboard').catch(() => {});
  },
};
</script>
