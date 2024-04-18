var nav = document.getElementById("nav"); // Index navigation
var banner = document.getElementById("banner"); // Information banner
var actionBanner = document.getElementById("actionBanner"); // Banner that alerts the user
var indexSelections = nav.getElementsByClassName("selectable"); // Used to find the anchor elements for highlighting
var editingTable = document.getElementById("editingTable"); // Editing table used for regular entries
var editingTableHeading = document.getElementById("editingTableHeading"); // Editing table used for headings
var editingTableSection = document.getElementById("editingTableSection") // Editing table used for sections

var clickedId; // ID of the entry selected by the user
var changesSaved = true; // Tells the program whether the latest changes were saved

// Variables for content fields
var indexSection = document.getElementById("indexSection");
var indexTitle = document.getElementById("indexTitle");
var indexStyle = document.getElementById("indexStyle");
var indexLink = document.getElementById("indexLink");
var indexType = document.getElementById("indexType");

// Variables for heading content fields
var headingSection = document.getElementById("headingSection");
var headingTitle = document.getElementById("headingTitle");
var headingStyle = document.getElementById("headingStyle");

var sectionName = document.getElementById("sectionName");



function enableHighlightEntry() {
    if (changesSaved == true) {
        if (clickedId != this.id) {
            clickedId = this.id;
        }

        deselectEntries();
        deselectSections();

        this.classList.add("activeIndex");

        for (var j = 0; j < elementList.length; j++) {
            if (elementList[j].id == clickedId && elementList[j].type == "entry") {
                loadIndexTable(j);
            } else if (elementList[j].id == clickedId && elementList[j].type == "heading1") {
                loadHeadingTable(j);
            } else if (elementList[j].id == clickedId && elementList[j].type == "heading2") {
                loadHeadingTable(j);
            }
        }
    }
    if (changesSaved == false) {
        var confirmDiscard = confirm("There are unsaved changes. Are you sure you want to proceed?");
        if (confirmDiscard == false) {
            return false;
        } else if (confirmDiscard == true) {
            setTimeout(function () {
                changesSaved = true;
                document.getElementById("btSaveEntry").style.backgroundColor = "green";
                document.getElementById("btSaveHeading").style.backgroundColor = "green";
                document.getElementById("btSaveSection").style.backgroundColor = "green";

                if (clickedId < 1000000) { // check if clickedId is a section (clickedId does not change unless changesSaved is true initially)
                    resetSection();
                } else if (clickedId > 1000000) {
                    elementIndexById(clickedId, function(eIndex) {
                        if (elementList[eIndex].type == "entry") {
                            resetEntry();
                        } else if (elementList[eIndex].type == "heading1" || elementList[eIndex].type == "heading2") {
                            resetHeading();
                        }
                    })
                }

            }, 500)
        }
    }
}

function enableHighlightSection() {
    if (changesSaved == true) {
        if (clickedId != this.parentNode.id) {
            clickedId = this.parentNode.id;
        }

        deselectEntries();
        deselectSections();

        this.parentNode.classList.add("activeSection");

        for (var j = 0; j < sectionList.length; j++) {
            if (sectionList[j].id == clickedId) {
                loadSectionTable(j);
            }
        }
    }
    if (changesSaved == false) {
        var confirmDiscard = confirm("There are unsaved changes. Are you sure you want to proceed?");
        if (confirmDiscard == false) {
            return false;
        } else if (confirmDiscard == true) {
            setTimeout(function () {
                changesSaved = true;
                document.getElementById("btSaveSection").style.backgroundColor = "green";
                document.getElementById("btSaveEntry").style.backgroundColor = "green";
                document.getElementById("btSaveHeading").style.backgroundColor = "green";
                
                if (clickedId < 1000000) { // check if clickedId is a section (clickedId does not change unless changesSaved is true initially)
                    resetSection();
                } else if (clickedId > 1000000) {
                    elementIndexById(clickedId, function(eIndex) {
                        if (elementList[eIndex].type == "entry") {
                            resetEntry();
                        } else if (elementList[eIndex].type == "heading1" || elementList[eIndex].type == "heading2") {
                            resetHeading();
                        }
                    })
                }

            }, 500)
        }
    }
}

