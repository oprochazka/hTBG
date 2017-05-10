Player = {
	makePlayer : function(name)
	{
		var playerShared = PlayerShared.makePlayerShared(name);
		var oldNewTurn = playerShared.newTurn;		

		var nextTurnAudio = new Audio("./sound/endTurn.mp3");


		var player = {
			buildObject : function(player, armyData)
			{							                
				var constructor = ObjectDesc.getConstructor(armyData.type);
				var army = constructor();
				army.load(armyData);		
                
                this.gold = player.gold;

             	Field.insertObject(army, armyData.position.x, armyData.position.y);
			},	

			/*buildBuilding : function(player, buildingData)
			{							                
				var constructor = ObjectDesc.getConstructor(buildingData.type);
				var building = constructor();
				building.load(buildingData);		
                
                this.gold = player.gold;

             	Field.insertObject(building, buildingData.position.x, buildingData.position.y);
			},	*/

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