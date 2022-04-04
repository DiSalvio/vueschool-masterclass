<template>
  <h1>Welcome to the forum</h1>
  <div class="col-full">
    <CategoriesList :categories="categories"/>
  </div>
</template>

<script>
import CategoriesList from '@/components/CategoriesList.vue'
export default {
  components: {
    CategoriesList
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  }
}
</script>

<style scoped>
@import "../assets/threads.css";
</style>
