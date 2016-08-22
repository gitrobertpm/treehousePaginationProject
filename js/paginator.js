/*************************************************************
 * My Treehouse Projects #9,
 *
 * FSJS #2, filter and pagination, 2.0
 *
 * Robert Manolis, Milwaukie OR, July 2016  :)
 *************************************************************/

"use strict";

/********************************************************
 * PAGINATOR CONSTRUCTOR OBJECT
 *
 * PARAMS: CLASS NAME OF LIST ITEMS YOU WANT PAGINATED
 * 		 CLASS NAME OF CONTAINER TO HOLD SEARCH
 * 		 TAG NAME OF ELEMENT THAT HOLDS TEXT TO BE SEARCHED
 *
 * RETURNS: THIS
 *********************************************************/
var Paginator = function(listItemKlassName, searchBox, searchItems) {
	var that = this;
	
	/* GET TAG NAME OF ITEMS TO SEARCH THROUGH **********/
	that.searchItems = document.getElementsByTagName(searchItems);
	
	/* GET CLASS NAME OF SEARCH CONTAINER ***************/
	that.searchBox = document.getElementsByClassName(searchBox)[0];
	
	/* GET HTML COLLECTION OF LIST ITEM CLASS NAME ******/
	that.el_eye = document.getElementsByClassName(listItemKlassName);
	
	/* CONVERT LIST ITEM HTML COLLECTION INTO ARRAY *****/
	that.tempArr = [].slice.call(that.el_eye);
	
	/* CONFIGURE PAGE BUTTONS ***************************/
	that.pageButtonsConfig = {
		container: {
			el: "ul",
			klass: "pagination",
			makeIt: function() {
				var elem = document.createElement(this.el);
				elem.setAttribute("class", this.klass);
				return elem;
			}
		},
		items: {
			el: "li",
			makeIt: function() {
				var elem = document.createElement(this.el);
				return elem;
			}
		},
		links: {
			el: "a",
			klass: "paginationLink",
			makeIt: function() {
				var elem = document.createElement(this.el);
				elem.setAttribute("class", this.klass);
				return elem;
			}
		}
	};
	
	/* CONFIGURE SEARCH ***************************/
	that.searchConfig = {
		container: {
			el: "div",
			klass: "student-search",
			makeIt: function() {
				var elem = document.createElement(this.el);
				elem.setAttribute("class", this.klass);
				return elem;
			}
		},
		input: {
			el: "input",
			name: "Search",
			id: "cerchInput",
			val: "",
			placeholder: "Search for students...",
			makeIt: function() {
				var elem = document.createElement(this.el);
				elem.setAttribute("name", this.name);
				elem.setAttribute("id", this.id);
				elem.setAttribute("value", this.val);
				elem.setAttribute("placeholder", this.placeholder);
				return elem;
			}
		},
		button: {
			el: "button",
			teckts: "Search",
			id: "searchButton",
			makeIt: function() {
				var elem = document.createElement(this.el);
				elem.innerHTML = "Search";
				return elem;
			}
		}
	};	
	
	/* HELPER FUNCTION FOR ANIMATING OPACITY OF SELECTED ITEMS */
	that.opacAnimate = function(el) {
		var animateItems = setInterval(revealItems, 10);
		var opac = 0;
		function revealItems() {
			opac += 0.01;
			if (opac < 1) {
				el.style.opacity = opac;
			} else {
				clearInterval(animateItems);
			}
		}
	};
	/************************************************************/


	/* HELPER FUNCTION FOR DISPLAYING SELECTED NUMBER OF STUDENTS */
	that.showItems = function(indStart, indStop, el) {
		for (var ind = indStart, end = indStop; ind < end; ind++) {
			el.style.display = "block";
			that.opacAnimate(el);
		}
	};
	/*************************************************************/
	
	return that;
};


/***********************************************************
 * SET UP PAGE
 * 
 * HIDE LIST ITEMS, ADD MARKER TO EACH LIST ITEM, SHOW FIRST TEN LIST ITEMS BY DEFAULT
 ***********************************************************/
