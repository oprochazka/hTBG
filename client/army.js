Army = {

	makeArmy : function(img)
	{
		var armyShared = ArmyShared.makeArmyShared(img);	
		var square = Draw.makeFillSquare(20, 20);	

		var oldRender = armyShared.render;		

		armyShared.square.setImage(img);	
		
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

			lostFocus: function(mousePos)
			{				
				if(!this.player.controll)
				{
					this.moveMap = null;
					return;
				}

				var pos = Field.indexPosition(mousePos);

				if(this.moveMap)
				{
					for(var i =0; i < this.moveMap.length; i++)
					{
						var map = this.moveMap[i];

						if(pos.x == map.x && pos.y == map.y)
						{		
							var armyObj = Field.getArmyObject(map.x, map.y);
							
							if(armyObj && !armyObj.player.controll)
							{
								this.attack(armyObj);
							}

							if(!armyObj)
							{
								this.moving(pos.x, pos.y);								
							}							
						}
					}
				}
				this.moveMap = null;
			},

			kill : function(fieldDef)
			{
				Field.removeObject(fieldDef, fieldDef.position.x , fieldDef.position.y);
			},

			moving : function(x, y)
			{
				var msg = {type : "moving", id : this.id , x :  x, y :  y};
				Client.sendMessage(JSON.stringify(msg));
			},

			onClick : function(pos)
			{									
				Field.setMoveMap(Army.indexMovement(this));
			},		

			attack : function(playerObj)
			{			
				var msg = {type : "attack", id : this.id , idDef : playerObj.id};
				Client.sendMessage(JSON.stringify(msg));
			}		
		}		

		return Object.assign(armyShared, army);
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

Army = Object.assign(ArmyShared, Army);