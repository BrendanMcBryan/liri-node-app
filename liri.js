require("dotenv").config();
var fs = require("fs");
var moment = require("moment");
const Spotify = require("node-spotify-api");
const axios = require("axios");
const keys = require("./keys.js");

const spotify = new Spotify(keys.spotify);

function runswitch(command) {
  // this const below was with a lot of help from Min
  let swtichcase = command[2];
  const [node, js, c, ...arr] = command;
  let userInput = arr.join(" ");
  let userInputPlus = arr.join("+");
  if (userInputPlus === "") {
    let blankArr = "No Search Entered";
    logSearh(swtichcase, blankArr);
  } else {
    logSearh(swtichcase, arr);
  }
  // Figure out what to do based on argv 2
  switch (swtichcase) {
    case "concert-this":
      showConcertInfo(userInput);
      break;
    case "spotify-this-song":
      showSong(userInput);
      break;
    case "movie-this":
      if (userInputPlus === "") {
        let blankMovie = "Mr.+Nobody";
        showMovieInfo(blankMovie);
        break;
      } else {
        showMovieInfo(userInputPlus);
        break;
      }

    case "do-what-it-says":
      showWhatInfo();
      break;
  }
}

function showConcertInfo(concertInfo) {
  let query = `https://rest.bandsintown.com/artists/${concertInfo}/events?app_id=codingbootcamp`;
  // console.log(query);

  axios
    .get(query)
    .then(function(response) {
      let venueName = response.data[0].venue.name;
      let venueLocation = response.data[0].venue.city;
      let datetime = response.data[0].datetime;
      let showDate = moment(datetime).format("L");

      let concertMessage = `${venueName}\n${venueLocation}\n${showDate}`;
      console.log(concertMessage);
      logResults(concertMessage);
    })
    .catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

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
    logResults(songMessage);
  });
}

function showMovieInfo(movieInfo) {
  const omdbapiKey = `9b255380`;
  let query = `http://www.omdbapi.com/?t=${movieInfo}&apikey=${omdbapiKey}`;

  axios.get(query).then(function(response) {
    console.log(query);
    const {
      Title,
      Year,
      imdbRating,
      Country,
      Language,
      Plot,
      Ratings,
      Actors,
      imdbID
    } = response.data;
    const rottenTomatoRating = Ratings.filter(
      rating => rating.Source === "Rotten Tomatoes"
    )[0].Value;
    // console.log(rottenTomatoRating);
    let movieMessage = `${Title}\n${Year}\n${Country}, ${Language}\n${Plot}\n${Actors}\nIMDB Rating: ${imdbRating}\nRotten Tomatoes: ${rottenTomatoRating}`;
    console.log(movieMessage);
    logResults(movieMessage);

    //   console.log("The movie's rating is: " + response.data.imdbRating);
  });
}

function showWhatInfo() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(err);
    }
    let dataArr = data.split(",");
    dataArr.unshift("node", "liri");
    console.log(dataArr);
    runswitch(dataArr);
  });
}

function logSearh(command, search) {
  let rightnow = moment().format("LLL");
  let searchText = `\n## ${rightnow}\n### ${command}, ${search}`;

  fs.appendFile("log.txt", searchText, function(err) {
    if (err) {
      return console.log(err);
    }
    // console.log("Success!");
  });
}

function logResults(commandResult) {
  let logData = `\n${commandResult}\n`;
  fs.appendFile("log.txt", logData, function(err) {
    if (err) {
      return console.log(err);
    }
    // console.log("Success!");
  });
}

runswitch(process.argv);
