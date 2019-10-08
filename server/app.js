const server = require('http').createServer();
const io = require('socket.io')(server);
var mysql = require('mysql');

//Init Client array
global.connections = [];

global.sendData = Boolean;

//Init Key

setInterval(sendData, 1500);


io.on('connection', client => {

    console.log('New Client connected ..');

    if(connections.length < 1 ) {
        console.log('Reconnecting to Mysql ...');
        mySqlConnect().then(() =>{
            console.log('Database connection success.');
            sendData = true;

        }).catch(err =>{
            console.log(err);
        })
    }
    console.log(addConnection(client.id));

    client.on('disconnect', () => { 
        console.log(delConnection(client.id));
        if(connections.length < 1 ) {
            sendData = false;
            con.end();
            console.log('MySql closed due to inactivity')
        }

     });
  });

function sendData() {
    if(sendData == true){
        console.log(`Sending data to connected clients ${connections.length}`)
    } else {
        console.log('Awaiting for client to send data.')
    }
}



function addConnection(clientId){
    connections.push(clientId);
    console.log(connections)
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

function mySqlConnect(){
    return new Promise(function(resolve, reject){
        
        var connData = {
            host     : 'localhost',
            user     : 'root',
            password : '',
            database : 'vote_app'
          }

        global.con = mysql.createConnection(connData);
        con.connect(function(err){
            if (err) {
                console.log('Error when connecting to database.')
                reject(err);
            } else {
                resolve(true);
                console.log('Connection to database initialized.')
            }
        })
    })
}

server.listen(3051);

