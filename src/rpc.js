/* DiscordCustomRP v1.0
A user-friendly way to use Rich Presence in Discord!

built with node.js and discord-rpc

author -  Devsaider#5593
repo -  https://github.com/scripthubteam/DiscordCustomRP
 */

const DiscordRPC = require('discord-rpc');
const fs = require('fs');
const parse = require('parse-duration')
const moment = require('moment')
const colors = require("colors")
let config

exports.setRPC = function () {
	console.log("Connecting RPC...".grey)
	console.log("Verifying configuration...".grey)
	
	if(fs.existsSync("./config.example.json") === true){
	console.log(`Configutarion Error!\nWe have detected that you still keep the file "config.example.json", please check that your custom data is inserted and change the name of the file to "config.json".\n- If you need help with this part, visit the repository documentation (see the help.txt file)`.red)
	process.exit()
	}
	
	
	try{
	config = require("./config.json")
	} catch(e) {
	console.error("Configutarion Error!\nIt is not possible to obtain information with the file config.json\n- If you need help with this part, visit the repository documentation (see the help.txt file)".red)
	process.exit()
	}
	
	const ClientId = config.clientID;
	var openTimestamp
	
	DiscordRPC.register(ClientId);
	
	const rpc = new DiscordRPC.Client({
	transport: 'ipc'
	});
	
	async function setActivity() {
	if (!rpc)
		return;
	
	
	var activity = {
		details: config.tCfg.details,
		state: config.tCfg.state,
		instance: false
	}
	
	// aka mini-icons
	if (config.iCfg.smallOptions == 'active') {
		activity.smallImageKey = config.iCfg.smallKey
		activity.smallImageText = config.iCfg.smallText
	}
	
	// aka principal icons
	if(config.iCfg.largeOptions == 'active'){
		activity.largeImageKey = config.iCfg.largeKey
		activity.largeImageText = config.iCfg.largeText
	}
	
	if (!openTimestamp) {
		openTimestamp = new Date();
	}
	
	if (config.timeCfg.timeType == 'start') {
		activity.startTimestamp = moment(openTimestamp).add(parse('-' + config.timeCfg.whatTime), 'ms').toDate();
	} else if (config.timeCfg.timeType == 'end') {
		activity.endTimestamp = moment(openTimestamp).add(parse(config.timeCfg.whatTime), 'ms').toDate();
	} else if (config.timeCfg.timeType == 'both') {
		activity.startTimestamp = moment(openTimestamp).add(parse('0s'), 'ms').toDate();
		activity.endTimestamp = moment(openTimestamp).add(parse(config.timeCfg.whatTime), 'ms').toDate();
	}
	rpc.setActivity(activity);
	}
	
	rpc.on('ready', () => {
	setActivity();
	let SisActive = "activated".green
	let LisActive = "activated".green
	if(config.iCfg.smallOptions !== 'active'){
		SisActive = "deactivated".red
		}
	if(config.iCfg.smallOptions !== 'active'){
		LisActive = "deactivated".red
		}
	console.log("DiscordCustomRP is connected.".underline.green)
		console.log("The small icons of the Rich Presence are:")
		console.log(SisActive)
		console.log("The large icons of the Rich Presence are:")
		console.log(LisActive)
	console.log("Running!".rainbow)
	setInterval(() => {
		setActivity();
	}, 60000);
	});
	
	rpc.login(ClientId).catch(console.error);
}