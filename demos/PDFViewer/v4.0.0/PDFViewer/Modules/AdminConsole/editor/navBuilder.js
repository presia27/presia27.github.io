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

This script contains functions that retrieve index information
and builds arrays to store navigation information. This is
designed to interface with another script (e.g. interpreter.js)
which calls upon the functions contained here.

*/

// **Variables**
var nav = document.getElementById("nav");
var jsonData = "";

var sectionList = [
    // { "rank": "", "name": "", "id": ""}
]

var elementList = [
    //Associate section, then order/rank within the section
    // { "section": "", "rank": "", "id": "", "type": "heading1", "value": "Section Name"},
    // { "section": "", "rank": "", "id": "", "type": "entry", "title": "Document title", "style": "normal", "link": "", "host": ""}
];

// **Load data, and parse**
function retrieveRawData(url, dataCallback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            jsonData = JSON.parse(this.responseText);
            // Callback
            if (typeof dataCallback === "function") {
                dataCallback(this.status);
            }
        }
    };

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Cache-Control", "no-cache, must-revalidate"); // Prevent the browser from caching the CSV database file
    xhttp.send();
}


function generateSectionList() {
    for (var i = 0; i < jsonData.length; i++) {
        // Only get section data if the entries are actually marked with "section"
        if (jsonData[i].type == "section") {
            // Build specific entry
            var sectionArray = {};
            sectionArray["rank"] = i;
            sectionArray["name"] = jsonData[i].section;
            sectionArray["id"] = Math.floor(Math.random() * 1000000); // Set random ID

            // Insert newly-built entry into the array
            sectionList[i] = sectionArray;
        };
    }
}

function generateElementList() {
    console.log("Building element list...");

    for (var i = 0; i < jsonData.length; i++) { // Increment based on the sections
        for (var j = 0; j < jsonData[i].content.length; j++) {
            var elementArray = {};
            elementArray["section"] = jsonData[i].section;
            elementArray["rank"] = j;
            elementArray["id"] = Math.floor(Math.random() * 10000000); // Set random ID
            //Check if the element is a heading or entry
            if (jsonData[i].content[j].type == "heading1" || jsonData[i].content[j].type == "heading2") {
                elementArray["type"] = jsonData[i].content[j].type;
                elementArray["value"] = jsonData[i].content[j].value;
            }

            if (jsonData[i].content[j].type == "entry") {
                elementArray["type"] = jsonData[i].content[j].type;
                elementArray["title"] = jsonData[i].content[j].title;
                elementArray["style"] = jsonData[i].content[j].style;
                elementArray["link"] = jsonData[i].content[j].link;
                elementArray["host"] = jsonData[i].content[j].host;
            }

            // Insert newly-built entry into the array
            elementList[elementList.length] = elementArray;
        }
    }
}

function sectionIndexOf(sRank, sRankCallback) { // Find the array position of a section based on the given rank number
    for (var i = 0; i < sectionList.length; i++) {
        if (sectionList[i].rank == sRank) {
            if (typeof sRankCallback === "function") {
                sRankCallback(sectionList.indexOf(sectionList[i]))
            }
        }
    }
}

function elementIndexOf(eSection, eRank, eRankCallback) {
    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].rank == eRank && elementList[i].section == eSection) { // Only return if section and rank matches
            if (typeof eRankCallback === "function") {
                eRankCallback(elementList.indexOf(elementList[i]))
            }
        }
    }
}

function sectionIndexById(id, locationCallback) {
    for (var i = 0; i < sectionList.length; i++) {
        if (sectionList[i].id == id) {
            if (typeof locationCallback === "function") {
                locationCallback(sectionList.indexOf(sectionList[i]));
            }
        }
    }
}

function elementIndexById(id, locationCallback) {
    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].id == id) {
            if (typeof locationCallback === "function") {
                locationCallback(elementList.indexOf(elementList[i]));
            }
        }
    }
}