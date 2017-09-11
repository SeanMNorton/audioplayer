var album = [
  {
    title: "Traveler's Tune",
    src: "assets/media/travelersTune.mp3"
  },
  {
    title: "Tupelo",
    src: "assets/media/tupelo.mp3"
  }
];
var trackNumber = 0;
var trackCount = album.length;

$(document).ready(function(){
  var playPauseIcon = $('#play-pause-song i');
  var song = new Audio();
  initializePlayer(song, album[trackNumber]);

  $('#play-pause-song, player').on('click', function(){
    togglePlay(song, playPauseIcon);
  });

  $('#next-song').on('click', function(){
    setSongSrc(song, nextSong());
    playSong(song, playPauseIcon );
    updateTitle(album[trackNumber]);
    updateProgress(song);
  });

  $('#previous-song').on('click', function(){
    setSongSrc(song, previousSong());
    playSong(song, playPauseIcon );
    updateTitle(album[trackNumber]);
  });
});

var toggleControls = function() {
  $('#toggle-controls').click(function(){
    $('#audio-controls').toggle();
  });
};

var initializePlayer = function(song, songData) {
    setSongSrc(song, songData.src);
    updateTitle(songData);
    startTime(song);
    autoNext(song);
    updateDurationText(song);
    updateProgress(song);
    clickableProgressBar(song);
};

var clickableProgressBar = function(song) {
  $('#progress').click(function (e){
    var elm = $(this),
        maxWidth = elm.width(),
        xPosClick = e.pageX - elm.offset().left,
        width = (xPosClick / maxWidth) * 100,
        time = song.duration * (width/100);
    song.currentTime = time;
    updateProgress(song, width)
  });
};

var updateProgress = function(song, width = 0){
  var progressBar = document.getElementById("progress-bar"),
      width = width,
      interval = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      width = 0;
      clearInterval(interval);
    } else {
      width = (song.currentTime/song.duration) * 100;
      progressBar.style.width = width + '%';
    }
  }
};

var updateTitle = function(songData) {
  $('#song-title').text(songData.title);
}

var updateDurationText = function(song) {
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
