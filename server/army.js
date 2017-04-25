var merge = require('merge'), original, cloned;

Army = {
	server : "127.0.0.1:8080",

	makeArmy : function(img)
	{
		var armyTile = Tile.makeTile("army", null);
		var oldInsert = armyTile.insert;
		
		var army = {
			count : 0,
			attack : 0,
			defend : 0,
			speed : 3,
			player : null,
			moveMap : null,		
			initSpeed: 3,

			newTurn : function(player)
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
					
					player.addBuilding(buildingObj);
				}
			},			

			moving: function(x, y)
			{
				var moveMap = Army.indexMovement(this);

				for(var i = 0; i < moveMap.length; i++)
				{
					if(moveMap[i].x == x && moveMap[i].y ==y )
					{
						var armyObj = Field.getArmyObject(x, y);

						if(!armyObj)
						{						
					//		this.speed = moveMap[i].speed;

							this.insert(x, y);
							Server.sendBroadcast(JSON.stringify({type : "moving", x : x, y : y, id : this.id, speed : moveMap[i].speed}));							
						}						
						
					}
				}
			},

			attack : function(playerObj)
			{
				var moveMap = Army.indexMovement(this);

				for(var i = 0; i < moveMap.length; i++)
				{
					if(moveMap[i].x == playerObj.position.x && moveMap[i].y == playerObj.position.y )
					{						
						Field.removeObject(playerObj, playerObj.position.x, playerObj.position.y);
						Server.sendBroadcast(JSON.stringify({type : "attack", id : this.id, idDef : playerObj.id}));
					}
				}
			}			
		}		


		return	merge(armyTile, army);
	},

	makeSoldier : function()
	{
		var out = this.makeArmy();		

		out.type = "soldier";

		return out;	
	},

	makeArcher : function()
	{
		var out = this.makeArmy();		

		out.speed = 6;
		out.initSpeed = 6;

		out.type = "archer";

		return out;	
	}
}

Army = merge(ArmyShared, Army);