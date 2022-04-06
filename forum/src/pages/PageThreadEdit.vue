<template>
  <div class="col-full push-top">

    <h1>Editing {{ thread.title }}</h1>

    <ThreadEditor :title="thread.title" :text="text" @saveThread="saveThread" @cancelSaveThread="cancelSaveThread"/>
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue'
export default {
  components: {
    ThreadEditor
  },
  props: {
    threadId: {
      required: true,
      type: String
    }
  },
  computed: {
    thread () {
      return this.$store.getters.thread(this.threadId)
    },
    text () {
      return this.$store.getters.threadFirstPost(this.threadId).text
    }
  },
  methods: {
    async saveThread ({ title, text }) {
      const thread = await this.$store.dispatch('updateThread', {
        title,
        text,
        threadId: this.threadId
      })
      this.$router.push({ name: 'PageThreadShow', params: { id: thread.id } })
    },
    cancelSaveThread () {
      this.$router.push({ name: 'PageThreadShow', params: { id: this.threadId } })
    }
  }
}
</script>
