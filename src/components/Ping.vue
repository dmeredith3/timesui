<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>The greatest news app ever</title>
  </head>
  <body>
    <div class="container" id="app">
      <h3 class="text-center">VueNews</h3>
    </div>
    <!-- ./index.html -->
    <div class="columns medium-3" v-for="result in results">
      <div class="card">
        <div class="card-divider">
          {{ result.title}}
        </div>
        <div class="card-section">
          <p>{{ result.home.abstract }}.</p>
        </div>
      </div>
    </div>
  </body>
</html>

<script>
import axios from 'axios';

export default {
  el: '#app',
  data: {
    results: []
  },
  mounted() {
    axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=VBW5JsIRriqerGojIoFK8UcHvDDPtJdz")
    .then(response => {this.results = response.data.results})
  }
}
</script>
