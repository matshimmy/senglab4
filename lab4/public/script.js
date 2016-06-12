
/**
 * Requests a new board state from the server's /data route.
 * 
 * @param cb {function} callback to call when the request comes back from the server.
 */
function getData(cb){
    $.get("/data", function(data, textStatus, xhr){
        console.log("Response for /data: "+textStatus);  

        // handle any errors here....

        // draw the board....
        cb(data);  

    }); 
}

/**
 * Draws the board to the #canvas element on the page. 
 *
 * You may find the following links helpful: 
 *  - https://api.jquery.com/
 *  - https://api.jquery.com/append/
 *  - http://www.tutorialspoint.com/jquery/
 *  - http://www.w3schools.com/jquery/ 
 *
 * @param state {object} - an object representing the state of the board.  
 */ 
function drawBoard(state){

    var canvas = $("#canvas"); 

    // Change the height and width of the board here...
    // everything else should adapt to an adjustable
    // height and width.
    var W = 600, H = 600; 
    canvas.css("height", H); 
    canvas.css("width", W); 

    // The actual SVG element to add to. 
    // we make a jQuery object out of this, so that 
    // we can manipulate it via calls to the jQuery API. 
    var svg = $(makeSVG(W, H));
    // TODO: Implement board drawing. 
    
    //  You will want to append elements to the 
    //  svg variable using the svg.append(....) 
    //  method. 
    
    
    //draw the squares
    
    var numOfPix = (500/(state.size-1));
    var x1 = 0;
    var y1 = 0;
	for(x = 50; x<550; x += numOfPix){
		
		for(y = 50; y<550;y += numOfPix){
			svg.append(makeRectangle(x, y, numOfPix-1, numOfPix-1, '#dab44a'));
			svg.append(makeLine(x, y, x+numOfPix, y));
			svg.append(makeLine(x, y, x, y+numOfPix));
			if (state.board[y1][x1] != 0)
				svg.append(makeCircle(x, y, 13, state.board[y1][x1]));
			y1++;
		}
		y1 = 0;
		x1++;
	}
	//bottom and side lines
	svg.append(makeLine(50, 550, 550, 550));
	svg.append(makeLine(550, 50, 550, 550));
	
	//goes through and adds the right side pieces and the bottom
	for(y = 50; y<550;y += numOfPix){
		if (state.board[y1][state.size-1] != 0)
			svg.append(makeCircle(550, y, 13, state.board[y1][state.size-1]));
		y1++;
	}
	x1 = 0;
	for(x = 50; x<550;x += numOfPix){
		if (state.board[state.size-1][x1] != 0)
			svg.append(makeCircle(x, 550, 13, state.board[state.size-1][x1]));
		x1++;
	}
	
    // append the svg object to the canvas object.
    canvas.append(svg);

}

function init(){

    // do page load things here...

    console.log("Initalizing Page...."); 
    getData(drawBoard); 
}
