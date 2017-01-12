/*************************************************************
 * My Pagination Constructor
 *
 * Robert Manolis, Milwaukie OR, January - 2017  :)
 *************************************************************/

 
/*************************************************************
 * PAGINATOR CONSTRUCTOR OBJECT
 *
 * PARAMS: CLASS NAME OF LIST ITEMS <li> YOU WANT PAGINATED
 * 		 CLASS NAME OF CONTAINER TO HOLD SEARCH ELEMENTS
 * 		 ARRAY CONTAINING ARRAYS OF ["reference to DOM element to be searched, i.e. 'tag', 'class', 'id'", 'tag/class/id name']
 *              * So you need a nested array even if you only want to target one type of element
 *              * [['tag', 'h3']]
 *              * Here's what two looks like
 *              * [['tag', 'h3'], ['class', 'email']]
 *
 * RETURNS: THIS
 ************************************************************/
 function Paginator(listItemKlassName, searchBox, searchedItems) {
	"use strict";
	
	const that = this;
	
	/*******************************************************
	* MAIN VARIABLES
	********************************************************/
	//Tag name of elements to be serached - returns an array of references to seasrch items
	that.searchItems = () => {
		let cearchArry = [];
		searchedItems.forEach((vally, indy, arry) => {
			if (vally[0] === "tag") {
				cearchArry.push(document.getElementsByTagName(vally[1]));
			} else if (vally[0] === "class") {
				cearchArry.push(document.getElementsByClassName(vally[1]));
			} else if (vally[0] === "id") {
				cearchArry.push(document.getElementById(vally[1]));
			}
		});
		
		return cearchArry;
	};
	
	// Class name of container to hold search elements
	that.searchBox = document.getElementsByClassName(searchBox)[0];
	
	// Class name of list items <li>
	that.el_eye = document.getElementsByClassName(listItemKlassName);
	
	// Generated pagination buttons
	let paginationLink = document.getElementsByClassName("paginationLink");
	
	// Convert list item HTML collection into array for easier lifting :)
	that.tempArr = [].slice.call(that.el_eye);
	/********************************************************/

	
	/********************************************************
	* CONFIGURE GENERATED ELEMENTS
	* 
	* el = TAG NAME OF ELLEMENT TO BE CREATED
	*
	* attras = TWO DIMENSIONAL ARRAY HOLDING NEW ELEMENTS ATTRIBUTES
	*          NESTED ARRAY[1] = ATTRIBUTE
	*          NESTED ARRAY[2] = VALUE
	*********************************************************/
	// Configure page buttons
	that.pageButtonsConfig = {
		container: {
			el: "ul",
			attras: [["class", "pagination"]]
		},
		items: {
			el: "li",
		},
		links: {
			el: "a",
			attras: [["class", "paginationLink"]]
		}
	};
	
	// Configure search markup
	that.searchConfig = {
		container: {
			el: "div",
			attras: [["class", "student-search"]]
		},
		input: {
			el: "input",
			attras: [["name", "Search"], ["id", "cerchInput"], ["value", ""], ["placeholder", "Search for students..."]]
		},
		button: {
			el: "button",
			attras: [["id", "searchButton"]],
			teckts: "Search"
		}
	};
	/*********************************************************/
	
	
	/*********************************************************
	* SET UP PAGE
	***********************************************************/
	that.initiatePage = (elly) => {
		
		// Hide all list items and show first ten
		elly.filter((vally, indy, arry) => {
			vally.style.display = "none";			
			if (elly.indexOf(vally) < 10) {
				vally.style.display = "block";
			}
		});
	};
	/************************************************************/
	
	
	/************************************************************ 
	* CREATE ELEMENT
	* 
	* PARAMS: ELEMENT TO CREATE
	*         ARRAY OF ARRAYS CONTAINING ATTRIBUTES AND THEIR VALUES TO BE ADDED TO ELEMENT
	*         TEXT TO AD TO ELEMENT
	* 
	* RETURN: ELEMENT
	*************************************************************/
	that.makeIt = (el, attras, text) => {
		let elem = document.createElement(el);
		
		// Assign attributes if present
		if (attras) {
			attras.map((vally, indy, arry) => {
				elem.setAttribute(vally[0],vally[1]);
			});
		}
		
		// Add text if present
		if (text) {
			elem.innerHTML = text;
		}
		
		return elem;
	};
	/************************************************************/
	
	
	/************************************************************
	* PAGE BUTTONS
	* 
	* PARAMS: ARRAY OF OTEMS TO PAGINATE
	*************************************************************/
	that.buttons = (arry) => {
		
		// Remove pagination previously generated pagination buttons
		let listContainer = document.getElementsByClassName("pagination")[0];
		if (listContainer) {
			listContainer.parentNode.removeChild(listContainer);
		}
		
		// If more than one page worth of items to paginate
		if (arry.length > 10) {
			
			// Create and attach container to hold pagianation buttons
			let paginationUL = that.makeIt(that.pageButtonsConfig.container.el, that.pageButtonsConfig.container.attras);
			that.el_eye[0].parentNode.parentNode.appendChild(paginationUL);
			
			// Create correct number of pagination buttons
			for (let li = 0, lj = arry.length / 10; li < lj; li++) {		
				let paginationLI = that.makeIt(that.pageButtonsConfig.items.el);
				let paaginationAnchor = that.makeIt(that.pageButtonsConfig.links.el, that.pageButtonsConfig.links.attras, li + 1);
				paginationLI.appendChild(paaginationAnchor);
				paginationUL.appendChild(paginationLI);
			}
			
			// Set first button to active class
			paginationLink[0].classList.toggle("active", true);
		}
	};
	/************************************************************/
	
	
	/************************************************************
	* ANIMATING OPACITY OF NEWLY SELECTED ITEMS 
	*
	* PARAMS: ELEMENT TO BE ADJUSTED
	*************************************************************/
	that.opacAnimate = (el) => {
		let animateItems = setInterval(revealItems, 50);
		let opac = 0;
		function revealItems() {
			opac += 0.05;
			if (opac < 1) {
				el.style.opacity = opac;
			} else {
				clearInterval(animateItems);
			}
		}
	};
	/************************************************************/


	/************************************************************
	* SELECT ELEMENTS THAT GET OPACITY ANIMATION
	*
	* PARAMS: WHERE TO START
	*         WHERE TO STOP
	*         WHICH ELEMENTS
	*************************************************************/
	that.showItems = (indStart, indStop, el) => {
		for (let ind = indStart, end = indStop; ind < end; ind++) {
			el.style.display = "block";
			that.opacAnimate(el);
		}
	};
	/*************************************************************/
	
	
	/************************************************************* 
	* SELECT LIST ITEMS TO DISPLAY
	* 
	* PARAMS: PAGINATION BUTTON THAT WAS CLICKED
	*         ARRAY OF ELEMENTS TO SHOW
	*************************************************************/
	that.hideAndShowTen = (keyo, arry) => {
		
		// Get inner HTML of argument
		let numo = Number(keyo.innerHTML);
		
		arry.filter((vally, indy, arry) => {
			
			// Hide all list items
			vally.style.display = "none";
			
			// Show ten list items according to which pagination button was clicked
			if (arry.indexOf(vally) >= (numo * 10) - 10 && arry.indexOf(vally) < numo * 10) {
				that.showItems((numo * 10) - 10, numo * 10, vally);
			}
		});
	};
	/************************************************************/
	
	
	/************************************************************ 
	* CREATE EVENT LISTENERS FOR PAGINATION BUTTONS
	*
	* PARAMS: ELEMENT TO WHICH LISTENER GETS ATTACHED
	*         ARRAY OF ELEMENTS TO WORK WITH
	*************************************************************/
	that.butClick = (elly, arry) => {
		// Can't use arrow function here because value of "this" keyword is different with arrow functions
		elly.addEventListener("click", function() {		
			
			// Remove active class from all pagination buttons
			[].map.call(paginationLink, (vally, indy, arry) => {
				vally.classList.toggle("active", false);
			});
			
			// Add active class to clicked pagination button
			this.classList.toggle("active", true);
			
			that.hideAndShowTen(this, arry);
		});
	};
	/************************************************************/
	
	
	/************************************************************* 
	* INTIATE BUTTONS
	*
	* PARAMS: ARRAY OF ELEMENTS TO WORK WITH
	*************************************************************/
	that.initiateButtons = (arry) => {
		that.buttons(arry);
		[].map.call(paginationLink, (vally, indy, arr) => {
			that.butClick(vally, arry);
		});
	};
	/************************************************************/
	
	
	/*************************************************************
	* ADD SEARCH BAR AND BUTTON
	*************************************************************/
	that.cerchSetup = () => {
		let searchDiv = that.makeIt(that.searchConfig.container.el, that.searchConfig.container.attras);
		let searchInput = that.makeIt(that.searchConfig.input.el, that.searchConfig.input.attras);
		let searchButton = that.makeIt(that.searchConfig.button.el, that.searchConfig.button.attras, that.searchConfig.button.teckts);
		searchDiv.appendChild(searchInput);
		searchDiv.appendChild(searchButton);
		that.searchBox.appendChild(searchDiv);
	};
	/************************************************************/
	
	
	/*************************************************************
	* COMPARE SEARCH VALUE WITH LIST ITEMS
	*
	* PARAMS: VALUE OF SEASRCH INPUT
	*
	* RETURN: ARRAY OF SEARCH RESULTS
	*************************************************************/
	that.comnpare = (searchVal) => {
		let searchArry = that.searchItems();	
		let results = [];
		
		// Loop through serach elements
		searchArry.forEach((vally, indy, arry) => {
			[].forEach.call(vally, (vally2, indy2, arry2) => {
				
				// If there's a match, push list item to results array
				if (vally2.innerHTML.includes(searchVal)) {
					results.push(that.tempArr[indy2]);
				}
			});	
		});
		
		console.log(results.length + " total results");
		console.log(results);
		return results;		
	};
	/************************************************************/
	
	
	/*************************************************************
	* CREATE FUNCTIONALAITY FOR SEARCH BUTTON
	*************************************************************/
	that.cearchClockworks = () => {
		let cerchVal = document.getElementById("cerchInput").value.toLowerCase();	
		
		if (!cerchVal) {
			alert("Please enter something first");
		} else {
			
			// Hide list items
			[].map.call(that.tempArr, (key) => {
				key.style.display = "none";
			});
			
			let results = that.comnpare(cerchVal);
			
			if (results.length < 1) {
				
				// Alert if no results
				alert("Sorry, no results.  Please try again.");
			} else {
				
				// Show new list items and pagination buttons
				that.initiatePage(results);
				that.initiateButtons(results);
			}
		}
	};
	/************************************************************/
	
	
	/*************************************************************
	* ADD EVENT LISTENERS TO SEARCH BUTTON
	*************************************************************/
	that.investigate = () => {
		
		// Submit
		searchButton.addEventListener("click", () => {
			that.cearchClockworks();
		});
		
		// Enter button
		document.getElementById(that.searchConfig.input.attras[1][1]).addEventListener("keydown", (e) => {
			if (e.keyCode === 13) {
				that.cearchClockworks();
			}
		});
	};
	/************************************************************/
	
	
	/************************************************************* 
	* RESET LIST AND PAGINATION WHEN SEARCH FIELD IS EMPTY
	*************************************************************/
	that.reset = () => {
		let cerchInput = document.getElementById("cerchInput");
		cerchInput.addEventListener("input", () => {
			if (cerchInput.value === "") {
				that.initiatePage(that.tempArr);
				that.initiateButtons(that.tempArr);
			}
		});
	};
	/************************************************************/
	
	
	/************************************************************* 
	* INITIATE SEARCH
	*************************************************************/
	that.initiateCerch = () => {
		that.cerchSetup();
		that.investigate();
		that.reset();
	};
	/************************************************************/
	
	
	/************************************************************* 
	* RUN IT
	*************************************************************/
	that.run = () => {
		that.initiatePage(that.tempArr);
		that.initiateButtons(that.tempArr);
		that.initiateCerch();
	};
	/************************************************************/
	
	return that;
 }