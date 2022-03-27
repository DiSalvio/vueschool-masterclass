<template>
  <span class="post-date text-faded" :title="readableDate()">
    {{ elapsedTime() }}
  </span>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)
export default {
  props: {
    timestamp: {
      required: true,
      type: Number
    }
  },
  methods: {
    elapsedTime () {
      return dayjs.unix(this.timestamp).fromNow()
    },
    readableDate () {
      return dayjs.unix(this.timestamp).format('llll')
    }
  }
}
</script>
