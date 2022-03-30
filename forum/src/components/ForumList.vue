<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">
        Forums
      </h2>

      <div v-for="forum in forums" :key="forum.id" class="forum-listing">
        <div class="forum-details">
          <router-link
            class="text-xlarge"
            :to="{name: 'ForumShow', params: { id: forum.id }}"
          >
            {{ forum.name }}
          </router-link>
          <p>{{ forum.description }}</p>
        </div>

        <div class="threads-count"/>
          <p>
            <span class="count">{{ forum.threads?.length || 0 }}</span>
            {{ forum.threads?.length === 1 ? 'thread' : 'threads' }}
          </p>
        </div>

        <div class="last-thread">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forums: {
      required: true,
      type: Array
    }
  }
}
</script>
