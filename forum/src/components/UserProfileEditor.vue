<template>
  <div class="profile-card">
    <form @submit.prevent="saveUserProfileChanges">
      <p class="text-center">
        <img :src="activeUser.avatar" alt="" class="avatar-xlarge img-update">
      </p>

      <div class="form-group">
        <input v-model="activeUser.username" type="text"  placeholder="Username" class="form-input text-lead text-bold">
      </div>

      <div class="form-group">
        <input v-model="activeUser.name" type="text"  placeholder="Full Name" class="form-input text-lead">
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea v-model="activeUser.bio" class="form-input" id="user_bio" placeholder="Write a few words about yourself."></textarea>
      </div>

      <div class="stats">
        <span>{{ user.postsCount }}  posts</span>
        <span>{{ user.threadsCount }}  threads</span>
      </div>

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input v-model="activeUser.website" autocomplete="off" class="form-input" id="user_website" >
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input v-model="activeUser.email" autocomplete="off" class="form-input" id="user_email" >
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input v-model="activeUser.location" autocomplete="off" class="form-input" id="user_location" >
      </div>

      <div class="btn-group space-between">
        <button @click="cancelUserProfileChanges" class="btn-ghost">Cancel</button>
        <button @click="saveUserProfileChanges" type="submit" class="btn-blue">Save</button>
      </div>
    </form>
  </div>

  <p class="text-xsmall text-faded text-center push-top">Member since june 2003, last visited 4 hours ago</p>
</template>

<script>
export default {
  data () {
    return {
      activeUser: { ...this.user }
    }
  },
  props: {
    user: {
      required: true,
      type: Object
    }
  },
  methods: {
    saveUserProfileChanges () {
      this.$store.dispatch('saveUserProfileChanges', { ...this.activeUser })
      this.$router.push({ name: 'PageUserProfile' })
    },
    cancelUserProfileChanges () {
      this.$router.push({ name: 'PageUserProfile' })
    }
  }
}
</script>
