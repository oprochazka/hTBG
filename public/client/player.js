Player = {
	makePlayer : function(name)
	{
		var nextTurnAudio = new Audio("http://"+ GameEngine.server + "/sound/endTurn.mp3");
		var constructing = new Audio("http://"+ GameEngine.server +"/sound/construct.mp3");
		var buyArmy = new Audio("http://"+ GameEngine.server +"/sound/horn.mp3");
		var defeatAudio = new Audio("http://"+ GameEngine.server +"/sound/bardMelody.mp3");


		var playerShared = PlayerShared.makePlayerShared(name);
		var oldNewTurn = playerShared.newTurn;		
		var oldOnDefeat = playerShared.onDefeat;

		
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

             	GameEngine.gameManager.setActionCenterNCon(playerEntity);
			},	

			getPossibleOperation : function()
			{
				var out = [];

				for(var i = 0; i < this.army.length; i++)
				{
					var army = this.army[i];
					if(army.speed > 0 || army.fights > 0 || (army.builds && army.builds > 0))
					{
						out[out.length] = army;
					}
				}

				for(var i = 0; i < this.building.length; i++)
				{
					if(this.building[i].productUnits && this.building[i].productUnits > 0)
					{
						out[out.length] = this.building[i];
					}
				}

				return out;
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

			getKing : function()
			{
				for(var i = 0; i < this.army.length; i++)
				{
					if(this.army[i].type == "king")
					{
						return this.army[i];
					}						
				}
			},

			newTurn: function()
			{
				oldNewTurn.call(this);

				if(this.inTurn && this == GameEngine.gameManager.getControllPlayer())
				{
					nextTurnAudio.play();		
					GameEngine.gameManager.setActionCenter(this.getKing());								
				}
			}

		};
		return Object.assign(playerShared, player)
	}
}