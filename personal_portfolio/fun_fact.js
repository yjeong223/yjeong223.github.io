"use strict";

(function() {

window.addEventListener("load", init);

let picture_list = []; 
let text_list = []; 

function init() {
    // Assign event listeners in init.
    let forward_arrow = id("forward_arrow");
    forward_arrow.addEventListener("click", right_click);    

    let back_arrow = id("back_arrow"); 
    back_arrow.addEventListener("click", left_click); 

    setInterval(() => {
        right_click(); 
    }, 3000);

    picture_list = qsa('img'); 
    text_list = qsa('p'); 

    // console.log(picture_list[0]);
}

let current_index = 0; 

// This is an event listener.
function right_click() {
    current_index++; 
    if (current_index == picture_list.length){
        current_index = 0; 
    }
    
    let prev_element = current_index - 1; 

    if (prev_element < 0){
        prev_element = picture_list.length -1; 
    }

    console.log(picture_list[prev_element]); 
    picture_list[prev_element].style.display = 'none'; 
    text_list[prev_element].style.display = 'none'; 

    picture_list[current_index].style.display = 'block'; 
    text_list[current_index].style.display = 'block'; 
}

function left_click() {
    // alert("The button was clicked.");
    current_index--; 

    if (current_index < 0){
        current_index = picture_list.length -1; 
    }
    
    let ahead_element = current_index + 1; 

    if (ahead_element > picture_list.length -1){
        ahead_element = 0; 
    }

    picture_list[ahead_element].style.display = 'none'; 
    text_list[ahead_element].style.display = 'none'; 

    picture_list[current_index].style.display = 'block'; 
    text_list[current_index].style.display = 'block';
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