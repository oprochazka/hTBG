var testSquare;
var first = true;

var canvasW = 0;
var canvasH = 0;

function getMousePos (canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

function initialization()
{
  var w = window.innerWidth;
  var h = window.innerHeight;
  var marginRight = 300;
  var marginBot = 20;
  var tileSize = 64;

  canvasW = Math.floor((w-marginRight)/tileSize)*tileSize;
  canvasH = Math.floor((h-marginBot)/tileSize)*tileSize;

  var canvas = document.getElementById('canvasLayer1');
  canvas.width = canvasW;
  canvas.height = canvasH;


  $('body').on('contextmenu', '#canvasLayer1', function(e){ return false; });


  canvas.onselectstart = function () { return false; } // ie
  canvas.onmousedown = function () { return false; }  

  Draw.initModule(canvas);
  GameEngine.initModule(canvasW, canvasH);
  CanvasUi.initModule();
  Field.initModule(canvas, tileSize, tileSize, CanvasUi.canvasUi);
  Client.initModule();

  var width = canvas.width;
  var height = canvas.height;


  canvas.addEventListener('mousemove', function(evt) {
      var mousePos = getMousePos(canvas, evt);
      
      if(mousePos.y < height - GameEngine.gameManager.getFooter().position.h)
      {
        Field.refreshMouse(mousePos, evt);
        GameEngine.gameManager.getFooter().mouseOut(mousePos, evt);
      }
      else
      {
        GameEngine.gameManager.getFooter().refreshMouse(mousePos, evt);        
      }

    }, false);

  canvas.addEventListener('click', function(evt) {
      var mousePos = getMousePos(canvas, evt );

      if(mousePos.y < height - GameEngine.gameManager.getFooter().position.h)
      {
        Field.onClick(mousePos, evt, "left");
      }
       else
      {
        GameEngine.gameManager.getFooter().onClick(mousePos, evt, "left");
      }

    }, false);

  canvas.addEventListener('contextmenu', function (evt){
     var mousePos = getMousePos(canvas, evt);
      if(mousePos.y < height - GameEngine.gameManager.getFooter().position.h)
      {
        Field.onClick(mousePos, evt, "right");
      }
      else
      {
        GameEngine.gameManager.getFooter().onClick(mousePos, evt, "right");
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
    GameEngine.gameManager.getFooter().render();
    GameEngine.gameManager.getTopPanel().render();

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