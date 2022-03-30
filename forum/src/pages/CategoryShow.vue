<template>
  <div class="col-full">
    <h2 class="list-title">
      {{ category.name }}
    </h2>
    <ForumList :forums="categoryForums"/>
  </div>
</template>

<script>
import sourceData from '@/data.json'
import ForumList from '@/components/ForumList.vue'
export default {
  components: {
    ForumList
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      categories: sourceData.categories,
      forums: sourceData.forums
    }
  },
  computed: {
    category () {
      return this.categories.find(category => category.id === this.id)
    },
    categoryForums () {
      return this.forums.filter(forum => forum.categoryId === this.id)
    }
  }
}
</script>
