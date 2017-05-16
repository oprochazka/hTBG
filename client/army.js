Army = {

	makeArmy : function(img)
	{
		var armyShared = ArmyShared.makeArmyShared(img);	
		var square = Draw.makeFillSquare(20, 20);	

		var oldRender = armyShared.render;
		var oldSetType = armyShared.setType;	
		var oldMoved = armyShared.moved;
		var oldLoad = armyShared.load;

		var hurtAudio = new Audio("./sound/hurt.mp3");	
		var fightAudio = new Audio("./sound/fight.mp3");
		var marchAudio = new Audio("./sound/march.mp3");
		var destroyAudio = new Audio("./sound/destroy.mp3");
		
		var army = {	
			moveMap : null,
			option : null,
			flag : null,
			lastActionLine : null,

			load : function(json)
			{
				oldLoad.call(this, json);

                if(this.type == "king")
                {
                	if(this.player.controll)
                	{
                		GameEngine.gameManager.setActionCenter(this);
                	}
                }
			},
			
			onMove : function(x, y, decreaseSpeed)
			{				
				oldMoved.call(this,x,y, decreaseSpeed);
				if(GameEngine.gameManager.getControllPlayer() == this.player)
				{				
					marchAudio.play();
				}

				GameEngine.gameManager.setActionCenterNCon(this);
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
				var buildingObj = Field.getBuildingObject(position.x, position.y);
				if(this.flag == "move" && this.moveMap)
				{
					var move = this.findInMap(position.x, position.y, this.moveMap);

					if(move)
					{
						if(!armyObj)
						{
							this.moving(position.x, position.y);								
						}			
					}		
				}
				if(this.flag == "attack" && this.moveMap)
				{					
					var range = this.findInMap(position.x, position.y, this.rangeMap);					

					if(range)
					{										
						if(armyObj && !armyObj.player.controll)
						{
							this.attack(armyObj);
						}
						else if(this.buildAttack)
						{
							if(buildingObj && (!buildingObj.player || !buildingObj.player.controll))
							{
								this.attack(buildingObj);
							}
						}		
					}										
				}

				this.moveMap = null;
				this.rangeMap = null;
				this.flag = null;
			},

			onAttack: function(fieldDef)
			{				
				this.fight(fieldDef);			

				if(GameEngine.gameManager.getControllPlayer() == fieldDef.player)
				{
					if(fieldDef.name == "building")
					{
						destroyAudio.play();
					}
					else
					{
						hurtAudio.play();
					}					

					GameEngine.gameManager.setActionCenterNCon(fieldDef);
				}

				if(GameEngine.gameManager.getControllPlayer() == this.player)
				{
					fightAudio.play();					
				}				
			},

			moving : function(x, y)
			{
				var msg = {type : "moving", id : this.id , x :  x, y :  y};
				Client.sendActionMessage(msg, this.player);
			},

			showAttack : function()
			{
				this.flag = "attack";
				var maps = this.indexMovement();				

				var range = maps.rangeMap;
				if(this.fights <= 0)
				{
					range = [];
				}

				Field.setMoveMap({color : "rgba(10, 110, 10, 0.4)", map: range});

				UIPlayer.setSelectedObject(this);
			},

			showMove : function()
			{
				this.flag = "move";
				var maps = this.indexMovement();				
				Field.setMoveMap({color : null, map: maps.moveMap });
		
				UIPlayer.setSelectedObject(this);	
			},


			onClick : function(pos, key)
			{		
				Field.canvasUi.setType(this);
				if(key == "left")
				{
					this.showMove();
				}
				if(key == "right")
				{
					this.showAttack();
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