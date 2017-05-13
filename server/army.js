Army = {
	makeArmy : function(img)
	{
		var armyShared = ArmyShared.makeArmyShared(img, null);		
		
		var oldAttack = armyShared.attack;

		var army = {						
			moving: function(x, y)
			{
				var moveMap = this.indexMovement().moveMap;

				for(var i = 0; i < moveMap.length; i++)
				{
					if(moveMap[i].x == x && moveMap[i].y ==y )
					{
						var armyObj = Field.getArmyObject(x, y);

						if(!armyObj)
						{													
							this.moved(x, y, moveMap[i].speed);
							Server.sendBroadcast(JSON.stringify({type : "moving", x : x, y : y, id : this.id, speed : this.speed}));		

							return;					
						}												
					}
				}
			},

			attack : function(playerObj)
			{
				var result = oldAttack.call(this, playerObj);
								
				if(result != null)
				{
					Server.sendBroadcast(JSON.stringify({type : "attack", id : this.id, idDef : playerObj.id, hurt : result}));
				}
			}			
		}		

		return	Object.assign(armyShared, army);
	}
}

Army = Object.assign(ArmyShared, Army);