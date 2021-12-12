Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

function attachfunctiontobody(){

    var tasks = {
        addedtasks: [],
        donetasks: []
    }

    let someitem = document.getElementById("item-save-1");
    let edititem = document.getElementById("item-edit-1");

    console.log("inside body")

    someitem.addEventListener('click', handleSaveButtonClick, false);

    edititem.addEventListener('click', handleEditButtonClick, false);

    function handleSaveButtonClick(){
        var textelement = document.getElementById("item-value-1");
        var textelementvalue = textelement.value;
        
        saveToLocalStorage(textelementvalue);

        var spanelement = document.createElement("span");
        spanelement.className = "span-text";
        spanelement.textContent = textelementvalue;
        var divelement = document.getElementById("item-div-1");
        textelement.style.display = "none";
        
        divelement.appendChild(spanelement);

        this.disabled = true;
    }

    function saveToLocalStorage(taskadded){
        let tasksInStorage = localStorage.getItem("LaundryList");
        let laundryListObj = JSON.parse(tasksInStorage);
        console.log(laundryListObj);
        laundryListObj.addedtasks.push(
            {
                taskString: taskadded,
                timeAdded: Date.now()
            }
        );
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