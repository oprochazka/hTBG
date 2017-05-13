Player = {
	makePlayer : function(name)
	{
		var playerShared = PlayerShared.makePlayerShared(name);
		var oldNewTurn = playerShared.newTurn;		
		var oldOnDefeat = playerShared.onDefeat;

		var nextTurnAudio = new Audio("./sound/endTurn.mp3");
		var constructing = new Audio("./sound/construct.mp3");
		var buyArmy = new Audio("./sound/horn.mp3");
		var defeatAudio = new Audio("./sound/bardMelody.mp3");

		var player = {
			buildObject : function(player, data)
			{							                
				var constructor = ObjectDesc.getConstructor(data.type);
				var playerEntity = constructor();
				playerEntity.load(data);		                				

                this.gold = player.gold;

                if(data.name == "building" || data.type == "ship" || data.type == "ram")
                {
                	constructing.play();
                }
                else
                {
                	buyArmy.play();	
                }


             	Field.insertObject(playerEntity, data.position.x, data.position.y);
			},	

			setArmy : function(army)
			{
				this.army[this.army.length] = army;
			},
			
			onDefeat : function()
			{
				oldOnDefeat.call(this);
				defeatAudio.play();

				if(this == GameEngine.gameManager.getControllPlayer())
				{
					GameEngine.endGame();
				}
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
				this.defeat = json.defeat;

				if(this.defeat)
				{
					this.onDefeat();
				}

			},

			newTurn: function()
			{
				oldNewTurn.call(this);

				if(this.inTurn && this == GameEngine.gameManager.getControllPlayer())
				{
					nextTurnAudio.play();
				}
			}

		};
		return Object.assign(playerShared, player)
	}
}