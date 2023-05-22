"use strict";

(function() {

window.addEventListener("load", init);

let currentJSON

function init() {
    qs("button").addEventListener("click", getPokeInfo);
    qs("input").addEventListener("keyup", getPokeInfoByEnter);

}

function getPokeInfoByEnter(event){
    if (event.key == "Enter"){
        getPokeInfo(); 
    }
}

function getPokeInfo() {

    while (id("allInfo").firstChild) {
        id("allInfo").removeChild(id("allInfo").lastChild);
    }

    if (id("startPage")){
        id("startPage").remove(); 
    }
    

    let theSearch = qs("input").value.toLowerCase(); 
    // let url = `https://pokeapi.co/api/v2/pokemon/${theSearch}`; 
    // fetch(url)
    //     .then(statusCheck)
    //     .then((response)=> response.json())
    //     .then(showData)
    //     .catch(badResponse);  

    let url2 = `https://pokeapi.co/api/v2/pokemon/${theSearch}`;
            fetch(url2)
                .then(statusCheck)
                .then((response) => response.json())
                .then(showData) // This is our function to put data on page.
                .catch(badResponse);
}

function showData (jsonResponse){

    currentJSON = jsonResponse; 
    //Create the shortInfo
    let shortInfoBox  = document.createElement("div"); 
    shortInfoBox.id = "shortInfo"; 
    //Create the VisualIfno

    let visualInfoBox = document.createElement("div"); 
    visualInfoBox.id = "visualInfo"; 


    let name = document.createElement("p");
    let pic = document.createElement("img"); 
    let pic2 = document.createElement("img"); 

    name.textContent = qs("input").value; 
    name.textContent = name.textContent.toUpperCase(); 
    pic.src = jsonResponse.sprites.front_default; 
    pic2.src = jsonResponse.sprites.back_default; 
    
    //all the appends
    id("allInfo").appendChild(shortInfoBox); 
    shortInfoBox.appendChild(visualInfoBox); 
    visualInfoBox.appendChild(name); 
    visualInfoBox.appendChild(pic); 
    visualInfoBox.appendChild(pic2); 

    //adding the previous evolution stage information
    let url2 = currentJSON.species.url; 
    fetch(url2)
        .then(statusCheck)
        .then((response2)=> response2.json())
        .then(showPrevEvolutionStage)
        .catch(badResponse);  

    //basicInfoBox
    let basicInfoBox = document.createElement("div"); 
    basicInfoBox.id = "basicInfo"; 

    let typeTags = document.createElement("p"); 
    let typeArray = jsonResponse.types; 
    for (let i = 0; i < typeArray.length; i++){

        if (i == 0) {
            typeTags.textContent += `Type: ${typeArray[i].type.name}`;
        } else {
            typeTags.textContent += ` - ${typeArray[i].type.name}`; 
        } 
    }

    let height = document.createElement("p"); 
    height.textContent = `Height: ${jsonResponse.height}`; 

    let weight = document.createElement("p"); 
    weight.textContent = `Weight: ${jsonResponse.weight}`;

    shortInfoBox.appendChild(basicInfoBox);
    basicInfoBox.appendChild(height); 
    basicInfoBox.appendChild(weight); 

    fetch(url2)
        .then(statusCheck)
        .then((response3)=> response3.json())
        .then(showFlavoredText)
        .catch(badResponse);  

    //LongInfo
    let longInfoBox = document.createElement("div");
    longInfoBox.id = "longInfo"; 

    //battleInfoBox
    let battleInfoBox = document.createElement("div"); 
    battleInfoBox.id = "battleInfo"; 

    //contents of battleInfoBox
        //abilities
    let abilitiesInfo = document.createElement("p"); 
    let abilitiesArray = jsonResponse.abilities; 
    for (let i = 0; i < abilitiesArray.length; i++){
        if (i == 0){
            abilitiesInfo.textContent += `Abilities: ${abilitiesArray[i].ability.name}`; 
        } else {
            abilitiesInfo.textContent += ` & ${abilitiesArray[i].ability.name}`; 
        }
    }

        //base stats
    let baseStatsPara = document.createElement("p"); 
    baseStatsPara.textContent = "Base Stats"; 

    let baseStatsList = document.createElement("ul"); 
    baseStatsList.id = "baseStats"; 

    let statsArray = jsonResponse.stats; 
    for (let i = 0; i < statsArray.length; i++){
        let aStat = document.createElement("li"); 

        if (i == 3) {
            aStat.textContent = `Sp Atk: ${statsArray[i].base_stat}`; 
        } else if (i == 4){
            aStat.textContent = `Sp Def: ${statsArray[i].base_stat}`; 
        } else {
            aStat.textContent = `${statsArray[i].stat.name.charAt(0).toUpperCase() + statsArray[i].stat.name.slice(1)}
                : ${statsArray[i].base_stat}`; 
        }
        
    
        baseStatsList.appendChild(aStat); 
    }
    baseStatsPara.appendChild(baseStatsList); 

        //moveSet
    let moveSetPara = document.createElement("p");
    moveSetPara.textContent = "Move Set"; 

    let moveSetList = document.createElement("ul"); 
    moveSetList.id = "moveSet";

    let moveSetArray = jsonResponse.moves; 

    for (let i = 0; i < 39; i++){
        let aMove = document.createElement("li"); 
        aMove.textContent = moveSetArray[i].move.name; 
        console.log(aMove.textContent); 
        moveSetList.appendChild(aMove); 
    }
    moveSetPara.appendChild(moveSetList); 

    


        //appending battleInfo into DOM & appending contents to battleInfo
        id("allInfo").appendChild(longInfoBox); 
        longInfoBox.appendChild(battleInfoBox); 
        battleInfoBox.appendChild(abilitiesInfo); 
        battleInfoBox.appendChild(baseStatsPara); 
        battleInfoBox.appendChild(moveSetPara); 
        



}

function showPrevEvolutionStage(jsonResponse2){
    let previousEvolutionStage = document.createElement("p");
    if (jsonResponse2.evolves_from_species){
        previousEvolutionStage.textContent = `Evolves from: ${jsonResponse2.evolves_from_species.name.toUpperCase()}`; 
    } else {
        previousEvolutionStage.textContent = "Current form is base evolution stage"; 
    }
    // console.log(previousEvolutionStage.textContent);
    id("visualInfo").appendChild(previousEvolutionStage); 
}
    
function showFlavoredText(jsonResponse3){

    //contents of basicInfoBox
    let flavoredText = document.createElement("p"); 
    flavoredText.textContent = ` ${jsonResponse3.flavor_text_entries[0].flavor_text} `; 

    id("basicInfo").prepend(flavoredText); 
    
}
function badResponse(){
    alert("Please the input spelling and try again"); 
}




/////////////////////////////////////////////////////////////////////
// Helper functions
async function statusCheck(res) {
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res;
}
function id(id) {
    return document.getElementById(id);
}
  
function qs(selector) {
    return document.querySelector(selector);
}
  
function qsa(selector) {
    return document.querySelectorAll(selector);
}
})();