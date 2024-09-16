<template>
  <div class="home">
    <div>
      MENU
    </div>
    <div>
      <BlogDashboard />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BlogDashboard from './BlogDashboard.vue'

export default {
  name: 'HomeView',
  components: {
    BlogDashboard
  }
}
</script>
