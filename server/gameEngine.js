require("./textureMap.js");
require("./tile.js");
require("./army.js");
require("./building.js");
require("./player.js");
require("./field.js");

GameEngine = {
	id : 0,
	Players : [],
	x : 0,
	y : 0,
	time : 0,
	currentPlayer : null,
	iPlayer : 0,
	tileW : 31,
	tileH : 20,
	allMove : false,

	startServerMap : function(path)
	{
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


		setInterval(this.onIter, 5000);
	},

	nextTurn : function(player)
	{		
		if(!this.currentPlayer || this.currentPlayer.id == player)
		{				
			if(this.currentPlayer)
			{
				this.currentPlayer.inTurn = false;
			}
			this.currentPlayer = this.Players[this.iPlayer%this.Players.length];			

			this.currentPlayer.newTurn();

			Server.sendBroadcast(JSON.stringify({type : "newTurn", "playerId" : this.currentPlayer.id}));

			this.iPlayer++;			
		}		
	},

	checkPassword : function(name, password)
	{
		for(var i = 0; i < this.Players.length; i++)
		{
			if(this.Players[i].name == name)
			{
				if(this.Players[i].password == password)
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
		for(var i = 0; i < this.Players.length; i++)
		{
			if(this.Players[i].name == name)
			{
				return;
			}
		}

		var player = Player.makePlayer(name);		

		player.password = password;

		this.Players[this.Players.length] = player;

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
						return player.buildFreeArmy("king", x, y);		
					}
				}
			}
		}
		else
		{
			player.buildFreeArmy("king", x, y);	
			player.buildFreeArmy("archer", x, y);	
			player.buildFreeArmy("horseman", x + 1, y);				
		}

		if(!this.currentPlayer)
		{			
			this.nextTurn(player);
		}

		console.log(this.currentPlayer);
	},

	findPlayer : function(id)
	{
		for(var i = 0; i < this.Players.length; i++)
		{
			if(this.Players[i].id == id)
			{
				return this.Players[i];
			}
		}
	},

	getControllPlayer : function()
	{
		for(var i = 0; i < this.Players.length; i++)
		{
			if(this.Players[i].controll)
			{
				return this.Players[i];
			}
		}
	},

	generateId : function()
	{
		return this.id++;
	},

	dumpPlayers : function()
	{
		var dumped = [];
		for(var i =0; i < this.Players.length; i++)
		{
			dumped[dumped.length] = this.Players[i].dump();
		}

		return dumped;
	},

	onIter : function () {
		this.time += 500;

		/*for(var i = 0; i < GameEngine.Players.length; i++)
		{
			var p = GameEngine.Players[i];

			for(var x = 0; x < p.building.length; x++)
			{		
				var id = p.building[x];
				var build = Field.findById(id);

				build.productArmy();
			}
		}*/

	}


}

return GameEngine;