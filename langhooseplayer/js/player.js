var executionFileNameList = new Array();
var executionUrlList  = new Array();
var currentMusic  = new Array();

function backward()
{
    if(currentMusic != 0)
	{
		playFromList(executionFileNameList[currentMusic - 1], executionUrlList[currentMusic - 1]);
	}
	else
	{
		var listSize = executionFileNameList.length;
		playFromList(executionFileNameList[listSize - 1], executionUrlList[listSize - 1]);
	}
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

	currentMusic = executionUrlList.indexOf(url);
}

function removeMusicFromList(fileName, url)
{
	var parent = document.getElementById("music-list");
	var child = document.getElementById(fileName);
	parent.removeChild(child);

	var currentMusic = document.getElementById("music").src;
	if(url == currentMusic)
	{
		var audio = document.getElementById("music");
		audio.pause();
		document.getElementById("music").src = "";
		document.getElementById('img-play').src = 'images/play.png';
		document.getElementById("music-name").innerHTML = "";
	}
}

function stop(audio)
{
    audio.load();
    document.getElementById('img-play').src = 'images/play.png';
}

function forward()
{
	if((executionFileNameList.length -1) < currentMusic)
	{
		playFromList(executionFileNameList[currentMusic + 1], executionUrlList[currentMusic + 1]);
	}
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

		var listCounter = executionFileNameList.length;
		executionFileNameList[listCounter] = fileName;
		executionUrlList[listCounter] = objectUrl;

        var play_img = "<img id=img-play-list src=images/dark-play.png />";
		var playMethod = "playFromList('" + file.name + "','" + objectUrl + "')";
		var removeMethod = "removeMusicFromList('" + fileName.replace(/ /g,'') + "', '" + objectUrl + "')";
		var remove_img = "<img onClick=\"" + removeMethod + "\" id=img-remove-music src=images/remove.png />";
        var list_item = "<li id=" + fileName.replace(/ /g,'') + "><a onClick=\""+ playMethod +"\">" + play_img + fileName + "</a>" + remove_img + "</li>";
        document.getElementById("music-list").innerHTML += list_item;
    }
}
