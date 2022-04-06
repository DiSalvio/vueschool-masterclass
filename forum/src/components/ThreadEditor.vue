<template>
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
      <button @click="cancelSaveThread" class="btn btn-ghost">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">{{ existingThread ? 'Update' : 'Publish' }}</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      newThreadTitle: this.title,
      newThreadText: this.text
    }
  },
  computed: {
    existingThread () {
      return !!this.title
    }
  },
  methods: {
    saveThread () {
      this.$emit('saveThread', { title: this.newThreadTitle, text: this.newThreadText })
    },
    cancelSaveThread () {
      this.$emit('cancelSaveThread', {})
    }
  }
}
</script>
