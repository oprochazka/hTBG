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
		this.setSurrounding(army.position.x, army.position.y, army.rangeMap);

		return {moveMap : moveMap, rangeMap : rangeMap};
	},

	makeArmyShared : function(img)
	{
		var armyTile = Tile.makeTile("army", null);
		var oldInsert = armyTile.insert;
		var oldDumped = armyTile.dump;
		
		var army = {
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
			turnAttacks : 1,
			initAttacks : 1,
			cost : 50,

			newTurn : function(player)
			{
				this.speed = this.initSpeed;							
			},

			refreshStats : function()
			{
				this.speed = this.initSpeed;
				this.turnAttacks = this.initAttacks;
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

				this.turnAttacks--;

				playerDef.setHealth(result);

				if(result <= 0 )
				{
					Field.removeObject(playerDef, playerDef.position.x, playerDef.position.y);
				}

				return result;
			},

			load : function(json)
			{
				this.id = json.id;
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

				this.position.x = json.position.x;
				this.position.y = json.position.y;
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
					initAttacks : this.initAttacks,
					turnAttacks : this.turnAttacks
				};

				dumped = Object.assign(dumpedOld, dumped);

				return dumped;
			}		
		}		


		return	Object.assign(armyTile, army);
	},	

	makeSoldier : function()
	{
		var out = this.makeArmy("http://"+ GameEngine.server +"/asets/army.png");		

		out.type = "soldier";
		out.initSpeed = 3;
		out.range = 1;
		out.health = 1;

		return out;	
	},

	makeArcher : function()
	{
		var out = this.makeArmy("http://"+ GameEngine.server +"/asets/archer.png");		

		out.type = "archer";

		out.speed = 6;
		out.initSpeed = 6;
		out.range = 3;
		out.health = 2;

		return out;	
	},

	loadArmy : function(json)
	{
		if(json.type == "soldier")
		{
			var soldier = this.makeSoldier();
			soldier.load(json);

			return soldier;
		}

		if(json.type == "archer")
		{
			var soldier = this.makeArcher();
			soldier.load(json);

			return soldier;
		}

	}
};
