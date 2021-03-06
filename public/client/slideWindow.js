SlideWindow = {
	makeSlideWindow : function(w, h)
	{	  	
		var slideWindow = {
			x : 0,
			y : 0,
			w : w,
			h : h,			

			centerToPosition : function(x, y)
			{		
				var centerX = x - Math.floor(this.w/2);
				var centerY = y - Math.floor(this.h/2);

				var maxX = Field.tilesW - this.w;
				var maxY = Field.tilesH - this.h;

				if(centerX < 0)
				{
					centerX = 0;					
				}

				if(centerY < 0)
				{
					centerY = 0;
				}

				if(centerX > maxX)
				{
					centerX = maxX;
				}

				if(centerY > maxY)
				{
					centerY = maxY;
				}


				this.setPosition(centerX,centerY);

			},

			move : function(x, y)
			{
				this.x += x;
				this.y += y;
			},

			setPosition : function(x, y)
			{
				this.x = x;
				this.y = y;
			},

			render : function()
			{
				var initX = this.x;
				var initY = this.y;
				if(initX < 0)
				{
					initX = 0;
				}
				if(initY < 0)
				{
					initY = 0;
				}


				for(var x = initX; x < (this.w + this.x) && x < Field.tilesW; x++)
				{
					for(var y = initY; y < (this.h + this.y) && y < Field.tilesH; y++)
					{
						var objects = Field.getObject(x, y);
						if(!objects)
						{
							continue;
						}						
						for(var z = 0; z < objects.length; z++)
						{
							if(objects[z].setDrawPosition)
							{								
								objects[z].setDrawPosition((x-this.x)*Field.squareW, (y-this.y)*Field.squareH);
							}

							objects[z].render();														
						}
					}
				}
			},

			setSize: function(w, h)
			{
				this.w = w;
				this.h = h;
			},

			onKey : function(key)
			{
				var x = 0;
				var y = 0;
				if(key == "ArrowLeft")
				{
					x--;
				}

				if(key == "ArrowRight")
				{
					x++;
				}

				if(key == "ArrowUp")
				{
					y--;
				}

				if(key == "ArrowDown")
				{
					y++;
				}
				if(key == "x")
				{

				}

				this.move(x, y);
				if(this.x < 0 || (this.x + this.w) > Field.tilesW)
				{
					this.move(-x, 0);
				}
				if(this.y < 0 || (this.y + this.h) > Field.tilesH)
				{
					this.move(0, -y);
				}		
			}			

		};
		return slideWindow;
	}
};