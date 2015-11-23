function backward()
{
    var currentMusic = localStorage.getItem('currentMusic');
    var currentPlaylist = localStorage.getItem('currentPlaylist');

    var jsonPlaylists = JSON.parse(localStorage.getItem('playlists'));
    var playlist = getPlaylist(jsonPlaylists.playlists, currentPlaylist);

    var index = getMusicIndex(playlist.musics, currentMusic);
    var length = playlist.musics.length;
    var isRandom = localStorage.getItem('random');

    if(isRandom == "false" || isRandom == false || isRandom == null || isRandom == "null")
    {
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
    else
    {
        var x = Math.floor((Math.random() * (length-1)));
        var music = playlist.musics[x];
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
    audio.onended =
        function() {
            var isRepeat = localStorage.getItem('repeat');
            if(isRepeat == "true")
            {
				document.getElementById('progress').value = 0;
                playFromList(fileName, url);
            }
            else if (isRepeat == "false")
            {
                forward();
            }
        };

    // "Lê" evento timeupdate e atualiza barra progress
    audio.addEventListener("timeupdate",
        function()
        {
            var currentTime = audio.currentTime;
            var duration = audio.duration;
            var progression = (100 * currentTime) / duration;
            document.getElementById('progress').value = progression;
        }
    );
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

function play()
{
    var audio = document.getElementById("music");
    if(audio.paused)
    {
        audio.play();
        document.getElementById('img-play').src='images/pause.png';
    }
    else
    {
        audio.pause();
        document.getElementById('img-play').src='images/play.png';
    }
}

function stop()
{
	var audio = document.getElementById("music");
	audio.pause();
    audio.load();
	document.getElementById("music-name").innerHTML = "LANG HOOSE PLAYER<img id=logo src=images/hand.png />";
    document.getElementById('img-play').src = 'images/play.png';
    document.getElementById('progress').value = 0;
}

function forward()
{
    var currentMusic = localStorage.getItem('currentMusic');
    var currentPlaylist = localStorage.getItem('currentPlaylist');

    var jsonPlaylists = JSON.parse(localStorage.getItem('playlists'));
    var playlist = getPlaylist(jsonPlaylists.playlists, currentPlaylist);

    var index = getMusicIndex(playlist.musics, currentMusic);
    var length = playlist.musics.length;
    var isRandom = localStorage.getItem('random');

    if(isRandom == "false" || isRandom == false || isRandom == null || isRandom == "null")
    {

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
    else
    {
        var x = Math.floor((Math.random() * (length-1)));
        var music = playlist.musics[x];
        playFromList(music.name, music.url);
    }
}

function volume()
{
	var volume = document.getElementById("volume").value;
	var audio = document.getElementById("music");

	audio.volume = volume / 10;
}

function randomize()
{
    var isRandom = localStorage.getItem('random');
    if(isRandom == null)
    {
        isRandom = false;
    }

    if(isRandom == true || isRandom == "true")
    {
        localStorage.setItem('random', false);
        document.getElementById('random').src='images/random.png';
    }
    else if (isRandom == false || isRandom == "false")
    {
        localStorage.setItem('random', true);
        document.getElementById('random').src='images/randomOn.png';
    }
}

function repeatMusic()
{
    var isRepeat = localStorage.getItem('repeat');
    if(isRepeat == null)
    {
        isRepeat = false;
    }

    if(isRepeat == true || isRepeat == "true")
    {
        localStorage.setItem('repeat', false);
        document.getElementById('repeat').src='images/repeat.png';
    }
    else if (isRepeat == false || isRepeat == "false")
    {
        localStorage.setItem('repeat', true);
        document.getElementById('repeat').src='images/repeatOn.png';
    }
}
