window.$ = window.jQuery = require('jquery');
var fs = require('fs');
var rpc = require("./src/rpc.js");
var { remote, BrowserWindow, remote, shell } = require('electron');
var dialog = remote.dialog;
var mainWindow = remote.getCurrentWindow();
var size = mainWindow.getBounds();
var width = size.width;
var height = size.height;

$(document).ready(function() {
	
	// Fetch JSON data and added to fields values
 	$.getJSON("./src/config.json", function(jsdata) {
    json = jsdata;
		$("#content-details").val(json.textCfg.details);
		$("#content-state").val(json.textCfg.state);
		$("#content-client").val(json.clientID);
		$("#content-image").val(json.imageCfg.largeKey);
	});	

	// Event Listeners
	$("#execute-rpc").click(function() {
		rpc.setRPC();
		mainWindow.webContents.openDevTools() ;
		mainWindow.setSize(width + 240, height);
		width += 240;
		$("#execute-rpc").addClass("disabled");
	});
	
	$("#execute-default").click(function() {
		$("#content-details").val("Heya");
		$("#content-state").val("I'm using CustomRP");
		$("#content-client").val("462899335412318219");
		$("#content-image").val("test_large");
	});
	
	$("#execute-reset").click(function() {
		remote.app.relaunch();
		remote.app.exit(0);
	});
	
	$("#execute-out").click(function() {
		remote.app.exit(0);
	});
	
	$("#execute-advanced").click(function() {
		mainWindow.setSize(width, height + 125);
		height += 125;
		$("#execute-advanced").addClass("disabled");
		$("#ad1, #ad2, #ad3, #ad4").css({"display": "block"});
	});

	$("#save-rpc").click(function() {
		$("#save-rpc").addClass("disabled");
		//Save config file (config.json)
		$.getJSON("./src/config.json", function(jsdata) {
			jsdata = {
				textCfg: {
					details: $("#content-details").val(),
					state: $("#content-state").val()
				},
				imageCfg: {
					largeKey: $("#content-image").val(),
					largeText: "CustomRP"
				},
				timeCfg: {
					timeType: "start",
					whatTime: "0m"
				},
				clientID: $("#content-client").val()
			}
			fs.writeFile("./src/config.json", JSON.stringify(jsdata),  { mode: 0o755 }, function (err) {
				if(err){
					$("#save-state-error").css({
						"display": "block", 
						"animation": "fade 4s linear forwards"
					});
					console.log(err);
					mainWindow.webContents.openDevTools();
					return;
				}
				$("#save-state-sucess").css({
					"display": "block", 
					"animation": "fade 4s linear forwards"
				});
			});
		});
	});
});