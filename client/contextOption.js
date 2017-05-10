ContextOption = {
	makeContextDescription: function()
	{
		var squareW = Field.squareW;
		var squareH = Field.squareH;
		var textOffset = 60;
		var margin = 5;

		var out = {
			position : {x : 0, y : 0, w: squareW, squareH},
			objects : [],
			square : null,

			move : function(x, y)
			{
				this.position.x += x;
				this.position.y += y;

				for(var i = 0; i < this.objects.length; i++)
				{
					this.objects[i].move(x,y);
				}
			},
			setPosition: function(x, y)
			{		
				for(var i = 0; i < this.objects.length; i++)
				{
					var xM = this.objects[i].x - this.position.x;					
					var yM = this.objects[i].y - this.position.y;					

					this.objects[i].setPosition(x, y);
					this.objects[i].move(xM, yM);
				}

				this.position.x = x;
				this.position.y = y;
			},

			setConfig : function(clickedObject)
			{
				var config = clickedObject;
				var textConfig = [];
				if(clickedObject.name == "building")
				{
					config = BuildingDesc[clickedObject.type];

					textConfig = [
						{key : "Production", value : config.earnGold + " G"}
					];
				}
				if(clickedObject.name == "army")
				{
					config = ArmyDesc[clickedObject.type];
					textConfig = [
						{key : "Health", value : clickedObject.health},
						{key : "Fights", value : clickedObject.fights},
						{key : "Movement", value : clickedObject.speed},
						{key : "Attack", value : config.powerAttack},
						{key : "Range", value : config.range}
					]; 
				}

				var img = "http://"+ GameEngine.server +"/asets/"+ config.img;
				var square = Draw.makeSquare(squareW, squareH);
				this.objects[this.objects.length] = square;

				if(img)
				{
					square.setImage(img)			
				}

				for(var i = 0; i < textConfig.length; i++)
				{
					var object = textConfig[i];

					this.setText(object.key, object.value)
				}
			},

			onClick : function(mousePos, button)
			{

			},

			setText : function(textKey, textValue)
			{
				var text = Draw.makeText();
				text.setText(textKey + " : " + textValue);		
				text.move(this.position.x + this.position.w + margin, this.position.y + textOffset);
				this.position.w += (margin + text.w);

				this.objects[this.objects.length] = text;
			},

			render : function()
			{				
				for(var i = 0; i < this.objects.length; i++)
				{
					this.objects[i].render();
				}
			}

		}

		return out;
	},

	makeContextItem : function(img, textContent)
	{
		var squareW = Field.squareW;
		var squareH = Field.squareH;

		var square = Draw.makeSquare(squareW, 40);
		var textOffset = 10;

		if(img)
		{
			square.setImage(img);
		}

		var text = Draw.makeText();
		text.setText(textContent);		
		text.move(0,squareH + textOffset);

		var width = squareW;
		var height = squareH + textOffset + 5;

		var background = Draw.makeFillSquare(width, height);
		background.setColor("rgba(114,8,8,0.9)");


		var out = {
			position : {x : 0, y : 0, w : width, h : height},
			clock : null,
			animTime : 100,

			animate : function()
			{
				var date = new Date();
				this.clock = date.getTime();
				background.setColor("rgba(200,50,50,0.9)");
			},

			greyBackground : function()
			{
				background.setColor("rgba(114,114,114,0.9)");
			},

			clear : function()
			{
				this.clock = null;
				background.setColor("rgba(114,8,8,0.9)");
			},

			move : function(x, y)
			{
				square.move(x, y);
				text.move(x, y);
				background.move(x, y);
				this.position.x += x;
				this.position.y += y;
			},

			setPosition : function(x, y)
			{
				background.setPosition(x, y);
				square.setPosition(x, y);
				text.setPosition(x, y);
				text.move(0,squareH + textOffset);

				this.position.x = x;
				this.position.y = y;
			},

			onClick : function(mousePos, button)
			{

			},

			render : function()
			{
				background.render();
				square.render();
				text.render();

				if(this.clock)
				{
					var date = new Date();
					var time = date.getTime() - this.clock;
					if(time > this.animTime )
					{
						this.clear();
					}
				}
			}			
		};

		return out;
	},

	makeContextOption : function()
	{
		var margin = 5;

		var out = {
			position : {x : 0, y : 0, w : 0, h : 110},
			items : [],
			object : null,
			onClickObject : null,
			isPlayerObject : false,

			setObject : function(clickedObject)
			{
				this.object = clickedObject;
				this.isPlayerObject = (clickedObject.player && clickedObject.player == GameEngine.getControllPlayer());				
				var config = null;

				if(clickedObject.name == "building")
				{
					config = BuildingDesc[clickedObject.type];

					for(var i = 0; i < config.productArmy.length; i++)
					{
						var army = config.productArmy[i];										
					
						this.setProductArmy(army, clickedObject);
					}
				}
				
				if(clickedObject.name == "army")
				{
					config = ArmyDesc[clickedObject.type];
				}

				var item = ContextOption.makeContextDescription();
				item.setConfig(clickedObject);		

				this.items[this.items.length] = item;		

				item.move(this.position.w + margin ,0)
				this.position.w = item.position.x + item.position.w;
			},

			move : function(x, y)
			{		
				this.position.x += x;
				this.position.y += y;

				for(var i = 0; i < this.items.length; i++)
				{		
					this.items[i].move(x,y);						
				}			
			},

			setPosition : function(x, y)
			{
				this.position.x = x;
				this.position.y = y;

				for(var i = 0; i < this.items.length; i++)
				{		
					var x = this.items[i].position.x;
					this.items[i].setPosition(x,y);	
				}
			},

			render : function()
			{
				for(var i = 0; i < this.items.length; i++)
				{		
					this.items[i].render();	
				}
			},

			onClick : function(mousePos, button)
			{
				for(var i = 0; i < this.items.length; i++)
				{						
					var object = this.items[i];

					if(Utils.intersecPointRect(mousePos, object.position))
					{
						if(this.isPlayerObject)
						{
							object.animate();
						}
						object.onClick(mousePos,button);
					}
				}
			},

			setProductArmy: function(army, clickedObject)
			{					
				var element = ArmyDesc[army];

				if(element)
				{					
					var onClick = function(mousePos, button)
					{
						clickedObject.onProductArmy(army);
					};

					var armyImg = "http://"+ GameEngine.server +"/asets/"+ element.img;

					var item = ContextOption.makeContextItem(armyImg, element.cost + "G");

					if(onClick)
					{
						item.onClick = onClick;
					}

					this.items[this.items.length] = item;
					item.move(this.position.w + margin, 0);

					this.position.w = item.position.x + item.position.w;

					if(!this.isPlayerObject)
					{
						item.greyBackground();
					}	
	
				}
			},
			setBuildOption : function()
			{

			},
			setProduction : function()
			{

			},
			setArmy : function()
			{

			}

		};

		return out;
	}

};