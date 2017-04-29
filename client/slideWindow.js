SlideWindow = {
	makeSlideWindow : function()
	{	  	
		var slideWindow = {
			x : 0,
			y : 0,
			w : 25,
			h : 20,

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
					for(var y = initY; y < (this.h + this.y) && y < Field.tilesW; y++)
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

				this.move(x, y);
			}			

		};

		window.addEventListener('keydown', function (evt){
          	slideWindow.onKey(evt.key);
  		}, false);

		return slideWindow;
	}
};