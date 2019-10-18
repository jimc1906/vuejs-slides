<template>
  <div>
    <h1 v-if="index === 0">{{ title }}</h1>
    <div v-html="lyricParts[index]"></div>
    <button v-on:click="index--">&lt;</button>
    <button v-on:click="index++">&gt;</button>
  </div>
</template>

<script>
export default {
  name: "Song",
  data() {
    return {
      title: "title here",
      lyricParts: [
        "html lyric 1",
        "<p>html lyric 2</p><p>another line</p>",
        "html lyric 3"
      ],
      index: 0
    };
  },
  methods: {
    //   lyric() {
    //       return 'jim';
    //     // return this.lyricParts[this.index]
    //   }
  }
};
</script>