// Functions for editing tasks
function deselectEntries() {
    for (var i = 0; i < indexSelections.length; i++) {
        indexSelections[i].classList.remove("activeIndex");
    }
}

function deselectSections() {
    for (var i = 0; i < nav.getElementsByTagName("div").length; i++) {
        nav.getElementsByTagName("div")[i].classList.remove("activeSection");
    }  
}

function loadIndexTable(j) {
    // Clear table
    indexSection.value = "";
    indexTitle.value = "";
    indexStyle.value = "notSet";
    indexLink.value = "";
    indexType.value = "notSet";
    // Load table
    editingTable.style.display = "table";
    editingTableHeading.style.display = "none";
    editingTableSection.style.display = "none";
    indexSection.value = elementList[j].section;
    indexTitle.value = elementList[j].title;
    indexStyle.value = elementList[j].style;
    indexLink.value = elementList[j].link;
    indexType.value = elementList[j].host;

    banner.style.backgroundColor = "rgb(153, 204, 255)";
    banner.innerHTML = "NOW EDITING ENTRY \"" + elementList[j].title + "\"";

    // Listen for changes in the table
    $("#editingTable> tbody > tr > td > input, #editingTable > tbody > tr > td > select").on("change input", function() {
        changesSaved = false;
        document.getElementById("btSaveEntry").style.backgroundColor = "orange";
    })
}

function loadHeadingTable(j) {
    // Clear table
    headingSection.value = "";
    headingTitle.value = "";
    headingStyle.value = "notSet";
    // Load table
    editingTableHeading.style.display = "table";
    editingTable.style.display = "none";
    editingTableSection.style.display = "none";
    headingSection.value = elementList[j].section;
    headingTitle.value = elementList[j].value;
    headingStyle.value = elementList[j].type;

    banner.style.backgroundColor = "rgb(153, 204, 255)";
    banner.innerHTML = "NOW EDITING HEADING \"" + elementList[j].value + "\"";

    // Listen for changes in the table
    $("#editingTableHeading > tbody > tr > td > input, #editingTableHeading > tbody > tr > td > select").on("change input", function() {
        changesSaved = false;
        document.getElementById("btSaveHeading").style.backgroundColor = "orange";
    })
}

function loadSectionTable(j) {
    // Clear table
    sectionName.value = "";
    // Load table
    editingTableSection.style.display = "table";
    editingTable.style.display = "none";
    editingTableHeading.style.display = "none";
    sectionName.value = sectionList[j].name;

    banner.style.backgroundColor = "rgb(153, 204, 255)";
    banner.innerHTML = "NOW EDITING SECTION \"" + sectionList[j].name + "\"";

    // Listen for changes in the table
    $("#editingTableSection > tbody > tr > td > input, #editingTableSection > tbody > tr > td > select").on("change input", function() {
        changesSaved = false;
        document.getElementById("btSaveSection").style.backgroundColor = "orange";
    })
}

function postParser() {

    // Make each section movable
    var sectionDragId;
    $(function () {
        $("#nav").sortable(
            {
                items: "> div",
                connectWith: "#nav",
                axis: "y",
                update: function (event, ui) { // Update tables and info
                    sectionDragId = ui.item[0].id; // get html of the element that the user interacted with

                    // loop through index list and re-map sections
                    for (var i = 0; i < nav.getElementsByTagName("div").length; i++) {
                        var currentLoopId = nav.getElementsByTagName("div")[i].id;
                        for (var j = 0; j < sectionList.length; j++) {
                            if (sectionList[j].id == currentLoopId) {
                                sectionList[j].rank = i;
                            }
                        }
                    }
                }
            }
        )
    })

    // Make each entry movable
    var entryDragId;
    $(function () {
        $(".section").sortable(
            {
                items: "> a, h3, h4",
                connectWith: ".section",
                axis: "y",
                update: function (event, ui) { // Update tables and info
                    entryDragId = ui.item[0].id; // get html of the element that the user interacted with
                    var parentSectionId, parentSectionName;

                    // loop through index list and re-map entries
                    for (var i = 0; i < nav.getElementsByTagName("div").length; i++) {
                        parentSectionId = nav.getElementsByTagName("div")[i].id;
                        // Get section name from navBuilder section list
                        for (j = 0; j < sectionList.length; j++) {
                            if (sectionList[j].id == parentSectionId) {
                                parentSectionName = sectionList[j].name;
                            }
                        }

                        // Loop through elements of the section being processed
                        var elmsOfSection = document.getElementById(parentSectionId).getElementsByClassName("selectable");
                        for (var k = 0; k < elmsOfSection.length; k++) {
                            // Loop through elementList
                            for (var m = 0; m < elementList.length; m++) {
                                if (elementList[m].id == elmsOfSection[k].id) {
                                    elementList[m].section = parentSectionName;
                                    elementList[m].rank = k;
                                }
                            }
                        }
                    }
                }
            }
        )
    })

    // Make entries clickable, load data
    for (var i = 0; i < indexSelections.length; i++) {
        indexSelections[i].addEventListener("click", enableHighlightEntry);
    }

    // Make sections clickable, load data
    for (var k = 0; k < nav.getElementsByTagName("div").length; k++) {
        nav.getElementsByClassName("identText")[k].addEventListener("click", enableHighlightSection);
    }
}

