<template>
  <div class="col-full push-top">

    <h1>Create new thread in <i>{{ forum.name }}</i></h1>

    <form @submit.prevent="saveThread">
      <div class="form-group">
        <label for="thread_title">Title:</label>
        <input v-model="newThreadTitle" type="text" id="thread_title" class="form-input" name="title" >
      </div>

      <div class="form-group">
        <label for="thread_content">Content:</label>
        <textarea v-model="newThreadText" id="thread_content" class="form-input" name="content" rows="8" cols="140"></textarea>
      </div>

      <div class="btn-group">
        <button @click="cancelAddThread" class="btn btn-ghost">Cancel</button>
        <button class="btn btn-blue" type="submit" name="Publish">Publish </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    forumId: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      newThreadTitle: '',
      newThreadText: ''
    }
  },
  computed: {
    forum () {
      return this.$store.state.forums.find(forum => forum.id === this.forumId)
    }
  },
  methods: {
    async saveThread () {
      const thread = await this.$store.dispatch('createThread', {
        title: this.newThreadTitle,
        text: this.newThreadText,
        forumId: this.forumId
      })
      this.$router.push({ name: 'PageThreadShow', params: { id: thread.id } })
    },
    cancelAddThread () {
      this.$router.push({ name: 'ForumShow', params: { id: this.forumId } })
    }
  }
}
</script>
