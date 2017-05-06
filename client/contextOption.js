ContextOption = {
	makeContextItem : function(img, textContent)
	{
		var squareW = Field.squareW;
		var squareH = Field.squareH;

		var square = Draw.makeSquare(squareW, squareW);

		if(img)
		{
			square.setImage(img);
		}

		var text = Draw.makeText();
		text.setText(textContent);		
		text.move(0,squareH + 35);


		var out = {
			position : {x : 0, y : 0},

			move : function(x, y)
			{
				square.move(x, y);
				text.move(x, y);
				this.position.x += x;
				this.position.y += y;
			},

			setPosition : function(x, y)
			{
				square.setPosition(x, y);
				text.setPosition(x, y);
				text.move(0,squareH + 35);

				this.position.x = x;
				this.position.y = y;
			},

			render : function()
			{
				square.render();
				text.render();
			}			
		};

		return out;
	},

	makeContextOption : function()
	{
		var frame = Draw.makeFillSquare(100,110);
		var testImg = "http://"+ GameEngine.server +"/asets/"+ "king.png";

		var item = ContextOption.makeContextItem(testImg, "50G");
		


		frame.setColor("#ffffff");
		var out = {
			position : {x : 0, y : 0, 
				w : 100, h : 110},

			move : function(x, y)
			{				
				item.move(x,y);	
				frame.move(x,y);

				this.position.x += x;
				this.position.y += y;
			},

			setPosition : function(x, y)
			{
				frame.setPosition(x, y);
				item.setPosition(x, y);

				this.position.x = x;
				this.position.y = y;
			},

			render : function()
			{
				frame.render();
				item.render();
			}
		};

		return out;
	}

};