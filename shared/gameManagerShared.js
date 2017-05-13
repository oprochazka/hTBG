GameManagerShared = {
	makeGameManagerShared : function()
	{
		var out = {
			id : 0,
			players : [],
			x : 0,
			y : 0,
			currentPlayer : null,
			iPlayer : 0,
			tileW : 31,
			tileH : 20,
			allMove : false,

			addPlayer : function(player)
			{
				this.players[this.players.length] = player;
			},

			getCurrentPlayer : function()
			{
				return this.currentPlayer;
			},	

			getPlayers : function()
			{
				return this.players;
			},

			checkLivePlayers : function()
			{
				var count = 0;
				for(var i = 0; i < this.players.length; i++)
				{
					if(!this.players[i].defeat)
					{
						count++;
					}
				}

				return count;
			},

			lastLivePlayer : function()
			{
				for(var i = 0; i < this.players.length; i++)
				{
					if(!this.players[i].defeat)
					{
						return this.players[i];
					}
				}
			},

			endGame : function()
			{
				console.log("last Live player", this.lastLivePlayer());
			},

			nextTurn : function(player)
			{	
				var livePlayers = this.checkLivePlayers();

				if(livePlayers <= 1)
				{
					this.endGame();
				}

				if(!this.currentPlayer || this.currentPlayer.id == player)
				{				
					if(this.currentPlayer)
					{
						this.currentPlayer.inTurn = false;
					}
					this.currentPlayer = this.players[this.iPlayer%this.players.length];			

					this.currentPlayer.newTurn();					

					this.iPlayer++;		

					if(this.currentPlayer.defeat)
					{
						this.nextTurn(this.currentPlayer);
						return;
					}

					return this.currentPlayer;	
				}		
				return false;
			},

			removePlayer : function(player)
			{
				for(var i = 0; i < this.players.length; i++)
				{
					if(this.players[i] == player)
					{
						this.players.splice(i, 1);
					}
				}
			},

			dumpPlayers : function()
			{
				var dumped = [];
				for(var i =0; i < this.players.length; i++)
				{
					dumped[dumped.length] = this.players[i].dump();
				}

				return dumped;
			},

			loadPlayers : function(json)
			{	
				for(var i = 0; i < json.length; i++)
				{
					var obj = json[i];

					var player = Player.makePlayer(obj.name);

					player.load(obj);

					this.players[this.players.length] = player;			
				}			

			},

			findPlayer : function(id)
			{
				for(var i = 0; i < this.players.length; i++)
				{
					if(this.players[i].id == id)
					{
						return this.players[i];
					}
				}
			},

			getControllPlayer : function()
			{
				for(var i = 0; i < this.players.length; i++)
				{
					if(this.players[i].controll)
					{
						return this.players[i];
					}
				}
			}
		};

		return out;
	}
};