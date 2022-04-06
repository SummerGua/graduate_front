<template>
  <h1>{{ msg }}</h1>
  <p>{{ description }}</p>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'About',
    data() {
      return {
        msg: 'Hello, this is about me',
        description: 'I am from CQUPT'
      }
    },
    setup() {}
  })
</script>
