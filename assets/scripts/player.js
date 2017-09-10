var album = [
  {
    title: "Mexican Jackpot",
    src: "assets/media/mexican-jackpot.mp3"
  },
  {
    title: "Hard Sun",
    src: "assets/media/hard-sun.m4a"
  }
];
var trackNumber = 0;
var trackCount = album.length;

$(document).ready(function(){
  var playPauseIcon = $('.play-pause i');
  var songElement =  $('audio').get(0);
  initializePlayer(songElement, album[trackNumber]);

  $('.play-pause').on('click', function(){
    togglePlay(songElement, playPauseIcon);
  });

  $('.forward').on('click', function(){
    setSongSrc(songElement, nextSong());
    playSong(songElement, playPauseIcon );
  });

  $('.backward').on('click', function(){
    setSongSrc(songElement, previousSong());
    playSong(songElement, playPauseIcon );
  });

});

var initializePlayer = function (songElement, firstSong) {
    setSongSrc(songElement, firstSong.src);
    $('#audio-controls .title').text(firstSong.title  + " " + songElement.duration)
}
var togglePlay = function(song, icon) {
  if(song.paused)
    playSong(song, icon)
  else
    pauseSong(song, icon)
};
var setSongSrc = function(element, songSrc) {
  element.src = songSrc
}

var nextSong = function() {
  upTrackNumber();
  return album[trackNumber].src
}
var previousSong = function() {
  downTrackNumber();
  return album[trackNumber].src
}

var pauseSong = function(song, icon) {
  song.pause();
  icon.removeClass('fa-pause');
  icon.addClass('fa-play');
}
var playSong = function(song, icon) {
  song.play();
  icon.removeClass('fa-play');
  icon.addClass('fa-pause');
}

var upTrackNumber = function() {
  if(trackNumber >= (trackCount - 1) ){
    trackNumber = 0
  } else {
    trackNumber++
  }
}
var downTrackNumber = function() {
  if(trackNumber <= 0 ){
    trackNumber = (trackCount - 1)
  } else {
    trackNumber--
  }
}
