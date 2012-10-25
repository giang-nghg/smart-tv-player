/* REQUIRES:
*/

var v31_url = "";
var v31_state = null;

Video31_init = function() {

	sf.service.VideoPlayer.init({
		onstatechange: Video31_onVideoStateChange,
		onend: Video31_onVideoEnd,
		onerror: Video31_onVideoError
	});
	
	Video31_setVideoFullScreenKeyHandlers();	
	
	Video31_hide();
}

function Video31_show()
{
	sf.service.VideoPlayer.setZIndex(1000);
}

function Video31_hide()
{
	sf.service.VideoPlayer.setZIndex(-1000);
}

Video31_onVideoStateChange = function(state) {
	alert("onVideoStateChange()");
	alert("STATE: " + state);
	
	v31_state = state;
}

Video31_onVideoEnd = function() {
	alert("onVideoEnd()");
	Video31_setFullScreen(false);
}

Video31_onVideoError = function(error) {
	alert("onVideoError()");
	alert("ERROR: " + error);
}

Video31_setVideoFullScreenKeyHandlers = function() {
	// Handlers registered by sf.service.VideoPlayer.setKeyHandler() only work on full-screen mode
	// Handlers in partial mode are registered in Video31_handleKeyDown()
	
	sf.service.VideoPlayer.setKeyHandler(
		sf.key.ENTER, 
		function () {
			Video31_setFullScreen(false);
		}
	);
	sf.service.VideoPlayer.setKeyHandler(
		sf.key.PLAY, 
		function () {
			if (v31_state == sf.service.VideoPlayer.STATE_PAUSED) {
				Video31_resume();
			} else {
				Video31_play();
				Video31_setFullScreen(true);
			}
		}
	);
	sf.service.VideoPlayer.setKeyHandler(
		sf.key.STOP, 
		function () {
			Video31_stop();
		}
	);
	sf.service.VideoPlayer.setKeyHandler(
		sf.key.PAUSE, 
		function () {
			if (v31_state == sf.service.VideoPlayer.STATE_PLAYING) {
				Video31_pause();
			} else if (v31_state == sf.service.VideoPlayer.STATE_PAUSED) {
				Video31_resume();
			}
		}
	);
}

Video31_setPlayerWindow = function(top, left, width, height) {

	sf.service.VideoPlayer.setPosition({
		top: top,
		left: left,
		width: width,
		height: height
	});
}

Video31_setFullScreen = function(isSet) {

	sf.service.VideoPlayer.setFullScreen(isSet);
}

Video31_loadVideo = function(url) {
	
	v31_url = url;
}

Video31_play = function() {

	Video31_stop();
	sf.service.VideoPlayer.play({
		url: v31_url
	});
}

Video31_stop = function() {

	sf.service.VideoPlayer.stop();
}

Video31_pause = function() {

	sf.service.VideoPlayer.pause();
}

Video31_resume = function() {

	sf.service.VideoPlayer.resume();
}

Video31_handleKeyDown = function(keyCode) {

	switch(keyCode) {
	
		case sf.key.ENTER:
			Video31_setFullScreen(true);
			break;
		case sf.key.PLAY:
			if (v31_state == sf.service.VideoPlayer.STATE_PAUSED) {
				Video31_resume();
			} else {
				Video31_play();
			}
			break;
		case sf.key.STOP:
			Video31_stop();
			break;
		case sf.key.PAUSE:
			if (v31_state == sf.service.VideoPlayer.STATE_PLAYING) {
				Video31_pause();
			} else if (v31_state == sf.service.VideoPlayer.STATE_PAUSED) {
				Video31_resume();
			}
			break;
	}
}