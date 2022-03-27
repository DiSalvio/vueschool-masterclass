<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>
      <div
        v-for="thread in threads"
        :key="thread.id"
        class="thread"
      >
        <div>
          <p>
            <router-link :to="{name: 'PageThreadShow', params: {id: thread.id}}">{{thread.title}}</router-link>
          </p>
          <p class="text-faded text-xsmall">
            By <a href="#">{{findUserById(thread.userId).name}}</a>, <AppDate :timestamp="thread.publishedAt"/>
          </p>
        </div>

        <div class="activity">
          <p class="replies-count">
            {{ thread.posts.length }} replies
          </p>

          <img class="avatar-medium" :src="findUserById(thread.userId).avatar" alt="">

          <div>
            <p class="text-xsmall">
              <a href="#">{{findUserById(thread.userId).name}}</a>
            </p>
            <AppDate :timestamp="thread.publishedAt"/>
          </div>
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
      posts: sourceData.posts,
      users: sourceData.users
    }
  },
  props: {
    threads: {
      required: true,
      type: Array
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

<style>
@import "../assets/threads.css";
</style>
