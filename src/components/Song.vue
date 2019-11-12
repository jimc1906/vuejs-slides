<template>
  <div>
    <h1 class="title" v-if="hasTitle">{{ currentSong.title }}</h1>
    <div
      :class="{ lyric: true, 'top-margin': !hasTitle }"
      v-html="currentSong.lyricParts[this.currentSongSlideIndex]"
    ></div>
    <div class="footer">
      <span style="float: left"><router-link to="/songlist"><button>Song List</button></router-link></span>
      <span class='hideInFullScreen' style="float: right"><button v-on:click="fullScreen()">Present</button></span>
    </div>

    <Events
      :filter="(event) => event.target.tagName !== 'BUTTON'"
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
import screenfull from 'screenfull';

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
    },
    fullScreen() {
      screenfull.request()
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
    if (this.$route.params.songindexes) {
      let indices = this.$route.params.songindexes.split(",").map(v => {
        return parseInt(v);
      });
      let selected = []
      indices.forEach(element => {
        selected.push(this.songs.find((s)=>{ return s.indexId === element }))
      });
      this.songs = selected
    }

    this.currentSong = this.songs[this.currentSongIndex];
  },
  mounted() {
    document.body.classList = []
  }

};
</script>

<style>
div {
  font-family: Arial, Helvetica, sans-serif;
}
.title {
  font-size: 36pt;
  font-weight: bold;
  margin: 60px 0px 60px 0px;
}

.lyric {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 48px;
}

:-webkit-full-screen .lyric {
  font-size: 64px;
}
:-moz-full-screen .lyric {
  font-size: 64px;
}
:-ms-fullscreen .lyric {
  font-size: 64px;
}
:fullscreen .lyric {
  font-size: 64px;
}

:-webkit-full-screen .hideInFullScreen {
  display: none
}
:-moz-full-screen .hideInFullScreen {
  display: none
}
:-ms-fullscreen .hideInFullScreen {
  display: none;
}
:fullscreen .hideInFullScreen {
  display: none
}

.top-margin {
  margin-top: 2.2em;
}

.lyric > p {
  margin: -8px 0px;
}

.footer {
  padding: 4px;
  background-color: rgb(207, 212, 212);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 35px;
}
</style>