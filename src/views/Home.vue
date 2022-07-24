<template>
  <div class="home">
    <home-page msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomePage from '@/components/index.vue'

export default {
  name: 'Home',
  components: {
    HomePage
  }
}
</script>
