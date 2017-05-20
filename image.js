//ascii
var message = "JULIAWALLACE";
var message_length = message.length;
var char_index = 0;

//image
var width;
var height;
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var img_data;
var img_array = [];
var im = new Image();
im.src = 'julia.png';
im.onload = function () {
	width = im.width;
	height = im.height;
	canvas.width  = width;
	canvas.height = height;
	context.drawImage(im, 0, 0);
	img_data = context.getImageData(0, 0, canvas.width, canvas.height);
	
	//parse image data
	var x;
	var y;
	var inpos;
	for (y = 0; y < height; y++) {
        inpos = y * width * 4; // *4 for 4 ints per pixel
        for (x = 0; x < width; x++) {
			var colour = {
				r: img_data.data[inpos++],
				g: img_data.data[inpos++],
				b: img_data.data[inpos++],
				a: img_data.data[inpos++]
            }
			img_array.push(colour);
		}
	}

	//display (animate)
	var col = 0;
	var row = 0;
	var img = document.getElementById("img-container");
	function myLoop () { 	//  create a loop function
		setTimeout(function () {    //  call a 3s setTimeout when the loop is called
			if (row == 106) return;
			var character = document.createElement('span');
			character.innerHTML = message.charAt(char_index%message_length);
			var colour = img_array[char_index];
			character.style.color = "rgb(" + colour.r + "," + colour.g + "," + colour.b + ")";
			img.appendChild(character);
			char_index++; 
			col++;		
			if (col % 221 != 0) {            //  if the counter < 10, call the loop function
				myLoop();             //  ..  again which will trigger another 
			}else {
				row++;
				linebreak = document.createElement("br");
				img.appendChild(linebreak);
				myLoop(); }				//  ..  setTimeout()
			}, 15)
	}
	myLoop();
	
	/*//display (all at once)
	var col;
	var row;
	var img = document.getElementById("img-container");
	for(row=0; row < 106; row++){
		for(col=0; col < 221; col++) {
			var character = document.createElement('span');
			character.innerHTML = message.charAt(char_index%message_length);
			var colour = img_array[char_index];
			character.style.color = "rgb(" + colour.r + "," + colour.g + "," + colour.b + ")";
			img.appendChild(character);
			char_index++;  
		}
	linebreak = document.createElement("br");
	img.appendChild(linebreak);
	}*/
};
