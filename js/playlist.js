function showPlaylists()
{
    var jsonPlaylists = JSON.parse(localStorage.getItem('playlists'));

	var visualList = document.getElementById("music-list");
	var list_item = "";

	for(i = 0; i < jsonPlaylists.playlists.length; i++)
	{
		var playlist = jsonPlaylists.playlists[i];

		var play_img = "<img id=img-play-list src=images/dark-play.png />";
		var removeMethod = "removePlayList(" + playlist.number + ")";
        var playMethod = "openPlaylist(\"" + playlist.name + "\")";
		var remove_img = "<img onClick=" + removeMethod + " id=img-remove-music src=images/remove.png />";
		list_item += "<li>";
        list_item += "<a onClick='" + playMethod + "'>" + play_img + playlist.name + "</a>";
        list_item += remove_img + "</li>";
	}

    visualList.innerHTML = list_item;
}

function openPlaylist(playlistName)
{
    var jsonPlaylists = JSON.parse(localStorage.getItem('playlists'));
    var playlist = getPlaylist(jsonPlaylists.playlists, playlistName);

    var visualList = document.getElementById("music-list");
    visualList.innerHTML = "";
    for (i = 0; i < playlist.musics.length; i++)
    {
		var fileName = playlist.musics[i].name;
        var objectUrl = playlist.musics[i].url;

        var play_img = "<img id=img-play-list src=images/dark-play.png />";
		var playMethod = "playFromList('" + fileName + "','" + objectUrl + "')";
		var removeMethod = "removeMusicFromList('" + fileName + "', '" + objectUrl + "', '" + playlist.name + "')";
		var remove_img = "<img onClick=\"" + removeMethod + "\" id=img-remove-music src=images/remove.png />";
        var list_item = "<li><a onClick=\""+ playMethod +"\">" + play_img + fileName.replace(".mp3", "") + "</a>" + remove_img + "</li>";
        visualList.innerHTML += list_item;
    }

    localStorage.setItem('currentPlaylist', playlistName);
}

function createPlaylist(fileList)
{
    var playlistInfo = JSON.parse(localStorage.getItem('playlists'));
    if(playlistInfo == null)
    {
        playlistInfo = initJSON();
    }

    if(fileList.length > 0)
    {
        addPlaylist(playlistInfo, fileList);
    }

	console.log(JSON.stringify(playlistInfo));
    console.log(playlistInfo.playlists.length);
    localStorage.setItem('playlists', JSON.stringify(playlistInfo));

    showPlaylists();
}

function addPlaylist(playlistInfo, fileList)
{
    playlistInfo.counter++;
    var playlistName = "Playlist " + getBiggerNumber(playlistInfo.playlists);

    var list = playlistInfo.counter - 1;
    playlistInfo.playlists[list] = playlistRecord(playlistName, getBiggerNumber(playlistInfo.playlists));

    for (i = 0; i < fileList.length; i++)
    {
        var musicName = fileList[i].name;
        var musicURL = URL.createObjectURL(fileList[i]);

        playlistInfo.playlists[list].musics[i] = musicRecord(musicName, musicURL, i+1);
    }
}

function getBiggerNumber(list)
{
    var bigger = 0;
    for(i = 0; i < list.length; i++)
    {
        if(list[i].number > bigger)
        {
            bigger = list[i].number;
        }
    }
    return bigger + 1;
}

function removePlayList(plNumber)
{
	var jsonPlaylists = JSON.parse(localStorage.getItem('playlists'));
    for (var i = 0; i < jsonPlaylists.playlists.length; i++) {
        if(jsonPlaylists.playlists[i].number == plNumber)
        {
            jsonPlaylists.playlists.splice(i,1);
            jsonPlaylists.counter--;
        }
    }

    console.log(JSON.stringify(jsonPlaylists));
    console.log(jsonPlaylists.playlists.length);
    localStorage.setItem('playlists', JSON.stringify(jsonPlaylists));
	showPlaylists();
}

function removeMusic(musicName, playlist)
{
    for (var i = 0; i < playlist.musics.length; i++) {
        if(playlist.musics[i].name == musicName)
        {
            playlist.musics.splice(i,1);
        }
    }

    console.log(JSON.stringify(playlist.musics));
}

function getPlaylist(list, playlistName)
{
    for(i = 0; i < list.length; i++)
    {
        if(list[i].name == playlistName)
        {
            return list[i];
        }
    }
}

function getMusicIndex(list, musicName)
{
    for(i = 0; i < list.length; i++)
    {
        if(list[i].name == musicName)
        {
            return i;
        }
    }
}

function initJSON()
{
    return  {
                "counter":0,
                "playlists":[]
            };
}

function playlistRecord(name, number)
{
    return  {
                "name":name,
                "musics"  :[],
                "number"  :number
            }
}

function musicRecord(name, url, number)
{
    return  {
                "name" :name,
                "url"   :url,
                "number":number
            }
}
