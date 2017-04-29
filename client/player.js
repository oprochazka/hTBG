Player = {
	makePlayer : function(name)
	{
		var playerShared = PlayerShared.makePlayerShared(name);
		var oldNewTurn = playerShared.newTurn;		

		var nextTurnAudio = new Audio("./sound/endTurn.mp3");


		var player = {
			buildArmy : function(player, armyData)
			{			
                var army = Army.loadArmy(armyData);
                
                this.gold = player.gold;

             	Field.insertObject(army, armyData.position.x, armyData.position.y);
			},		

			setArmy : function(army)
			{
				this.army[this.army.length] = army;
			},
			
			load : function(json)
			{
				this.id = json.id;
				this.name = json.name;

				if(this.name != GameEngine.yourName)
				{
					this.setControll(false);
				}
				else
				{
					this.setControll(true);	
				}								

				this.color = json.color;
				this.gold = json.gold;

			},

			newTurn: function()
			{
				oldNewTurn.call(this);

				if(this.inTurn && this == GameEngine.getControllPlayer())
				{
					nextTurnAudio.play();
				}
			}

		};
		return Object.assign(playerShared, player)
	}
}