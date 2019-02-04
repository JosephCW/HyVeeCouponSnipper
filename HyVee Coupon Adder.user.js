// ==UserScript==
// @name     Hy-Vee Coupon Snippper
// @version  1.1
// @grant    none
// @include https://www.hy-vee.com/deals/coupons.aspx*
//
// ==/UserScript==

var addButtonName = "add-to-cart";
var refreshDelayInSeconds = 30;
var initialDelayInSeconds = 5;
var waitDelayInSeconds = 1;
var currentClick = 0;

// Function to click on an element.
function click(elm) {
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
  elm.dispatchEvent(evt);
}

// Function to immitate a sleep by waitDelayInMs
function loopClick(coupons) {
  setTimeout(function() {
    if (currentClick < coupons.length) {
      click(coupons[currentClick]);
      currentClick++;
      loopClick(coupons);
    }
  }, waitDelayInSeconds * 1000);
}

// Try to click on the + buttons found on the page
setTimeout(function() {
  try {
    // Find the coupon elements on the page.
    var coupons = document.getElementsByClassName(addButtonName);
    loopClick(coupons);
    
    // refresh the page if there are more coupons (divNoResults isn't true.)
    var noCouponsDiv = document.getElementById("divNoResults");
    var moreCouponsExist = !document.body.contains(noCouponsDiv);
    if (moreCouponsExist) {
      setTimeout(
    		function() {
      		console.log("Refreshing the page to select more coupons");
    			location.reload(); 
  		}, ((coupons.length * waitDelayInSeconds) + initialDelayInSeconds) * 1000);
    } else {
      console.log("Finished clicking all coupons!");
    }
  } catch (e) {
  	console.log("Encountered an exception while parsing Hy-Vee deals!");
  }
}, initialDelayInSeconds * 1000);

