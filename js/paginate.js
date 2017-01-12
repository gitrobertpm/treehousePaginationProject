/*************************************************************
 * My Treehouse Projects
 *
 * FSJS proj #2 
 * 
 * Pagination & Content Filter
 *
 * Robert Manolis, Milwaukie OR, January - 2017  :)
 *************************************************************/
(function(window, document) {
"use strict";

/**************************************************************
 * CREATE NEW PAGINATOR OBJECT
 ***************************************************************/ 
const studentPaginator = new Paginator("student-item", "page-header", [["tag", "h3"]]);
// And run it
studentPaginator.run();


// project specific variables
/**************************************************************
 * PROJECT VARIABLES
 ***************************************************************/ 
const paginationLink = document.getElementsByClassName("paginationLink");
const body = document.getElementsByTagName("body")[0];
const h3 = document.getElementsByTagName("h3");
const page = document.getElementsByClassName("page")[0];
const searchButton = document.getElementById("searchButton");
const active = document.getElementsByClassName("active");
const cerchInput = document.getElementById("cerchInput");


/**************************************************************
 * CHANGE STYLE WHEN SEARCH AND PAGINATION BUTTONS ARE CLICKED
 * AND WHEN THE THE ENTER BUTTON IS HIT WHEN THE SEAWRCH BOX IS IN FOCUS
 * JUST FOR FUN AND ASTHETICS
 ***************************************************************/ 
 // Helper function to change styles
 function styleChange() {
	let newColor = paintRandom();
	body.style.background = newColor[0];
	page.style.border = "3px solid " + newColor[3];
	searchButton.style.background = newColor[1];
	searchButton.style.textShadow = "1px 1px 3px rgba(50,50,50,0.75)";
	[].forEach.call(h3, (vally, indy, arry) => {
		vally.style.color = newColor[0];
	});
 }
 
// Helper function to attach click eventlistener that changes styles
function addSomeStyle(elly) {
	elly.addEventListener("click", function() {
		styleChange();
	});
}

// Search button
addSomeStyle(searchButton);

// Pagination buttons
[].forEach.call(paginationLink, (vally, indy, arry) => {
	addSomeStyle(vally);
});

// Search Input
cerchInput.addEventListener("keyup", (e) => {
	if (e.keyCode === 13) {
		styleChange();
	}
	
	if (cerchInput.value === "") {
		styleChange();
	}
});


/**************************************************************
 * MY RANDOM COLOR PAINTER - CONDITIONALLY PRODUCES COLORS THAT
 * 					    ARE NEITHER TOO LIGHT NOR TOO DARK
 *
 * RETURNS:  ARRAY OF FOUR FORMATTED RGB VALUES
 * 		   EACH SLIGHTLY LIGHTER IN COLOR THAT THE PREVIOUS
 ***************************************************************/ 
function paintRandom() {
	let r,g,b;
	let ranColVal = (num) => {
		return Math.ceil((Math.random() * num));
	};
	r = ranColVal(200);
	if (r > 150) {
		g = ranColVal(100);
	} else {
		g = ranColVal(200);
		if (r < 50) {
			g = ranColVal(50) + 100;
		}
	}
	if (r > 150 || g > 150) {
		b = ranColVal(100);
	} else {
		b = ranColVal(200);
		if (r < 50 || g < 50) {
			b = ranColVal(50) + 100;
		}
	}
	
	let colorOne = "rgb(" + r + "," + g + "," + b + ")",
	    colorTwo = "rgb(" + (r + 50) + "," + (g + 50) + "," + (b + 50) + ")",
	    colorThree = "rgb(" + (r + 75) + "," + (g + 75) + "," + (b + 75) + ")",
	    colorFour = "rgb(" + (r + 100) + "," + (g + 100) + "," + (b + 100) + ")";
	    
	return [colorOne, colorTwo, colorThree, colorFour];
}
/************************************************************/

})(window, document);