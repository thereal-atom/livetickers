const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const fetch = require("node-fetch");

client.once('ready', () => {
	console.log('Ready!');
});

async function doshit(message) {

    const api_url = (`https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
      const response = await fetch(api_url);
      const data = await response.json();
      const { cardano } = data

      const change = parseFloat(cardano.usd_24h_change).toFixed(2);
      const vol = parseFloat(cardano.usd_24h_vol).toFixed(0);

      const priceEmbed = new Discord.MessageEmbed()
        .setColor('0000ff')
        .setTitle('Cardano')
        .addFields(

            {name: 'Price', value: `$${cardano.usd}`, inline: true},
            {name: '24h Change', value: `${change}%`, inline: true },
            {name: '24h Volume', value: `${vol}`, inline: true}
        )
        //.setFooter(`${update}`, message.author.displayAvatarURL())
      message.channel.send(priceEmbed)
      
}
async function doothershit(message) {

    const api_url = (`https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
      const response = await fetch(api_url);
      const data = await response.json();
      const { cardano } = data
      const change = parseFloat(cardano.usd_24h_change).toFixed(2);

      client.user.setActivity("24H @ "+`${change}`+"%", { type: 'WATCHING' })
      message.guild.me.setNickname('ADA @ ' + `${cardano.usd}`);
      
}

client.on('message', message => {

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase()
    
    doothershit(message);
    
        if (command === 'ada'){
            doshit(message);      
        }

});

client.login(token);
