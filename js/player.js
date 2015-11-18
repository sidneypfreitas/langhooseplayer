function backward(audio)
{
    audio.backward();
}

function play(audio)
{
    if (audio.paused)
    {
        document.getElementById('img-play').src='images/pause.png';
        audio.play();
    }
    else
    {
        document.getElementById('img-play').src='images/play.png';
        audio.pause();
    }
}

function playFromList(fileName, url)
{
    var audio = document.getElementById("music");
    audio.pause();
    audio.src = url;
    audio.play();
    document.getElementById("music-name").innerHTML = fileName;
    document.getElementById('img-play').src='images/pause.png';
}

function removeMusicFromList(fileName)
{
	var parent = document.getElementById("music-list");
	var child = document.getElementById(fileName);
	parent.removeChild(child);
}

function stop(audio)
{
    audio.load();
    document.getElementById('img-play').src='images/play.png';
}

function forward(audio)
{
    audio.forward();
}

var inputElement = document.getElementById("input");
inputElement.addEventListener("change", getMusic, false);

function getMusic(files) {
    var musicList = document.getElementById("music-list");
    if(files.length > 0 && musicList.childNodes.length == 0)
    {
        document.getElementById("music-name").innerHTML = files[0].name;
        var objectUrl = URL.createObjectURL(files[0]);
        document.getElementById("music").src = objectUrl;
    }

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
		var fileName = file.name;
        var objectUrl = URL.createObjectURL(file);
        var play_img = "<img id=img-play-list src=images/dark-play.png />"
		var remove_img = "<img onClick=\"removeMusicFromList('" + fileName.replace(/ /g,'') + "')\" id=img-remove-music src=images/remove.png />"
        var methods = "playFromList('" + file.name + "','" + objectUrl + "')";
        var list_item = "<li id=" + fileName.replace(/ /g,'') + "><a onClick=\""+ methods +"\">" + play_img + fileName + "</a>" + remove_img + "</li>";
        document.getElementById("music-list").innerHTML += list_item;
    }
}