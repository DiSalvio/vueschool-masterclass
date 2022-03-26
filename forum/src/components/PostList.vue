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

      <div class="post-date text-faded" :title="readableDate(post.publishedAt)">
        {{ elapsedTime(post.publishedAt) }}
      </div>
    </div>
  </div>
</template>

<script>
import sourceData from '@/data.json'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
export default {
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
    },
    elapsedTime (timestamp) {
      return dayjs.unix(timestamp).fromNow()
    },
    readableDate (timestamp) {
      return dayjs.unix(timestamp).format('llll')
    }
  }
}
</script>