// Script for buttons //


// **Sections**

// Clear Form (section)
var btClearSection = document.getElementById("btClearSection");
btClearSection.addEventListener("click", clearSection);

function clearSection() {
    sectionName.value = "";
}

// Reset Form (section)
var btResetSection = document.getElementById("btResetSection");
btResetSection.addEventListener("click", resetSection);

function resetSection() {
    sectionName.value = "";
    
    for (var i = 0; i < sectionList.length; i++) {
        if (sectionList[i].id == clickedId) {
            sectionName.value = sectionList[i].name;

            changesSaved = true;
            document.getElementById("btSaveSection").style.backgroundColor = "green";
        }
    }
}

// Save Form (section)
var btSaveSection = document.getElementById("btSaveSection");
btSaveSection.addEventListener("click", saveSection);

function saveSection() {
    var oldSectionName;
    for (var i = 0; i < sectionList.length; i++) {
        if (sectionList[i].id == clickedId) {
            oldSectionName = sectionList[i].name;
            sectionList[i].name = sectionName.value;

            document.getElementById(clickedId).getElementsByClassName("identText")[0].innerText = sectionName.value;
            banner.innerHTML = "NOW EDITING SECTION \"" + sectionList[i].name + "\""

            // Update section name on elements
            for (var j = 0; j < elementList.length; j++) {
                elementIndexOf(oldSectionName, j, function (eIndex) {
                    elementList[eIndex].section = sectionList[i].name;
                })
            }

            changesSaved = true;
            btSaveSection.style.backgroundColor = "green";
        }
    }
}

// Delete Entry (section)
var btDeleteSection = document.getElementById("btDeleteSection");
btDeleteSection.addEventListener("click", deleteSection);

function deleteSection() {
    var rankNum;
    var deletedSectionName;
    for (var i = 0; i < sectionList.length; i++) {
        if (sectionList[i].id == clickedId) {
            var confirmDelete = confirm("Are you sure you want to delete \"" + sectionList[i].name + "\"");
            if (confirmDelete == false) {
                return false;
            } else if (confirmDelete == true) {
                rankNum = sectionList[i].rank; // record rank number of item to be deleted
                deletedSectionName = sectionList[i].name; // record section name of item to be deleted
                sectionList.splice([i], 1); // DELETE item

                // Change ranks of sections
                for (var j = 0; j < sectionList.length; j++) {
                    if (sectionList[j].rank > rankNum) {
                        sectionList[j].rank--; // decrement rank of every entry with a rank greater than that of the deleted entry
                    }
                }

                // Delete elements within deleted section
                var elmsForDeletion = [];

                // Detect items for deletion and record
                for (var k = 0; k < elementList.length; k++) {
                    if (elementList[k].section == deletedSectionName) {
                        elmsForDeletion.push(elementList[k].id);
                    }
                }

                // Delete items marked for deletion
                for (var m = 0; m < elmsForDeletion.length; m++) { // Scan through list of IDs to be deleted
                    for (p = 0; p < elementList.length; p++) { // Scan through elementList
                        if (elementList[p].id == elmsForDeletion[m]) {
                            elementList.splice([p], 1); // Delete items
                        }
                    }
                }

                // Remove from interface
                var elmRemove = document.getElementById(clickedId);
                elmRemove.parentNode.removeChild(elmRemove);

                clearSection();

                sectionName.value = "";
                editingTableSection.style.display = "none";

                // Change banners
                banner.innerText = "SELECT A TASK OR INDEX ENTRY TO BEGIN";
                banner.style.display = "white";

                actionBanner.innerHTML = "Deleted \"" + deletedSectionName + "\"";
                actionBanner.style.display = "block";
                actionBanner.style.backgroundColor = "rgb(100, 255, 150)";

                clickedId = undefined;

                setTimeout(function() {actionBanner.style.display = "none"}, 3000);
            }
        }
    }
}


