ToolTip = {
	makeToolTip : function()
	{
		var squareW = Field.squareW;
		var squareH = Field.squareH;
		var textOffset = 60;
		var margin = 5;

		var background = Draw.makeFillSquare(0, 0);		
		background.setColor("rgba(10,8,8,0.9)");

		var out = {
			position : {x : 0, y : 0, w: squareW, h : margin},
			objects : [],
			square : null,

			move : function(x, y)
			{
				this.position.x += x;
				this.position.y += y;

				background.move(x, y);

				for(var i = 0; i < this.objects.length; i++)
				{
					this.objects[i].move(x,y);
				}
			},
			setPosition: function(x, y)
			{		
				background.setPosition(x, y);
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
					config = ObjectDesc.getConfiguration(clickedObject.type);

					textConfig = [
						{key : "Production", value : config.earnGold + " G"},
						{key : "Health", value : clickedObject.initHealth},
						{key : "Units per Turn", value : clickedObject.productUnits || 0}
					];
				}
				if(clickedObject.name == "army")
				{
					config = ObjectDesc.getConfiguration(clickedObject.type);
					textConfig = [
						{key : "Health", value : clickedObject.initHealth},
						{key : "Fights", value : clickedObject.initFights},
						{key : "Movement", value : clickedObject.initSpeed},
						{key : "Attack", value : config.powerAttack},
						{key : "Building attack", value : config.buildAttack || 0},
						{key : "Range", value : config.range}
					]; 
				}
				if(clickedObject.type == "builder")
				{
					textConfig[textConfig.length] = {key : "Builds", value : config.builds};
				}

				for(var i = 0; i < textConfig.length; i++)
				{
					var object = textConfig[i];

					this.setText(object.key, object.value)
				}

				background.setSize(this.position.w, this.position.h + margin*2);
			},

			onClick : function(mousePos, button)
			{

			},

			setText : function(textKey, textValue)
			{
				var text = Draw.makeText();
				text.setText(textKey + " : " + textValue);		
				text.move(this.position.x + margin , this.position.y + this.position.h + margin + text.fontSize);

				if(this.position.w < (text.w+ 2*margin))
				{
					this.position.w = text.w + 2*margin;
				}

				this.position.h += (margin + text.fontSize);

				this.objects[this.objects.length] = text;				
			},

			render : function()
			{												
				background.render();

				for(var i = 0; i < this.objects.length; i++)
				{
					this.objects[i].render();
				}
			}

		}

		return out;
	},
};