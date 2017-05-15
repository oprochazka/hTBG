require("./textureMap.js");
require("./tile.js");
require("./playerEntity.js");
require("./army.js");
require("./building.js");
require("./builder.js");
require("./player.js");
require("./field.js");
require("./gameManager");

GameEngine = {
	id : 0,
	x : 0,
	y : 0,	
	tileW : 31,
	tileH : 20,
	allMove : false,
	gameManager : null,
	playerPositions : null,

	colors : ["#9a1c0e", "#0e0e9a", "#970e9a", "#0d882d", "#e1b60b"],

	startServerMap : function(path, pathDesc)
	{
		this.gameManager = GameManager.makeGameManager();

		TextureMap.loadTexture(path, pathDesc);
	},

	startServer : function(w, h, mapArray, players, objects)
	{		
		if(mapArray)
		{
			Field.makeFieldByMap(w, h, mapArray, objects);
			this.playerPositions = players;
		}
		else
		{
			Field.makeField(this.tileW, this.tileH);	
		}
		
	},

	nextTurn : function(player)
	{		
		var result = this.gameManager.nextTurn(player);
		if(result)
		{
			Server.sendBroadcast(JSON.stringify({type : "newTurn", "playerId" : result.id}));
		}
	},

	checkPassword : function(name, password)
	{
		var players = this.gameManager.getPlayers();

		for(var i = 0; i < players.length; i++)
		{
			if(players[i].name == name)
			{
				if(players[i].password == password)
				{
					return true;
				}
				else
				{
					return false;
				}
			}
		}
		return true;

	},

	addPlayer : function(name, password)
	{
		var players = this.gameManager.getPlayers();

		for(var i = 0; i < players.length; i++)
		{
			if(players[i].name == name)
			{
				return;
			}
		}

		if(players.length == 5)
		{
			return;
		}

		var player = Player.makePlayer(name);	

		player.setColor(GameEngine.colors[players.length]);

		var playerPosition = Field.get2DFromIndex(this.playerPositions[players.length]);

		player.password = password;

		GameEngine.gameManager.addPlayer(player);

		Server.sendBroadcast(JSON.stringify({type : "addPlayer", player : player.dump()}));

		player.buildObject("king", playerPosition.x, playerPosition.y);	
		player.buildObject("builder", playerPosition.x + 1, playerPosition.y);	


		if(!this.gameManager.getCurrentPlayer())
		{			
			this.nextTurn(player);
		}		
	},

	generateId : function()
	{
		return this.id++;
	}
}

return GameEngine;