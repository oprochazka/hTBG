var WebSocketClient = require('websocket').client;
require("./../public/configure.js");

class SocketManager {
	constructor()
	{
		console.log(Configure);
		this.webSocketUrl = Configure.ip;
		this.webSocketsServerPort = Configure.gamePort;
    	
    	this.onStart();    
	}

	onStart()
    {
        this.client = new WebSocketClient();
		 
		this.client.on('connect', (connection) => {
			this.connection = connection;

		    console.log('WebSocket Client Connected');

		    connection.on('close', function() {
		        console.log('echo-protocol Connection Closed');
		    });

		    this._onMessage();
		    this._onError();
		});


		this.client.connect('ws://'+ this.webSocketUrl +':' + this.webSocketsServerPort);
    }


    sendMessage(msg)
    {
        var message = JSON.stringify(msg);
        this.connection.send(message);
    }

    sendActionMessage(msg, player)
    {        
        this.sendMessage(msg);
    }

    _onOpenConnection()
    {
        this.connection.onopen = function () {
           console.log("Connection opened");
        };
    }

    _onMessage()
    {
        this.connection.on('message', function(message) {
            try {
                var json = JSON.parse(message.data);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ', message.data);
                return;
            }

            if(json.type == "")
            {            
                
            }      
        });
    }

    _onError()
    {
	    this.connection.on('error', function(error) {
            // just in there were some problems with conenction...
            content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
                                        + 'connection or the server is down.' } ));
        });
    }

    _setInterval()
    {
        var connection = this.connection;
        setInterval(() => {
        //	console.log(connection)
            if (connection.readyState !== 1) {
                console.log('Error cannot connect to websocket');
            }            
        }, 3000);
    }
}

module.exports = SocketManager;