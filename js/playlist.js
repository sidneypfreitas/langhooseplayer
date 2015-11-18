function showPlaylists()
{
    var jsonPlaylists = JSON.parse(localStorage.getItem('playlists'));

	var visualList = document.getElementById("music-list");
	visualList.innerHTML = "";

	for(i = 0; i <= jsonPlaylists.playlists.length; i++)
	{
		var playlist = jsonPlaylists.playlists[i];

		var removeMethod = "removePlayList(" + playlist.number + ")";
		var remove_img = "<img onClick=" + removeMethod + " id=img-remove-music src=images/remove.png />";
		var list_item = "<li id=pl" + playlist.number + "><a>" + playlist.name + "</a>" + remove_img + "</li>";

		visualList.innerHTML += list_item;
	}

    document.getElementById("music-list").innerHTML += list_item;
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
    localStorage.setItem('playlists', JSON.stringify(playlistInfo));

    showPlaylists();
}

function addPlaylist(playlistInfo, fileList)
{
    playlistInfo.counter++;
    var playlistName = "Playlist " + playlistInfo.counter;

    var list = playlistInfo.counter - 1;
    playlistInfo.playlists[list] = playlistRecord(playlistName, playlistInfo.counter);

    for (i = 0; i < fileList.length; i++)
    {
        var musicName = fileList[i].name;
        var musicURL = URL.createObjectURL(fileList[i]);

        playlistInfo.playlists[list].musics[i] = musicRecord(musicName, musicURL, i+1);
    }
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
    localStorage.setItem('playlists', JSON.stringify(jsonPlaylists));
	showPlaylists();
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
