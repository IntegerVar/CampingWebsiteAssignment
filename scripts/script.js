// Ensures that content has loaded to prevent issues with script
document.addEventListener("DOMContentLoaded", (event) => {
	var isFirefox = typeof InstallTrigger !== 'undefined'; // Duck-Typing Firefox Check

	// Burger Icon Code

	// Clickable Burger Icon Listener and Iterator
  	document.getElementById("burger").addEventListener('click', cl_burger);
  	var navButtons = document.querySelectorAll("nav li"), i;

  	// Clickable Burger Icon Menu Show / Hide Code
  	function cl_burger() {
		for (i = 0; i != navButtons.length; i++) {
			if (navButtons[i].style.display == "block"){
				navButtons[i].style.display = "none";
			} else {
				navButtons[i].style.display = "block";
			}
		}
	}

	// Specific Code for different Web Pages

	// Get the page URL, seperate it with slashes, get the filename and convert to string
	var currentPage = window.location.pathname.split("/").slice(-1).toString();

	// Index Page Specific Code
	if (currentPage == "index.html"){
		// Click Event for Closing Modal
		var modal = document.getElementById("modalWelcome");
		modal.addEventListener('click', closeModal);

		// Close (Hide) Modal
		function closeModal() {
			modal.style.display = "none";
		}
	}

	// Local Storage Products and Prices
	var ProductsBasket = [];
	var PricesBasket = [];

	if (currentPage == "index.html" || currentPage == "camping-equipment.html" || currentPage == "furniture.html" || currentPage == "offers-and-packages.html"){

		// Iterations for Previous and Next Slideshow Buttons
		var slideshows = document.querySelectorAll(".slideshow"), s;
		var prevButtons = document.querySelectorAll(".prev"), p;
		var nextButtons = document.querySelectorAll(".next"), n;

		// Adding Event Listener to Each Previous and Next Button as well as Slideshow for Bubbling
		for (p = 0; p != prevButtons.length; p++) {
			prevButtons[p].addEventListener('click', prev);
		}
		for (n = 0; n != nextButtons.length; n++) {
			nextButtons[n].addEventListener('click', next);
		}

		// Click Event for Left Slideshow Navigation
		function prev() {

			// Children of Slideshow where Prev Button was Pressed
			var slideshowChildren = this.parentElement.children; // HTML Collection

			// Conversion of HTML Collection to Array
			var arrSlideshowChildren = Array.prototype.slice.call(slideshowChildren); 
			var slideshowPhotos = []; // Empty Array for storing of Slideshow Images
			var prices = []; // Empty Array for storing of Different Prices

			// Appending of all Images to Empty Array
			for (i = 0; i != arrSlideshowChildren.length; i++){

				if (arrSlideshowChildren[i].toString() == "[object HTMLImageElement]") {
					slideshowPhotos.push(arrSlideshowChildren[i]);
				}
			}

			// Appending of all Prices to Empty Array
			for (i = 0; i != arrSlideshowChildren.length; i++){

				if (arrSlideshowChildren[i].toString() == "[object HTMLParagraphElement]") {
					prices.push(arrSlideshowChildren[i]);
				}
			}

			// Iterating Through Slideshow Images

			for (i = slideshowPhotos.length; i != 0; i--) {
				
				if (window.getComputedStyle(slideshowPhotos[i-1]).display == "block") { // Checking which image is visible
					slideshowPhotos[i-1].style.display = "none"; // Hiding this image to show the next

					// Only Popular This Week has Second Child as a Heading
					if (arrSlideshowChildren[1].toString() == "[object HTMLHeadingElement]") { // Popular This Week

						if (i == 1) { // Checking if this is the end of slideshow

							// End of slideshow, resetting to last image
							slideshowPhotos[slideshowPhotos.length-1].style.display = "block";

							// Replace Title
							if (slideshowPhotos[slideshowPhotos.length-1].alt == "Portable Grill") { // Alt tag is different than object name
								arrSlideshowChildren[1].textContent = "Portable Grill Bundle";
							} else if (slideshowPhotos[slideshowPhotos.length-1].alt == "Portable Stove and Kettle") {

								arrSlideshowChildren[1].textContent = "Portable Stove and Kettle Bundle";
							} else if (slideshowPhotos[slideshowPhotos.length-1].alt == "Wooden Chair"){

								arrSlideshowChildren[1].textContent = "Camping Chair";
							} else {

								arrSlideshowChildren[1].textContent = slideshowPhotos[slideshowPhotos.length-1].alt;
							}

						} else {
							// Not the end of slideshow, going to previous image
							slideshowPhotos[i-2].style.display = "block";

							// Replace Title
							if (slideshowPhotos[i-2].alt == "Portable Grill") { // Alt tag is different than object name
								arrSlideshowChildren[1].textContent = "Portable Grill Bundle";
							} else if (slideshowPhotos[i-2].alt == "Portable Stove and Kettle") {

								arrSlideshowChildren[1].textContent = "Portable Stove and Kettle Bundle";
							} else if (slideshowPhotos[i-2].alt == "Wooden Chair"){

								arrSlideshowChildren[1].textContent = "Camping Chair";
							} else {

								arrSlideshowChildren[1].textContent = slideshowPhotos[i-2].alt;
							}
						}
					} else { // Mobile Slideshow

						if (i == 1) { // Checking if this is the end of slideshow

							// End of slideshow, resetting to last image
							slideshowPhotos[slideshowPhotos.length-1].style.display = "block";

							// Replace Title
							if (prices.length == 3) { // Different Naming System


								// Reverting Margins and Displays
								prices[1].style.marginBottom = "16px";
								prices[2].style.display = "block";

								arrSlideshowChildren[0].style.left = "0px"; // Long Title Alignment Resetter

								if (slideshowPhotos[slideshowPhotos.length-1].alt == "Camping Mug") {

									arrSlideshowChildren[0].textContent = "Family Pack - 3 Camping Mugs";
								} else if (slideshowPhotos[slideshowPhotos.length-1].alt == "Portable Grill") {

									arrSlideshowChildren[0].textContent = "Cooking Bundle - Grill, Pan, Stove";
								} else { // Utility Bundle

									arrSlideshowChildren[0].textContent = "Utility Bundle - Axe, Knife, Wooden Box";
									arrSlideshowChildren[0].style.position = "relative";
									arrSlideshowChildren[0].style.left = "23px"; // Long Title Alignment Adjustment
								}
							} else {
								if (slideshowPhotos[slideshowPhotos.length-1].alt == "Portable Grill") { // Alt tags are different than object name
									
									arrSlideshowChildren[0].textContent = "Portable Grill Bundle";
								} else if (slideshowPhotos[slideshowPhotos.length-1].alt == "Portable Stove and Kettle") {
									
									arrSlideshowChildren[0].textContent = "Portable Stove and Kettle Bundle";
								} else if (slideshowPhotos[slideshowPhotos.length-1].alt == "Wooden Chair") {

									arrSlideshowChildren[0].textContent = "Camping Chair";
								} else {
									
									arrSlideshowChildren[0].textContent = slideshowPhotos[slideshowPhotos.length-1].alt;
								}	
							}
							

							// Checking Price Listing Type
							if (prices.length == 1) { // Original Price

								// Price Replacement
								if (slideshowPhotos[slideshowPhotos.length-1].alt == "Wooden Box"){
									prices[0].textContent = "€45";
								} else if (slideshowPhotos[slideshowPhotos.length-1].alt == "Wooden Chair"){
									prices[0].textContent = "€40";
								}

							} else if (prices.length == 2) { // Original and Sale Price

								// Reverting Margins and Displays
								prices[0].style.marginBottom = "0px";
								prices[1].style.display = "block";

								// Price Replacement
								if (slideshowPhotos[slideshowPhotos.length-1].alt == "Yellow Tent") {
									prices[0].textContent = "Original Price €100";
									prices[1].textContent = "Sale Price €80";

									
								} else if (slideshowPhotos[slideshowPhotos.length-1].alt == "Camping Mug") {
									prices[0].textContent = "Original Price €5";
									prices[1].textContent = "Sale Price €3.50";
								} else if (slideshowPhotos[slideshowPhotos.length-1].alt == "Portable Stove and Kettle") {
									prices[0].textContent = "Original Price €80";
									prices[1].textContent = "Sale Price €75";
								} else if (slideshowPhotos[slideshowPhotos.length-1].alt == "Portable Grill") {
									prices[0].textContent = "Original Price €35";
									prices[1].textContent = "Sale Price €27.50";
								} else if (slideshowPhotos[slideshowPhotos.length-1].alt == "Wooden Chair") {
									// One-Price in Two-Prices Slideshow
									prices[0].textContent = "€40";
									prices[0].style.marginBottom = "10px"; // Altering Margins For Consistency
									prices[1].style.display = "none";
								}
								
							} else { // Original, Sale and Bundle Price

								if (slideshowPhotos[slideshowPhotos.length-1].alt == "Camping Mug") {
									prices[0].textContent = "Original Price €15";
									prices[1].textContent = "Sale Price €10.50";
									prices[2].textContent = "Family Pack Deal Price €8";
								} else if (slideshowPhotos[slideshowPhotos.length-1].alt == "Portable Grill") {
									prices[0].textContent = "Original Price €115";
									prices[1].textContent = "Sale Price €102.50";
									prices[2].textContent = "Cooking Bundle Price €85";
								} else { // Utility Bundle
									prices[0].textContent = "Original Price €65";
									prices[1].textContent = "Sale Price €50";
									prices[1].style.marginBottom = "10px"; // Altering Margins For Consistency
									prices[2].style.display = "none";
								}
							}

						} else {
							// Not the end of slideshow, going to previous image
							slideshowPhotos[i-2].style.display = "block";

							// Replace Title
							if (prices.length == 3) { // Different Naming System


								// Reverting Margins and Displays
								prices[1].style.marginBottom = "16px";
								prices[2].style.display = "block";

								arrSlideshowChildren[0].style.left = "0px"; // Long Title Alignment Resetter

								if (slideshowPhotos[i-2].alt == "Camping Mug") {

									arrSlideshowChildren[0].textContent = "Family Pack - 3 Camping Mugs";
								} else if (slideshowPhotos[i-2].alt == "Portable Grill") {

									arrSlideshowChildren[0].textContent = "Cooking Bundle - Grill, Pan, Stove";
								} else { // Utility Bundle

									arrSlideshowChildren[0].textContent = "Utility Bundle - Axe, Knife, Wooden Box";
									arrSlideshowChildren[0].style.position = "relative";
									arrSlideshowChildren[0].style.left = "23px"; // Long Title Alignment Adjustment
								}
							} else {
								if (slideshowPhotos[i-2].alt == "Portable Grill") { // Alt tag is different than object name
									arrSlideshowChildren[0].textContent = "Portable Grill Bundle";
								} else if (slideshowPhotos[i-2].alt == "Portable Stove and Kettle") {

									arrSlideshowChildren[0].textContent = "Portable Stove and Kettle Bundle";
								} else if (slideshowPhotos[i-2].alt == "Wooden Chair"){

									arrSlideshowChildren[0].textContent = "Camping Chair";
								} else {

									arrSlideshowChildren[0].textContent = slideshowPhotos[i-2].alt;
								}
							}


							// Checking Price Listing Type
							if (prices.length == 1) { // Original Price

								// Price Replacement
								if (slideshowPhotos[i-2].alt == "Wooden Box"){
									prices[0].textContent = "€45";
								} else if (slideshowPhotos[i-2].alt == "Wooden Chair"){
									prices[0].textContent = "€40";
								}

							} else if (prices.length == 2) { // Original and Sale Price

								// Reverting Margins and Displays
								prices[0].style.marginBottom = "0px";
								prices[1].style.display = "block";

								// Price Replacement
								if (slideshowPhotos[i-2].alt == "Yellow Tent") {
									prices[0].textContent = "Original Price €100";
									prices[1].textContent = "Sale Price €80";
								} else if (slideshowPhotos[i-2].alt == "Camping Mug") {
									prices[0].textContent = "Original Price €5";
									prices[1].textContent = "Sale Price €3.50";
								} else if (slideshowPhotos[i-2].alt == "Portable Stove and Kettle") {
									prices[0].textContent = "Original Price €80";
									prices[1].textContent = "Sale Price €75";
								} else if (slideshowPhotos[i-2].alt == "Portable Grill") {
									prices[0].textContent = "Original Price €35";
									prices[1].textContent = "Sale Price €27.50";
								} else if (slideshowPhotos[i-2].alt == "Wooden Chair") {
									// One-Price in Two-Prices Slideshow
									prices[0].textContent = "€40";
									prices[0].style.marginBottom = "10px"; // Altering Margins For Consistency
									prices[1].style.display = "none";
								}
								
							} else { // Original, Sale and Bundle Price

								if (slideshowPhotos[i-2].alt == "Camping Mug") {
									prices[0].textContent = "Original Price €15";
									prices[1].textContent = "Sale Price €10.50";
									prices[2].textContent = "Family Pack Deal Price €8";
								} else if (slideshowPhotos[i-2].alt == "Portable Grill") {
									prices[0].textContent = "Original Price €115";
									prices[1].textContent = "Sale Price €102.50";
									prices[2].textContent = "Cooking Bundle Price €85";
								} else { // Utility Bundle
									prices[0].textContent = "Original Price €65";
									prices[1].textContent = "Sale Price €50";
									prices[1].style.marginBottom = "10px"; // Altering Margins For Consistency
									prices[2].style.display = "none";
								}
							}
						}
					}
					
					break; // Task has been done, stopping loop iteration
				}
			}
		}

		// Click Event for Right Slideshow Navigation
		function next() {

			// Children of Slideshow where Next Button was Pressed
			var slideshowChildren = this.parentElement.children; // HTML Collection

			// Conversion of HTML Collection to Array
			var arrSlideshowChildren = Array.prototype.slice.call(slideshowChildren); 

			var slideshowPhotos = []; // Empty Array for storing of Slideshow Images
			var prices = []; // Empty Array for storing of Different Prices

			// Appending of all Images to Empty Array
			for (i = 0; i != arrSlideshowChildren.length; i++){

				if (arrSlideshowChildren[i].toString() == "[object HTMLImageElement]") {
					slideshowPhotos.push(arrSlideshowChildren[i]);
				}
			}

			// Appending of all Prices to Empty Array
			for (i = 0; i != arrSlideshowChildren.length; i++){

				if (arrSlideshowChildren[i].toString() == "[object HTMLParagraphElement]") {
					prices.push(arrSlideshowChildren[i]);
				}
			}

			// Iterating Through Slideshow Images

			for (i = 0; i != slideshowPhotos.length; i++) {
				
				if (window.getComputedStyle(slideshowPhotos[i]).display == "block") { // Checking which image is visible
					slideshowPhotos[i].style.display = "none"; // Hiding this image to show the next

					// Only Popular This Week has Second Child as a Heading
					if (arrSlideshowChildren[1].toString() == "[object HTMLHeadingElement]") { // Popular This Week

						if (i == slideshowPhotos.length-1) { // Checking if this is the end of slideshow

							// End of slideshow, resetting to first image
							slideshowPhotos[0].style.display = "block";

							// Replace Title
							if (slideshowPhotos[0].alt == "Portable Grill") { // Alt tag is different than object name
								arrSlideshowChildren[1].textContent = "Portable Grill Bundle";
							} else if (slideshowPhotos[0].alt == "Portable Stove and Kettle") {

								arrSlideshowChildren[1].textContent = "Portable Stove and Kettle Bundle";
							} else if (slideshowPhotos[0].alt == "Wooden Chair"){

								arrSlideshowChildren[1].textContent = "Camping Chair";
							} else {

								arrSlideshowChildren[1].textContent = slideshowPhotos[0].alt;
							}

						} else {
							// Not the end of slideshow, going to next image
							slideshowPhotos[i+1].style.display = "block";

							// Replace Title
							if (slideshowPhotos[i+1].alt == "Portable Grill") { // Alt tag is different than object name
								arrSlideshowChildren[1].textContent = "Portable Grill Bundle";
							} else if (slideshowPhotos[i+1].alt == "Portable Stove and Kettle") {

								arrSlideshowChildren[1].textContent = "Portable Stove and Kettle Bundle";
							} else if (slideshowPhotos[i+1].alt == "Wooden Chair"){

								arrSlideshowChildren[1].textContent = "Camping Chair";
							} else {

								arrSlideshowChildren[1].textContent = slideshowPhotos[i+1].alt;
							}
						}
					} else { // Mobile Slideshow

						if (i == slideshowPhotos.length-1) { // Checking if this is the end of slideshow

							// End of slideshow, resetting to first image
							slideshowPhotos[0].style.display = "block";

							// Replace Title
							if (prices.length == 3) { // Different Naming System


								// Reverting Margins and Displays
								prices[1].style.marginBottom = "16px";
								prices[2].style.display = "block";

								arrSlideshowChildren[0].style.left = "0px"; // Long Title Alignment Resetter

								if (slideshowPhotos[0].alt== "Camping Mug") {

									arrSlideshowChildren[0].textContent = "Family Pack - 3 Camping Mugs";
								} else if (slideshowPhotos[0].alt == "Portable Grill") {

									arrSlideshowChildren[0].textContent = "Cooking Bundle - Grill, Pan, Stove";
								} else { // Utility Bundle

									arrSlideshowChildren[0].textContent = "Utility Bundle - Axe, Knife, Wooden Box";
									arrSlideshowChildren[0].style.position = "relative";
									arrSlideshowChildren[0].style.left = "23px"; // Long Title Alignment Adjustment
								}
							} else {
								if (slideshowPhotos[0].alt == "Portable Grill") { // Alt tag is different than object name
									arrSlideshowChildren[0].textContent = "Portable Grill Bundle";
								} else if (slideshowPhotos[0].alt == "Portable Stove and Kettle") {

									arrSlideshowChildren[0].textContent = "Portable Stove and Kettle Bundle";
								} else if (slideshowPhotos[0].alt == "Wooden Chair"){

									arrSlideshowChildren[0].textContent = "Camping Chair";
								} else {

									arrSlideshowChildren[0].textContent = slideshowPhotos[0].alt;
								}
							}
							

							// Checking Price Listing Type
							if (prices.length == 1) { // Original Price

								// Price Replacement
								if (slideshowPhotos[0].alt == "Wooden Box"){
									prices[0].textContent = "€45";
								} else if (slideshowPhotos[0].alt == "Wooden Chair"){
									prices[0].textContent = "€40";
								}

							} else if (prices.length == 2) { // Original and Sale Price

								// Reverting Margins and Displays
								prices[0].style.marginBottom = "0px";
								prices[1].style.display = "block";

								// Price Replacement
								if (slideshowPhotos[0].alt == "Yellow Tent") {
									prices[0].textContent = "Original Price €100";
									prices[1].textContent = "Sale Price €80";
								} else if (slideshowPhotos[0].alt == "Camping Mug") {
									prices[0].textContent = "Original Price €5";
									prices[1].textContent = "Sale Price €3.50";
								} else if (slideshowPhotos[0].alt == "Portable Stove and Kettle") {
									prices[0].textContent = "Original Price €80";
									prices[1].textContent = "Sale Price €75";
								} else if (slideshowPhotos[0].alt == "Portable Grill") {
									prices[0].textContent = "Original Price €35";
									prices[1].textContent = "Sale Price €27.50";
								} else if (slideshowPhotos[0].alt == "Wooden Chair") {
									// One-Price in Two-Prices Slideshow
									prices[0].textContent = "€40";
									prices[0].style.marginBottom = "10px"; // Altering Margins For Consistency
									prices[1].style.display = "none";
								}
								
							} else { // Original, Sale and Bundle Price

								if (slideshowPhotos[0].alt == "Camping Mug") {
									prices[0].textContent = "Original Price €15";
									prices[1].textContent = "Sale Price €10.50";
									prices[2].textContent = "Family Pack Deal Price €8";
								} else if (slideshowPhotos[0].alt == "Portable Grill") {
									prices[0].textContent = "Original Price €115";
									prices[1].textContent = "Sale Price €102.50";
									prices[2].textContent = "Cooking Bundle Price €85";
								} else { // Utility Bundle
									prices[0].textContent = "Original Price €65";
									prices[1].textContent = "Sale Price €50";
									prices[1].style.marginBottom = "10px"; // Altering Margins For Consistency
									prices[2].style.display = "none";
								}
							}

						} else {
							// Not the end of slideshow, going to next image
							slideshowPhotos[i+1].style.display = "block";


							// Replace Title
							if (prices.length == 3) { // Different Naming System

								// Reverting Margins and Displays
								prices[1].style.marginBottom = "16px";
								prices[2].style.display = "block";

								arrSlideshowChildren[0].style.left = "0px"; // Long Title Alignment Resetter

								if (slideshowPhotos[i+1].alt == "Camping Mug") {

									arrSlideshowChildren[0].textContent = "Family Pack - 3 Camping Mugs";
								} else if (slideshowPhotos[i+1].alt == "Portable Grill") {

									arrSlideshowChildren[0].textContent = "Cooking Bundle - Grill, Pan, Stove";
								} else { // Utility Bundle

									arrSlideshowChildren[0].textContent = "Utility Bundle - Axe, Knife, Wooden Box";
									arrSlideshowChildren[0].style.position = "relative";
									arrSlideshowChildren[0].style.left = "23px"; // Long Title Alignment Adjustment
								}
							} else {
								if (slideshowPhotos[i+1].alt == "Portable Grill") { // Alt tag is different than object name
									arrSlideshowChildren[0].textContent = "Portable Grill Bundle";
								} else if (slideshowPhotos[i+1].alt == "Portable Stove and Kettle") {

									arrSlideshowChildren[0].textContent = "Portable Stove and Kettle Bundle";
								} else if (slideshowPhotos[i+1].alt == "Wooden Chair"){

									arrSlideshowChildren[0].textContent = "Camping Chair";
								} else {

									arrSlideshowChildren[0].textContent = slideshowPhotos[i+1].alt;;
								}				
							}


							// Checking Price Listing Type
							if (prices.length == 1) { // Original Price

								// Price Replacement
								if (slideshowPhotos[i+1].alt == "Wooden Box"){
									prices[0].textContent = "€45";
								} else if (slideshowPhotos[i+1].alt == "Wooden Chair"){
									prices[0].textContent = "€40";
								}

							} else if (prices.length == 2) { // Original and Sale Price

								// Reverting Margins and Displays
								prices[0].style.marginBottom = "0px";
								prices[1].style.display = "block";

								// Price Replacement
								if (slideshowPhotos[i+1].alt == "Yellow Tent") {
									prices[0].textContent = "Original Price €100";
									prices[1].textContent = "Sale Price €80";
								} else if (slideshowPhotos[i+1].alt == "Camping Mug") {
									prices[0].textContent = "Original Price €5";
									prices[1].textContent = "Sale Price €3.50";
								} else if (slideshowPhotos[i+1].alt == "Portable Stove and Kettle") {
									prices[0].textContent = "Original Price €80";
									prices[1].textContent = "Sale Price €75";
								} else if (slideshowPhotos[i+1].alt == "Portable Grill") {
									prices[0].textContent = "Original Price €35";
									prices[1].textContent = "Sale Price €27.50";
								} else if (slideshowPhotos[i+1].alt == "Wooden Chair") {
									// One-Price in Two-Prices Slideshow
									prices[0].textContent = "€40";
									prices[0].style.marginBottom = "10px"; // Altering Margins For Consistency
									prices[1].style.display = "none";
								}
								
							} else { // Original, Sale and Bundle Price
								if (slideshowPhotos[i+1].alt == "Camping Mug") {
									prices[0].textContent = "Original Price €15";
									prices[1].textContent = "Sale Price €10.50";
									prices[2].textContent = "Family Pack Deal Price €8";
								} else if (slideshowPhotos[i+1].alt == "Portable Grill") {
									prices[0].textContent = "Original Price €115";
									prices[1].textContent = "Sale Price €102.50";
									prices[2].textContent = "Cooking Bundle Price €85";
								} else { // Utility Bundle
									prices[0].textContent = "Original Price €65";
									prices[1].textContent = "Sale Price €50";
									prices[1].style.marginBottom = "10px"; // Altering Margins For Consistency
									prices[2].style.display = "none";
								}
							}
						}
					}
					
					break; // Task has been done, stopping loop iteration
				}
			}
		}

		// Click Event for Search Bar Icon
		document.getElementById("search-icon").addEventListener('click', search);

		// Click Event for Showing / Hiding Search Bar
		function search() {
			// Check if Search Bar is Hidden
			if (window.getComputedStyle(document.getElementById("search-form")).display == "none") { // Hidden
				document.getElementById("search-icon").style.transform = "scale(0.65)"; // Shrink Icon
				document.getElementById("search-form").style.display = "block"; // Show Search Bar
			} else { // Visible
				document.getElementById("search-icon").style.transform = "scale(1)"; // Enlarge Icon
				document.getElementById("search-form").style.display = "none"; // Hide Search Bar
			}
		}

		// Click Event for Product Search Button
		document.getElementById("searchSubmit").addEventListener('click', searchSubmit);

		// Product Search Event
		function searchSubmit() {
			// Get the product search request text by the user
			var searchQuery = document.getElementById('productName').value;

			// All product titles
			var products = document.querySelectorAll(".prodTitle"), i;

			// Boolean to inform user if product remains unfound after search operation
			var prodFound = false;

			// Iteration of products to find the first match
			for (i = 0; i != products.length; i++) {
				// Check if the text (or part of text) user is searching for is in product in lower case
				if (products[i].textContent.toLowerCase().includes(searchQuery.toLowerCase())){
					products[i].scrollIntoView(); // Go to Product

					prodFound = true; // Setting Boolean to true so user is not alerted

					break; // First Matching Product Found, Exiting Loop
				}
			}

			// Alert the user that no product has been found
			if (prodFound == false){
				alert("No results have been found!");
			}
		}

		if (typeof(Storage) !== "undefined" && isFirefox == false) { // Browser Support Check For Local Storage
			// Supported. Firefox is not supported due to how same origin policy is handled.

			// Iteration of all 'Add to Basket' Buttons
			buttons = document.getElementsByTagName('button');
			for (i = 0; i != buttons.length; i++) {

				if (buttons[i].id == ""){ // Adding event listener to each button which is not a review submit

					buttons[i].addEventListener('click', addToBasket);
				}
				
			}

			
			function addToBasket() {

				var basketChildren = this.parentElement.children; // HTML Collection

				var priceArray = []; // Empty Array For Inputting Prices

				// Conversion of HTML Collection to Array
				var arrBasketChildren = Array.prototype.slice.call(basketChildren);

				// Iteration of Product Children for Prices
				for (i = 0; i != arrBasketChildren.length; i++) {
					if (arrBasketChildren[i].localName == "p"){
						priceArray.push(arrBasketChildren[i]);
					}
				}

				var productName = arrBasketChildren[0].textContent;
				
				// Product Price Computation

				if (priceArray.length == 1){

					var productPrice = priceArray[0].textContent.split("€")[1]
				} else if (priceArray.length == 2){
					if (priceArray[1].style.display == "none"){ // Current Product Only Has One Price
						var productPrice = priceArray[priceArray.length-2].textContent.split("€")[1]
					} else {
						var productPrice = priceArray[priceArray.length-1].textContent.split("€")[1]
					}
					
				} else { // Length of 3

					if (priceArray[2].style.display == "none"){ // Current Product Only Has Two Prices
						var productPrice = priceArray[priceArray.length-2].textContent.split("€")[1]
					} else {
						var productPrice = priceArray[priceArray.length-1].textContent.split("€")[1]
					}
				}

				// Prevention of Overwriting of Data
				if (localStorage.length != 0){
					// Assigning of Existing Data to Containers
					var ProductsBasket = JSON.parse(localStorage.productName);
					var PricesBasket = JSON.parse(localStorage.productPrice);
				} else {
					// Creating Empty Containers
					var ProductsBasket = [];
					var PricesBasket = [];
				}

				// Assigning of Selected Product to Basket
				ProductsBasket.push(productName);
				PricesBasket.push(productPrice);

				localStorage.productName = JSON.stringify(ProductsBasket);
				localStorage.productPrice = JSON.stringify(PricesBasket);

				
				alert("Product has been added to the basket!");
			}

		} else { // Not Supported, Using Only Add to Basket Alert

			// Iteration of all 'Add to Basket' Buttons
			buttons = document.getElementsByTagName('button');
			for (i = 0; i != buttons.length; i++) {

				if (buttons[i].id == ""){ // Adding event listener to each button which is not a review submit

					buttons[i].addEventListener('click', alertBasket);
				}
				
			}

			// Click Event to alert the user of added product
			function alertBasket() {
				alert("Product has been added to the basket!");
			}
		} 

		// Review Alert

		// Click Event for Submit Buttons
		document.getElementById("submit").addEventListener('click', alertReview);

		// Click Event to alert the user of added product
		function alertReview() {
			alert("Your review has been submitted!");
		}
	}
	if (currentPage == "reviews.html"){

		// Mail To Click Event
		document.getElementById("submitForumIssue").addEventListener('click', mail);

		function mail() {

			// Details Of The User
			var name = document.getElementById('userName').value;
			var surname = document.getElementById('userSurname').value;
			var email = document.getElementById('userEmail').value;

			if (name == ""){ // User Didn't Provide A Name, Setting As Anonymous
				mailtoPath = "mailto:support@rcc.com?subject=Anonymous%20-%20Forum%20Issues&body=Email%20From%20" + email;
			} else {
				// Construction of mailto path according to provided details
				mailtoPath = "mailto:support@rcc.com?subject=" + name + "%20" + surname + "%20-%20Forum%20Issues&body=Email%20From%20" + email;
			}
			
			window.location.href = mailtoPath; // Opening Default Mail Client
		}
	}

	if (currentPage == "basket.html"){

		// Obtaining of Basket Data
		if (typeof(Storage) !== "undefined" && isFirefox == false) { // Browser Support Check For Local Storage
			// Supported. Firefox is not supported due to how same origin policy is handled.

			if (localStorage.length != 0){
				var productNames = JSON.parse(localStorage.productName);
				var productPrices = JSON.parse(localStorage.productPrice);
				var combinedArray = []; // Array which will be used to sort Products and Prices Together

				for (i = 0; i != productNames.length; i++){
					combinedArray.push(productNames[i] + "?" + productPrices[i]); // Combining of Products and Prices
				}

				combinedArray.sort(); // Sorting Together

				// Containers for Sorted Data
				var sortedProductNames = [];
				var sortedProductPrices = [];

				for (i = 0; i != combinedArray.length; i++){
					// Seperation And Appending Of Sorted Data
					sortedProductNames.push(combinedArray[i].split("?")[0]);
					sortedProductPrices.push(combinedArray[i].split("?")[1]);
				}

				// Containers for Merging of Same Product Types
				var productTypes = [];
				var productQuantities = [];
				var productPrices = [];

				// Iteration of Sorted Data
				for (i = 0; i != sortedProductNames.length; i++){
					var lastIndex = sortedProductNames.lastIndexOf(sortedProductNames[i]); // Last Index of Current Product

					// Assigning of Merged Data
					productTypes.push(sortedProductNames[i]);
					productQuantities.push((lastIndex - i) + 1);
					productPrices.push(sortedProductPrices[i]);

					i = lastIndex; // Proceeding to Next Product Type
				}

				// Table Manipulation Data
				var table = document.getElementById("basketTable");
				var totalProductsCell = document.getElementById("totalProducts");
				var totalPriceCell = document.getElementById("totalPrice");

				var totalProductAmount = 0; // Container for total Product Count
				var totalPrice = 0;

				// Iteration of Product Quantities
				for (i = 0; i != productQuantities.length; i++){
					totalProductAmount += productQuantities[i]; // Assignment of Quantities to Container
					totalPrice += (productQuantities[i]*productPrices[i]); // Assignment of Prices to Container
				}

				// Altering of Table Datas
				totalProductsCell.innerHTML = totalProductsCell.textContent + totalProductAmount;
				totalPriceCell.innerHTML = totalPriceCell.textContent + totalPrice.toFixed(2);

				// Iteration of Products for Appending To Table
				for (i = 0; i != productTypes.length; i++){

					// Creation of Row and Cells
					var productDataRow = table.insertRow(1);
					var nameCell = productDataRow.insertCell(0);
					var amountCell = productDataRow.insertCell(1);
					var priceCell = productDataRow.insertCell(2);

					// Assigning of Data
					nameCell.innerHTML = productTypes[i];
					amountCell.innerHTML = productQuantities[i];
					priceCell.innerHTML = productPrices[i];
				}

			}
			// Click event for Resetting of Basket
			document.getElementById("basketReset").addEventListener('click', resetBasket);

			function resetBasket() {
				// Resetting of Data
				localStorage.clear();

				alert("The basket has been cleared!"); // Informing the User

				location.reload(); // Refresh Page to Display Cleared Basket
			}
		} else {

			// Table Manipulation Data
			var table = document.getElementById("basketTable");
			var totalProductsCell = document.getElementById("totalProducts");
			var totalPriceCell = document.getElementById("totalPrice");

			var productDataRow = table.insertRow(1);
			var nameCell = productDataRow.insertCell(0);
			var amountCell = productDataRow.insertCell(1);
			var priceCell = productDataRow.insertCell(2);

			// Assigning of Data
			nameCell.innerHTML = "Yellow Tent";
			amountCell.innerHTML = "3";
			priceCell.innerHTML = "80";

			totalProductsCell.innerHTML = totalProductsCell.textContent + "3";
			totalPriceCell.innerHTML = totalPriceCell.textContent + "240.00";
			document.getElementById("basketReset").style.display = "none"; // Hiding Unused Feature in Firefox
		}
	}
});