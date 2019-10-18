<template>
  <div class="home">
    <Song/>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Song from '@/components/Song.vue'

export default {
  name: 'home',
  components: {
//    HelloWorld,
    Song
  }
}
</script>
