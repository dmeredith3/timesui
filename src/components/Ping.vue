<template>
  <div class="container">
    <!-- <div class="row"> -->
        <h1>MLB Simulated Game</h1>
        <br><br>
        <div class="btn-group" role="group">
          <button v-if="display_home" type="button" class="btn btn-success btn-sm" v-b-modal.home_player_position-modal>Add Home Player</button>
        </div>
        <div class="btn-group" role="group">
          <button v-if="display_away" type="button" class="btn btn-success btn-sm" v-b-modal.away_player_position-modal>Add Away Player</button>
        </div>

        <div v-if="ballpark_selection" class="btn-group" role="group">
          <button type="button" class="btn btn-success btn-sm" v-b-modal.ballpark-modal>Select Ballpark</button>
        </div>
        <div v-if=game_start class="btn-group" role="group">
          <button type="button" class="btn btn-info btn-sm">Next Play</button>
        </div>
        <div v-if=game_start class="btn-group" role="group">
          <button type="button" class="btn btn-info btn-sm">Intentional Walk</button>
        </div>
        <div v-if=game_start class="btn-group" role="group">
          <button type="button" class="btn btn-info btn-sm">Change Pitcher</button>
        </div>
        <div v-if=can_steal class="btn-group" role="group">
          <button type="button" class="btn btn-info btn-sm">Send Runner</button>
        </div>

        <br><br>

        <div v-if="display_home" class="btn-group" role="group">
          <button type="button" class="btn btn-info btn-sm" v-b-modal.autoselect-home-modal>Auto Select Home</button>
        </div>
        <div v-if="display_away" class="btn-group" role="group">
          <button type="button" class="btn btn-info btn-sm" v-b-modal.autoselect-away-modal>Auto Select Away</button>
        </div>

        <br><br>

        <div v-if="display_away" class="btn-group" role="group">
          <button type="button" class="btn btn-primary btn-sm" v-b-modal.away_player_position-modal>Play CPU</button>
        </div>


        <br><br>

        <div v-if="game_start" class="scoreboard">
          <table class="table table-hover">
            <thead>
              <tr>
                <th></th>
                <th scope="col">Home Team</th>
                <th scope="col">Away Team</th>
                <th scope="col">Outs</th>
                <th scope="col">Innning</th>
                <th></th>
              </tr>
            </thead>
            <tr>
              <td></td>
              <td>{{ home_runs }} </td>
              <td>{{ away_runs }}</td>
              <td>{{ outs }}</td>
              <td>{{ inning }}</td>
              <td></td>
            </tr>
            </table>
        </div>
        <br><br>


        <div v-if="team_selection" class="home_table">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Home Players</th>
                <th scope="col">Position</th>
                <th scope="col">AVR</th>
                <th scope="col">HR</th>
                <th scope="col">SB</th>
                <th></th>
              </tr>
            </thead>
          <draggable v-model="home_lineup" tag="tbody" :move="onMove">
            <tr v-for="player in home_lineup" :key="player.id" class="item">
              <td scope="row"> {{ player.player_name }}</td>
              <td>{{ player.position }}</td>
              <td>{{ player.avr }}</td>
              <td>{{ player.hr }}</td>
              <td>{{ player.sb }}</td>
            </tr>
            <!-- <button slot="header" @click="addPeople">Add</button> -->
          </draggable>
         <thead>
           <tr>
             <th scope="col">Home Starting Pitcher</th>
             <th scope="col">Position</th>
             <th scope="col">ERA</th>
             <th scope="col">WHIP</th>
             <th scope="col">W</th>
             <th></th>
           </tr>
         </thead>
         <tbody>
          <tr v-for="player in home_pitcher">
            <td>{{ player.player_name }}</td>
            <td>{{ player.position }}</td>
            <td>{{ player.era }}</td>
            <td>{{ player.whip }}</td>
            <td>{{ player.w }}</td>
         <tr>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th scope="col">Home Bullpen</th>
            <th scope="col">Position</th>
            <th scope="col">ERA</th>
            <th scope="col">WHIP</th>
            <th scope="col">K/9</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         <tr v-for="player in home_bullpen">
           <td>{{ player.player_name }}</td>
           <td>{{ player.position }}</td>
           <td>{{ player.era }}</td>
           <td>{{ player.whip }}</td>
           <td>{{ player.k_per_9 }}</td>
        <tr>
         </tr>
       </tbody>
       </table>
       </div>
       <div v-if="away_hitting" class="home_defense">
         <table class="table table-hover">
           <thead>
             <tr>
               <th></th>
               <th scope="col">  </th>
               <th scope="col">LF</th>
               <th scope="col">  </th>
               <th scope="col">CF</th>
               <th scope="col">  </th>
               <th scope="col">RF</th>
               <th scope="col">  </th>
               <th></th>
             </tr>
           </thead>
           <tr>
             <td></td>
             <td></td>
             <td>{{ home_defense[6].player }}</td>
             <td></td>
             <td>{{ home_defense[7].player }}</td>
             <td></td>
             <td>{{ home_defense[8].player }}</td>
             <td></td>
             <td></td>
           </tr>
        <thead>
          <tr>
            <th></th>
            <th scope="col">  </th>
            <th scope="col">  </th>
            <th scope="col">SS</th>
            <th scope="col">  </th>
            <th scope="col">2B</th>
            <th scope="col">  </th>
            <th scope="col">  </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         <tr>
           <td></td>
           <td></td>
           <td></td>
           <td>{{ home_defense[5].player }}</td>
           <td></td>
           <td>{{ home_defense[3].player }}</td>
           <td></td>
           <td></td>
           <td></td>
        <tr>
         </tr>
       </tbody>
       <thead>
         <tr>
           <th></th>
           <th scope="col">3B</th>
           <th scope="col">  </th>
           <th scope="col">  </th>
           <th scope="col"> P</th>
           <th scope="col">  </th>
           <th scope="col">  </th>
           <th scope="col">1B</th>
           <th></th>
         </tr>
       </thead>
       <tbody>
         <td></td>
         <td>{{ home_defense[4].player }}</td>
         <td></td>
         <td></td>
         <td>{{ home_defense[0].player }}</td>
         <td></td>
         <td></td>
         <td>{{ home_defense[2].player }}</td>
         <td></td>
       <tr>
        </tr>
        </tbody>
        <thead>
          <tr>
            <th></th>
            <th scope="col">  </th>
            <th scope="col">  </th>
            <th scope="col">RHB</th>
            <th scope="col">  </th>
            <th scope="col">LHB</th>
            <th scope="col">  </th>
            <th scope="col">  </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        <td></td>
        <td></td>
        <td></td>
        <td>{{ away_lineup[away_batting_num].player }}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      <tr>
       </tr>
      </tbody>
      <thead>
        <tr>
          <th></th>
          <th scope="col">  </th>
          <th scope="col">  </th>
          <th scope="col">  </th>
          <th scope="col">C </th>
          <th scope="col">  </th>
          <th scope="col">  </th>
          <th scope="col">  </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{{ home_defense[1].player }}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    <tr>
     </tr>
    </tbody>
      </table>
      </div>

       <div v-if="team_selection" class="away_table">
         <table class="table table-hover">
           <thead>
             <tr>
               <th scope="col">Away Players</th>
               <th scope="col">Position</th>
               <th scope="col">AVR</th>
               <th scope="col">HR</th>
               <th scope="col">SB</th>
               <th></th>
             </tr>
           </thead>
         <draggable v-model="away_lineup" tag="tbody" :move="onMove">
           <tr v-for="player in away_lineup" :key="player.id" class="item">
             <td scope="row"> {{ player.player_name }}</td>
             <td>{{ player.position }}</td>
             <td>{{ player.avr }}</td>
             <td>{{ player.hr }}</td>
             <td>{{ player.sb }}</td>
           </tr>
           <!-- <button slot="header" @click="addPeople">Add</button> -->
         </draggable>

        <thead>
          <tr>
            <th scope="col">Away Starting Pitcher</th>
            <th scope="col">Position</th>
            <th scope="col">ERA</th>
            <th scope="col">WHIP</th>
            <th scope="col">W</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         <tr v-for="player in away_pitcher">
           <td>{{ player.player_name }}</td>
           <td>{{ player.position }}</td>
           <td>{{ player.era }}</td>
           <td>{{ player.whip }}</td>
           <td>{{ player.w }}</td>
        <tr>
         </tr>
       </tbody>
       <thead>
         <tr>
           <th scope="col">Away Bullpen</th>
           <th scope="col">Position</th>
           <th scope="col">ERA</th>
           <th scope="col">WHIP</th>
           <th scope="col">K/9</th>
           <th></th>
         </tr>
       </thead>
       <tbody>
        <tr v-for="player in away_bullpen">
          <td>{{ player.player_name }}</td>
          <td>{{ player.position }}</td>
          <td>{{ player.era }}</td>
          <td>{{ player.whip }}</td>
          <td>{{ player.k_per_9 }}</td>
       <tr>
        </tr>
      </tbody>
      </table>
      </div>
        <b-modal ref="addHomePlayer"
                id="home_player_position-modal"
                title="Add a new player"
                hide-footer>
          <b-form @submit="getHomePlayers" class="w-100">
            <b-form-group id="form-position-group"
                label="Select a position"
                label-for="form-position-input">
                <b-form-select id="form-position-input"
                              v-model="addPlayerForm.position"
                              required
                              :options="positions_home"></b-form-select>
            </b-form-group>
            <b-button-group>
              <b-button type="submit" variant="primary" v-b-modal.player-modal>Get Players</b-button>
            </b-button-group>
            </b-form>
          </b-modal>
          <b-modal ref="addAwayPlayer"
                  id="away_player_position-modal"
                  title="Add a new player"
                  hide-footer>
            <b-form @submit="getAwayPlayers" class="w-100">
              <b-form-group id="form-position-group"
                  label="Select a position"
                  label-for="form-position-input">
                  <b-form-select id="form-position-input"
                                v-model="addPlayerForm.position"
                                required
                                :options="positions_away"></b-form-select>
              </b-form-group>
              <b-button-group>
                <b-button type="submit" variant="primary" v-b-modal.player-modal>Get Players</b-button>
              </b-button-group>
              </b-form>
            </b-modal>
          <b-modal ref="selectPlayer"
                      id="player-modal"
                      title="Add a new player"
                      hide-footer>
          <b-form @submit="onPlayerSubmit" class="w-100">
              <b-form-group v-if="selections_avail" id="form-player-player_name"
                          label="Player Name:"
                          label-for="form-player-input">
                          <b-form-select id="form-player-input"
                                        v-model="addPlayerForm.name"
                                        required
                                        :options="selections"></b-form-select>
              </b-form-group>
              <b-button-group>
                <b-button type="submit" variant="primary">Submit</b-button>
              </b-button-group>
          </b-form>
        </b-modal>
        <b-modal ref="selectBallpark"
                    id="ballpark-modal"
                    title="Select your ballpark"
                    hide-footer>
        <b-form @submit="onBallparkSubmit" class="w-100">
            <b-form-group id="form-ballpark"
                        label="Ballpark:"
                        label-for="form-ballpark-input">
                        <b-form-select id="form-ballpark-input"
                                      v-model="Ballpark"
                                      required
                                      :options="Ballparks"></b-form-select>
            </b-form-group>
            <b-button-group>
              <b-button type="submit" variant="primary">Start Game!</b-button>
            </b-button-group>
        </b-form>
      </b-modal>
      <b-modal ref="autoSelectHomeTeam"
                  id="autoselect-home-modal"
                  title="Select your team type:"
                  hide-footer>
      <b-form @submit="autoSelectHomeTeam" class="w-100">
          <b-form-group id="form-team_type"
                      label="Team Type:"
                      label-for="form-autoselect-input">
                      <b-form-select id="form-autoselect-input"
                                    v-model="team_type"
                                    required
                                    :options="team_type_options"></b-form-select>
          </b-form-group>
          <b-button-group>
            <b-button type="submit" variant="primary">Select team</b-button>
          </b-button-group>
      </b-form>
    </b-modal>
    <b-modal ref="autoSelectAwayTeam"
                id="autoselect-away-modal"
                title="Select your team type:"
                hide-footer>
    <b-form @submit="autoSelectAwayTeam" class="w-100">
        <b-form-group id="form-team_type"
                    label="Team Type:"
                    label-for="form-autoselect-input">
                    <b-form-select id="form-autoselect-input"
                                  v-model="team_type"
                                  required
                                  :options="team_type_options"></b-form-select>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Select team</b-button>
        </b-button-group>
    </b-form>
  </b-modal>
    </div>
  <!-- </div> -->
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      addPlayerForm: {
        name: '',
        batting_num: null,
        position: null,
        team: null,
      },
      selections: [
        { value: '', text: ''},
        { value: '', text: ''},
        { value: '', text: ''}
      ],
      team_type: null,
      team_type_options: [
        {value: 0, text: 'Average'},
        {value: 1, text: 'Power'},
        {value: 2, text: 'Speed'}
      ],
      Ballpark: null,
      Ballparks: [
        { value: 'Arizona Diamondbacks', text: 'Chase Field'},
        { value: 'Atlanta Braves', text: 'SunTrust Park'},
        { value: 'Baltimore Orioles', text: 'Camden Yards'},
        { value: 'Boston Red Sox', text: 'Fenway Park'},
        { value: 'Chicago Cubs', text: 'Wrigley Field'},
        { value: 'Chicago White Sox', text: 'Guarenteed Rate Field'},
        { value: 'Cincinnati Reds', text: 'Great America Ballpark'},
        { value: 'Cleveland Indians', text: 'Progressive Field'},
        { value: 'Colorado Rockies', text: 'Coors Field'},
        { value: 'Detroit Tigers', text: 'Comerica Park'},
        { value: 'Houston Astros', text: 'Minute Maid Park'},
        { value: 'Kansas City Royals', text: 'Kauffman Stadium'},
        { value: 'Los Angeles Angels', text: 'Angel Stadium'},
        { value: 'Los Angeles Dodgers', text: 'Dodger Stadium'},
        { value: 'Miami Marlins', text: 'Marlins Park'},
        { value: 'Milwaukee Brewers', text: 'Miller Park'},
        { value: 'Minnesota Twins', text: 'Target Field'},
        { value: 'New York Mets', text: 'Citi Field'},
        { value: 'New York Yankees', text: 'Yankee Stadium'},
        { value: 'Oakland Athletics', text: 'RingCentral Coliseum'},
        { value: 'Philadelphia Phillies', text: 'Citizens Bank Park'},
        { value: 'Pittsburgh Pirates', text: 'PNC Park'},
        { value: 'San Diego Padres', text: 'Petco Park'},
        { value: 'San Francisco Giants', text: 'Oracle Park'},
        { value: 'Seattle Mariners', text: 'T-Mobile Park'},
        { value: 'St. Louis Cardinals', text: 'Busch Stadium'},
        { value: 'Tampa Bay Rays', text: 'Tropicana Field'},
        { value: 'Texas Rangers', text: 'Globe Life Park'},
        { value: 'Toronto Blue Jays', text: 'Rogers Center'},
        { value: 'Washington Nationals', text: 'Nationals Park'}
      ],
      home_lineup: [
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
      ],
      home_pitcher: [
        { player_name: '',
          player_id: '',
          position: '',
          era: '',
          whip: '',
          w: '',
          "fixed": true,
        },
      ],
      home_bullpen: [
      { player_name: '',
        player_id: '',
        position: '',
        era: '',
        whip: '',
        k_per_9: '',
        "fixed": true,
      },
      { player_name: '',
        player_id: '',
        position: '',
        era: '',
        whip: '',
        k_per_9: '',
        "fixed": true,
      },
      { player_name: '',
        player_id: '',
        position: '',
        era: '',
        whip: '',
        k_per_9: '',
        "fixed": true,
      },
     ],
     home_defense: [
     { player: null,
       position: 'P',
       fielding_perc: .947,
       num_pitches: 0,
       status: 'Good'
     },
     { player: null,
       position: 'C',
       fielding_perc: null
     },
     { player: null,
       position: '1B',
       fielding_perc: null
     },
     { player: null,
       position: '2B',
       fielding_perc: null
     },
     { player: null,
       position: '3B',
       fielding_perc: null
     },
     { player: null,
       position: 'SS',
       fielding_perc: null
     },
     { player: null,
       position: 'LF',
       fielding_perc: null
     },
     { player: null,
       position: 'CF',
       fielding_perc: null
     },
     { player: null,
       position: 'RF',
       fielding_perc: null
     }
   ],
      away_lineup: [
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
        { player_name: '',
          player_id: '',
          position: '',
          avr: '',
          hr: '',
          sb: '',
          "fixed": true,
        },
      ],
      away_pitcher: [
        { player_name: '',
          player_id: '',
          position: '',
          era: '',
          whip: '',
          w: '',
          "fixed": true,
        },
      ],
      away_bullpen: [
      { player_name: '',
        player_id: '',
        position: '',
        era: '',
        whip: '',
        k_per_9: '',
        "fixed": true,
      },
      { player_name: '',
        player_id: '',
        position: '',
        era: '',
        whip: '',
        k_per_9: '',
        "fixed": true,
      },
      { player_name: '',
        player_id: '',
        position: '',
        era: '',
        whip: '',
        k_per_9: '',
        "fixed": true,
      },
      ],
      away_defense: [
      { player: null,
        position: 'P',
        fielding_perc: .947,
        num_pitches: 0,
        status: 'Good'
      },
      { player: null,
        position: 'C',
        fielding_perc: null
      },
      { player: null,
        position: '1B',
        fielding_perc: null
      },
      { player: null,
        position: '2B',
        fielding_perc: null
      },
      { player: null,
        position: '3B',
        fielding_perc: null
      },
      { player: null,
        position: 'SS',
        fielding_perc: null
      },
      { player: null,
        position: 'LF',
        fielding_perc: null
      },
      { player: null,
        position: 'CF',
        fielding_perc: null
      },
      { player: null,
        position: 'RF',
        fielding_perc: null
      }
    ],
      positions_home: [
        { value: '0', text: 'SP', disabled: false},
        { value: '1', text: 'RP', disabled: false},
        { value: '2', text: 'C', disabled: false},
        { value: '3', text: '1B', disabled: false},
        { value: '4', text: '2B', disabled: false},
        { value: '5', text: '3B', disabled: false},
        { value: '6', text: 'SS', disabled: false},
        { value: '7', text: 'LF', disabled: false},
        { value: '8', text: 'CF', disabled: false},
        { value: '9', text: 'RF', disabled: false},
        { value: '10', text: 'DH', disabled: false},
      ],
      batting_order_home: [
        { value: '1', text: '1', disabled: false },
        { value: '2', text: '2', disabled: false},
        { value: '3', text: '3', disabled: false },
        { value: '4', text: '4', disabled: false},
        { value: '5', text: '5', disabled: false },
        { value: '6', text: '6', disabled: false},
        { value: '7', text: '7', disabled: false },
        { value: '8', text: '8', disabled: false},
        { value: '9', text: '9', disabled: false},
      ],
      positions_away: [
        { value: '0', text: 'SP', disabled: false},
        { value: '1', text: 'RP', disabled: false},
        { value: '2', text: 'C', disabled: false },
        { value: '3', text: '1B', disabled: false},
        { value: '4', text: '2B', disabled: false },
        { value: '5', text: '3B', disabled: false},
        { value: '6', text: 'SS', disabled: false },
        { value: '7', text: 'LF', disabled: false},
        { value: '8', text: 'CF', disabled: false },
        { value: '9', text: 'RF', disabled: false},
        { value: '10', text: 'DH', disabled: false},
      ],
      batting_order_away: [
        { value: '1', text: '1', disabled: false },
        { value: '2', text: '2', disabled: false},
        { value: '3', text: '3', disabled: false },
        { value: '4', text: '4', disabled: false},
        { value: '5', text: '5', disabled: false },
        { value: '6', text: '6', disabled: false},
        { value: '7', text: '7', disabled: false },
        { value: '8', text: '8', disabled: false},
        { value: '9', text: '9', disabled: false},
      ],
      home_selection_num: 0,
      away_selection_num: 0,
      num_home_players: 0,
      num_away_players: 0,
      num_home_pitcher: 0,
      num_away_pitcher: 0,
      num_home_bullpen: 0,
      num_away_bullpen: 0,
      display_batting_order: null,
      rp_counter_home: 0,
      rp_counter_away: 0,
      selections_avail: null,
      team_selection: true,
      display_away: true,
      display_home: true,
      ballpark_selection: false,
      game_start: false,
      away_hitting: false,
      home_hitting: false,
      can_steal: false,
      ballpark: null,
      inning: 1,
      outs: 0,
      is_on_1B: false,
      is_on_2B: false,
      is_on_3B: false,
      home_runs: 0,
      away_runs: 0,
      home_batting_num: 0,
      away_batting_num: 0,
      data: null,
      url: null
    };
  },
  methods: {
      onMove({ relatedContext, draggedContext }) {
          const relatedElement = relatedContext.element;
          const draggedElement = draggedContext.element;
          return (
            (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
          );
      },
      initForm() {
        this.addPlayerForm.title = '';
        this.addPlayerForm.batting_num = null;
        this.addPlayerForm.team = null;
      },
      initPlayers() {
        this.selections[0].value = '';
        this.selections[0].text = '';
        this.selections[1].value = '';
        this.selections[1].text = '';
        this.selections[2].value = '';
        this.selections[2].text = '';
        this.display_batting_order = null,
        this.selections_avail = null;
      },
      // getHome() {
      //   const path = 'http://127.0.0.1:5000/hometeam';
      //   axios.get(path)
      //     .then((res) => {
      //       this.home_team = res.data.home_players;
      //       this.home_pitcher = res.data.home_pitcher;
      //       this.home_bullpen = res.data.home_bullpen
      //     })
      //     .catch((error) => {
      //       // eslint-disable-next-line
      //       console.error(error);
      //     });
      // },
      // getAway() {
      //   const path = 'http://127.0.0.1:5000/awayteam';
      //   axios.get(path)
      //     .then((res) => {
      //       this.away_team = res.data.away_players;
      //       this.away_pitcher = res.data.away_pitcher;
      //       this.away_bullpen = res.data.away_bullpen
      //     })
      //     .catch((error) => {
      //       // eslint-disable-next-line
      //       console.error(error);
      //     });
      // },
      addHome(payload){
        if(this.addPlayerForm.position == 0) {
          this.url = 'http://127.0.0.1:5000/hometeam/pitcher';
        }
        else if(this.addPlayerForm.position == 1) {
          this.url = 'http://127.0.0.1:5000/hometeam/bullpen';
        }
        else {
          this.url = 'http://127.0.0.1:5000/hometeam/players';
        }
        const path = this.url;
        axios.post(path, payload)
          .then((res) => {
            console.log(this.addPlayerForm.position)
            if(this.addPlayerForm.position == 0) {
              this.home_pitcher[0].player_name = res.data.player_name;
              this.home_pitcher[0].position = res.data.position;
              this.home_pitcher[0].player_id = res.data.player_id;
              this.home_pitcher[0].era = res.data.era;
              this.home_pitcher[0].w = res.data.wins;
              this.home_pitcher[0].whip = res.data.whip;
              this.home_pitcher[0].fixed = false;
              this.home_defense[0].player = res.data.player_name;
              this.num_home_pitcher += 1;
              this.addPlayerForm.position = null;
              console.log(this.home_pitcher)
            }
            else if (this.addPlayerForm.position == 1) {
              this.home_bullpen[this.num_home_bullpen].player_name = res.data.player_name;
              this.home_bullpen[this.num_home_bullpen].position = res.data.position;
              this.home_bullpen[this.num_home_bullpen].player_id = res.data.player_id;
              this.home_bullpen[this.num_home_bullpen].era = res.data.era;
              this.home_bullpen[this.num_home_bullpen].whip = res.data.whip;
              this.home_bullpen[this.num_home_bullpen].k_per_9 = res.data.k_per_9;
              this.home_bullpen[this.num_home_bullpen].fixed = false;
              this.num_home_bullpen += 1;
              this.addPlayerForm.position = null
            }
            else {
              this.home_lineup[this.num_home_players].player_name = res.data.player_name;
              this.home_lineup[this.num_home_players].position = res.data.position;
              this.home_lineup[this.num_home_players].player_id = res.data.player_id;
              this.home_lineup[this.num_home_players].avr = res.data.average;
              this.home_lineup[this.num_home_players].hr = res.data.homeruns;
              this.home_lineup[this.num_home_players].sb = res.data.stolen_bases;
              if(this.addPlayerForm.position != 10){
                this.home_defense[this.addPlayerForm.position - 1].fielding_perc = res.data.fielding_perc;
                this.home_defense[this.addPlayerForm.position - 1].player = res.data.player_name;
                console.log(this.home_defense);
              }
              this.home_lineup[this.num_home_players].fixed = false;
              this.num_home_players += 1;
              this.addPlayerForm.position = null
            }
            if(this.num_home_players == 9 && this.num_home_bullpen == 3 && this.num_home_pitcher == 1) {
              this.display_home = false;
              if(this.display_away == false){
                this.ballpark_selection = true;
              }
            }

            console.log(this.num_home_players)
            console.log(this.num_home_bullpen)
            console.log(this.num_home_pitcher)
          // this.getHome();
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
            // this.getHome();
          });
        },
      addAway(payload){
        if(this.addPlayerForm.position == 0) {
          this.url = 'http://127.0.0.1:5000/awayteam/pitcher';
        }
        else if(this.addPlayerForm.position == 1) {
          this.url = 'http://127.0.0.1:5000/awayteam/bullpen';
        }
        else {
          this.url = 'http://127.0.0.1:5000/awayteam/players';
        }
        const path = this.url;
        axios.post(path, payload)
          .then((res) => {
            if(this.addPlayerForm.position == 0) {
              this.away_pitcher[0].player_name = res.data.player_name;
              this.away_pitcher[0].position = res.data.position;
              this.away_pitcher[0].player_id = res.data.player_id;
              this.away_pitcher[0].era = res.data.era;
              this.away_pitcher[0].whip = res.data.whip;
              this.away_pitcher[0].w = res.data.wins;
              this.away_pitcher[0].fixed = false;
              this.away_defense[0].player = res.data.player_name;
              this.num_away_pitcher += 1;
              this.addPlayerForm.position = null
            }
            else if (this.addPlayerForm.position == 1) {
              this.away_bullpen[this.num_away_bullpen].player_name = res.data.player_name;
              this.away_bullpen[this.num_away_bullpen].position = res.data.position;
              this.away_bullpen[this.num_away_bullpen].player_id = res.data.player_id;
              this.away_bullpen[this.num_away_bullpen].era = res.data.era;
              this.away_bullpen[this.num_away_bullpen].whip = res.data.whip;
              this.away_bullpen[this.num_away_bullpen].k_per_9 = res.data.k_per_9;
              this.away_bullpen[this.num_away_bullpen].fixed = false;
              this.num_away_bullpen += 1;
              this.addPlayerForm.position = null
            }
            else {
              this.away_lineup[this.num_away_players].player_name = res.data.player_name;
              this.away_lineup[this.num_away_players].position = res.data.position;
              this.away_lineup[this.num_away_players].player_id = res.data.player_id;
              this.away_lineup[this.num_away_players].avr = res.data.average;
              this.away_lineup[this.num_away_players].hr = res.data.homeruns;
              this.away_lineup[this.num_away_players].sb = res.data.stolen_bases;
              this.away_lineup[this.num_away_players].fixed = false;
              if(this.addPlayerForm.position != 10){
                this.away_defense[this.addPlayerForm.position - 1].fielding_perc = res.data.fielding_perc;
                this.away_defense[this.addPlayerForm.position - 1].player = res.data.player_name;
                console.log(this.away_defense);
              }
              this.num_away_players += 1;
              this.addPlayerForm.position = null
            }
            if(this.num_away_players == 9 && this.num_away_bullpen == 3 && this.num_away_pitcher == 1) {
              this.display_away = false;
              if(this.display_home == false){
                this.ballpark_selection = true;
              }
            }
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.log(error);
            // this.getAway();
          });
      },
      onPlayerSubmit(evt) {
        evt.preventDefault();
        this.$refs.selectPlayer.hide();
        // if(this.addPlayerForm.position == '0') {
        //   const payload = this.addPlayerForm.name;
        if(this.addPlayerForm.position <= 1) {
          this.data = {
            player_name: this.addPlayerForm.name
          };
        }
        else {
          this.data = {
              players: [{
                player_name: this.addPlayerForm.name,
                batting_num: this.addPlayerForm.batting_num,
                position: this.addPlayerForm.position
              }]
          };
        }
        const payload = this.data;
        if(this.addPlayerForm.team == 'home') {
          this.addHome(payload);
        } else {
          this.addAway(payload);
        }
        //this.batting_order_home[(this.addPlayerForm.batting_num - 1)].disabled = true
        this.initForm();
        this.initPlayers();
      },
      getHomePlayers(evt) {
        this.$refs.addHomePlayer.hide();
        let formatted_position =  `${this.addPlayerForm.position}`
          evt.preventDefault();
          const path = `http://127.0.0.1:5000/select/${formatted_position}`;
          // return new Promise ((resolve, reject) => {
          axios.get(path)
            .then((res) => {
              this.selections[0].value = res.data[0]['player_name'];
              this.selections[1].value = res.data[1]['player_name'];
              this.selections[2].value = res.data[2]['player_name'];

              if(this.addPlayerForm.position == 0) {
                this.selections[0].text = res.data[0]['player_name'] + ' ERA: ' + res.data[0]['era'] + ' WHIP: ' + res.data[0]['whip'] + ' W: ' + res.data[0]['wins'];
                this.selections[1].text = res.data[1]['player_name'] + ' ERA: ' + res.data[1]['era'] + ' WHIP: ' + res.data[1]['whip'] + ' W: ' + res.data[1]['wins'];
                this.selections[2].text = res.data[2]['player_name'] + ' ERA: ' + res.data[2]['era'] + ' WHIP: ' + res.data[2]['whip'] + ' W: ' + res.data[2]['wins'];
              }
              else if (this.addPlayerForm.position == 1) {
                this.selections[0].text = res.data[0]['player_name'] + ' ERA: ' + res.data[0]['era'] + ' WHIP: ' + res.data[0]['whip'] + ' K/9: ' + res.data[0]['k_per_9'];
                this.selections[1].text = res.data[1]['player_name'] + ' ERA: ' + res.data[1]['era'] + ' WHIP: ' + res.data[1]['whip'] + ' K/9: ' + res.data[1]['k_per_9'];
                this.selections[2].text = res.data[2]['player_name'] + ' ERA: ' + res.data[2]['era'] + ' WHIP: ' + res.data[2]['whip'] + ' K/9: ' + res.data[2]['k_per_9'];
              }
              else {
                this.selections[0].text = res.data[0]['player_name'] + ' AVR: ' + res.data[0]['average'] + ' HR: ' + res.data[0]['homeruns'] + ' SB: ' + res.data[0]['stolen_bases'];
                this.selections[1].text = res.data[1]['player_name'] + ' AVR: ' + res.data[1]['average'] + ' HR: ' + res.data[1]['homeruns'] + ' SB: ' + res.data[1]['stolen_bases'];
                this.selections[2].text = res.data[2]['player_name'] + ' AVR: ' + res.data[2]['average'] + ' HR: ' + res.data[2]['homeruns'] + ' SB: ' + res.data[2]['stolen_bases'];
                this.display_batting_order = true;
              }

              if(this.addPlayerForm.position == '1') {
                this.rp_counter_home += 1;
                if(this. rp_counter_home == 3) {
                  this.positions_home[this.addPlayerForm.position].disabled = true;
                }
              }
              else {
                this.positions_home[this.addPlayerForm.position].disabled = true;
              }

              this.addPlayerForm.team = 'home';
              this.selections_avail = true;
              console.log(`Data: ${res.data}`)
            })
            .catch((error) => {
              // eslint-disable-next-line
              console.error(error);
            });
        // })
      },
    getAwayPlayers(evt) {
      this.$refs.addAwayPlayer.hide();
      let formatted_position =  `${this.addPlayerForm.position}`
        evt.preventDefault();
        const path = `http://127.0.0.1:5000/select/${formatted_position}`;
        // return new Promise ((resolve, reject) => {
        axios.get(path)
          .then((res) => {
            this.selections[0].value = res.data[0]['player_name'];
            this.selections[1].value = res.data[1]['player_name'];
            this.selections[2].value = res.data[2]['player_name'];

            if(this.addPlayerForm.position == 0) {
              this.selections[0].text = res.data[0]['player_name'] + ' ERA: ' + res.data[0]['era'] + ' WHIP: ' + res.data[0]['whip'] + ' W: ' + res.data[0]['wins'];
              this.selections[1].text = res.data[1]['player_name'] + ' ERA: ' + res.data[1]['era'] + ' WHIP: ' + res.data[1]['whip'] + ' W: ' + res.data[1]['wins'];
              this.selections[2].text = res.data[2]['player_name'] + ' ERA: ' + res.data[2]['era'] + ' WHIP: ' + res.data[2]['whip'] + ' W: ' + res.data[2]['wins'];
            }
            else if (this.addPlayerForm.position == 1) {
              this.selections[0].text = res.data[0]['player_name'] + ' ERA: ' + res.data[0]['era'] + ' WHIP: ' + res.data[0]['whip'] + ' K/9: ' + res.data[0]['k_per_9'];
              this.selections[1].text = res.data[1]['player_name'] + ' ERA: ' + res.data[1]['era'] + ' WHIP: ' + res.data[1]['whip'] + ' K/9: ' + res.data[1]['k_per_9'];
              this.selections[2].text = res.data[2]['player_name'] + ' ERA: ' + res.data[2]['era'] + ' WHIP: ' + res.data[2]['whip'] + ' K/9: ' + res.data[2]['k_per_9'];
            }
            else {
              this.selections[0].text = res.data[0]['player_name'] + ' AVR: ' + res.data[0]['average'] + ' HR: ' + res.data[0]['homeruns'] + ' SB: ' + res.data[0]['stolen_bases'];
              this.selections[1].text = res.data[1]['player_name'] + ' AVR: ' + res.data[1]['average'] + ' HR: ' + res.data[1]['homeruns'] + ' SB: ' + res.data[1]['stolen_bases'];
              this.selections[2].text = res.data[2]['player_name'] + ' AVR: ' + res.data[2]['average'] + ' HR: ' + res.data[2]['homeruns'] + ' SB: ' + res.data[2]['stolen_bases'];
              this.display_batting_order = true;
            }

            if(this.addPlayerForm.position == '1') {
              this.rp_counter_away += 1;
              if(this. rp_counter_away == 3) {
                this.positions_away[this.addPlayerForm.position].disabled = true;
              }
            }
            else {
              this.positions_away[this.addPlayerForm.position].disabled = true;
            }

            this.addPlayerForm.team = 'away';
            this.selections_avail = true;
            console.log(`Data: ${res.data}`)
          })
          .catch((error) => {
            // eslint-disable-next-line
            console.error(error);
          });
      // })
    },
    autoSelectAwayTeam(evt) {
      let team_type =  `${this.team_type}`
        evt.preventDefault();
        const path = `http://127.0.0.1:5000/autoSelect/${team_type}`;
    },
    onBallparkSubmit(evt) {
      evt.preventDefault();
      this.$refs.selectBallpark.hide();
      this.team_selection = false;
      this.ballpark_selection = false;
      this.game_start = true;
      this.away_hitting = true;
    },
  },
};
  </script>
  <style>
    .home_table, .away_table {
      width: 50%;
      float: left;
    }

  </style>
  };
</script>
