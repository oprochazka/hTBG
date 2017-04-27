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
	tileW : 24,
	tileH : 15,
	allMove : false,

	startServer : function()
	{
		Field.makeField(this.tileW, this.tileH);		

		setInterval(this.onIter, 5000);
	},

	nextTurn : function(player)
	{		

		if(!this.currentPlayer || this.currentPlayer.id == player)
		{				
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
						return player.buildKing(x, y);		
					}
				}
			}
		}
		else
		{
			player.buildKing(x, y);	
			player.buildArcher(x, y);		
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