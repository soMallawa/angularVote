const server = require('http').createServer();
const io = require('socket.io')(server);
var redis = require("redis"), rclient = redis.createClient();
var bodyParser = require('body-parser');
const express = require('express')
const app = express();
const port = 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

//Init Client array
global.connections = [];

global.sendData = Boolean;
global.gotaVotes = null;
global.sajithVotes = null;
global.akdVotes = null;
global.maheshVotes = null;


rclient.on("error", function (err) {
    console.log("Error " + err);
});

rclient.on('connect', function() {
    console.log('Connected to redis server.');
    //ygsetInterval(sendData, 1500);
    rclient.exists('gota', function(err, reply) {
        if (reply === 1) {
            console.log('Keys exists.');
        } else {
            console.log(initRedisData());
        }
    });
});

io.on('connection', client => {

    console.log('New Client connected ..');

    if(connections.length < 1 ) {
        console.log('Reconnecting to Mysql ...');
        sendData = true;
        
    }
    
    console.log(addConnection(client.id));

    client.on('disconnect', () => { 
        console.log(delConnection(client.id));
        if(connections.length < 1 ) {
            sendData = false;
        }
        sendDataToClients();

     });
  });

  app.post('/api/addVote', (req, res) => {
    var key = req.body.key;
    var voteFor = req.body.voteFor;
    if (key === 'mana30623062' ) {
        addVote(voteFor);
        res.sendStatus(200);
        
    } else {
        res.send('Access Null');
    }
  })

function sendDataToClients() {
    if(sendData == true){
        console.log(`Sending data to connected clients ${connections.length}`)
        socketSendData();
    } else {
        console.log('Awaiting for client to send data.')
    }
}


function addVote (key) {
    rclient.incr(key);
    sendDataToClients();
}


function initRedisData() {
    rclient.set('gota', 0);
    rclient.set('sajith', 0);
    rclient.set('mahesh', 0);
    rclient.set('akd', 0);
    return 'Redis data init success.';
}

function addConnection(clientId){
    connections.push(clientId);
    console.log(connections)
    sendDataToClients();
    return connections.length;
}

function delConnection(clientId){
    var index = connections.indexOf(clientId);
    if (index > -1) {
        connections.splice(index, 1);
    }
    console.log(connections)
    return connections.length;
}

function socketSendData () {
    rclient.get('gota', function(err, reply) {
        if(reply) {
            let gotaV = Number(reply);
            rclient.get('sajith', function(err, reply) {
                if(reply) {
                    let sajithV = Number(reply); 
                    rclient.get('akd', function(err, reply) {
                        let akdV = Number(reply); 
                        rclient.get('mahesh', function(err, reply) {
                            let maheshV = Number(reply); 
                            let total = gotaV + sajithV + akdV + maheshV;

				console.log(total)
				

                            let gotaP = Math.floor(gotaV/total*100);
			    let sajithP = Math.floor(sajithV/total*100);
			    let akdP = Math.floor(akdV/total*100);
			    let maheshP = Math.floor(maheshV/total*100);

                            console.log(gotaP);
                            let data = {
                                    gota: gotaV,
                                    sajith: sajithV,
                                    akd: akdV,
                                    mahesh: maheshV,
				                    gotaP: gotaP, 
				                    sajithP: sajithP,
				                    akdP: akdP,
                                    maheshP: maheshP,
					pieData: [gotaV, sajithV, akdV, maheshV],
					total: total,
					onlineU: connections.length

                                                                    
				}
                                
                            io.emit('data', data);

                        });
                    });

                }
            });

        }
    });
}

function calcP (vnum, tvnum) {
    let result = (vnum / tvnum) * 10000;
    return result;
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
server.listen(3051);
