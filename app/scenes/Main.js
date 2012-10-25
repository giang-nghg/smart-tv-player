// CSS classes
var PLAYER_HIDDEN_CLASS = "hidden";

// Player IDs
var TRAILER_PLAYER_ID = 0;
var MOVIE_PLAYER_ID = 1;

// Currently selected player ID
var selectedPlayer = 0;

alert('SceneMain.js loaded');

function SceneMain() {
	
}

SceneMain.prototype.initialize = function () {
	alert("SceneMain.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here 
	// scene HTML and CSS will be loaded before this function is called		
}

SceneMain.prototype.handleShow = function (data) {
	alert("SceneMain.handleShow()");
	// this function will be called when the scene manager show this scene 
	
	// FIXME: Place this in scene's initialization
	// Init application
	App_init();
	
	//FlashPlayer_loadVideo(app_movies[app_selectedIdx].trailer);
	//Video31_loadVideo("http://50.57.180.237/videos/transformersdarkofthemoon_trlr_03_1080p_dl.mov");
	//Video25_loadVideo("http://giang271291.0fees.net/temp/sample_mpeg4.mp4");
}

SceneMain.prototype.handleHide = function () {
	alert("SceneMain.handleHide()");
	// this function will be called when the scene manager hide this scene  
}

SceneMain.prototype.handleFocus = function () {
	alert("SceneMain.handleFocus()");
	// this function will be called when the scene manager focus this scene
}

SceneMain.prototype.handleBlur = function () {
	alert("SceneMain.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
}

SceneMain.prototype.handleKeyDown = function (keyCode) {
	alert("SceneMain.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	
	App_handleKeyDown(keyCode);
	if (selectedPlayer == TRAILER_PLAYER_ID)
	{
		FlashPlayer_handleKeyDown(keyCode);
	}
	else if (selectedPlayer == MOVIE_PLAYER_ID)
	{
		Video31_handleKeyDown(keyCode);
	}
	
	switch (keyCode) {
		case sf.key.LEFT:
			break;
		case sf.key.RIGHT:
			break;
		case sf.key.UP:
			break;
		case sf.key.DOWN:
			break;
		case sf.key.ENTER:
			break;
	}
}