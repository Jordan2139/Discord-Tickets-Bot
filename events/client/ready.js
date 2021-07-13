const fs = require('fs');
const ms = require('ms');
const wait = require('util').promisify(setTimeout);
const { startupScreen } = require('../../util/boot.js');
let i = 0;

module.exports = (client, Hyperz, config) =>{
  
  let daPort = config["main_config"].port

        const express = require("express");
        const app = express()
        app.listen(daPort)

  startupScreen(client);
  changeStatus(client, config)

  async function changeStatus(client, config) {
    if (i >= config.presence_config.length) i = 0;
    await client.user.setPresence({
        activity: {
            name: config.presence_config[i].name,
            type: config.presence_config[i].type
        },
        status: config.presence_config[i].status
    });
    i++;
    setTimeout(() => {
        changeStatus(client, config);
    }, 10000)

};

}