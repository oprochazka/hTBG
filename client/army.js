Army = {

	makeArmy : function(img)
	{
		var armyTile = Tile.makeTile("army", null);	
		var square = Draw.makeFillSquare(20, 20);	

		var oldRender = armyTile.render;
		var oldInsert = armyTile.insert;

		armyTile.square.setImage(img);	
		
		var army = {
			count : 0,
			attack : 0,
			defend : 0,
			speed : 3,
			player : null,		
			moveMap : null,
			initSpeed: 3,			

			render : function()
			{				
				oldRender.call(this);		

				square.setPosition(armyTile.square.x, armyTile.square.y);

				if(this.player)
				{
					square.setColor(this.player.color);
				}

				square.render();
			},

			newTurn : function()
			{
				this.speed = this.initSpeed;
			},		
			
	        setPlayer : function( player)
	        {
	        	this.player = player;	 
	        },

			insert: function(x, y)
			{						
				oldInsert.call(this,x,y);						
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
			}	
		}		

		return Object.assign(armyTile, army);
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