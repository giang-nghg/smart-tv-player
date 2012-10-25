/* REQUIRES:
*/

var fl_PLAYER_ID = "FlashPlayer";
var fl_FLASH_APP_PATH = "app/YoutubePlayer.swf";
var fl_STATE_PLAYING = 1;
var fl_STATE_STOPPED = -1;
var fl_STATE_PAUSED = 0;
		
var fl_url = "";
var fl_jQueryObject = null;
var fl_object = null;
var fl_state = null;
var fl_isFullScreen = false;
var fl_playerWidth = 0;
var fl_playerHeight = 0;

FlashPlayer_init = function() {

	app_previewView.append('<object type="application/x-shockwave-flash" class="hidden" id="'+fl_PLAYER_ID+'"><param name="movie" value="'+fl_FLASH_APP_PATH+'" /></object>');
	// $(...) is the jquery object, $(...)[0] == document.getElementById(...)
	fl_jQueryObject = $(app_previewView.selector+" #"+fl_PLAYER_ID);
	fl_object = fl_jQueryObject[0];
}

function FlashPlayer_show()
{
	fl_jQueryObject.removeClass(PLAYER_HIDDEN_CLASS);
}

function FlashPlayer_hide()
{
	fl_jQueryObject.addClass(PLAYER_HIDDEN_CLASS);
}

FlashPlayer_setPlayerWindow = function(top, left, width, height) {

	fl_playerWidth = width;
	fl_playerHeight = height;
	FlashPlayer_setPlayerSize(fl_playerWidth, fl_playerHeight);
}

FlashPlayer_setPlayerSize = function(width, height) {

	fl_object.width = width;
	fl_object.height = height;
}

FlashPlayer_toggleFullScreen = function() {

	fl_isFullScreen = !fl_isFullScreen;
	
	if (fl_isFullScreen) {
		FlashPlayer_setPlayerSize(1280, 720);
	} else {
		FlashPlayer_setPlayerSize(fl_playerWidth, fl_playerHeight);
	}
}

FlashPlayer_loadVideo = function(url) {
	
	fl_url = url;	
}

FlashPlayer_play = function() {

	fl_state = fl_STATE_PLAYING;
	fl_object.loadVideo(fl_url);
	fl_object.playVideo();
}

FlashPlayer_stop = function() {

	fl_state = fl_STATE_STOPPED;
	fl_object.stopVideo();
	fl_object.clearVideo();
}

FlashPlayer_pause = function() {

	fl_state = fl_STATE_PAUSED;
	fl_object.pauseVideo();
}

FlashPlayer_resume = function() {

	fl_state = fl_STATE_PLAYING;
	fl_object.playVideo();
}

FlashPlayer_handleKeyDown = function(keyCode) {

	switch(keyCode) {
	
		case sf.key.ENTER:
			FlashPlayer_toggleFullScreen();
			break;
		case sf.key.PLAY:
			if (fl_state == fl_STATE_PAUSED) {
				FlashPlayer_resume();
			} else {
				FlashPlayer_play();
			}
			break;
		case sf.key.STOP:
			FlashPlayer_stop();
			break;
		case sf.key.PAUSE:
			if (fl_state == fl_STATE_PLAYING)
				FlashPlayer_pause();
			else if (fl_state == fl_STATE_PAUSED)
				FlashPlayer_resume();
			break;
	}
}