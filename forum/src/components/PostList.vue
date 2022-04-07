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

        <p class="desktop-only text-small">{{ findUserById(post.userId).postsCount }} posts</p>
        <p class="desktop-only text-small">{{ findUserById(post.userId).threadsCount }} threads</p>

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
export default {
  props: {
    posts: {
      required: true,
      type: Array
    }
  },
  computed: {
    users () {
      return this.$store.state.users
    }
  },
  methods: {
    findUserById (postUserId) {
      return this.$store.getters.user(postUserId)
    }
  }
}
</script>