Paginator.prototype.pages = function() {
	var that = this;
	var keyCounter = 0;
	[].map.call(that.el_eye, function(key) {
		keyCounter += 1;
		key.style.display = "none";
		key.marker = keyCounter;
	});
	that.tempArr.filter(function(key) {	
		if (that.tempArr.indexOf(key) < 10) {
			key.style.display = "block";
		}
	});
};


/*************************************************************
 * SEARCH
 * 
 * ADD SEARCH BAR AND BUTTON, ADD FUNCTIONALITY TO SEARCH BAR
 *************************************************************/
Paginator.prototype.cerch = function() {
	var that = this;
	/* ADD SEARCH BAR AND BUTTON *******************************/
	var searchDiv = that.searchConfig.container.makeIt();
	var searchInput = that.searchConfig.input.makeIt();
	var searchButton = that.searchConfig.button.makeIt();
	searchDiv.appendChild(searchInput);
	searchDiv.appendChild(searchButton);
	that.searchBox.appendChild(searchDiv);
	
	/* ADD FUNCTIONALITY TO SEARCH BAR *************************/
	var cerchToggle = false;
	searchButton.addEventListener("click", function() {
		var cerchVal = document.getElementById("cerchInput").value.toLowerCase();
		
		if (!cerchVal) {
			alert("Sorry, no results.  Please try again.");
		} else {
			[].map.call(that.tempArr, function(key) {
				key.style.display = "none";
			});
			
			var textArr = [].slice.call(that.searchItems);
			textArr.filter(function(key) {
				if (key.textContent.includes(cerchVal)) {
					cerchToggle = true;
					that.showItems(textArr.indexOf(key), textArr.indexOf(key) + 1, that.tempArr[textArr.indexOf(key)]);
				}
			});
			
			if (!cerchToggle) {
				alert("Sorry, no results.  Please try again.");
			}
			
			cerchToggle = false;
		}
	});
};


/*************************************************************
 * PAGE BUTTONS
 *************************************************************/
Paginator.prototype.buttons = function() {
	var that = this;
	
	/* ADD PAGINATION BUTTONS *******************************/
	var paginationUL = that.pageButtonsConfig.container.makeIt();
	that.el_eye[0].parentNode.parentNode.appendChild(paginationUL);

	for (var li = 0, lj = that.tempArr.length / 10; li < lj; li++) {		
		var paginationLI = that.pageButtonsConfig.items.makeIt();
		var paaginationAnchor = that.pageButtonsConfig.links.makeIt();
		paaginationAnchor.innerHTML = li + 1;
		paginationLI.appendChild(paaginationAnchor);
		paginationUL.appendChild(paginationLI);
	}

	var paginationLink = document.getElementsByClassName("paginationLink");
	paginationLink[0].classList.toggle("active", true);
	
	/* ADD FUNCTIONALITY TO BUTTONS ***************************/
	var buttonCounter = 0;
	[].map.call(paginationLink, function(key) {
		buttonCounter += 1;
		key.marker = buttonCounter;
		
		key.addEventListener("click", function() {
			var that2 = this;
			[].map.call(paginationLink, function(key1) {
				key1.classList.toggle("active", false);
			});
			
			this.classList.toggle("active", true);
			
			that.tempArr.map(function(key2) {
				key2.style.display = "none";
			});
			
			that.tempArr.filter(function(key3) {	
				if (that.tempArr.indexOf(key3) >= (that2.marker * 10) - 10 && that.tempArr.indexOf(key3) < that2.marker * 10) {
					key.style.display = "inline";
					
					that.showItems((that2.marker * 10) - 10, that2.marker * 10, key3);
				}
			});
		});
	});
};


/*************************************************************
 * RUN IT
 *************************************************************/
Paginator.prototype.run = function() {
	var that = this;
	that.pages();
	that.buttons();
	that.cerch();
};	