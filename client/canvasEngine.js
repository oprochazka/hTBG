var testSquare;
var first = true;

var canvasW = 1536;
var canvasH = 960;

function getMousePos (canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

function initialization()
{
  var canvas = document.getElementById('canvasLayer1');

  $('body').on('contextmenu', '#canvasLayer1', function(e){ return false; });

  canvas.onselectstart = function () { return false; } // ie
  canvas.onmousedown = function () { return false; }  

  Draw.initModule(canvas);
  GameEngine.initModule();
  CanvasUi.initModule();
  Field.initModule(canvas, 64, 64, CanvasUi.canvasUi);
  Client.initModule();

  


  canvas.addEventListener('mousemove', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      
      if(mousePos.y < 960 - CanvasUi.canvasUi.position.h)
      {
        Field.refreshMouse(mousePos, evt);
      }
      else
      {
        CanvasUi.canvasUi.refreshMouse(mousePos, evt);
      }

    }, false);

  canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt );

      if(mousePos.y < 960 - CanvasUi.canvasUi.position.h)
      {
        Field.onClick(mousePos, evt, "left");
      }
       else
      {
        CanvasUi.canvasUi.onClick(mousePos, evt, "left");
      }

    }, false);

  canvas.addEventListener('contextmenu', function (evt){
     var mousePos = getMousePos(canvas, evt);
      if(mousePos.y < 960 - CanvasUi.canvasUi.position.h)
      {
        Field.onClick(mousePos, evt, "right");
      }
      else
      {
        CanvasUi.canvasUi.onClick(mousePos, evt, "right");
      }
  }, false);



  UIPlayer.init();
}



function gameLoop () 
{

    if(first)
    {
       initialization();
      
    }

    window.requestAnimationFrame(gameLoop);        

    Field.render();
    CanvasUi.canvasUi.render();

    first = false;
    var player = GameEngine.gameManager.getControllPlayer();
    if(player)
    {
      UIPlayer.refreshUi(player);
    }

    if(GameEngine.flagEnd)
    {
      GameEngine.flagEnd.render();
    }
}

gameLoop();