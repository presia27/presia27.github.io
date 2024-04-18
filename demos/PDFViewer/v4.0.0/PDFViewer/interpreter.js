var jsonurl = "navigation.txt";

// **LOAD ALL DATA**
function loadMainData() {

    retrieveRawData(jsonurl, function(status) { // Invoke function with a callback request
        if (status == 200) {
            console.log("Index data found :: " + status + " OK");

            // Generate Lists
            generateSectionList();
            generateElementList();

            processIndex();
        }
    });

}

function processIndex() {
            // Process Data
            for (var i = 0; i < sectionList.length; i++) {
                sectionIndexOf(i, function(indexNum) {
                    var sectionInfo = sectionList[indexNum]; // Container of specified index entry

                    // **CREATE NEW SECTION**
                    var divElm = document.createElement("div"); // Div tag for each section
                    divElm.setAttribute("id", sectionInfo.id);

                    nav.appendChild(divElm);

                    //**PROCESS ELEMENTS**
                    for (var j = 0; j < elementList.length; j++) {
                        elementIndexOf(sectionInfo.name, j, function(indexNum) {
                            var indexInfo = elementList[indexNum]; // Container of specified index entry
                            
                            var anchor = document.createElement("a"); // Create anchor (link) element
                            var spanElm = document.createElement("span"); // Create span element
                            var header1Elm = document.createElement("h3"); // Create h3 header (heading type 1)
                            var header2Elm = document.createElement("h4"); // Create h4 header (heading type 2)

                            if (indexInfo.type == "heading1") {
                                header1Elm.innerText = indexInfo.value;
                                document.getElementById(sectionInfo.id).appendChild(header1Elm);
                            }

                            if (indexInfo.type == "heading2") {
                                header2Elm.innerText = indexInfo.value;
                                document.getElementById(sectionInfo.id).appendChild(header2Elm);                            
                            }

                            if (indexInfo.type == "entry") {
                                anchor.setAttribute("title", indexInfo.title); // Set hover text
                                anchor.setAttribute("class", "link"); //if a link is present, set the css class to "link"
                                // **SET LINK TYPE**
                                if (indexInfo.host == "internal") {
                                    anchor.setAttribute("target", "doc");
                                    anchor.href = "pdfjs/web/viewer.html?file=" + indexInfo.link;
                                }
                                if (indexInfo.host == "external") {
                                    anchor.setAttribute("target", "doc");
                                    anchor.href = indexInfo.link;
                                }
                                if (indexInfo.host == "hyperlink") { // Non-PDF sources
                                    anchor.setAttribute("target", "_blank");
                                    anchor.href = indexInfo.link;
                                }
                                // **SET DISPLAY NAME**
                                if (indexInfo.style == "indent") {
                                    spanElm.setAttribute("style", "margin-left: 20px;"); // If marked indented, add indent
                                }
                                if (indexInfo.style == "normal") {
                                    spanElm.setAttribute("style", "margin-left: 10px;");

                                }
                                spanElm.innerText = indexInfo.title; // Add title to span element

                                anchor.appendChild(spanElm);
                                document.getElementById(sectionInfo.id).appendChild(anchor);
                            }
                        });
                    }
                });
            }

            highlight(); // Invoke highlight function after load
}

// Call function on page load
window.addEventListener("load", loadMainData);