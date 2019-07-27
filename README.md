#### liri-node-app

# Welcome to liri

With the liri node app users can ask node about some form of entertainment and recieve back information about that form.
The information is presented in the terminal screen and logged to a text file.

## inputs

The user engages with liri through the terminal.
user engages liri with th fllowing command line structure "node liri.js _command_ _search term_".

User can enter 4 commands.

- concert-this

  - User enters artist name and liri will call on the bandsintown api using axios and return the location and date of any concerts for the entered artist

- spotify-this-song

  - User enters songtitle and liri will cotact spotify to find the song and provide information about it, including a link to preview the song on Spotify

- movie-this

  - User enters a movie name and recieves back detailed inforamtion about that movie. User can call this feature without including a movie title, in which case they will recieve information about the movie "Mr. Nobody"

- do-what-it-says

  - user can call on liri to do-what-it-says, which will have liri consult a .txt file to fill in the liri search with a spotify song by the Backstreet Boys

## outputs

#### concert-this
![concert-this](assets/images/concert-this-SS.png)

#### spotify-this-song
![spotify-this-song](assets/images/spotify-this-song-SS.png)

#### movie-this
![movie-this](assets/images/movie-this-SS.png)

#### movie-this no input
![movie-this Blank](assets/images/movie-this-Blank-SS.png)

#### do-what-it-says
![do-what-it-says](assets/images/do-what-it-says-SS.png)

## further expansion

I think this program can be expanded in in functionality. With more time, I would start looking for error catching techniques along with expanding on teh randomness of the "do-what-it-says" function. Specifically accessing the random text file in a more elaborate fasion such as providing a random line or even converting to a JSON object itself.
