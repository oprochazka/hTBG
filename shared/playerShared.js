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
			gold : 50,
			inTurn : false,

			buildObject : function(name, x, y)
			{
				var constructor = ObjectDesc.getConstructor(name);
				var object = constructor(name);
				object.setPlayer(this);
				
				if(this.payMoney((ObjectDesc.getConfiguration(name)).cost))
				{
					object.insert(x,y);
					console.log(object.name);
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

			buildFreeArmy : function(name, x, y)
			{
				var constructor = ObjectDesc.getConstructor(name);
				var army = constructor(name);
				army.setPlayer(this);			

				this.army[this.army.length] = army;

				army.insert(x,y);
				
				return army;		
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
						building.newTurn();
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
					gold : this.gold
				}
			}
		}
	}
};