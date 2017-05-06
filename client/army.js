Army = {

	makeArmy : function(img)
	{
		var armyShared = ArmyShared.makeArmyShared(img);	
		var square = Draw.makeFillSquare(20, 20);	

		var oldRender = armyShared.render;
		var oldSetType = armyShared.setType;	
		var oldMoved = armyShared.moved;

		var hurtAudio = new Audio("./sound/hurt.mp3");	
		var fightAudio = new Audio("./sound/fight.mp3");
		var marchAudio = new Audio("./sound/march.mp3");
		
		var army = {	
			moveMap : null,
			option : null,
			
			moved : function(x, y, decreaseSpeed)
			{
				oldMoved.call(this,x,y, decreaseSpeed);
				if(GameEngine.getControllPlayer() == this.player)
				{				
					marchAudio.play();
				}
			},

			render : function()
			{				
				oldRender.call(this);		

				square.setPosition(armyShared.square.x, armyShared.square.y);

				if(this.player)
				{
					square.setColor(this.player.color);
				}

				if(this.option)
				{
					this.option.render();
				}

				square.render();
			},

			setType : function(armyDescType)
			{				
				var config = oldSetType.call(this, armyDescType);
				
				army.img = "http://"+ GameEngine.server +"/asets/"+ config.img;

				armyShared.square.setImage(army.img);
			},

			lostFocus: function(position, object, key, lastMouseKey)
			{			
				if(!this.player.controll)
				{
					this.moveMap = null;
					this.rangeMap = null;
					return;
				}					
				var armyObj = Field.getArmyObject(position.x, position.y);
				if(lastMouseKey == "left" && this.moveMap)
				{
					var move = Army.findInMap(position.x, position.y, this.moveMap);

					if(move)
					{
						if(!armyObj)
						{
							this.moving(position.x, position.y);								
						}			
					}		
				}
				if(lastMouseKey == "right" && this.moveMap)
				{					
					var range = Army.findInMap(position.x, position.y, this.rangeMap);					

					if(range)
					{						
						if(armyObj && !armyObj.player.controll)
						{
							this.attack(armyObj);
						}		
					}										
				}

				this.moveMap = null;
				this.rangeMap = null;
			},

			kill : function(fieldDef)
			{						
				if(GameEngine.getControllPlayer() == fieldDef.player)
				{
					hurtAudio.play();
				}

				this.fight(fieldDef);			

				if(GameEngine.getControllPlayer() == this.player)
				{
					fightAudio.play();
				}
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
				
					Field.setMoveMap(maps.moveMap, []);

					UIPlayer.setSelectedObject(this);
				}
				if(key == "right")
				{
					var maps = Army.indexMovement(this);				

					var range = maps.rangeMap;
					if(this.fights <= 0)
					{
						range = [];
					}

					Field.setMoveMap([], range);

					UIPlayer.setSelectedObject(this);
				}
			},		

			attack : function(playerObj)
			{			
				if(this.fights <= 0)
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