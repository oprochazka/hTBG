PlayerEntityShared = {
	makePlayerEntityShared : function()
	{
		var tile = Tile.makeTile();

		var out = {
			name : "playerEntity",
			health : 1000,

			hurt : function(hurt)
			{
				this.setHealth(hurt);

				if(hurt <= 0)
				{
					this.setKilled();
				}
			},

			setHealth : function(health)
			{
				this.health = health;
			},

			countFight : function(playerDef)
			{
				if(playerDef.name == "army")
				{
					return playerDef.health - this.powerAttack;
				}
				if(playerDef.name == "building")
				{
					if(!this.buildAttack)
					{
						return false;
					}

					return playerDef.health - this.buildAttack;
				}

				return false;
			},

			fight : function(playerDef)
			{			
				var result = this.countFight(playerDef);
				
				if(result === false)
				{
					return null;
				}

				this.fights--;

				playerDef.hurt(result);			

				return result;
			},

			setKilled : function()
			{					
				Field.removeObject(this, this.position.x, this.position.y);			
			}

		};

		return Object.assign(tile, out);
	}

};