// **HEADINGS**

// Clear Form (Headings)
var btClearHeading = document.getElementById("btClearHeading");
btClearHeading.addEventListener("click", clearHeading);

function clearHeading() {
    headingTitle.value = "";
    headingStyle.value = "notSet";
}

// Reset Form (Headings)
var btResetHeading = document.getElementById("btResetHeading");
btResetHeading.addEventListener("click", resetHeading);

function resetHeading() {
    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].id == clickedId) {
            headingTitle.value = elementList[i].value;
            headingStyle.value = elementList[i].type;

            changesSaved = true;
            document.getElementById("btSaveHeading").style.backgroundColor = "green";
        }
    }
}

// Save Form (heading)
var btSaveHeading = document.getElementById("btSaveHeading");
btSaveHeading.addEventListener("click", saveHeading);

function saveHeading() {
    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].id == clickedId) {
            elementList[i].value = headingTitle.value;
            elementList[i].type = headingStyle.value;

            document.getElementById(clickedId).innerText = headingTitle.value;
            banner.innerHTML = "NOW EDITING HEADING \"" + elementList[i].value + "\""

            changesSaved = true;
            btSaveHeading.style.backgroundColor = "green";
        }
    }
}

// Delete Entry (heading)
var btDeleteHeading = document.getElementById("btDeleteHeading");
btDeleteHeading.addEventListener("click", deleteHeading);

function deleteHeading() {
    var rankNum;
    var deletedHeadingName;
    var headingParentSection;
    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].id == clickedId) {
            var confirmDelete = confirm("Are you sure you want to delete \"" + elementList[i].value + "\"");
            if (confirmDelete == false) {
                return false;
            } else if (confirmDelete == true) {
                rankNum = elementList[i].rank; // record rank number of item to be deleted
                deletedHeadingName = elementList[i].value; // record section name of item to be deleted
                headingParentSection = elementList[i].section; // record section name of item to be deleted
                elementList.splice([i], 1); // DELETE item

                // Change ranks of sections
                for (var j = 0; j < elementList.length; j++) {
                    if (elementList[j].rank > rankNum && elementList[j].section == headingParentSection) {
                        elementList[j].rank--;
                    }
                }

                // Remove from interface
                var elmRemove = document.getElementById(clickedId);
                elmRemove.parentNode.removeChild(elmRemove);

                clearHeading();
                editingTableHeading.style.display = "none";

                // Change Banners
                banner.innerHTML = "SELECT A TASK OR INDEX ENTRY TO BEGIN";
                banner.style.display = "white";

                actionBanner.innerHTML = "Deleted \"" + deletedHeadingName + "\"";
                actionBanner.style.display = "block";
                actionBanner.style.backgroundColor = "rgb(100, 255, 150";

                clickedId = undefined;

                setTimeout(function() {actionBanner.style.display = "none"}, 3000);
            }
        }
    }
}


// **INDEX ENTRIES**

// Clear Form (entries)
var btClearEntry = document.getElementById("btClearEntry");
btClearEntry.addEventListener("click", clearEntry);

function clearEntry() {
    indexTitle.value = "";
    indexStyle.value = "notSet";
    indexLink.value = "";
    indexType.value = "notSet";
}

// Reset Form (entries)
var btResetEntry = document.getElementById("btResetEntry");
btResetEntry.addEventListener("click", resetEntry);

