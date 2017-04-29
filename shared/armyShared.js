ArmyShared = {
	findInMap : function(x, y, mapObj)
	{
		for(var i =0; i < mapObj.length; i++)
		{
			var map = mapObj[i];

			if(x == map.x && y == map.y)
			{		
				return mapObj[i];		
			}
		}
	},

	_countFar : function(x, y, moveMap, movement)
	{
		var speed = 0;		

		for(var i = 0; i < moveMap.length; i++)
		{
			map = moveMap[i];

			if(Math.abs(map.x-x) == 1 && map.y-y == 0)
			{
				if( map.speed > speed )
				{
					speed = map.speed;
				}
			}
			if(map.x-x == 0 && Math.abs(map.y-y) == 1)
			{
				if( map.speed > speed )
				{
					speed = map.speed;
				}	
			}
		}

		var lessSpeed = speed - movement;

		if(lessSpeed < 0)
		{
			return false;
		}
		var map = {x : x, y : y, speed : lessSpeed};
		for(var i = 0; i < moveMap.length; i++)
		{
			if(moveMap[i].x == map.x && moveMap[i].y == map.y)
			{
				if(map.speed <= moveMap[i].speed)
				{
					return;
				}
			}

		}

		moveMap[moveMap.length] = map;
	},

	compare : function(x, y, moveMap, rangeMap)
	{	
		var objs = Field.getObject(x, y);

		if(!objs || !objs[0])
		{
			return;					
		}
		tile = objs[0];	

		if(tile.name != "tile")
		{
			return;
		}	

		var mov = tile.configuration.movement;
		var range = tile.configuration.range;

		this._countFar(x, y, moveMap, mov);
		this._countFar(x, y, rangeMap, range);
	},

	setSurrounding : function(x, y, map)
	{
		map[map.length] = {x : x - 1, y : y, speed : 0};
		map[map.length] = {x : x + 1, y : y,  speed : 0};
		map[map.length] = {x : x, y : y + 1, speed : 0};
		map[map.length] = {x : x, y : y - 1, speed : 0};
	},

	indexMovement : function(army)
	{
		var speed = army.speed;
		var range = army.range;

		var moveMap = [];
		var rangeMap = [];

		moveMap[0] = {x : army.position.x, y : army.position.y, speed : speed};
		rangeMap[0] = {x : army.position.x, y : army.position.y, speed : range};

		this.setSurrounding(army.position.x, army.position.y, rangeMap);		

		var maxRange = speed;

		if(range > maxRange)
		{
			maxRange = range;
		}

		for(var y = 0; y <= maxRange; y++)
		{
			for(var x = 0; x <= maxRange; x++)
			{
				var pX = army.position.x + x;
				var pY = army.position.y + y;

				var mX = army.position.x - x;
				var mY = army.position.y - y;

				var map = this.compare(pX, pY, moveMap, rangeMap);
				map= this.compare(pX, mY, moveMap, rangeMap);
				map = this.compare(mX, pY, moveMap, rangeMap);
				map = this.compare(mX, mY, moveMap, rangeMap);
				
			}	
		}
		
		army.moveMap = moveMap;
		army.rangeMap = rangeMap;		

		return {moveMap : moveMap, rangeMap : rangeMap};
	},

	_setArmyConfig : function(army, config)
	{
		army.type = config.type;
		
		army.img = config.img;
		army.initSpeed = config.initSpeed;
		army.range = config.range;
		army.initHealth = config.initHealth;
		
		army.initFights = config.initFights;
		army.cost = config.cost;
		army.powerAttack = config.powerAttack;
		army.health = config.initHealth;

	},	

	makeArmyShared : function(armyDescType)
	{
		var armyTile = Tile.makeTile();
		var oldInsert = armyTile.insert;
		var oldDumped = armyTile.dump;
		
		var army = {
			name : "army",
			count : 0,
			attackPower : 2,
			range : 1,
			defend : 0,
			speed : 3,
			player : null,
			moveMap : null,
			rangeMap : null,		
			initSpeed: 3,
			type : null,
			health : 3,
			cost : 50,
			fights : 2,

			setType : function(armyDescType)
			{
				var config = ArmyDesc[armyDescType];

				ArmyShared._setArmyConfig(this, config);

				return config;				
			},

			newTurn : function(player)
			{
				this.speed = this.initSpeed;							
			},

			refreshStats : function()
			{
				this.speed = this.initSpeed;
				this.fights = this.initFights;
			},

			setPlayer : function(player)
			{
				this.player = player;
			},
			
	        setPlayer : function( player)
	        {
	        	this.player = player;
	        },

			insert: function(x, y)
			{			
				oldInsert.call(this, x, y);

				var buildingObj = Field.getBuildingObject(x, y);						

				if(buildingObj && buildingObj.player != this.player)
				{
					var player = GameEngine.findPlayer(this.player);	
					
					this.player.addBuilding(buildingObj);
				}
			},

			moved : function(x, y, decreaseSpeed)
			{
				this.speed = decreaseSpeed;

				this.insert(x, y);
			},

			setHealth : function(health)
			{
				this.health = health;
			},

			countFight : function(playerDef)
			{
				return playerDef.health - this.attackPower;
			},

			fight : function(playerDef)
			{
				var result = this.countFight(playerDef);

				this.fights--;

				playerDef.setHealth(result);

				if(result <= 0 )
				{
					//var building = Building.makeBuilding("grayve");
					//Field.insertObject(building, playerDef.position.x, playerDef.position.y);	
					if(playerDef.player)
					{
						playerDef.player.removeArmy(playerDef);
						Field.removeObject(playerDef, playerDef.position.x, playerDef.position.y);					
					}					
				}

				return result;
			},

			load : function(json)
			{				
				this.id = json.id;
				this.setType(json.type);

				this.count = json.count;			
				this.defend = json.defend;
				this.speed = json.speed;
				
				for(var i = 0; i < GameEngine.Players.length; i++)
				{
					if(GameEngine.Players[i].id == json.player)
					{
						this.player = GameEngine.Players[i];
						this.player.setArmy(this);						
					}
				}

				this.initSpeed = json.initSpeed;
				this.fights = json.fights;

				this.position.x = json.position.x;
				this.position.y = json.position.y;

				this.powerAttack = json.powerAttack;
				this.img = json.img;
				this.health = json.health;


			},

			dump: function(json)
			{
				var dumpedOld = oldDumped.call(this,json);

				var dumped = {
					id : this.id,
					count : this.count,
					attack : this.attack,
					defend : this.defend,
					speed : this.speed,
					player : this.player && this.player.id,					
					initSpeed: this.initSpeed,
					type : this.type,
					powerAttack : this.powerAttack,
					img : this.img,
					fights : this.fights,
					health : this.health
				};

				dumped = Object.assign(dumpedOld, dumped);

				return dumped;
			}		
		};

		var output=Object.assign(armyTile, army);

		if(armyDescType)
		{
			output.setType(armyDescType);
		}

		return output;
	},	

	loadArmy : function(json)
	{
		var army = this.makeArmy();
		army.load(json);
		return army;
	}
};
