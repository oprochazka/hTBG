CanvasUi = {
	initModule : function()
	{
	},

	makeCanvasUi : function(w, h)
	{
		var w = w || 1536;
		var h = h || 80;

		var background = Draw.makeFillSquare(w, h);
		background.setColor("rgba(114,8,8,0.5)");

		var out = {
			position : {x : 0, y : 0, w : w, h : h},
			objects : [],
			background : background,

			setPosition : function(x, y)
			{
				this.position.x = x;
				this.position.y = y;		
				this.background.setPosition(x,y);

				for(var i = 0; i < this.objects.length; i++)
				{
					this.objects[i].setPosition(x, y);
				}		
			},
			setSize : function(w, h)
			{
				this.position.w = w;
				this.position.h = h;				

				background.setSize(w, h);
			},

			move : function(x, y)
			{
				this.position.x += x;
				this.position.y += y;
				this.background.move(x, y);
				for(var i = 0; i < this.objects.length; i++)
				{
					this.objects[i].move(x, y);
				}
			},

			render : function()
			{	
				this.background.render();
				for(var i = 0; i < this.objects.length; i++)
				{
					this.objects[i].render();
				}

			},

			onClick : function(mousePos, evt, button)
			{
				for(var i = 0; i < this.objects.length; i++)
				{
					var object = this.objects[i];

					if(Utils.intersecPointRect(mousePos, object.position))
					{
						object.onClick(mousePos,button);
					
					}
				}
			},

			refreshMouse : function(mousePos)
			{
				for(var i = 0; i < this.objects.length; i++)
				{
					var object = this.objects[i];

					if(Utils.intersecPointRect(mousePos, object.position))
					{
						if(object.refreshMouse)
						{
							object.refreshMouse(mousePos);					
						}
					}
				}
			},

			mouseOut : function(mousePos)
			{
				for(var i = 0; i < this.objects.length; i++)
				{
					var object = this.objects[i];
					if(object.mouseOut)
					{
						object.mouseOut(mousePos);					
					}					
				}
			},


			setType : function(clickedObject)
			{
				this.objects = [];
				
				var context;

				context = ContextOption.makeContextOption();				

				
				context.setObject(clickedObject);
				

				context.setPosition(this.position.x, this.position.y);
				
				this.objects[this.objects.length] = context;
			}

		};
		return out;
	},

	makeEndGame : function()
	{
		var text = Draw.makeText();

		text.setText("You have been defeated");
		text.setFont("80px Arial");
		text.setColor("rgb(255,0,255");

		text.move(100, 100);

		return text;
	}
};