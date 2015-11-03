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

function stop(audio)
{
	audio.load();
	document.getElementById('img-play').src='images/play.png';
}

function forward(audio)
{
	audio.forward();
}
