Draw = {
    canvas : null,

    initModule : function(canvas)
    {
        this.canvas = canvas;
    },

    makeLine : function( x, y, w, h) {
        var context = Draw.canvas.getContext('2d');
        context.moveTo(x, y);
        context.lineTo( w, h);
    },

    makeDrawLine : function(x, y, w, h)
    {
      var out = {
        x : x || 0,
        y : y || 0,
        w : w || 0,
        h : h || 0,
        weight : 2,
        color : "rgba(0, 0, 0, 1)",
        setColor : function(hex)
        {
          this.color = hex;
        },
        move : function(x, y, w, h)
        {
          this.x += x;
          this.y += y;
          this.w = thix.x + this.w;
          this.h = this.y + this.h;
        },

        setPosition : function(x, y, w, h)
        {
          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;
        },
        
        render : function()
        {
          var context = Draw.canvas.getContext('2d');

          context.beginPath();

          context.lineWidth = this.weight;
          context.strokeStyle=this.color;

          context.moveTo(x, y);
          context.lineTo( w, h);

          context.closePath();
          context.stroke();
        }

      }
      return out;
    },

    makeSquare : function(w, h)
    {
        var square = { 
          x : 0,
          y : 0,
          w : w,
          h : h,
          image : null,
          color : "rgba(0, 0, 0, 0.0)",
          focused : false
        };

        square.move = function (x,y)
        {
          square.x += x;
          square.y += y;
        }

        square.setPosition = function (x,y)
        {
          square.x = x;
          square.y = y;
        }

        square.setColor = function(hex)
        {
            square.color=hex;
        }

        square.onMouseMove = function(mousePos)
        {
           
        }

        square.isFocus = function(mousePos)
        {
            var mX = mousePos.x;
            var mY = mousePos.y;

            if(square.x <= mX && square.y <= mY )
            {
                if(square.x + square.w >= mX &&  square.y +square.h >= mY )
                {
                    return true;
                }   
            }
        }

        square.onClick = function(mousePos)
        {
          
        }

        square.setDrawPosition= function(x, y)
        {
          square.setPosition(x, y);
        };

        square.drawImage = function()
        {
            var context = Draw.canvas.getContext('2d');
            context.drawImage(square.image, 0, 0, square.w, square.h, square.x, square.y, square.w, square.h);
        }

        square.render = function()
        {
          var context = Draw.canvas.getContext('2d')

          if(square.image)
          {
            square.drawImage();
          }
          context.beginPath();
          context.lineWidth = 1;
          context.strokeStyle=square.color;

          Draw.makeLine(square.x,square.y, square.x + square.w, square.y);
          Draw.makeLine(square.x + square.w,square.y, square.x + square.w, square.y + square.h);
          Draw.makeLine(square.x + square.w, square.y + square.h, square.x, square.y + square.h);
          Draw.makeLine(square.x, square.y + square.h, square.x, square.y);

          context.closePath();
          context.stroke();
        }

        square.setImage = function(img)
        {
            var imageObj = new Image();
          
            imageObj.src = img;

            square.image = imageObj;
        }

        return square;
    },

    makeFillSquare : function(w, h)
    {
        var square = { 
          x : 0,
          y : 0,
          w : w,
          h : h,
          image : null,
          color : "rgba(15, 0, 15, 0.7)",
          focused : false
        };

        square.setDrawPosition= function(x, y)
        {
          square.setPosition(x, y);
        }

        square.move = function (x,y)
        {
          square.x += x;
          square.y += y;
        }

        square.setPosition = function (x,y)
        {
          square.x = x;
          square.y = y;
        }

        square.setSize = function(w, h)
        {
          square.w = w;
          square.h = h;
        }

        square.setColor = function(hex)
        {
            square.color=hex;
        }

        square.onMouseMove = function(mousePos)
        {
           
        }

        square.onClick = function(mousePos)
        {
          
        }    

        square.render = function()
        {
          var context = Draw.canvas.getContext('2d');

          context.beginPath();

          context.fillStyle=square.color;        
          context.strokeStyle=square.color;

          context.fillRect(square.x,square.y,square.w,square.h);
          context.stroke();
          
        }

        return square;
    },

    makeText : function()
    {
      var out = {
        x : 0,
        y : 0,
        w : 0,
        h : 0,
        text : "",
        color : "rgba(255, 255, 255, 1)",
        font : "20px Arial",
        fontSize : 20,

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

        setFont : function(font)
        {
          this.font = font;
        },

        render : function()
        {
          var context = Draw.canvas.getContext('2d');
          context.font = this.font;
          context.fillStyle=this.color;        
          
          var size = context.measureText(this.text);

          this.w = size.width;
          this.h = size.height;

          context.fillText(this.text,this.x,this.y);
          
        },

        setText : function(text)
        {
          this.text = text;

          var context = Draw.canvas.getContext('2d');
          context.font = this.font;
          context.fillStyle=this.color;        
          
          var size = context.measureText(this.text);

          this.w = size.width;
          this.h = size.height;
        },
        setColor : function(color)
        {
          this.color = color;
        } 
      };

      return out;
    },


    clearScreen : function()
    {
        var context = Draw.canvas.getContext('2d')
        context.clearRect(0, 0, Draw.canvas.width, Draw.canvas.height);
        context.stroke();
    }
}

