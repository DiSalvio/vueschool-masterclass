<template>
  <div class="col-large push-top">
    <h1>{{thread.title }}</h1>
    <div class="post-list">

      <div
        v-for="postId in thread.posts"
        :key="postId"
        class="post"
      >

       <div class="user-info">

          <a href="#" class="user-name">
            -{{findUserById(findPostById(postId).userId).name}}
          </a>

          <a href="#">
            <img class="avatar-large" :src="findUserById(findPostById(postId).userId).avatar">
          </a>

        </div>

        <div class="post-content">
          <div>
            <p>{{findPostById(postId).text}}</p>
          </div>
        </div>

        <div class="post-date text-faded">
          {{findPostById(postId).publishedAt}}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'
export default {
  data () {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users
    }
  },
  props: {
    id: {
      required: true,
      type: String
    }
  },
  computed: {
    thread () {
      return this.threads.find(thread => thread.id === this.id)
    }
  },
  methods: {
    findPostById (postId) {
      return this.posts.find(p => p.id === postId)
    },
    findUserById (userId) {
      return this.users.find(u => u.id === userId)
    }
  }
}
</script>

<style scoped>
@import "../assets/threads.css";
</style>
