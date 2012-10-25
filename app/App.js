// CSS classes
var APP_THUMBOBJ_CLASS = "ThumbObj";
var APP_SELECTED_THUMBOBJ_CLASS = "selected";
var APP_BUTTON_CLASS = "button";
var APP_SELECTED_BUTTON_CLASS = "selected";

// HTML view elements
var scene = null;
var app_mainView = null;
var app_thumbsView = null;
var app_previewView = null;
var app_infoView = null;
var app_titleView = null;
var app_yearView = null;
var app_castView = null;
var app_descView = null;
var app_buttonsView = null;

var app_selectedIdx = 0;
var app_movies = new Array();

function App_init()
{
	// Get HTML view elements
	scene = $("#Scene"+SCENEID_MAIN);
	app_mainView = $(scene.selector+" #MainView");
	app_previewView = $(app_mainView.selector+" #Preview");
	app_infoView = $(app_mainView.selector+" #InfoPanel");
	app_titleView = $(app_infoView.selector+" #Title");
	app_yearView = $(app_infoView.selector+" #Year");
	app_castView = $(app_infoView.selector+" #Cast");
	app_descView = $(app_infoView.selector+" #Description");	
	app_buttonsView = $(app_infoView.selector+" #Buttons");	
	app_thumbsView = $(scene.selector+" #ThumbsView");	
	
	// Get movie data
	jQuery.getJSON("http://localhost/tmp/MovieList.json", function(data) {
	
		app_movies = data.movies;
		
		// Display thumbnails
		for (var i = 0; i < app_movies.length; i++)
		{
			var thumbObj = "<div class='"+APP_THUMBOBJ_CLASS+"' id='"+APP_THUMBOBJ_CLASS+"_"+i+"'>"+
								"<div class='ThumbObj_id'>"+app_movies[i].id+"</div>"+
								"<img src='"+app_movies[i].thumb+"' alt='thumbnail' />"+
						   "</div>";
			app_thumbsView.append(thumbObj);
		}
		// DEBUG
		//window.location.reload();
		
		// Init players
		FlashPlayer_init();
		FlashPlayer_setPlayerWindow(0, 0, 953, 536);	 
		Video31_init();
		Video31_setPlayerWindow(0, 0, 953, 536);
		
		// FIXME: Create buttons in HTML view
		// Create buttons
		var buttons = ["Watch trailer", "Watch movie"];
		for (var i = 0; i < buttons.length; i++)
		{
			app_buttonsView.append("<div class='"+APP_BUTTON_CLASS+"' id='"+APP_BUTTON_CLASS+"_"+i+"'>"+buttons[i]+"</div>");
		}
		
		// FIXME: Put to initView() or sth
		// Misc HTML view init
		selectedPlayer = 0;
		App_highlightSelectedButton();					
		app_selectedIdx = 0;
		App_highlightSelectedThumbObj();		
	});
}

function App_highlightSelectedThumbObj()
{
	$("#"+APP_THUMBOBJ_CLASS+"_"+app_selectedIdx).addClass(APP_SELECTED_THUMBOBJ_CLASS);
	App_loadSelected();
}

function App_unhighlightSelectedThumbObj()
{
	$("#"+APP_THUMBOBJ_CLASS+"_"+app_selectedIdx).removeClass(APP_SELECTED_THUMBOBJ_CLASS);
}

function App_selectNext()
{
	App_unhighlightSelectedThumbObj();
	app_selectedIdx++;
	App_highlightSelectedThumbObj();
}

function App_selectPrev()
{
	App_unhighlightSelectedThumbObj();
	app_selectedIdx--;
	App_highlightSelectedThumbObj();
}

function App_loadSelected()
{
	app_titleView.html(app_movies[app_selectedIdx].title);
	app_yearView.html(app_movies[app_selectedIdx].year);
	app_castView.html(app_movies[app_selectedIdx].cast);
	app_descView.html(app_movies[app_selectedIdx].description);
	
	FlashPlayer_loadVideo(app_movies[app_selectedIdx].trailer);
	Video31_loadVideo(app_movies[app_selectedIdx].url);
}

function App_highlightSelectedButton()
{
	$("#"+APP_BUTTON_CLASS+"_"+selectedPlayer).addClass(APP_SELECTED_BUTTON_CLASS);
	if (selectedPlayer == TRAILER_PLAYER_ID)
	{
		Video31_hide();
		FlashPlayer_show();
	}
	else if (selectedPlayer == MOVIE_PLAYER_ID)
	{
		FlashPlayer_hide();
		Video31_show();
	}
}

function App_unhighlightSelectedButton()
{
	$("#"+APP_BUTTON_CLASS+"_"+selectedPlayer).removeClass(APP_SELECTED_BUTTON_CLASS);
}

function App_selectPrevButton()
{
	App_unhighlightSelectedButton()
	selectedPlayer--;
	App_highlightSelectedButton()
}

function App_selectNextButton()
{
	App_unhighlightSelectedButton()
	selectedPlayer++;
	App_highlightSelectedButton()
}

function App_handleKeyDown(keyCode)
{
	switch (keyCode) {
		case sf.key.LEFT:
			App_selectPrev();
			break;
		case sf.key.RIGHT:
			App_selectNext();
			break;
		case sf.key.UP:
			App_selectPrevButton();
			break;
		case sf.key.DOWN:
			App_selectNextButton();
			break;
		case sf.key.ENTER:
			break;
	}
}