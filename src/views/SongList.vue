<template>
  <div>
    <div class="column">
      <table>
        <thead>
          <th />
          <th>Available Songs</th>
        </thead>
        <tr v-for="(avail, index) in songs" :key="index">
          <td>
            <button v-on:click="addSelection(avail)">Add</button>
          </td>
          <td>{{ avail.title }}</td>
          <td>{{ avail.indexId}}</td>
        </tr>
      </table>
    </div>
    <div class="column">
      <h1>Selections</h1>
      <ul>
        <li v-for="(selection, index) in selections" :key="index">{{ selection.title }}</li>
      </ul>
      <div>
        <button v-on:click="clearAll()">Clear Current Selections</button>
      </div>
    </div>
  </div>
</template>

<script>
import songsdb from "@/songsdb.json";

export default {
  name: "SongList",
  data() {
    return {
      songs: [],
      selections: [],
      toDisplay: []
    };
  },
  methods: {
    addSelection(selected) {
      this.selections.push(selected);
    },
    clearAll() {
      this.selections = [] 
    }
  },
  computed: {},
  created() {
    this.songs = songsdb.songs
    this.songs.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      } else if (a.title > b.title) {
        return 1;
      }
      return 0;
    })
  }
};
</script>

<style>
th {
  padding: 20px 0px;
  font-size: 30px;
}
.column {
  float: left;
  width: 50%;
}

li {
  list-style: none;
  padding: 15px 0px;
}
</style>