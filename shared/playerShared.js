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
			gold : 300,
			inTurn : false,
			defeat : false,

			buildObject : function(name, x, y)
			{
				var constructor = ObjectDesc.getConstructor(name);
				var object = constructor();
				object.setType(name);

				object.setPlayer(this);
				
				if(this.payMoney((ObjectDesc.getConfiguration(name)).cost))
				{
					object.insert(x,y);
					
					if(object.name == "building")
					{
						this.building[this.building.length] = object;
					}
					if(object.name == "army")
					{
						this.army[this.army.length] = object;
					}

					return object;		
				}
				return null;
			},

			removeArmy : function(army)
			{
				var armies = this.army;
				for(var i = 0; i < armies.length; i++)
				{
					if(army == armies[i])
					{
						armies.splice(i, 1);
					}
				}
			},		

			removeBuilding : function(building)
			{
				var building = this.building;
				for(var i = 0; i < building.length; i++)
				{
					if(building == building[i])
					{
						building.splice(i, 1);
					}
				}
			},	

			isPayObject : function(object)
			{
				var result = this.gold - object.cost;

				if(result < 0)
				{
					return false;
				}

				return true;
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
						army.newTurn();
					}
				}

				for(var i = 0; i <this.building.length; i++)
				{
					var building = this.building[i];	
					if(building)
					{												
						building.newTurn();
					}
				}
			},

			onDefeat : function()
			{
				console.log("lost game ", this.name);				
				this.defeat = true;
			},

			setControll: function(isControll)
			{
				this.controll = isControll;
			},

			setColor : function(color)
			{
				this.color = color;
			},

			newTurn: function()
			{
				this.statusPlay = true;

				this.refreshStats();

				this.inTurn = true;
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
					gold : this.gold,
					defeat : this.defeat
				}
			}
		}
	}
};