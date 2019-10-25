<template>
  <div>
    <h1 class="title" v-if="hasTitle">{{ currentSong.title }}</h1>
    <div
      :class="{ lyric: true, 'top-margin': !hasTitle }"
      v-html="currentSong.lyricParts[this.currentSongSlideIndex]"
    ></div>
    <div class="footer">
      <button v-show="showPrevious" v-on:click="previousSlide()">&lt;</button>
      <button v-on:click="nextSlide()">&gt;</button>
    </div>

    <Events
      @keydown.arrow-up="previousSlide"
      @keydown.arrow-down="nextSlide"
      @keydown.arrow-left="previousSlide"
      @keydown.arrow-right="nextSlide"
      @mousedown.left="nextSlide"
    />
  </div>
</template>

<script>
import songsdb from "@/songsdb.json";
import Events from "vue-global-events";

export default {
  name: "Song",
  components: { Events },
  data() {
    return {
      currentSong: null,
      currentSongSlideIndex: 0,
      currentSongIndex: 0,
      songs: []
    };
  },
  methods: {
    nextSlide() {
      if (
        this.currentSongIndex === this.songs.length - 1 &&
        this.currentSongSlideIndex === this.currentSong.lyricParts.length - 1
      ) {
        return;
      }

      if (
        this.currentSongSlideIndex ===
        this.currentSong.lyricParts.length - 1
      ) {
        this.currentSongIndex++;
        this.currentSong = this.songs[this.currentSongIndex];
        this.currentSongSlideIndex = 0;
      } else {
        this.currentSongSlideIndex++;
      }
    },
    previousSlide() {
      if (this.currentSongIndex === 0 && this.currentSongSlideIndex === 0) {
        return;
      }

      if (this.currentSongSlideIndex === 0) {
        this.currentSongIndex--;
        this.currentSong = this.songs[this.currentSongIndex];
        this.currentSongSlideIndex = this.currentSong.lyricParts.length - 1;
      } else {
        this.currentSongSlideIndex--;
      }
    }
  },
  computed: {
    hasTitle() {
      return this.currentSongSlideIndex === 0;
    },
    showPrevious() {
      return !(this.currentSongIndex === 0 && this.currentSongSlideIndex === 0);
    },
    showNext() {
      return true;
    }
  },
  created() {
    this.songs = songsdb.songs;
    this.currentSong = this.songs[this.currentSongIndex];
  }
};
</script>

<style>
div {
  font-family: Arial, Helvetica, sans-serif;
}
.title {
  font-size: 36pt;
  margin: 60px 0px 60px 0px;
}

.lyric {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 48px;
}

.top-margin {
  margin-top: 2.2em;
}

.lyric > p {
  margin: 0.1em 0 0.1em 0;
}

.footer {
  background-color: rgb(207, 212, 212);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25px;
}
</style>