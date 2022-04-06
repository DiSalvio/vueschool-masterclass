<template>
  <div class="col-full push-top">

    <h1>Create new thread in <i>{{ forum.name }}</i></h1>

    <ThreadEditor @saveThread="saveThread" @cancelSaveThread="cancelSaveThread"/>
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue'
export default {
  components: {
    ThreadEditor
  },
  props: {
    forumId: {
      required: true,
      type: String
    }
  },
  computed: {
    forum () {
      return this.$store.state.forums.find(forum => forum.id === this.forumId)
    }
  },
  methods: {
    async saveThread ({ title, text }) {
      const thread = await this.$store.dispatch('createThread', {
        title,
        text,
        forumId: this.forumId
      })
      this.$router.push({ name: 'PageThreadShow', params: { id: thread.id } })
    },
    cancelSaveThread () {
      this.$router.push({ name: 'ForumShow', params: { id: this.forumId } })
    }
  }
}
</script>
