var bodytag = document.getElementsByTagName("body")[0];

bodytag.addEventListener("onload", attachfunctiontobody, false);

function attachfunctiontobody(){
    let someitem = document.getElementById("item-1");
    let someitemimage = someitem.getElementsByTagName("img")[0];

    console.log("inside body")

//for (var i = 0; i < lists.length; i++) {
    //lists[i].addEventListener('click', handleListClick, false);
    //lists[i].addEventListener('mouseover', handleMouseEnter, false);
    //lists[i].addEventListener('mouseleave', handleMouseLeave, false);
    //var closeImage = lists[i].querySelector("span.close-tab");
    //closeImage.addEventListener("click", handleCloseClick, false);
//}

someitemimage.addEventListener('click', handleListClick, false);

    function handleListClick(){
        var textelement = document.getElementById("item-value-1");
        var textelementvalue = textelement.value;
        var spanelement = document.createElement("span");
        spanelement.textContent = textelementvalue;
        var divelement = document.getElementById("item-div-1");
        textelement.style.display = "none";
        
        divelement.appendChild(spanelement);
    }
}