function backward()
{
    var currentMusic = localStorage.getItem('currentMusic');
    var currentPlaylist = localStorage.getItem('currentPlaylist');

    var jsonPlaylists = JSON.parse(localStorage.getItem('playlists'));
    var playlist = getPlaylist(jsonPlaylists.playlists, currentPlaylist);

    var index = getMusicIndex(playlist.musics, currentMusic);

    if(index == 0)
    {
        var length = playlist.musics.length;
        var music = playlist.musics[length-1];
        playFromList(music.name, music.url);
    }
    else
    {
        var music = playlist.musics[index - 1];
        playFromList(music.name, music.url);
    }
}

function playFromList(fileName, url)
{
    var audio = document.getElementById("music");
    audio.src = url;
	volume();
    audio.play();
    document.getElementById("music-name").innerHTML = "Música: " + fileName.replace(".mp3", "") + "<img id=logo src=images/hand.png />";
    document.getElementById('img-play').src='images/pause.png';

    localStorage.setItem('currentMusic', fileName);

    // "Lê" evento de encerramento da música e chama o método para tocar a próxima
    audio.onended = function() {
        forward();
    };
}

function removeMusicFromList(fileName, url, playlistName)
{
    var jsonPlaylists = JSON.parse(localStorage.getItem('playlists'));
    var playlist = getPlaylist(jsonPlaylists.playlists, playlistName);
    removeMusic(fileName, playlist);
    localStorage.setItem('playlists', JSON.stringify(jsonPlaylists));

    var currentMusicUrl = document.getElementById("music").src;
    if(url == currentMusicUrl)
    {
        stop();
        document.getElementById("music").src = "";
    }

    openPlaylist(playlist.name);
}

function stop()
{
	var audio = document.getElementById("music");
	audio.pause();
    audio.load();
	document.getElementById("music-name").innerHTML = "LANG HOOSE PLAYER<img id=logo src=images/hand.png />";
    document.getElementById('img-play').src = 'images/play.png';
}

function forward()
{
    var currentMusic = localStorage.getItem('currentMusic');
    var currentPlaylist = localStorage.getItem('currentPlaylist');

    var jsonPlaylists = JSON.parse(localStorage.getItem('playlists'));
    var playlist = getPlaylist(jsonPlaylists.playlists, currentPlaylist);

    var index = getMusicIndex(playlist.musics, currentMusic);
    var length = playlist.musics.length;

    if(index == length-1)
    {
        var music = playlist.musics[0];
        playFromList(music.name, music.url);
    }
    else
    {
        var music = playlist.musics[index + 1];
        playFromList(music.name, music.url);
    }
}

function volume()
{
	var volume = document.getElementById("volume").value;
	var audio = document.getElementById("music");

	audio.volume = volume / 10;
}
