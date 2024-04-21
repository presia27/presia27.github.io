/*

========}    P D F V I E W E R    {========
        
        PDFViewer 4.0.0
        COPYRIGHT (C) 2024 PRESTON SIA (PRESIA27)
        THIS SOFTWARE IS LICENSED UNDER THE APACHE LICENSE, VERSION 2.0
        [https://www.apache.org/licenses/LICENSE-2.0]

        This project utilizes the PDF.js project by Mozilla.
        PDF.js is licensed under Apache, and Copyright (C) Mozilla and individual contributors.
        [https://mozilla.github.io/pdf.js/]

 */



// Script for site controls, not for loading entries
// **Variables**
var nav = document.getElementById("nav"); //navigation
var headingTop = document.getElementById("indexHeadingTop"); //Top heading with index title and toggle button
var floatingIndexOptions = document.getElementById("floatingIndexOptions"); //menu displayed when the index is collapsed
var pdf = document.getElementById("PDF"); //Iframe element
var hideNav = document.getElementById("hideNav"); //hide index button
var showNav = document.getElementById("showNav"); //show index button
var navSettings = document.getElementById("navSettings"); //Button to open settings box
var settingsBackdrop = document.getElementById("settingsBackdrop"); //Darkened backdrop behind settings box
var navSettingsDialog = document.getElementById("navSettingsDialog"); //Settings box dialog
var closeSettings = document.getElementById("closeSettings"); //Close settings button 1
var closeSettings2 = document.getElementById("closeSettings2"); //Close Settings button 2
var displayFullTitle = document.getElementById("displayFullTitle"); //Display full title checkbox (in settings)



//dynamically change the index (nav) height based on window size
//this is necessary because the index header and nav sections are set to fixed positions
window.addEventListener("load", resizeNav);
window.addEventListener("resize", resizeNav);
function resizeNav() {
    //detect and resize window (110px is the size of the title/button block)
    nav.style.height = window.innerHeight - 110 + "px";
}

// **Button Controls**
hideNav.addEventListener("click", function() {
    nav.style.display = "none";
    headingTop.style.display = "none";
    floatingIndexOptions.style.display = "block";
    pdf.style.marginLeft = "0";
    pdf.style.width = "100%";
});

showNav.addEventListener("click", function() {
    nav.style.display = "block";
    headingTop.style.display = "block";
    floatingIndexOptions.style.display = "none";
    pdf.style.marginLeft = "19%";
    pdf.style.width = "80%";
});

navSettings.addEventListener("click", function() {
    settingsBackdrop.style.display = "block";
    navSettingsDialog.style.display = "block";
})

closeSettings.addEventListener("click", closeSettingsDialog);
closeSettings2.addEventListener("click", closeSettingsDialog);
function closeSettingsDialog() {
    settingsBackdrop.style.display = "none";
    navSettingsDialog.style.display = "none";
}

// **Controls in the settings box**
displayFullTitle.addEventListener("click", function() { //Changes whether to display full document title on mouse hover
    var links = document.getElementsByClassName("link");
    var i;
    if (displayFullTitle.checked == false) {
        for (i=0; i < links.length; i++) {
            links[i].style.overflow = "hidden";
            links[i].style.whiteSpace = "nowrap";
            links[i].style.textOverflow = "ellipsis";
        }
    }

    if (displayFullTitle.checked == true) {
        for (i = 0; i < links.length; i++) {
            links[i].setAttribute("style", "");
        }
    }
});

// Reload index
function reloadIndex() {
    var divNodes = nav.getElementsByTagName("div");
    for (var i = divNodes.length - 1; i >= 0; i--) { // Start from last element and work backwards
        nav.removeChild(divNodes[i]);
    }
    processIndex(); // Load main data
    document.getElementById("reloadConf").style.display = "block"; // Show confirmation
}

// **Highlight index options**
var indexSelections = nav.getElementsByTagName("a");

function highlight() {
    var i;
    for (i = 0; i < indexSelections.length; i++) {
        indexSelections[i].addEventListener("click", function() {

            for (var j = 0; j < indexSelections.length; j++) {
                indexSelections[j].classList.remove("active") // Remove "active" attribute to clear selections
            }

            this.classList.add("active"); // Do something to the clicked element
        })
    }
}