function resetEntry() {
    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].id == clickedId) {
            indexTitle.value = elementList[i].title;
            indexStyle.value = elementList[i].style;
            indexLink.value = elementList[i].link;
            indexType.value = elementList[i].host;

            changesSaved = true;
            document.getElementById("btSaveEntry").style.backgroundColor = "green";
        }
    }
}

// Save Form (entries)
var btSaveEntry = document.getElementById("btSaveEntry");
btSaveEntry.addEventListener("click", saveEntry);

function saveEntry() {
    var anchorElm = document.getElementById(clickedId);

    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].id == clickedId) {
            elementList[i].title = indexTitle.value;
            elementList[i].style = indexStyle.value;
            elementList[i].link = indexLink.value;
            elementList[i].host = indexType.value;

            anchorElm.getElementsByTagName("span")[0].innerText = indexTitle.value;

            if (elementList[i].style == "indent") {
                anchorElm.getElementsByTagName("span")[0].style.marginLeft = "20px";
            } else if (elementList[i].style == "normal") {
                anchorElm.getElementsByTagName("span")[0].style.marginLeft = "10px";
            }

            banner.innerHTML = "NOW EDITING ENTRY \"" + elementList[i].title + "\""

            changesSaved = true;
            document.getElementById("btSaveEntry").style.backgroundColor = "green";
        }
    }
}

// Delete Entry (entries)
var btDeleteEntry = document.getElementById("btDeleteEntry");
btDeleteEntry.addEventListener("click", deleteEntry);

function deleteEntry() {
    var rankNum;
    var deletedEntryName;
    var entryParentSection;
    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].id == clickedId) {
            var confirmDelete = confirm("Are you sure you want to delete \"" + elementList[i].title + "\"");
            if (confirmDelete == false) {
                return false;
            } else if (confirmDelete == true) {
                rankNum = elementList[i].rank; // record rank number of item to be deleted
                deletedEntryName = elementList[i].title; // record entry name of item to be deleted
                headingParentSection = elementList[i].section; // record section name of item to be deleted
                elementList.splice([i], 1); // DELETE item
                // Changed ranks of sections
                for (var j = 0; j < elementList.length; j++) {
                    if (elementList[j].rank > rankNum && elementList[j].section == entryParentSection) {
                        elementList[j].rank--;
                    }
                }

                // Remove from interface
                var elmRemove = document.getElementById(clickedId);
                elmRemove.parentNode.removeChild(elmRemove);

                clearEntry();
                editingTable.style.display = "SELECT A TASK OR INDEX ENTRY TO BEGIN";
                banner.style.display = "white";

                actionBanner.innerHTML = "Deleted \"" + deletedEntryName + "\"";
                actionBanner.style.display = "block";
                actionBanner.style.backgroundColor = "rgb(100, 255, 150)";

                clickedId = undefined;

                setTimeout(function() {actionBanner.style.display = "none"}, 3000);
            }
        }
    }
}


