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

        square.onClick = function(mousePos)
        {
          
        }    

        square.render = function()
        {
          var context = Draw.canvas.getContext('2d')

          context.beginPath();

          context.fillStyle=square.color;        
          context.strokeStyle=square.color;

          context.fillRect(square.x,square.y,square.w,square.h);
          context.stroke();
          
        }

        return square;
    },

    clearScreen : function()
    {
        var context = Draw.canvas.getContext('2d')
        context.clearRect(0, 0, Draw.canvas.width, Draw.canvas.height);
        context.stroke();
    }
}

