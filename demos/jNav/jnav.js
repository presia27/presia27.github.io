/*

========}    J N A V    {========

    jNav Libary Beta version 0.1.1
    COPYRIGHT (C) 2024 PRESTON SIA (PRESIA27)
    THIS SOFTWARE IS LICENSED UNDER THE APACHE LICENSE, VERSION 2.0
    [https://www.apache.org/licenses/LICENSE-2.0]

*/


/*

This script contains functions used to retrieve information
from the specified JSON file. This has been adapted from
navBuilder.js in the PDFViewer project.

*/

var jsonData = ""; // holds parsed JSON data
/* The format looks something like this:

    [
        {
            "type": "section",
            "id": "Sample_Section",
            "sectionName": "Sample Section",
            "content": [

                {
                    "type": "heading1",
                    "id": "sampleHead1",
                    "value": "Sample Heading"
                },
                {
                    "type": "heading2",
                    "id": "sampleHead2",
                    "value": "Sample Heading"
                },
                {
                    "type": "entry",
                    "id": "exampleEntry",
                    "title": "Title name",
                    "description": "Short description",
                    "style": [],
                    "linkType": "",
                    "url": "",
                    "action": ""
                }

            ]
        }
    ]

*/


/*

retrieveRawData(rul, dataCallback) is used to get data from the JSON file.
The invoking script must pass the *url* of the JSON file
and a callback function script to *dataCallback*. A callback
can be used to execute other functions sequentially, ensuring
that the JSON data is loaded before anything else loads.

*/
function retrieveRawData(url, dataCallback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            jsonData = JSON.parse(this.responseText);
            // Callback
            if (typeof dataCallback === "function") {
                dataCallback(this.status);
            }
        }
    };

    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("Cache-Control", "no-cache, must-revalidate"); // Prevent the browser from caching the file
    xhttp.send();
}


/* ***Implement functions: add, insert, remove, search, countStats, getIndex*** */
// note to self - search and getIndex tools may require recursion for nested sections


// searchById(id, target, indexCallback) returns the index of an item by searching with a unique id
// id is the item ID, target is the target data variable (e.g. jsonData[2])
function searchById(id, target, searchCallBack) {
    for (var i = 0; i < target.length; i++) {
        if (target[i].id == id) { // if the element in question is found
            searchCallBack(target[i])
        }
        else if (target[i].type == "section" && target[i].id != id) { // if the code runs into a section, use recursion to search the section
            return searchById(id, target[i].content, indexCallBack);
        }
    }
}