// **Button Functions **
function addNew(type, arrayCallback) {
    var elementArray = {};
    var eRank;
    var parentSectionId;
    var parentSectionName;
    var elmClickedId = document.getElementById(clickedId);
    var idLastChild;

    if (sectionList.length == 0) { // check for an empty index
        actionBanner.style.display = "block";
        actionBanner.style.backgroundColor = "orange";
        actionBanner.innerText = "The index is empty, or there are no sections. Please create a section before creating a new entry.";
        setTimeout(function() {actionBanner.style.display = "none"}, 5000);
        
        if (typeof arrayCallback == "function") {
            arrayCallback == "errNoSection";
        }
    } else {

        if (clickedId == "" || clickedId == undefined) { // check if anything has been selected
            parentSectionId = sectionList[0].id;
            parentSectionName = sectionList[0].name;
            idLastChild = document.getElementById(parentSectionId).lastChild.getAttribute("id");

            if (document.getElementById(parentSectionId).getElementsByClassName("selectable").length == 0) {
                eRank = 0;
            } else {
                elementIndexById(idLastChild, function(eIndex) { // Insert new entry at the end of the first section
                    eRank = elementList[eIndex].rank + 1;
                })
            }
        } else if (clickedId < 1000000) { // check if clicked element is a section
            sectionIndexById(clickedId, function (sIndex) {
                parentSectionId = sIndex;
                parentSectionName = sectionList[sIndex].name;
            })
            if (elmClickedId.getElementsByClassName("selectable").length == 0) { // check if section is empty
                eRank = 0;
            } else { // If entries are present, insert after the last entry
                idLastChild = elmClickedId.lastChild.getAttribute("id");
                elementIndexById(idLastChild, function(eIndex) {
                    eRank = elementList[eIndex].rank + 1;
                })
            }
        } else if (clickedId > 1000000) { // check if clicked element is an index entry
            elementIndexById(clickedId, function(eIndex) {
            parentSectionName = elementList[eIndex].section;
            })

            idLastChild = elmClickedId.parentNode.lastChild.getAttribute("id");  

            elementIndexById(idLastChild, function (eIndex) {
                eRank = elementList[eIndex].rank + 1;
            })
        }

        // Build new object
            if (type == "heading") {
            elementArray["section"] = parentSectionName;
            elementArray["rank"] = eRank;
            elementArray["id"] = Math.floor(Math.random() * 10000000);
            elementArray["type"] = "heading1";
            elementArray["value"] = "";
        } else if (type == "entry") {
            elementArray["section"] = parentSectionName;
            elementArray["rank"] = eRank;
            elementArray["id"] = Math.floor(Math.random() * 10000000);
            elementArray["type"] = "entry";
            elementArray["title"] = "";
            elementArray["style"] = "notSet";
            elementArray["link"] = "";
            elementArray["host"] = "notSet";
        }

        if (typeof arrayCallback == "function") {
            arrayCallback(elementArray);
        }
    }
}


function addNewSection(arrayCallback) {
    var elementArray = {};
    var eRank;
    var randomId = Math.floor(Math.random() * 1000000); // Set random ID
    
    if (nav.getElementsByTagName("div").length != 0) {
        var idLastChild = nav.lastChild.getAttribute("id");
        sectionIndexById(idLastChild, function (sIndex) {
            eRank = sectionList[sIndex].rank + 1;
        })
    } else if (nav.getElementsByTagName("div").length == 0) {
        eRank = 0;
        console.log(eRank);
    }

    elementArray["rank"] = eRank;
    elementArray["name"] = "new_section__" + randomId;
    elementArray["id"] = randomId;

    if (typeof arrayCallback == "function") {
        arrayCallback(elementArray);
    }
}

// **CONTROL BUTTONS**

var btnAddNewEntry = document.getElementById("addNewEntry");
var btnAddNewHeading = document.getElementById("addNewHeading");
var btnAddNewSection = document.getElementById("addNewSection");
var btnConvertEmbedCode = document.getElementById("convertEmbedCode");
var btnReturnHome = document.getElementById("returnHome");
var btnGenerateFile = document.getElementById("generateFile");

btnAddNewEntry.addEventListener("click", function () {
    addNew("entry", function (newArray) {
        if (newArray != "errNoSection") { // check for an error on return. If one exists, do not run code
            // Changed ranks of sections
            for (var j = 0; j < elementList.length; j++) {
                if (elementList[j].rank >= newArray.rank && elementList[j].section == newArray.section) {
                    elementList[j].rank++;
                }
            }

            // Add element into interface
            elementList.push(newArray);
            var anchor = document.createElement("a"); // Create anchor (link) element
            var spanElm = document.createElement("span"); // Create span element
            anchor.setAttribute("title", "New entry"); // Set hover text
            anchor.setAttribute("class", "link"); //if a link is present, set the css class to "link"

            anchor.href = "javascript:void(0)";
            anchor.setAttribute("id", newArray.id);
            anchor.classList.add("selectable");

            // **SET DISPLAY NAME**
            spanElm.setAttribute("style", "margin-left: 10px;");
            spanElm.innerText = "New entry"; // Add title to span element

            anchor.appendChild(spanElm);

            for (var i = 0; i < sectionList.length; i++) {
                if (sectionList[i].name == newArray.section) {
                    document.getElementById(sectionList[i].id).appendChild(anchor);
                }
            }

            document.getElementById(newArray.id).addEventListener("click", enableHighlightEntry);
        }
    });
})

