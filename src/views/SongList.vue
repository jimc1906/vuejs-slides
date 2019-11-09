<template>
  <div style="padding-top: 30px" class="container-fluid">
    <div class="row">
      <div class="col-sm">
        <div class="form-group">
          <input @keyup="filterSongs" v-model="titleFilter"
            class="form-control"
            id="filterTextfield"
            placeholder="Filter song title..."
          />
        </div>
        <div class="list-group overflow-auto border border-dark" style="height: 450px">
          <li class="list-group-item" v-for="(avail, index) in songs" :key="index">
            <span style="float: left">
              <font-awesome-icon icon="plus-circle" v-on:click="addSelection(avail)" />
            </span>
            {{ avail.title }}
            <span style="float: right">
              <!-- <span style='margin-right: 25px' class="badge badge-dark">{{ avail.indexId }}</span> -->
              <font-awesome-icon icon="arrow-circle-right" v-on:click="showSong(avail.indexId)" />
            </span>
          </li>
        </div>
      </div>
      <div class="col-sm">
        <draggable
          v-show="selections && selections.length > 0"
          v-model="selections"
          @end="updateLink"
          class="list-group border border-dark"
          style="margin-top: 55px"
        >
          <li class="list-group-item" v-for="(selection, index) in selections" :key="index">
            <span style="float: left">
              <font-awesome-icon icon="minus-circle" v-on:click="removeSelection(selection)" />
            </span>
            {{ selection.title }}
            <!-- <span
              style="float: right"
              class="badge badge-dark"
            >            
            {{ selection.indexId }}</span> -->
          </li>
        </draggable>
        <div class="button-footer">
          <button v-show="selections && selections.length > 0" v-on:click="clearAll()">Clear</button>
        </div>
        <div v-show="slideLink.length > 0">
          <a :href="slideLink">Navigate to Slides</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import songsdb from "@/songsdb.json";
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  name: "SongList",
  data() {
    return {
      songs: [],
      selections: [],
      toDisplay: [],
      slideLink: "",
      titleFilter: ""
    };
  },
  methods: {
    addSelection(selected) {
      this.selections.push(selected);
      this.updateLink();
    },
    removeSelection(selected) {
      this.selections.splice(
        this.selections.findIndex(elem => {
          return selected.indexId === elem.indexId;
        }),
        1
      );
      this.updateLink();
    },
    clearAll() {
      this.selections = [];
      this.slideLink = "";
    },
    updateLink() {
      this.slideLink =
        "/#/slides/" +
        this.selections
          .map(val => {
            return val.indexId;
          })
          .join(",");
    },
    filterSongs() {
      if (this.titleFilter.length > 0) {
        this.songs = this.songs.filter((val)=>{ return val.title.toLowerCase().indexOf(this.titleFilter.toLowerCase()) !== -1 })
      } else {
        this.songs = songsdb.songs
      }
    },
    showSong(indexId) {
      this.$router.push(`slides/${indexId}`)
    }
  },
  computed: {},
  created() {
    this.songs = songsdb.songs;
    this.songs.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }
};
</script>

<style>
.button-footer {
  padding: 30px 0px;
}
</style>