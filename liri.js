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
    showSong(userInput);
    break;
  case "movie-this":
    showMovieInfo(process.argv[3]);
    break;
  case "do-what-it-says":
    showWhatInfo();
    break;
}

function showConcertInfo(concertInfo) {}

function showSong(songInfo) {
  spotify.search({ type: "track", query: songInfo, limit: 3 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    // get needed data
    let songArtist = data.tracks.items[0].artists[0].name;
    let songName = data.tracks.items[0].name;
    let songPreviewURL = data.tracks.items[0].external_urls.spotify;
    let albumName = data.tracks.items[0].album.name;

    let songMessage = `${songName}\n${albumName}\n${songArtist}\nClick Below for a Preview\n${songPreviewURL}`;

    // let things = JSON.stringify(data);
    console.log(songMessage);
  });
}
function showMovieInfo(movieInfo) {}

function showWhatInfo() {}
