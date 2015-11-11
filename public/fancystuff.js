var brush = 'none';

$(document).ready(function () {
    addImgToDom();
    
});

$(function () {
  //event listener to draw image
  document.getElementById('drawImg').addEventListener('click', function (e) {
    e.preventDefault();
    drawNewImg();
}, false);
  //listener for dolphin button
  document.getElementById('dolphin').addEventListener('click', function (e) {
    e.preventDefault();
    brush = 'dolphin';
}, false);
  //listener for sepia
  document.getElementById('sepia').addEventListener('click', function (e) {
    e.preventDefault();
    brush = 'sepia';
}, false);
  //listener for jtext
  document.getElementById('jtext').addEventListener('click', function (e) {
    e.preventDefault();
    brush = 'jtext';
}, false);
  //listner for download
   document.getElementById('download').addEventListener('click', function(){
        downloadCanvas();
    }, false);


  var canvas = document.getElementById('main');
  canvas.addEventListener("mousedown", function(event){
  	console.log('ayylmao');
       if(brush == 'dolphin'){
       	 var xPos = event.pageX;
       	 var yPos = event.pageY;
       	 addDolphin(xPos, yPos);
       }
       else if (brush == 'sepia') {
       	 sepia();
       }
       else if(brush == 'jtext'){
       	  //console.log('jtext');
       	  var xPos = event.pageX;
       	 var yPos = event.pageY;
       	  addJText(xPos, yPos);

       }

    });
       
  

  canvas.addEventListener("touchstart", function(event){
       console.log('ayylmao');
       if(brush == 'dolphin'){
       	 var xPos = event.touches[0].pageX;
       	 var yPos = event.touches[0].pageY;
       	 addDolphin(xPos, yPos);
       }
       else if (brush == 'sepia') {
       	 sepia();
       }
       else if(brush == 'jtext'){
       	  //console.log('jtext');
       	  var xPos = event.pageX;
       	 var yPos = event.pageY;
       	  addJText(xPos, yPos);

       }

    });


});

//Dolphin brush, adds super AESTHETIC dolphin at touch point
function addDolphin(x, y){
  
  var canvas = document.getElementById('main');
  var TOP = canvas.offsetTop;
  var context = canvas.getContext('2d');
  var dolphin = new Image();
  dolphin.crossOrigin="anonymous";
  dolphin.src = 'http://i.imgur.com/0aslqM3.png';
  context.drawImage(dolphin, x - (dolphin.width / 2), y - (dolphin.height / 2) - TOP);
}

function sepia(){
  var canvas = document.getElementById('main');
  var TOP = canvas.offsetTop;
  var context = canvas.getContext('2d');
  var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  var data = imgData.data;

// enumerate all pixels
// each pixel's r,g,b,a datum are stored in separate sequential array elements


	for(var i=0; i<data.length; i+=4) {
	  var red = data[i];
	  var green = data[i+1];
	  var blue = data[i+2];

	  //apply transformations
	  var avg = 0.3  * red + 0.59 * green + 0.11 * blue;
	  data[i] = avg + 100;
	  data[i + 1] = avg + 50;
	  data[i + 1] = avg;


	}

  context.putImageData(imgData, 0, 0);

}


//get new image url and draw to canvas, erase old canvas
function drawNewImg(){
	var canvas = document.getElementById('main');
	var TOP = canvas.offsetTop;
	var img = document.getElementById('hiddenImg');
	canvas.width = $(window).width() - 10;
    canvas.height = $(window).height() - (TOP + 15);
    var context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
    //store new image in hidden so its loaded when we try to draw again
    getNewImage(); 
}


//this function gets the url of a random image from imgur
function randomImgStr() {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz'; 
    var stringlength = 5; 
    var text = '';
    for (var i = 0; i < stringlength; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        text += chars.substring(rnum, rnum + 1);
    }
   //we have no way of filtering what these images are, so like... please dont be porn 
   // im really sorry if it is
   // unless like thats what you are into
   var source = 'http://i.imgur.com/' + text + '.jpg';
   return source;
}

//this function add the image to the DOM, so we can draw it in the canvas
function addImgToDom(){
	var image = document.createElement('img');
    image.id = 'hiddenImg';
    $('.hideMe').append(image);
    getNewImage();
}

//this function swaps the hidden image so we can get new images
function getNewImage(){
	var image = new Image();
	image.id = 'hiddenImg';
	var source = randomImgStr();
    image.onload = function() {
      if (this.width == 161) {
        getNewImage();
      } else {
        $('.hideMe img').replaceWith(this);
      }
    };
    image.src = source;
    image.crossOrigin = "Anonymous";

}

 function downloadCanvas(){
        var link = document.getElementById('download');
        link.href = document.getElementById('main').toDataURL();
        link.download = 'MyAlbumCover.png';
    }


function textAesthetic(){
    var chars = '蒸気は将来ファンクロボットセックスマシンを振ります'
    var stringlength = 5; 
    var text = '';
    for (var i = 0; i < stringlength; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        text += chars.substring(rnum, rnum + 1);
    }
    return text;

}

function addJText(x, y){
  //console.log('ayylmao');
  var canvas = document.getElementById('main');
  var TOP = canvas.offsetTop;
  var ctx = canvas.getContext('2d');
  ctx.font = '30px Arial';
  var jtext = textAesthetic();
  ctx.fillStyle = 'red';
  ctx.fillText(jtext, x, y - TOP);
}
   