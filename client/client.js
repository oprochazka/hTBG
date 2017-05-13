Client = {
    connection : null,

    initModule : function() 
    {
        window.WebSocket = window.WebSocket || window.MozWebSocket;

        // if browser doesn't support WebSocket, just show some notification and exit
        if (!window.WebSocket) {
           
            return;
        }

        this.connection = new WebSocket('ws://'+ GameEngine.ip +':1337');

        this._onOpenConnection();
        this._onError();
        this._onMessage();
        this._setInterval();

    },

    sendMessage : function (msg)
    {
        var message = JSON.stringify(msg);
        this.connection.send(message);
    },

    sendActionMessage : function(msg, player)
    {        
        if(GameEngine.gameManager.getControllPlayer() == player || GameEngine.allMove)
        {
            msg.sender = player.id;
            this.sendMessage(msg);
        }
    },

    _onOpenConnection : function()
    {
        this.connection.onopen = function () {

            var person = window.prompt("Your Name: ","NoOne");
            var password = window.prompt("Password: ","");

            if(person && person != "")
            {
              GameEngine.addPlayer(person, password); 
              GameEngine.yourName = person;
            }        
        };
    },

    _onError : function()
    {
        this.connection.onerror = function (error) {
            // just in there were some problems with conenction...
            content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
                                        + 'connection or the server is down.' } ));
        };
    },

    _actionMsg : function(msg, player)
    {
        


    },

    _onMessage : function()
    {
        this.connection.onmessage = function (message) {
            try {
                var json = JSON.parse(message.data);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ', message.data);
                return;
            }

            if(json.type == "players")
            {            
                GameEngine.gameManager.loadPlayers(json.data);
            }

            if(json.type == "field")
            {
                GameEngine.startGame(json);
            }

            
            if(json.type == "addPlayer")
            {         
                GameEngine.addServerPlayer(json.player);
            }

            if(json.type == "attack")
            {
                var field = Field.findById(json.id);
                var fieldDef = Field.findById(json.idDef);

                if(field && fieldDef)
                {                 
                    field.onAttack(fieldDef);
                }
            }

            if(json.type == "moving")
            {                
                var field = Field.findById(json.id);

                if(field)
                {                                 
                    field.onMove(json.x, json.y, json.speed);
                }                
            }

            if(json.type == "buildObject")
            {
                var player = GameEngine.gameManager.findPlayer(json.player.playerId);                            

                player.buildObject(json.player, json.data);         
            }

            if(json.type == "clameBuilding")
            {
                var player = GameEngine.gameManager.findPlayer(json.playerId);
                var building = Field.findById(json.buildingId);
                player.addBuilding(building);            
            }
            console.log(json.type, json.playerId)
            if(json.type == "newTurn")
            {            
                GameEngine.newTurn(json.playerId);                
            }
        };
    },


    _setInterval : function()
    {
        var connection = this.connection;
        setInterval(function() {
            if (connection.readyState !== 1) {
                status.text('Error');
                
            }
        }, 3000);
    }

};