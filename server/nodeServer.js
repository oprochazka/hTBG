Object.assign = require('object-assign')

Server = {
    history : [],
    clients : [],
    getPixel : null,    

    initModule : function()
    {        
        var webSocketsServerPort = 1337;
        var webSocketServer = require('websocket').server;
        var http = require('http');

        GetPixel = require("get-pixels");

        var merge = require('merge'), original, cloned;

        require("./../shared/tilesDesc.js");   
        require("./../shared/buildingDesc.js");   
        require("./../shared/armyDesc.js");  
        
        require("./../shared/builderDesc.js");        
        
        require("./../shared/builderShared.js");        

        require("./../shared/fieldShared.js");
        require("./../shared/armyShared.js");
        require("./../shared/tileShared.js");
        require("./../shared/buildingShared.js");
        require("./../shared/playerShared.js");                             

        require("./gameEngine.js");       

        require("./../shared/objectDesc.js");
        

        var server = http.createServer(function(request, response) {
            
        });
        server.listen(webSocketsServerPort, function() {
            console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
        });

        this.wsServer = new webSocketServer({
            httpServer: server
        });

        this._onAccepting();

        //GameEngine.startServer();
        //TextureMap.loadTexture("./../maps/map1.png");
        GameEngine.startServerMap("./../maps/map1.png")
    },

    testing : function()
    {
       
    },

    sendBroadcast : function(msg)
    {
        console.log("sending", msg);
        for (var i=0; i < this.clients.length; i++) {
            this.clients[i].sendUTF(msg);
        }
    },

    _onActionMsg : function(json)
    {        

        if((json.sender != GameEngine.currentPlayer.id) && !GameEngine.allMove)
        {
            console.log("failed request", json, json.sender, GameEngine.currentPlayer.id );
            return;
        }        

       if(json.type == "moving")
        {        
            var field = Field.findById(json.id);            

            if(field)
            {                 
                field.moving(json.x, json.y);
            }
        }

        if(json.type == "attack")
        {        
            var field = Field.findById(json.id);
            var fieldDef = Field.findById(json.idDef);

            if(field && fieldDef)
            {                 
                field.attack(fieldDef);
            }
        }

    /*   if(json.type == "buildArmy")
        {        
            var building = Field.findById(json.buildingId);            

            if(building && building.name == "building")
            {                 
                building.buildArmy(json.productArmy);
            }
        }*/

        if(json.type == "buildObject")
        {        
            var builder = Field.findById(json.id);            
            console.log("producting", builder);
            if(builder)
            {                 
                builder.buildObject(json.productObject, json.x, json.y);
            }

        }

        if(json.type == "nextTurn")
        {                        
            GameEngine.nextTurn(json.player);
        }   
    },

    _onAccepting : function()
    {
        this.wsServer.on('request', function(request) {
            console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

            var connection = request.accept(null, request.origin); 
            
            var index = Server.clients.push(connection) - 1;
            var userName = false;
            var userColor = false;

            console.log((new Date()) + ' Connection accepted.');
            
            connection.on('message', function(message) {
                
                if (message.type === 'utf8') { 
                    var json = JSON.parse(message.utf8Data);
                   
                    if(json.type == "startPlayer")
                    {                       
                        if(!GameEngine.checkPassword(json.name, json.password))
                        {
                            return;
                        }

                        connection.sendUTF(JSON.stringify( {type : "players", data : GameEngine.dumpPlayers()}));
                        connection.sendUTF(JSON.stringify(Field.dumpField()));
                        GameEngine.addPlayer(json.name, json.password);

                        return;
                    }
                    Server._onActionMsg(json);
                }
            });

            connection.on('close', function(connection) {
                if (userName !== false && userColor !== false) {
                    console.log((new Date()) + " Peer "
                        + connection.remoteAddress + " disconnected.");                    
                    Server.clients.splice(index, 1);                    
                    colors.push(userColor);
                }
            });
        });
    }
}

Server.initModule();