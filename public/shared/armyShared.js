ArmyShared = {
	makeArmyShared : function(armyDescType)
	{
		var armyTile = PlayerEntity.makePlayerEntity();
		var oldInsert = armyTile.insert;
		var oldDumped = armyTile.dump;
		
		var army = {
			name : "army",
			count : 0,
			powerAttack : 2,
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

			getRangeBoost : function(boosts)
			{
				var range = 0;

				for(var i = 0; i < boosts.length; i++)
				{
					var boost = boosts[i];

					if(boost.action && boost.action == "range")
					{
						range = boost.value;
					}
				}

				return {range : range};
			},

			getTileBoost : function(building, tile)
			{
				var tileSpeed = 0;
				var range = 0;

				if(building && building.boost)
				{
					for(var i = 0; i < building.boost.length; i++)
					{
						var boost = building.boost[i];

						if(boost.action && boost.action == "tileSpeed" && tile.type == boost.tile)
						{
							tileSpeed = boost.value;
						}
					}
				}

				return {tileSpeed : tileSpeed, tileRange : range};
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

			_buildingModificator : function(building)
			{
				var modificatorMove = 0;
				var modificatorRange = 0;
				if(building)
				{
					if(building.modifyMove)
					{
						modificatorMove = building.modifyMove;
					}
					if(building.modifyRange)
					{
						modificatorRange = building.modifyRange;
					}
				}
				
				return {move : modificatorMove, range : modificatorRange};
			},

			_armyModificator : function(tile)
			{
				if(this.modificators)
				{
					for(var i = 0; i < this.modificators.length; i++)
					{
						var obj = this.modificators[i];
						if(tile.type == obj.type)
						{
							var move = 0;
							var range = 0;
							if(obj.move)
							{
								move = obj.move;
							}
							if(obj.range)
							{
								range = obj.range;
							}
							return {move : move, range : range};
						}
					}
				}
				return {move : 0, range : 0};		
			},

			compare : function(x, y, moveMap, rangeMap)
			{	
				var objs = Field.getObject(x, y);
				var building = Field.getBuildingObject(x,y);

				if(!objs || !objs[0])
				{
					return;					
				}
				tile = objs[0];	

				if(tile.name != "tile")
				{
					return;
				}	
				
				var buildModif = this._buildingModificator(building);
				var armyModif = this._armyModificator(tile);
				var tileModificator = {tileSpeed : 0, tileRange : 0};
				var tileModificator = this.getTileBoost(building, tile);				

				var tileMove = tile.configuration.movement;
				var tileRange = tile.configuration.range;

				var move = tileMove + buildModif.move + armyModif.move + tileModificator.tileSpeed;
				var range = tileRange + buildModif.range + armyModif.range + tileModificator.tileRange;
				if(move < 1)
				{
					move = 1;
				}
				if(range < 1)
				{
					range = 1;
				}

				this._countFar(x, y, moveMap, move);
				this._countFar(x, y, rangeMap, range);
			},

			setSurrounding : function(x, y, map)
			{
				map[map.length] = {x : x - 1, y : y, speed : 0};
				map[map.length] = {x : x + 1, y : y,  speed : 0};
				map[map.length] = {x : x, y : y + 1, speed : 0};
				map[map.length] = {x : x, y : y - 1, speed : 0};
			},

			checkMapObject : function(map, position)
			{							
				for(var i = 0; i < map.length; i++)
				{
					if(map[i].x == position.x && map[i].y == position.y)
					{									
						return true;
					}
				}
				return false;
			},			

			indexMovement : function()
			{
				var building = Field.getBuildingObject(this.position.x, this.position.y);
				var boost = {range : 0};

				if(building && building.boost)
				{
					boost = this.getRangeBoost(building.boost);

					if(this.range == 0)
					{
						boost.range = 0;
					}
				}

				var speed = this.speed;				
				var range = this.range + boost.range;

				var moveMap = [];
				var rangeMap = [];

				moveMap[0] = {x : this.position.x, y : this.position.y, speed : speed};
				rangeMap[0] = {x : this.position.x, y : this.position.y, speed : range};

				this.setSurrounding(this.position.x, this.position.y, rangeMap);		

				var maxRange = speed;

				if(range > maxRange)
				{
					maxRange = range;
				}

				for(var y = 0; y <= maxRange; y++)
				{
					for(var x = 0; x <= maxRange; x++)
					{	
						var map;				
						var pX = this.position.x + x;
						var pY = this.position.y + y;

						map = this.compare(pX, pY, moveMap, rangeMap);
						map = this.compare(pX+1, pY, moveMap, rangeMap);
						map = this.compare(pX-1, pY, moveMap, rangeMap);
						map = this.compare(pX, pY+1, moveMap, rangeMap);
						map = this.compare(pX, pY-1, moveMap, rangeMap);

						var mX = this.position.x - x;
						var mY = this.position.y - y;

						map = this.compare(mX, mY, moveMap, rangeMap);
						map = this.compare(mX+1, mY, moveMap, rangeMap);
						map = this.compare(mX-1, mY, moveMap, rangeMap);
						map = this.compare(mX, mY+1, moveMap, rangeMap);
						map = this.compare(mX, mY+1, moveMap, rangeMap);


						map = this.compare(pX, mY, moveMap, rangeMap);
						map = this.compare(mX, pY, moveMap, rangeMap);
					}	
				}
				
				moveMap.splice(0, 1);
				rangeMap.splice(0, 1);

				this.moveMap = moveMap;
				this.rangeMap = rangeMap;		

				return {moveMap : moveMap, rangeMap : rangeMap};
			},

			setType : function(armyDescType)
			{
				var config = ObjectDesc.getConfiguration(armyDescType);

				this._setArmyConfig(config);				

				return config;				
			},

			_setArmyConfig : function(config)
			{
				this.type = config.type;
				
				this.img = config.img;
				this.initSpeed = config.initSpeed;
				this.range = config.range;
				this.initHealth = config.initHealth;
				
				this.initFights = config.initFights;
				this.cost = config.cost;
				this.powerAttack = config.powerAttack;
				this.health = config.initHealth;
				this.speed = 0;		

				this.modificators = config.modificators;
				this.forbidenTiles = config.forbidenTiles;

				this.fights = 0;
				this.buildAttack = config.buildAttack;
			},	

			newTurn : function(player)
			{
				this.refreshStats();							
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
					var player = GameEngine.gameManager.findPlayer(this.player);	
					
					this.player.addBuilding(buildingObj);
				}
			},

			moved : function(x, y, decreaseSpeed)
			{
				this.speed = decreaseSpeed;

				this.insert(x, y);
			},

			hurt : function(hurt)
			{
				this.setHealth(hurt);

				if(hurt <= 0 )
				{
					if(this.player)
					{
						if(this.type == "king")
						{
							this.player.onDefeat();
						}
						this.setKilled();
					}					
				}
			},

			setKilled : function()
			{					
				this.player.removeArmy(this);
				Field.removeObject(this, this.position.x, this.position.y);			
			},

			attack : function(playerObj)
			{
				if(this.fights <= 0)
				{
					return null;
				}

				var rangeMap = this.indexMovement().rangeMap;

				for(var i = 0; i < rangeMap.length; i++)
				{
					if(rangeMap[i].x == playerObj.position.x && rangeMap[i].y == playerObj.position.y)
					{									
						var result = this.fight(playerObj);

						return result;
					}
				}

				return null;
			},			

			load : function(json)
			{				
				this.id = json.id;
				this.setType(json.type);

				this.count = json.count;			
				this.defend = json.defend;
				this.speed = json.speed;
				
				this.player = GameEngine.gameManager.findPlayer(json.player);

				if(this.player)
				{
					this.player.setArmy(this);
				}

				this.initSpeed = json.initSpeed;
				this.fights = json.fights;

				this.position.x = json.position.x;
				this.position.y = json.position.y;

				this.powerAttack = json.powerAttack;
				this.img = json.img;
				this.health = json.health;
			},

			dump: function()
			{
				var dumpedOld = oldDumped.call(this);

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
	}
};
