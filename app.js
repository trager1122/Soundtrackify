$(document).on("click", "#connect", function(){  



    const authEndpoint = 'https://accounts.spotify.com/authorize';
    
    
    const clientId = 'ffc5928010d940108535769e67ced9b0';
    const redirectUri = 'https://samuelbaetz.github.io/soundtrackbuilder/';
    const scopes = [
      
    ];
    
    
    if (!token) {
      window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
    }
    
    
    
    });
    
    const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
      if (item) {
        var parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
    window.location.hash = '';
    
    
    let token = hash.access_token;






var spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken(token);
spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err,data) {
    if (err) console.error(err);
    else var results = data.items[0].name;
    $('#results2').html('<h1>' + results + '</h1>')
    console.log(results)
  });
  
  $( document ).ajaxError(function() {
    Swal.fire({
    text: 'OH NO! Some lyrics cannot be found :(',
    target: 'body',
    customClass: {
      container: 'position-absolute'
    },
    toast: true,
    position: 'bottom-right'
  })
  
  
  });


  $(document).on("click", "#search", function(){
    
    
    
  spotifyApi.searchTracks($('#search1').val()).then(
      
    function (data) {
        
        console.log(data)
        for (var i = 0; i < 5; i++) {
            
      var results = data.tracks.items[i].name;
      var artist = data.tracks.items[i].artists[0].name;
      var link = data.tracks.items[i].external_urls.spotify
      console.log(artist)
      console.log(results)
      console.log(link)
      var p = $("<p>").text(results + " " + artist)
      var a = $('<a>'+ "Add" +'</a>')
        a.attr("href", data.tracks.items[i].external_urls.spotify)
      var content = $("#soundtrack");
      content.prepend(p)
      content.prepend(a)
      var queryURL = "https://orion.apiseeds.com/api/music/lyric/" + artist + "/" + results + "?apikey=SBJNOlBRhfayoBjkQVpzhTc79xTG4qAyVlnG9WsYOFtxkpoFELDxJsSejr16yC0o "
      $.ajax({
          url: queryURL,
          method: "GET"
    
      }).then(function(response) {
          console.log('response:', response)
          console.log('artistName:', response.result.artist.name)
          var trackName = $('<strong>').text("Track: " + response.result.track.name);
          console.log('trackName:', response.result.track.name)
          var trackLyrics = $('<p>').text("Lyrics: " + response.result.track.text);
          
          $('#lyricsDisplay').append(trackName, trackLyrics);
      });

      
      
        }
      },
      function (err) {
        console.error(err);
      }

      );

  });
  


  $(document).on("click", "#remove", function(){
    function clearLyrics() {
        $('#lyricsDisplay').empty();
        $('#soundtrack').empty();
      }
    clearLyrics();

  });
 
  $(document).on("click", "#saveas", function(){
  var blob = new Blob([$('#lyricsDisplay').text()], {type: "text/plain;charset=utf-8"});
  window.saveAs(blob, "lyrics.txt");
  })