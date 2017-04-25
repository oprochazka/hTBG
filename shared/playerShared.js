PlayerShared = {
	makePlayerShared : function(name)
	{		
		return {
			army : [],			
			name : name,
			controll: true,
			color : null,			
			building : [],

			buildArmy : function(x, y)
			{
				var soldier = Army.makeSoldier(this);
				soldier.setPlayer(this);

				this.army[this.army.length] = soldier;

				soldier.insert(x,y);

				return soldier;	
			},

			buildArcher : function(x, y)
			{
				var archer = Army.makeArcher(this);
				archer.setPlayer(this);

				this.army[this.army.length] = archer;

				archer.insert(x,y);		

				return archer;		
			},

			addBuilding: function(building)
			{
				this.building[this.building.length] = building;

				building.setPlayer(this);	

				return building;		
			},

			setControll: function(isControll)
			{
				this.controll = isControll;
			},

			newTurn: function()
			{
				for(var i = 0; i < this.army.length; i++)
				{
					var army = Field.findById(this.army[i]);

					if(army)
					{
						army.newTurn();
					}
				}

				for(var i = 0; i <this.building.length; i++)
				{
					var building = Field.findById(this.building[i]);	
					if(building)
					{
						building.newTurn();
					}
				}
			},

			dump: function()
			{				
				var serializeArmy = [];
				var serializeBuilding = [];
				for(var i = 0; i < this.army.length; i++)
				{
					serializeArmy[serializeArmy.length] = this.army[i].id;
				}
				for(var i = 0; i < this.building.length; i++)
				{
					serializeBuilding[serializeBuilding.length] = this.building[i].id;
				}

				return {
					id : this.id,
					name : this.name,
					army : serializeArmy,
					color : this.color,
					building : serializeBuilding
				}
			}
		}
	}
};