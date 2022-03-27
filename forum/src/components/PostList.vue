<template>
  <div class="post-list">
    <div
      v-for="post in posts"
      :key="post.id"
      class="post"
    >

      <div class="user-info">

        <a href="#" class="user-name">
          -{{findUserById(post.userId).name}}
        </a>

        <a href="#">
          <img class="avatar-large" :src="findUserById(post.userId).avatar">
        </a>

      </div>

      <div class="post-content">
        <div>
          <p>{{post.text}}</p>
        </div>
      </div>

      <AppDate :timestamp="post.publishedAt"/>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'
import AppDate from '@/components/AppDate.vue'
export default {
  components: {
    AppDate
  },
  props: {
    posts: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      users: sourceData.users
    }
  },
  methods: {
    findUserById (postUserId) {
      return this.users.find(user => user.id === postUserId)
    }
  }
}
</script>
