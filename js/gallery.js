// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

var CurrentIndexI = 0;
function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	if(CurrentIndexI < 0) {
		CurrentIndexI += mImages.length;
	}
	
	$("#photo").attr('src', mImages[CurrentIndexI].imgPath);
	$(".location").text("Location: "+mImages[CurrentIndexI].location);
	$(".description").text("Description: "+mImages[CurrentIndexI].description);
	$(".date").text("date: "+mImages[CurrentIndexI].date);
	
	CurrentIndexI++;
	
	if (CurrentIndexI >= mImages.length) {
		CurrentIndexI = 0;
	}
	
	console.log('swap photo');
}



// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;



// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = "images-short.json";;


//XMLHttpRequest function
mRequest.onreadystatechange = function() {
	// Do something interesting if file is opened successfully
	if (mRequest.readyState == 4 && mRequest.status == 200) {
		try {
		// Let’s try and see if we can parse JSON (see next slide)
		mJson = JSON.parse(mRequest.responseText);
		// LOOP THROUGH the mJSON array here and fill up the
		// mImages array with GalleryImage objects
		// Let’s print out the JSON; It will likely show as “obj”
			
			for (var j = 0; j < mJson.images.length; j++) {
				var I = mJson.images[j];
				mImages.push(new GalleryImage(I.imgPath, I.imgLocation, I.description, I.date));
				
			}
		
		console.log(mJson);
		} 
		catch(err) {
			console.log(err.message)
		}
	}
};
mRequest.open('GET',mUrl, true);
mRequest.send();


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
//function makeGalleryImageOnloadCallback(galleryImage) {
//	return function(e) {
//		galleryImage.img = e.target;
//		mImages.push(galleryImage);
//	}
//}


$(document).ready ( function () {
	$('.details').eq(0).hide();
	$(".moreIndicator").click(function () {
		$("img.rot90").toggleClass("rot270", 3000);
		$(".details").slideToggle(1000);
		
	});
	
	$("#nextPhoto").click(function() {
		swapPhoto();
	});
	
	$("#prevPhoto").click(function () {
		if (CurrentIndexI == 0) {
			CurrentIndexI = mImages.length-2;
		}
		else if (CurrentIndexI == 1) {
			CurrentIndexI = mImages.length- 1;
		}
		else {
			CurrentIndexI = CurrentIndexI - 2;
		}
		swapPhoto()
		//console.log(CurrentIndexI);
	});
});


window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(imgPath, location, description, date) {
	//implement me as an object to hold the following data about an image:
	this.imgPath = imgPath;
	this.location = location;
	this.description = description;
	this.date = date;
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
};


