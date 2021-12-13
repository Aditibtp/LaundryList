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

    let itemvalueId = "item-value-";


    let someitem = document.getElementById("item-save-1");
    let edititem = document.getElementById("item-edit-1");

    console.log("inside body")

    someitem.addEventListener('click', handleSaveButtonClick, false);

    edititem.addEventListener('click', handleEditButtonClick, false);

    function handleSaveButtonClick(event){
        var textelement = document.getElementById("item-value-1");
        var textelementvalue = textelement.value;

        console.log(event.disabled);
        
        saveToLocalStorage(textelementvalue, true);

        var spanelement = document.createElement("span");
        spanelement.className = "span-text";
        spanelement.textContent = textelementvalue;
        var divelement = document.getElementById("item-div-1");
        textelement.style.display = "none";
        
        divelement.appendChild(spanelement);

        this.disabled = true;
    }

    function saveToLocalStorage(taskadded, newtodo){
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

        console.log(laundryListObj);
       
        laundryListObj.addedtasks.push(
            {
                taskString: taskadded,
                timeAdded: Date.now()
            }
        );

        let itemsAdded = laundryListObj.totalDoneItemsThisWeek;

        if(itemsAdded != "undefined" && !isNaN(itemsAdded) && itemsAdded !== null){
            laundryListObj.totalDoneItemsThisWeek = parseInt(itemsAdded) + 1;
        }else{
            laundryListObj.totalDoneItemsThisWeek = 1;
        }

        console.log(laundryListObj.totalDoneItemsThisWeek);

        tasks.addedtasks.push({taskString: taskadded, timeAdded: Date.now()});
        localStorage.setItem("LaundryList", JSON.stringify(laundryListObj));
    }

    function handleEditButtonClick(){
        var textelement = document.getElementById("item-value-1");
        var textelementvalue = textelement.value;
        var spanelement = document.createElement("span");
        spanelement.className = "span-text";
        spanelement.textContent = textelementvalue;
        var divelement = document.getElementById("item-div-1");
        textelement.style.display = "none";
        
        divelement.appendChild(spanelement);

        this.disabled = true;
    }
}

function initiateExtn(){
    document.addEventListener('DOMContentLoaded', function() {
        attachfunctiontobody();
    });
};

initiateExtn();