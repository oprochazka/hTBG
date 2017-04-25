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
        this.connection.send(msg);
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

    _onMessage : function()
    {
        this.connection.onmessage = function (message) {
            // try to parse JSON message. Because we know that the server always returns
            // JSON this should work without any problem but we should make sure that
            // the massage is not chunked or otherwise damaged.
            try {
                var json = JSON.parse(message.data);
            } catch (e) {
                console.log('This doesn\'t look like a valid JSON: ', message.data);
                return;
            }

            if(json.type == "players")
            {            
                GameEngine.loadPlayers(json.data);
            }

            if(json.type == "field")
            {
                GameEngine.startGame(json.data);
            }

            if(json.type == "moving")
            {                
                var field = Field.findById(json.id);

                if(field)
                {                 
                //    field.speed = json.speed;
                    field.insert(json.x, json.y);
                }
                
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
                    field.kill(fieldDef);
                }
            }

            if(json.type == "addArmy")
            {            
                var obj = json.data;
                var tile = Army.loadArmy(json.data);
                
                Field.insertObject(tile, obj.position.x, obj.position.y);                
            }

            if(json.type == "clameBuilding")
            {
                var player = GameEngine.findPlayer(json.playerId);
                var building = Field.findById(json.buildingId);
                player.addBuilding(building);            
            }

            if(json.type == "nextTurn")
            {            
                
                
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