// Scene IDs
var SCENEID_MAIN = "Main";

function onStart () {
	// TODO : Add your Initilize code here
		
	var includePaths = [
		"app/App.js",
		"app/Video31.js",
		"app/FlashPlayer.js"
	];
	
	sf.core.loadJS(includePaths, function() {
	
		sf.scene.show(SCENEID_MAIN);
		sf.scene.focus(SCENEID_MAIN);
	});	
}

function onDestroy () {
	//stop your XHR or Ajax operation and put codes to distroy your application here	
}

alert("init.js loaded.");
