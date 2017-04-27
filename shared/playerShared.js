PlayerShared = {
	makePlayerShared : function(name)
	{		
		return {
			army : [],			
			name : name,
			controll: true,
			color : null,			
			building : [],
			statusPlay : false,
			gold : 1000,

			buildArmy : function(x, y)
			{
				var soldier = Army.makeArmy("soldier");
				soldier.setPlayer(this);

				if(this.payMoney(ArmyDesc.soldier.cost))
				{
					soldier.setPlayer(this);

					this.army[this.army.length] = soldier;

					soldier.insert(x,y);
					
					return soldier;		
				}

				return null;
			},

			buildKing : function(x, y)
			{
				var king = Army.makeArmy("king");
				king.setPlayer(this);

				this.army[this.army.length] = king;

				king.insert(x,y);		

				return king;		
			},

			buildArcher : function(x, y)
			{
				var archer = Army.makeArmy("archer");
				archer.setPlayer(this);

				this.army[this.army.length] = archer;

				archer.insert(x,y);		

				return archer;		
			},

			payMoney : function(money)
			{
				var result = this.gold - money;

				if(result < 0)
				{
					return false;
				}

				this.gold = result;

				return true;
			},

			addBuilding: function(building)
			{
				this.building[this.building.length] = building;

				building.setPlayer(this);	

				return building;		
			},

			stopTurn : function()
			{
				this.statusPlay = true;
			},

			refreshStats : function()
			{
				for(var i = 0; i < this.army.length; i++)
				{
					var army = this.army[i];
					if(army)
					{
						army.refreshStats();
					}
				}

				for(var i = 0; i <this.building.length; i++)
				{
					var building = this.building[i];	
					if(building)
					{
						building.refreshStats();
					}
				}
			},

			setControll: function(isControll)
			{
				this.controll = isControll;
			},

			newTurn: function()
			{
				this.statusPlay = true;

				this.refreshStats();
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
					building : serializeBuilding,
					statusPlay : this.statusPlay,
					gold : this.gold
				}
			}
		}
	}
};