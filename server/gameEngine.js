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

	colors : ["#9a1c0e", "#0e0e9a", "#970e9a", "#0d882d", "#e1b60b"],

	startServerMap : function(path)
	{
		this.gameManager = GameManager.makeGameManager();

		TextureMap.loadTexture(path);
	},

	startServer : function(w, h, mapArray)
	{
		if(mapArray)
		{
			Field.makeFieldByMap(w, h, mapArray);
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

		player.password = password;

		GameEngine.gameManager.addPlayer(player);

		Server.sendBroadcast(JSON.stringify({type : "addPlayer", player : player.dump()}));

		var x = Math.floor((Math.random() * this.tileW));
		var y = Math.floor((Math.random() * this.tileH));

		if(Field.getArmyObject(x,y))
		{
			for(var y = 0; y < this.tileH; y++)
			{
				for(var x = 0; x < this.tileW; x++)	
				{
					if(!Field.getArmyObject(x,y))
					{			
						return player.buildObject("king", x, y);		
					}
				}
			}
		}
		else
		{
			player.buildObject("king", x, y);	
			player.buildObject("archer", x + 2, y);	
			player.buildObject("horseman", x + 1, y);				
		}

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