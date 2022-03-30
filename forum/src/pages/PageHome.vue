<template>
  <h1>Welcome to the forum</h1>
  <div class="col-full">
    <CategoriesList :categories="categories"/>
  </div>
</template>

<script>
import sourceData from '@/data.json'
import CategoriesList from '@/components/CategoriesList.vue'
export default {
  components: {
    CategoriesList
  },
  data () {
    return {
      categories: sourceData.categories
    }
  }
}
</script>

<style scoped>
@import "../assets/threads.css";
</style>
