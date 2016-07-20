/*************************************************************
 * My Treehouse Projects #9,
 *
 * FSJS #2, filter and pagination, 2.0
 *
 * Robert Manolis, Milwaukie OR, July 2016  :)
 *************************************************************/
(function(window, document) {
	"use strict";
	
	/********************************************************
	 * PAGINATOR CONSTRUCTOR OBJECT
	 *
	 * PARAMS: CLASS NAME OF LIST ITEMS YOU WANT PAGINATED
	 *
	 * RETURNS: THIS
	 *********************************************************/
	var Paginator = function(listItemKlassName, searchBox) {
		var that = this;
		
		/* GET HTML COLLECTION OF LIST ITEM CLASS NAME ******/
		that.el_eye = document.getElementsByClassName(listItemKlassName);
		
		/* CONVERT HTML COLLECTION INTO ARRAY ***************/
		that.tempArr = [].slice.call(that.el_eye);
		
		var makeIt = function() {
			var elem = document.createElement(this.el);
				elem.setAttribute("class", this.klass);
				return elem;
		};
		
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
				
			}
		};
		return that;
	};
	
	
	
	// /** ADD SEARCH BAR & SUBMIT BUTTON ************************************/
	// var pageHeader = document.getElementsByClassName("page-header");

	// // CREATE SEARCH DIV AND ADD CLASS
	// var searchDiv = document.createElement("div");
	// searchDiv.setAttribute("class", "student-search");

	// // CREATE SEARCH INPUT AND ADD PLACEHOLDER TEXT
	// var searchInput = document.createElement("input");
	// searchInput.setAttribute("placeholder", "Search for students...");
	// searchInput.setAttribute("id", "cerchInput");
	// searchInput.setAttribute("value", "");
	// searchInput.setAttribute("name", "Search");

	// // CREATE SUBMIT BUTTON AND LABEL WITH TEXT
	// var searchButton = document.createElement("button");
	// searchButton.innerHTML = "Search";

	// // APPEND INPUT AND BUTTON TO DIV AND DIV TO PAGE
	// searchDiv.appendChild(searchInput);
	// searchDiv.appendChild(searchButton);
	// pageHeader[0].appendChild(searchDiv);

	// var cerchInput = document.getElementById("cerchInput");
	// /**********************************************************************/
	
	
	/***********************************************************
	 * SET UP PAGE
	 * 
	 * HIDE LIST ITEMS, ADD MARKER TO EACH LIST ITEM, SHOW FIRST TEN LIST ITEMS BY DEFAULT
	 ***********************************************************/
	Paginator.prototype.pages = function() {
		var that = this;
		var keyCounter = 0;
		[].map.call(this.el_eye, function(key) {
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
	
	
	
	/* PURE HELPER FUNCTION FOR ANIMATING OPACITY OF SELECTED ITEMS */
	var opacAnimate = function(el) {
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



	/* PURE HELPER FUNCTION FOR DISPLAYING SELECTED NUMBER OF STUDENTS */
	var showItems = function(indStart, indStop, el) {
		for (var ind = indStart, end = indStop; ind < end; ind++) {
			el.style.display = "block";
			opacAnimate(el);
			if (el.marker === el.length - 1) {
				return;
			}
		}
	};
	/*************************************************************/
	
	
	/*************************************************************
	 * PAGE BUTTONS
	 * 
	 * ADD PAGINATION BUTTONS, ADD FUNCTIONALITY TO BUTTONS
	 *************************************************************/
	Paginator.prototype.buttons = function() {
		var that = this;

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
						
						showItems((that2.marker * 10) - 10, that2.marker * 10, key3);
					}
				});
			});
		});
	};
	
	
	/*************************************************************
	 * SEARCH
	 * 
	 * ADD SEARCH BAR AND BUTTON, ADD FUNCTIONALITY TO SEARCH BAR
	 *************************************************************/
	Paginator.prototype.cerch = function() {
		/* ADD SEARCH BAR AND BUTTON *******************************/
		
		/* ADD FUNCTIONALITY TO SEARCH BAR *************************/
	};

	
	/*************************************************************
	 * RUN IT
	 *************************************************************/
	Paginator.prototype.run = function() {
		this.pages();
		this.buttons();
	};
	
	var studentPaginator = new Paginator("student-item", "page-header");
	studentPaginator.run();
	
})(window, document);



