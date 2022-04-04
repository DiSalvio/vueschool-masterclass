<template>
  <div v-for="category in categories" :key="category.id">
    <div class="col-full">
      <h2 class="list-title">
        <router-link :to="{name: 'CategoryShow', params: { id: category.id }}">
          {{ category.name }}
        </router-link>
      </h2>
      <ForumList :forums="categoryForums(category)"/>
    </div>
  </div>
</template>

<script>
import ForumList from '@/components/ForumList.vue'
export default {
  components: {
    ForumList
  },
  props: {
    categories: {
      required: true,
      type: Array
    }
  },
  computed: {
    forums () {
      return this.$store.state.forums
    }
  },
  methods: {
    categoryForums (category) {
      return this.forums.filter(forum => forum.categoryId === category.id)
    }
  }
}
</script>
