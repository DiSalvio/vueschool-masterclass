<template>
  <div class="col-full">
    <form @submit.prevent="savePost">
      <div class="form-group">
        <textarea v-model="newPostText" name="" id="" cols="30" rows="10" class="form-input"/>
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit Post</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newPostText: ''
    }
  },
  methods: {
    savePost () {
      const post = {
        text: this.newPostText
      }
      this.$emit('savePost', { post })
      this.newPostText = ''
    }
  }
}
</script>