btnAddNewHeading.addEventListener("click", function () {
    addNew("heading", function (newArray) {
        // Change ranks of sections
        for (var j = 0; j < elementList.length; j++) {
            if (elementList[j].rank >= newArray.rank && elementList[j].section == newArray.section) {
                elementList[j].rank++;
            }
        }

        // Add element into interface
        elementList.push(newArray);
        var header1Elm = document.createElement("h3"); // Create h3 header (heading type 1)
        header1Elm.innerText = "[New Heading]";
        header1Elm.setAttribute("id", newArray.id);
        header1Elm.classList.add("selectable");

        for (var i = 0; i < sectionList.length; i++) {
            if (sectionList[i].name == newArray.section) {
                document.getElementById(sectionList[i].id).appendChild(header1Elm);
            }
        }

        postParser();
    })
})

btnAddNewSection.addEventListener("click", function () {
    addNewSection(function (newArray) {
        // Change ranks of sections
        for (var j = 0; j < sectionList.length; j++) {
            if (sectionList[j].rank >= newArray.rank) {
                sectionList[j].rank++;
            }
        }

        // Add element into interface
        sectionList.push(newArray);
        var divElm = document.createElement("div"); // Div tag for section
        var sectionIdent = document.createElement("span"); // Identifier for each section
        divElm.setAttribute("id", newArray.id);
        divElm.classList.add("section");
        sectionIdent.innerText = newArray.name;
        sectionIdent.setAttribute("class", "identText");

        divElm.appendChild(sectionIdent);
        nav.appendChild(divElm);

        postParser();
    })
})

btnConvertEmbedCode.addEventListener("click", function() {
    window.open("embedCode.html", "_blank", "width=800 height=600");
})

btnReturnHome.addEventListener("click", function () {
    window.location = "../index.html";
})

btnGenerateFile.addEventListener("click", function () {
    generateFile();
})

function generateFile() {
    var wrapper1 = [];
    for (var i = 0; i < sectionList.length; i++) {
        var wrapper2 = {};
        wrapper2["type"] = "section";
        sectionIndexOf(i, function(sCallback) {
            wrapper2["section"] = sectionList[sCallback].name;
            var wrapper3 = [];
            for (var j = 0; j < elementList.length; j++) {
                var wrapper4 = {};
                elementIndexOf(sectionList[sCallback].name, j, function(eCallback) {
                    if (elementList[eCallback].section == sectionList[sCallback].name) {
                        if (elementList[eCallback].type == "entry") {
                            wrapper4["type"] = elementList[eCallback].type;
                            wrapper4["title"] = elementList[eCallback].title;
                            wrapper4["style"] = elementList[eCallback].style;
                            wrapper4["link"] = elementList[eCallback].link;
                            wrapper4["host"] = elementList[eCallback].host;
                        } else if (elementList[eCallback].type == "heading1" || elementList[eCallback].type == "heading2") {
                            wrapper4["type"] = elementList[eCallback].type;
                            wrapper4["value"] = elementList[eCallback].value;
                        }
                        wrapper3.push(wrapper4);
                    }
                })
            }
            wrapper2["content"] = wrapper3;
        })
        wrapper1.push(wrapper2);
    }
    var textPackage = JSON.stringify(wrapper1, null, 4);
    function b64encode(string) {
        return window.btoa(unescape(encodeURIComponent(string)));
    }

    var b64String = b64encode(textPackage);
    var downloadBoxWrapper = document.getElementById("downloadBoxWrapper");
    var downloadBox = document.getElementById("downloadBox");
    var codeSpace = document.getElementById("codeSpace");
    var downloadLink = document.getElementById("downloadLink");
    var btnCloseDownload = document.getElementById("closeDownload");
    
    downloadLink.setAttribute("download", "navigation.txt");
    downloadLink.setAttribute("href", "data:application/octet-stream;charset=utf-8;base64," + b64String);
    codeSpace.value = (atob(b64String));

    downloadBoxWrapper.style.display = "block";

    btnCloseDownload.addEventListener("click", function () {
        downloadLink.setAttribute("download", "");
        downloadLink.setAttribute("href", "")
        codeSpace.innerText = "";
        downloadBoxWrapper.style.display = "none";
    })
}