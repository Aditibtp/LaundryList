Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

function attachfunctiontobody(){

    let tasks = {
        addedtasks: [],
        donetasks: [],
        totalItemsAdded: 0,
        totalDoneItemsThisWeek: 0
    }

    //TODO
    function populateAlreadyAddedTasks(){
        let tasksInStorage = localStorage.getItem("LaundryList");
        if(tasksInStorage === null) return;

        laundryListObj = JSON.parse(tasksInStorage); 

        for(var i=0; i<laundryListObj.totalItemsAdded; i++){
            let idSuffix = i+1;
            let spanelement = document.createElement("span");
            spanelement.className = "span-text";
            spanelement.textContent = laundryListObj.addedtasks[i].taskString;

            let divelement = document.getElementById("item-div-"+(idSuffix));
            let textelement = document.getElementById("item-value-"+(idSuffix));

            textelement.style.display = "none";
            
            divelement.appendChild(spanelement);
        }
    }

    function attachSaveTaskListener(){
        console.log("attached save clicks");
        let saveButtonElements = document.querySelectorAll(".save-item");

        for(var i=0; i<saveButtonElements.length; i++){
            let idSuffix = i+1;
            saveButtonElements[i].addEventListener('click', handleSaveButtonClick, false);
        }
    }

    function attachEditTaskListener(){
        console.log("attached edit clicks");

        let editButtonElements = document.querySelectorAll(".edit-item");

        for(var i=0; i<editButtonElements.length; i++){
            let idSuffix = i+1;
            editButtonElements[i].addEventListener('click', handleEditButtonClick, false);
        }
    }

    function attachDoneTaskListener(){

        let doneButtonElements = document.querySelectorAll(".done-item");

        for(var i=0; i<doneButtonElements.length; i++){
            let idSuffix = i+1;
            doneButtonElements[i].addEventListener('click', handleDoneButtonClick, false);
        }
    }

    populateAlreadyAddedTasks();
    attachSaveTaskListener();
    attachEditTaskListener();
    attachDoneTaskListener();

    function handleDoneButtonClick(event){
        let buttonId = event.currentTarget.id;
        let idSuffix = parseInt(buttonId.slice(10));
        let textelement = document.getElementById("item-value-"+idSuffix);
        let textelementvalue = textelement.value;

        console.log(event.currentTarget.id);

        let divId = "item-div-"+idSuffix;
        let buttonDiv = document.querySelector("#" + divId + " .buttons");
        buttonDiv.style.visibility = "hidden";

        let divTaskElement = document.getElementById(divId);

        divTaskElement.classList.add("done-task-item");
    }

    function handleSaveButtonClick(event){

        let buttonId = event.currentTarget.id;
        let idSuffix = parseInt(buttonId.slice(10));
        let textelement = document.getElementById("item-value-"+idSuffix);
        let textelementvalue = textelement.value;

        console.log(event.currentTarget.id);
        
        saveToLocalStorage(textelementvalue, idSuffix);

        let spanelement = document.createElement("span");
        spanelement.className = "span-text";
        spanelement.textContent = textelementvalue;
        let divelement = document.getElementById("item-div-"+idSuffix);
        textelement.style.display = "none";
        
        divelement.appendChild(spanelement);

        event.currentTarget.disabled = true;
    }

    function saveToLocalStorage(taskadded, idSuffix){
        let tasksInStorage = localStorage.getItem("LaundryList");
        let laundryListObj = {};
        if(tasksInStorage === null){
            laundryListObj = {
                addedtasks: [],
                donetasks: [],
                totalItemsAdded: 0,
                totalDoneItemsThisWeek: 0
            }
        }else{
            laundryListObj = JSON.parse(tasksInStorage);
        }

        if(idSuffix - 1 <= laundryListObj.totalItemsAdded){
            laundryListObj.addedtasks[idSuffix-1].taskString = taskadded;
        }else{
            laundryListObj.addedtasks.push(
                {
                    taskString: taskadded,
                    timeAdded: Date.now()
                }
            );
    
            let itemsAdded = laundryListObj.totalItemsAdded;
    
            if(itemsAdded != "undefined" && !isNaN(itemsAdded) && itemsAdded !== null){
                laundryListObj.totalItemsAdded = parseInt(itemsAdded) + 1;
            }else{
                laundryListObj.totalDoneItemsTtotalItemsAddedhisWeek = 1;
            }
    
            console.log(laundryListObj.totalItemsAdded);
        }

        console.log(laundryListObj);
       
        

        tasks.addedtasks.push({taskString: taskadded, timeAdded: Date.now()});
        localStorage.setItem("LaundryList", JSON.stringify(laundryListObj));
    }

    function handleEditButtonClick(event){

        let tasksInStorage = localStorage.getItem("LaundryList");
        let laundryListObj = {};
        if(tasksInStorage === null){
            laundryListObj = {
                addedtasks: [],
                donetasks: [],
                totalItemsAdded: 0,
                totalDoneItemsThisWeek: 0
            }
        }else{
            laundryListObj = JSON.parse(tasksInStorage);
        }

        let buttonId = event.currentTarget.id;
        let idSuffix = buttonId.slice(10);

        //let divelement = document.getElementById("item-div-"+idSuffix);
        let spanelement = document.querySelector("#item-div-"+idSuffix + " span");
        let textelement = document.getElementById("item-value-"+idSuffix);
        spanelement.style.display = "none";

        console.log((idSuffix))
        textelement.value = laundryListObj.addedtasks[parseInt(idSuffix)-1].taskString;
        textelement.style.display = "block";

    }
}

function initiateExtn(){
    document.addEventListener('DOMContentLoaded', function() {
        attachfunctiontobody();
    });
};

initiateExtn();