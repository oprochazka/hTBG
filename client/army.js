Army = {

	makeArmy : function(img)
	{
		var armyShared = ArmyShared.makeArmyShared(img);	
		var square = Draw.makeFillSquare(20, 20);	

		var oldRender = armyShared.render;
		var oldSetType = armyShared.setType;			
		
		var army = {	
			moveMap : null,
			

			render : function()
			{				
				oldRender.call(this);		

				square.setPosition(armyShared.square.x, armyShared.square.y);

				if(this.player)
				{
					square.setColor(this.player.color);
				}

				square.render();
			},

			setType : function(armyDescType)
			{				
				var config = oldSetType.call(this, armyDescType);
				
				army.img = "http://"+ GameEngine.server +"/asets/"+ config.img;

				armyShared.square.setImage(army.img);
			},

			lostFocus: function(mousePos)
			{				
				if(!this.player.controll)
				{
					this.moveMap = null;
					this.rangeMap = null;
					return;
				}

				var pos = Field.indexPosition(mousePos);

				if(this.moveMap)
				{
					var move = Army.findInMap(pos.x, pos.y, this.moveMap);
					var range = Army.findInMap(pos.x, pos.y, this.rangeMap);
					var armyObj = Field.getArmyObject(pos.x, pos.y);

					if(range)
					{						
						if(armyObj && !armyObj.player.controll)
						{
							this.attack(armyObj);
						}
						else
						{
							if(move)
							{
								this.moving(pos.x, pos.y);	
							}
						}
					}

					if(move)
					{
						if(!armyObj)
						{
							this.moving(pos.x, pos.y);								
						}			
					}														
				}

				this.moveMap = null;
				this.rangeMap = null;
			},

			kill : function(fieldDef)
			{
				this.fight(fieldDef);
			},

			moving : function(x, y)
			{
				var msg = {type : "moving", id : this.id , x :  x, y :  y};
				Client.sendActionMessage(msg, this.player);
			},

			onClick : function(pos, key)
			{					
				if(key == "left")
				{
					var maps = Army.indexMovement(this);				

					var range = maps.rangeMap;
					if(this.turnAttacks <= 0)
					{
						range = [];
					}

					Field.setMoveMap(maps.moveMap, range);
				}
			},		

			attack : function(playerObj)
			{			
				if(this.turnAttacks <= 0)
				{
					return;
				}

				var msg = {type : "attack", id : this.id , idDef : playerObj.id};
				Client.sendActionMessage(msg, this.player);
			}		
		}		

		return Object.assign(armyShared, army);
	}
};

Army = Object.assign(ArmyShared, Army);