// ==UserScript==
// @name     Hy-Vee Coupon Snippper
// @version  1
// @grant    none
// @include https://www.hy-vee.com/deals/coupons.aspx?l=1
// ==/UserScript==

var refreshDelayInSeconds = 10;
var addButtonName = "add-to-cart";

// Function to click on an element.
function click(elm) {
     var evt = document.createEvent('MouseEvents');
     evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, 0, null);
     elm.dispatchEvent(evt);
}


// Try to click on the + buttons found on the page
setTimeout(function() {
  try {
    var coupons = document.getElementsByClassName(addButtonName);
    for (i = 0; i < coupons.length; i++) {
      click(coupons[i])
    }
    
    console.log("Going back for seconds");
    coupons = document.getElementsByClassName(addButtonName);
    for (i = 0; i < coupons.length; i++) {
      click(coupons[i])
    }
    
    console.log("Going back for thirds");
    coupons = document.getElementsByClassName(addButtonName);
    for (i = 0; i < coupons.length; i++) {
      click(coupons[i])
    } 
  } catch (e) {
  	console.log("Encountered an exception while parsing Hy-Vee deals!");
  }
}, refreshDelayInSeconds * 1000);

