require("dotenv").config();
const Spotify = require("node-spotify-api");
const axios = require("axios");


var keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);


// this const below was with a lot of help from Min
let swtichcase = process.argv[2];
const [node, js, c, ...arr] = process.argv;
let userInput = arr.join(" ");

// Figure out what to do based on argv 2
switch (swtichcase) {
  case "concert-this":
    showConcertInfo(userInput);
    break;
  case "spotify-this-song":
    showSongInfo(userInput);
    break;
  case "movie-this":
    showMovieInfo(process.argv[3]);
    break;
  case "do-what-it-says":
    showWhatInfo();
    break;
}

function showConcertInfo(concertInfo) {}

function showSongInfo(songInfo) {
  spotify.search({ type: "track", query: songInfo }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    // get needed data
    console.log(data);
  });
}
function showMovieInfo(movieInfo) {}

function showWhatInfo() {}
