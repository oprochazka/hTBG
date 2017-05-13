GameManager = {
	makeGameManager : function()
	{	
		var shared = GameManagerShared.makeGameManagerShared();

		var out = {
			newTurn: function(playerId)
			{
				var turnPlayer = this.findPlayer(playerId);

				this.turnPlayer = turnPlayer;
				this.currentPlayer = turnPlayer;
				
				turnPlayer.newTurn();
			},
			addServerPlayer : function(json)
			{
				
				var player = Player.makePlayer(json.name);

				player.load(json);

				this.players[this.players.length] = player;
			},
		};

		return Object.assign(shared, out);
	}
};