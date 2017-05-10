CanvasUi = {
	canvasUi : null,

	initModule : function()
	{
	  	this.canvasUi = CanvasUi.makeCanvasUi();
 		this.canvasUi.setPosition(0, 960 - this.canvasUi.position.h);
	},

	makeCanvasUi : function()
	{
		var w = 1536;
		var h = 80;

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

			refreshMouse : function()
			{

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



	setBarracks : function(config)
	{

	}
};