var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('voiceStateUpdate', (old) => {
    logger.debug('old: ', old.d.member.user);
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if(message == 'Bot s2'){
        var mensagem = "São os seus oleos";
        switch(user){
            case 'dusavini': 
            mensagem = 'Edu s2'
            break;
            case 'kazi' :
            mensagem = "Zika s2"
            break;
        }
        logger.debug('Teste');
        bot.sendMessage({
            to: channelID,
            message: mensagem
        });
    }
    if(message == 'S' || message == 's' || message == 'Sim'){

        if(user =='Rafaelis' || user =='kazi' || user =='gihmell' || user=='dusavini'){
            bot.sendMessage({
                to: channelID,
                message: 'S'
            });
        }
        
    }
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!' + " " + user
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});