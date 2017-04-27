Player = {
	makePlayer : function(name)
	{
		var playerShared = PlayerShared.makePlayerShared(name);

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

			}

		};
		return Object.assign(playerShared, player)
	}
}