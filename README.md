- Copy everything in the temp/ folder to your local web server. There are 2 reasons for this:

  + Right now I haven't figured out why filesystem paths do not work with Samsung SDK's video player, so we'll have to use
    http urls => we'll have to put videos to a web server (in future versions we're gonna stream videos anyway)    

  + Since we'll have to put videos to a web server, better to use local for performance

- Modify the movie urls and thumbnail urls in temp/MovieList.json to point to where you copied those files

- Open app/App.js, find (Ctrl-F) "getJSON" and modify the url to the MovieList.json file to the one inside your web server

- Run app