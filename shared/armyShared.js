ArmyShared = {
	compare : function(x, y, moveMap)
	{	
		var t = Field.getObject(x, y);

		if(!t || !t[0])
		{
			return;					
		}
		t = t[0];		

		var mov = t.configuration.movement;
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

		var o = speed - mov;

		if(o < 0)
		{
			return false;
		}
		var map = {x : x, y : y, speed : o};
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

	indexMovement : function(army)
	{
		var speed = army.speed;

		var moveMap = [];

		moveMap[0] = {x : army.position.x, y : army.position.y, speed : speed};
		for(var y = 0; y <= speed; y++)
		{
			for(var x = 0; x <= speed; x++)
			{
				var pX = army.position.x + x;
				var pY = army.position.y + y;

				var mX = army.position.x - x;
				var mY = army.position.y - y;

				var map = this.compare(pX, pY, moveMap);
				map= this.compare(pX, mY, moveMap);
				map = this.compare(mX, pY, moveMap);
				map = this.compare(mX, mY, moveMap);
				
			}	
		}
		
		army.moveMap = moveMap;
		return moveMap;
	},

	makeArmyShared : function(img)
	{
		var armyTile = Tile.makeTile("army", null);
		var oldInsert = armyTile.insert;
		var oldDumped = armyTile.dump;
		
		var army = {
			count : 0,
			attack : 0,
			defend : 0,
			speed : 3,
			player : null,
			moveMap : null,		
			initSpeed: 3,
			type : null,

			newTurn : function(player)
			{
				this.speed = this.initSpeed;							
			},

			refreshStats : function()
			{
				this.speed = this.initSpeed;
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
					type : this.type
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


		return out;	
	},

	makeArcher : function()
	{
		var out = this.makeArmy("http://"+ GameEngine.server +"/asets/archer.png");		

		out.type = "archer";

		out.speed = 6;
		out.initSpeed = 6;

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
