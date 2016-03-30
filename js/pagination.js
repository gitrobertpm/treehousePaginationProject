/**
 * My Treehouse Projects #9,
 *
 * FSJS #2, filter and pagination
 *
 */

"use strict";

/** SHOW TEN STUDENT ITEMS ON LOAD **/
var page = document.getElementsByClassName("page");
var studentItem = document.getElementsByClassName("student-item");

// LOOP THROUGH STUDENT ITEMS
for (var i = 0; i < studentItem.length; i++) {
	
	// STICK A MARKER ON STUDENT ITEMS
	studentItem[i].marker = i;
	
	// MAKE ONLY FIRST TEN ITEMS VISIBLE ON LOAD
	if (studentItem[i].marker > 9) {
		studentItem[i].style.display = "none";
	}
}


/** CALCUALTE NUMBER OF ITEMS, CREATE PAGINATION BUTTONS, APPEND TO PAGE AND ADD ACTIVE CLASS TO ACTIVE BUTTON **/
// CREATE PAGINATION DIV AND SET CLASS
var paginationDiv = document.createElement("div");
paginationDiv.setAttribute("class", "pagination");
var pagination = document.getElementsByClassName("pagination");

// CREATE PAGINATION UNORDERED LIST
var paginationUL = document.createElement("ul");

// LOOP THROUGH EVERY TEN STUDENT ITEMS
for (var li = 0; li < studentItem.length / 10; li++) {
	
	// CREATE LIST ITEMS FOR PAGINATION UNORDERED LIST
     var paginationLI = document.createElement("li");
	
	// CREATE PAGINATION ANCHORS, SET CLASS, AND LABEL WITH NUMBER
	var paaginationAnchor = document.createElement("a");
	paaginationAnchor.setAttribute("class", "paginationLink");
	paaginationAnchor.innerHTML = li + 1;
	
	// APPEND ANCHORS TO LIST ITEMS AND LIST ITEMS TO UNORDERED LIST
	paginationLI.appendChild(paaginationAnchor);
	paginationDiv.appendChild(paginationLI);
}

// APPEND PAGINATION DIV TO PAGE
page[0].appendChild(paginationDiv);


var paginationLink = document.getElementsByClassName("paginationLink");

// ADD ACTIVE CLASS TO FIRST PAGINATION LINK
paginationLink[0].setAttribute("class", "paginationLink active");


/** HELPER FUNCTION FOR OPACITY ANIMATION **/
var opacAnimate = function(element) {
	var animateItems = setInterval(revealItems, 10);
	var opac = 0;
	function revealItems() {
		opac += .01;
		if (opac < 1) {
			element.style.opacity = opac;
		} else {
			clearInterval(revealItems);
		}
	}
};


/** HELPER FUNCTION FOR DISPLAYING SELECTED NUMBER OF STUDETNS **/
var showItems = function(indStart, indStop) {
	
	// LOOP THROUGH SOMETHING
	for (var ind = indStart; ind < indStop; ind++) {
		
		// DISPLAY SELECTED STUDENTS
		studentItem[ind].style.display = "block";
		
		// ANIMATE OPACITY OF ITEMS
		opacAnimate(studentItem[ind]);

		
		// BREAK WHEN LAST STUDENT IS REACHED
		if (studentItem[ind].marker === studentItem.length - 1) {
			return;
		}
	}
};




/**ADD FUNCTIONATLITY TO PAGINATION BUTTONS
   CLICKING PAGINATION BUTTON HIDES VISIBLE ITEMS AND SHOWS APROPRIATE SET OF TEN **/
// LOOP THROUGH PAGINATION LINKS
for (var a = 0; a < paginationLink.length; a++) {
	
	// STICK MARKER ON PAGINATION LINKS
     paginationLink[a].marker = a;
	
	// ADD FUNCTION TO PAGAINATION LINKS
	paginationLink[a].onclick = function() {
		
		// LOOP THROUGH PAGINATION LINKS
		for (var ac = 0; ac < paginationLink.length; ac++) {
			
			// REMOVE ACTIVE CLASS FROM ALL LINKS
			paginationLink[ac].classList.toggle("active", false);
		}
		
		// ADD ACTIVE CLASS TO CLICKED LINK
		paginationLink[this.marker].classList.toggle("active", true);
		
		// LOOP THROUGH STIUDENT ITEMS
		for (var aa = 0; aa < studentItem.length; aa++) {
			// HIDE ALL STUDENT ITEMS
			studentItem[aa].style.display = "none";
			studentItem[aa].style.opacity = "0";
		}
		
		// SHOW CORRESPONDING STUDENT ITEMS
		if (this.marker === 0) {
			showItems(0, 10);
		} else {
			showItems(this.marker * 10, (this.marker * 10) + 10);
		}	
	};
}

	
	
/** ADD SEARCH BAR & SUBMIT BUTTON **/
var pageHeader = document.getElementsByClassName("page-header");

// CREATE SEARCH DIV AND ADD CLASS
var searchDiv = document.createElement("div");
searchDiv.setAttribute("class", "student-search");

// CREATE SEARCH INPUT AND ADD PLACEHOLDER TEXT
var searchInput = document.createElement("input");
searchInput.setAttribute("placeholder", "Search for students...");
searchInput.setAttribute("id", "cerchInput");

