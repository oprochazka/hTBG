Army = {
	makeArmy : function(img)
	{
		var armyShared = ArmyShared.makeArmyShared(img, null);		
		
		var army = {						
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

		return	Object.assign(armyShared, army);
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

Army = Object.assign(ArmyShared, Army);