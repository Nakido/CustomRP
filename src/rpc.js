/* DiscordCustomRP v1.0
A user-friendly way to use Rich Presence in Discord!
built with node.js and discord-rpc
author -  Devsaider#5593
repo -  https://github.com/scripthubteam/DiscordCustomRP
edit - Nakido
*/

const DiscordRPC = require("discord-rpc");
const fs = require("fs");
const parse = require("parse-duration");
const moment = require("moment");

exports.setRPC = function () {

console.log("Connecting RPC...");
console.log("Verifying configuration...");

let config = require("./config.json")
const ClientId = config.clientID;
let openTimestamp;

DiscordRPC.register(ClientId);

const rpc = new DiscordRPC.Client({
  transport: 'ipc'
});

async function setActivity() {
  if (!rpc)
    return;


  var activity = {
    details: config.textCfg.details,
    state: config.textCfg.state,
    largeImageKey: config.imageCfg.largeKey,
    largeImageText: config.imageCfg.largeText,
    instance: false
  }

  if (!openTimestamp) {
    openTimestamp = new Date();
  }

  if (config.timeCfg.timeType == "start") {
    activity.startTimestamp = moment(openTimestamp).add(parse("-" + config.timeCfg.whatTime), "ms").toDate();
  } else if (config.timeCfg.timeType == "end") {
    activity.endTimestamp = moment(openTimestamp).add(parse(config.timeCfg.whatTime), "ms").toDate();
  } else if (config.timeCfg.timeType == "both") {
    activity.startTimestamp = moment(openTimestamp).add(parse("0s"), "ms").toDate();
    activity.endTimestamp = moment(openTimestamp).add(parse(config.timeCfg.whatTime), "ms").toDate();
  }
  rpc.setActivity(activity);
}

rpc.on("ready", () => {
  setActivity();
  console.log("DiscordCustomRP is connected.");
  console.log("Running!");
  setInterval(() => {
    delete require.cache
    setActivity();
  }, 15000);
});

rpc.login(ClientId).catch(console.error);
}