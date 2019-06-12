<template>
  <div class="container">
    <div class="row">
        <h1>MLB Predicted Scores</h1>
        <hr><br><br>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <!-- <th scope="col">Game</th> -->
              <th scope="col">Home</th>
              <th scope="col">Score</th>
              <th scope="col">Away</th>
              <th scope="col">Score</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
           <tr v-for="game in games">
             <td>{{ game.game_1.away.team_name }}</td>
             <td>{{ game.game_1.away.score_prediction }}</td>
             <td>{{ game.game_1.home.team_name }}</td>
             <td>{{ game.game_1.home.score_prediction }}</td>
           </tr>
           <div>
             <div> {{games}}</div>
           </div>
         </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      games: [],
    };
  },
  methods: {
    getScores() {
      const path = 'http://127.0.0.1:5000/scorepredictions/2019-06-03';
      return axios(path, {
     method: 'POST',
     mode: 'no-cors',
     headers: {
       'Access-Control-Allow-Origin': '*',
       'Content-Type': 'application/json',
     },
     withCredentials: true,
     credentials: 'same-origin',
   })
        .then((res) => {
          this.games = res.data.games;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
  },
  created() {
    this.getScores();
  },
};
</script>
