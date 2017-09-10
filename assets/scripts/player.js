var album = [
  {
    title: "Mexican Jackpot",
    src: "assets/media/mexican-jackpot.mp3"
  },
  {
    title: "Hard Sun",
    src: "assets/media/hard-sun.m4a"
  },
  {
    title: "Ludivine",
    src: 'assets/media/Ludivine.mp3'
  }
];
var trackNumber = 0;
var trackCount = album.length;

$(document).ready(function(){
  var playPauseIcon = $('#play-pause-song i');
  var song = new Audio();
  initializePlayer(song, album[trackNumber]);

  $('#play-pause-song').on('click', function(){
    togglePlay(song, playPauseIcon);
  });

  $('#next-song').on('click', function(){
    setSongSrc(song, nextSong());
    playSong(song, playPauseIcon );
    updateTitle(album[trackNumber]);
  });

  $('#previous-song').on('click', function(){
    setSongSrc(song, previousSong());
    playSong(song, playPauseIcon );
    updateTitle(album[trackNumber]);
  });
});

var initializePlayer = function (song, songData) {
    setSongSrc(song, songData.src);
    updateTitle(songData);
    startTime(song);
    autoNext(song);
    updateDuration(song);
};

var updateTitle = function(songData) {
  $('#song-title').text(songData.title);
}

var updateDuration = function(song) {
  song.addEventListener('loadedmetadata',function() {
    $('#duration').text('/ ' + formatTime(song.duration));
  });
};

var togglePlay = function(song, icon) {
  song.paused ? playSong(song, icon) : pauseSong(song, icon)
};

var setSongSrc = function(song, songSrc) {
  song.src = songSrc
};

var nextSong = function() {
  upTrackNumber();
  return album[trackNumber].src
};

var previousSong = function() {
  downTrackNumber();
  return album[trackNumber].src
};

var pauseSong = function(song, icon) {
  song.pause();
  icon.removeClass('fa-pause');
  icon.addClass('fa-play');
};

var playSong = function(song, icon) {
  song.play();
  icon.removeClass('fa-play');
  icon.addClass('fa-pause');
};

var autoNext = function(song) {
  setInterval(function(){
    if (song.ended) {
      $( "#next-song" ).trigger( "click" );
    }
  }, 1000);
}

var startTime = function(song){
  setInterval(function(){
    $('#current-time').text(formatTime(song.currentTime));
  }, 500);
};

// makes sure tracknumber doesn't pass max or min
var upTrackNumber = function() {
  if(trackNumber >= (trackCount - 1) ){
    trackNumber = 0
  } else {
    trackNumber++
  }
};

var downTrackNumber = function() {
  if(trackNumber <= 0 ){
    trackNumber = (trackCount - 1)
  } else {
    trackNumber--
  }
};

// sets min and seconds to 00:00 format
var formatTime = function(songTime) {
  var d = new Date(songTime * 1000);
  time = addZero(d.getMinutes()) + ':' + addZero(d.getSeconds());
  return time
}

function addZero(i) {
    (i < 10) ? (i = "0" + i) : i
    return i;
}
