Player = {
	makePlayer : function(name)
	{
		var playerShared = PlayerShared.makePlayerShared(name);

		var player = {
			removeArmy: function(army)
			{
				var field = this.army;
				for(var i = 0; i < field.length; i++)
				{
					if(army == field[i])
					{
						field.splice(i, 1);
					}
				}
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