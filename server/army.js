Army = {
	makeArmy : function(img)
	{
		var armyShared = ArmyShared.makeArmyShared(img, null);		
		
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
				if(this.fights <= 0)
				{
					return;
				}

				var rangeMap = this.indexMovement().rangeMap;

				for(var i = 0; i < rangeMap.length; i++)
				{
					if(rangeMap[i].x == playerObj.position.x && rangeMap[i].y == playerObj.position.y && playerObj.player != GameEngine.currentPlayer)
					{									
						var result = this.fight(playerObj);

						Server.sendBroadcast(JSON.stringify({type : "attack", id : this.id, idDef : playerObj.id, hurt : result}));

						return;
					}
				}
			}			
		}		

		return	Object.assign(armyShared, army);
	}
}

Army = Object.assign(ArmyShared, Army);