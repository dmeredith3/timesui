<template>
  <div class="container">
    <!-- <div class="row"> -->
        <h1>MLB Predicted Scores</h1>
        <br><br>
        <!-- <div class="FormDate"> -->
          <form id="pick_date">
            <input
              class="FormDate__input FormDate__input--year"
              type="text"
              ref="year"
              v-model="year_picked"
              placeholder="yyyy">
            <span
              class="FormDate__divider"
            >/</span>
            <input
              class="FormDate__input FormDate__input--month"
              type="text"
              ref="month"
              v-model="month_picked"
              placeholder="mm">
            <span
              class="FormDate__divider"
            >/</span>
            <input
              class="FormDate__input FormDate__input--day"
              type="text"
              ref="day"
              v-model="day_picked"
              placeholder="dd">
            <button
              @click="getScores()"
              type="button"
              >Get Scores</button>
              </form>
          <!-- </div> -->
        <br><br>
        <table class="table table-hover"  v-if="games">
          <thead>
            <tr>
              <!-- <th scope="col">Game</th> -->
              <th scope="col">Away</th>
              <th scope="col">Score</th>
              <th scope="col">Home</th>
              <th scope="col">Score</th>
              <th scope="col">    </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
           <tr v-for="game in games">
             <td>{{ game.away.team_name }}</td>
             <table class="table table-hover"  v-if="showPlayers">
               <thead>
                 <tr>
                   <th scope="col">Away Players</th>
                   <th scope="col">Expected Runs</th>
                   <th></th>
                 </tr>
               </thead>
               <tbody>
                <tr v-for="player in game.away.players">
                  <td>{{ player.player_name }}</td>
                  <td>{{ player.player_exp_runs }}</td>
                </tr>
              </tbody>
             </table>
             <td>{{ game.away.team_prediction }}</td>
             <td>{{ game.home.team_name }}</td>
             <table class="table table-hover"  v-if="showPlayers">
               <thead>
                 <tr>
                   <th scope="col">Home Players</th>
                   <th scope="col">Expected Runs</th>
                   <th></th>
                 </tr>
               </thead>
               <tbody>
                <tr v-for="player in game.home.players">
                  <td>{{ player.player_name }}</td>
                  <td>{{ player.player_exp_runs }}</td>
                </tr>
              </tbody>
             </table>
             <td>{{ game.home.team_prediction }}</td>
             <button
                @click="displayPlayers()"
                type="button"
              >Show Players </button>
           </tr>
         </tbody>
        </table>
    </div>
  <!-- </div> -->
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      games: null,
      year_picked: null,
      month_picked: null,
      day_picked: null,
      showPlayers: false
    };
  },
  methods: {
  getDate(){
    this.year_picked = this.$refs.year.value
    this.month_picked = this.$refs.month.value
    this.day_picked = this.$refs.day.value
    console.log(this.year_picked, this.month_picked, this.day_picked)
    let formatted_date =  `${this.year_picked}-${this.month_picked}-${this.day_picked}`

  },
  getScores() {
    this.year_picked = this.$refs.year.value
    this.month_picked = this.$refs.month.value
    this.day_picked = this.$refs.day.value
    console.log(this.year_picked, this.month_picked, this.day_picked)
    let formatted_date =  `${this.year_picked}-${this.month_picked}-${this.day_picked}`
      const path = `http://127.0.0.1:5000/scorepredictions/${formatted_date}`;
      return new Promise ((resolve, reject) => {
      axios(path)
        .then((res) => {
          console.log(res.data)
          this.games = res.data;
          console.log(`This games: ${this.games}`)
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
      })
  },


  displayPlayers() {
    this.showPlayers = !this.showPlayers
  },
  //mounted() {
    //this.getScores();
  //},
},
};
</script>

<!-- <style>
  .FormDate__input--year,
  .FormDate__input--month,
  .FormDate__input--day
  {
    display: inline;
  }
</style> -->