// CREATE SUBMIT BUTTON AND LABEL WITH TEXT
var searchButton = document.createElement("button");
searchButton.innerHTML = "Search";

// APPEND INPUT AND BUTTON TO DIV AND DIV TO PAGE
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
pageHeader[0].appendChild(searchDiv);



/** ADD WARNING TO PAGE FOR NO SEARCH RESULTS FOUND **/
// CREATE MESSAGE DIV
var nfDiv = document.createElement("div");
nfDiv.setAttribute("id", "divNotFound");

// CREATE MESSAGE TEXT AND CLOSE BUTTON
var nfP = document.createElement("p");
var nfText = document.createTextNode("Sorry.  I can't seem to find that name here in this list.");
var nfButton = document.createElement("button");
nfButton.innerHTML = "okay";
nfButton.setAttribute("id", "closeNotFound");

// APPEND TEXT AND BUTTON TO DIV, APPEND DIV TO PAGE
nfP.appendChild(nfText);
nfDiv.appendChild(nfP);
nfDiv.appendChild(nfButton);
page[0].appendChild(nfDiv);


var divNotFound = document.getElementById("divNotFound");

// HELPER FUNCTION FOR SHOWING NOT FOUND MESSAGE
var notFound = function() {
	divNotFound.style.display = "block";
	divNotFound.style.opacity = "1";
};
	
var closeNotFound = document.getElementById("closeNotFound");

// CLOSE NOT FOUND MESSAGE
closeNotFound.onclick = function() {
	divNotFound.style.display = "none";
	divNotFound.style.opacity = "0";
};




/** SERACH **/
var studentName = document.getElementsByTagName("h3");

// CREATE EMPTY ARRAY TO HOLD SEARCH MATCHES AND THEIR CORRESPONDING MARKERS
var searchMatchList = [];
var searchMatchMarker = [];

// SET SEARCH TOGGLE STATE FOR LOGIC CONTROLS
var searchToggle = false;


// SEARCH FUCNTION
function cerch(key) {
	var entry = new RegExp(key, "gi");
	
	// LOOP THROUGH PAGINATION LINKS
	for (var ac = 0; ac < paginationLink.length; ac++) {
		
		// REMOVE ACTIVE CLASS FROM ALL LINKS
		paginationLink[ac].classList.toggle("active", false);
	}
	
	// LOOP THOUGH STUDENT NAMES
	for (var c = 0; c < studentName.length; c++) {
		
		// SITCK A MARKER ON STUDENT NAME
		studentName[c].marker = c;
		
		// HIDE ALL STUDENT ITEMS
		studentItem[c].style.display = "none";
		studentItem[c].style.opacity = "0";
		
		// GET SEARCH MATCHES
		var success = studentName[c].textContent.match(entry);
		

		// IF MATCH IS FOUND
		if (success !== null) {
			searchToggle = true;
			var successNumber = studentName[c].marker
			
			// PUSH SEARCH MATCHES INTO ARRAY
			searchMatchList.push(success);
			searchMatchMarker.push(successNumber);
			
			// DISPLAY MATCHES
			studentItem[c].style.display = "block";
			// ANIMATE OPACITY OF ITEMS
			opacAnimate(studentItem[c]);
			
		}
	}
	
	if (!searchToggle) {
		// IF NO RESULTS, SHOW NOT FOUND MESSAGE
		notFound();
	} else {
		
		// GET INDEX OF LAST STUDENT ITEM FROM SEARCH MATCH STAORAGE ARRAY
		var lastItem = searchMatchMarker[searchMatchMarker.length - 1];
		
		// LOOP THROUGH ITEMS IN SEARCH MATCH STORAGE ARRAY AND MAKE SURE AT LEAST TEN ITEMS SHOW ON PAGE
		for (var cc = searchMatchList.length - 1; cc < 9; cc++) {
			lastItem += 1;
			studentItem[lastItem].style.display = "block";
			// ANIMATE OPACITY OF ITEMS
			opacAnimate(studentItem[lastItem]);
			
			// BREAK WHEN LAST STUDENT IS REACHED
			if (studentItem[lastItem].marker === studentItem.length - 1) {
				return;
			}
		}
		searchToggle = false;
	}
};


// ADD BLUE EVENT LISTENER TO INPUT TO CLEAR SEARCH STORAGE ARRAYS
cerchInput.addEventListener("blur", function() {
	searchMatchList = [];
	searchMatchMarker = [];
});

// ADD ENTER KEY KEYDONW EVENT LISTENER FOR INPUT
cerchInput.addEventListener("keydown", function(e) {
	if(e.keyCode == 13){
		// CALL SEARCH FUNCTION
		cerch(cerchInput.value);
		searchMatchList = [];
		searchMatchMarker = [];
		searchToggle = false;
	}
});

// ADD CLICK EVENT LISTENER TO SUBMIT BUTTON
searchButton.addEventListener("click", function() {
	// CALL SEARCH FUNCTION
	cerch(cerchInput.value);
	searchMatchList = [];
	searchMatchMarker = [];
	searchToggle = false;
});
	


//alert("test");