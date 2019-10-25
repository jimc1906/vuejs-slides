<template>
  <div class="bottom">
    <button v-on:click="index--">&lt;</button>
    <button v-on:click="index++">&gt;</button>
  </div>
</template>

<script>
export default {
    inject: ['index']
}
</script>

<style>
  .bottom {
      background-color: aqua
  }
</style>