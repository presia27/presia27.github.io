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


/*

This script is specific to the AdminConsole Editor (not
to be confused with the file with the same name used
in the "viewer" front-end, even though they're pretty similar).
This file loads index information using the functions in navBuilder.js.

*/


var nav = document.getElementById("nav");
var jsonurl = "../../../navigation.txt";

// **LOAD ALL DATA**
function loadMainData () {
    retrieveRawData(jsonurl, function(status) { // Invoke function with a callback request
        if (status == 200) {
            console.log("Index data found :: " + status + " OK");

            // Generate Lists
            generateSectionList();
            generateElementList();

            processIndex();
        }
    })
}

function processIndex() {
    // Process Data
    for(var i = 0; i < sectionList.length; i++) {
        sectionIndexOf(i, function(indexNum) {
            var sectionInfo = sectionList[indexNum]; // Container of specified index entry

            // **CREATE NEW SECTION**
            var divElm = document.createElement("div"); // Div tag for each section
            var sectionIdent = document.createElement("span"); // Identifier for each section block
            divElm.setAttribute("id", sectionInfo.id);
            divElm.classList.add("section");
            sectionIdent.innerText = sectionInfo.name;
            sectionIdent.setAttribute("class", "identText");

            divElm.appendChild(sectionIdent);
            nav.appendChild(divElm);

            // **PROCESS ELEMENTS**
            for (var j = 0; j < elementList.length; j++) {
                elementIndexOf(sectionInfo.name, j, function(indexNum) {
                    var indexInfo = elementList[indexNum]; // Container of specified index entry

                    var anchor = document.createElement("a"); // Create anchor (link) element
                    var spanElm = document.createElement("span"); // Create span element
                    var header1Elm = document.createElement("h3"); // Create h3 header (heading type 1)
                    var header2Elm = document.createElement("h4"); // Create h4 header (heading type 2)

                    if (indexInfo.type == "heading1") {
                        header1Elm.innerText = indexInfo.value;
                        header1Elm.setAttribute("id", indexInfo.id);
                        header1Elm.classList.add("selectable");
                        document.getElementById(sectionInfo.id).appendChild(header1Elm);
                    }

                    if (indexInfo.type == "heading2") {
                        header2Elm.innerText = indexInfo.value;
                        header2Elm.setAttribute("id", indexInfo.id);
                        header2Elm.classList.add("selectable");
                        document.getElementById(sectionInfo.id).appendChild(header2Elm);
                    }

                    if (indexInfo.type == "entry") {
                        anchor.setAttribute("title", indexInfo.title); // Set hover text
                        anchor.setAttribute("class", "link"); //if a link is present, set the css class to "link"

                        anchor.href = "javascript:void(0)";
                        anchor.setAttribute("id", indexInfo.id);
                        anchor.classList.add("selectable");

                        // **SET DISPLAY NAME**
                        if (indexInfo.style == "indent") {
                            spanElm.setAttribute("style", "margin-left: 20px;");  // If marked indented, add indent
                        }
                        if (indexInfo.style == "normal") {
                            spanElm.setAttribute("style", "margin-left: 10px;");
                        }
                        spanElm.innerText = indexInfo.title; // Add title to span element

                        anchor.appendChild(spanElm);
                        document.getElementById(sectionInfo.id).appendChild(anchor);
                    }
                })
            }
        })
    }
    postParser(); // Run post-parser routine
}

// Call function on page load
window.addEventListener("load", loadMainData);