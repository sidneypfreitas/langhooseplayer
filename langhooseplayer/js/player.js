function backward(audio)
{
	audio.backward();
}

function play(audio)
{
	if (audio.paused)
	{
		audio.play();
	}
	else
	{
		audio.pause();
	}
}

function stop(audio)
{
	audio.pause();
	audio.load();
}

function forward(audio)
{
	audio.forward();
}
