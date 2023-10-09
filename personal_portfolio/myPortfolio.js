"use strict";

(function() {

window.addEventListener("load", init);

function init() {
    let outline_button = id("outline_button"); 
    outline_button.addEventListener("click", open_outline); 

    let x_button = id("x_button"); 
    x_button.addEventListener("click", close_outline); 

    let outline_buttons = qsa('a[href^="#"]'); 
    outline_buttons.forEach(button => {
        button.addEventListener('click', scrollToSection);
    });

    
}

function open_outline(){
    let outline_button = id("outline_button");
    outline_button.style.display = 'none'; 

    let outline = id("outline"); 
    outline.style.visibility = 'visible'; 
}

function close_outline() {
    let outline = id("outline"); 
    outline.style.visibility = 'hidden'; 
    
    let outline_button = id("outline_button");
    outline_button.style.display = 'flex'; 
}

function scrollToSection(event) {
    event.preventDefault(); 
  
    const targetId = this.getAttribute('href').substring(1); 
    const targetElement = id(targetId); 
  
    if (targetElement) {
      const yOffset = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: yOffset,
        behavior: 'smooth'
      });
    }
  }

document.addEventListener("DOMContentLoaded", function () {
    
    const introHeader = id("introHeader");
    const textContent = "Hi, I'm Yu Chan Jeong."; 

    //This space was added for the intro box to be 2 lines
    const introHeader2 = id("introHeader2"); 
    introHeader2.textContent = " "; 

    let charIndex = 0;

    function type() {
        
        if (charIndex < textContent.length) {
            introHeader.textContent = textContent.substring(0, charIndex);
            charIndex++;
            setTimeout(type, 100);
        }
        introHeader.textContent = textContent.substring(0, charIndex);
    }

    type();

    setTimeout(() => {
        type2();
    }, 2900);

    let watermelon_project_text = "Dr. Thump is an iOS app that records a thump sound from a watermelon and then provides a correlated Brix value, indicating how sweet it is. The app was transformed in Swift from merely being functional to being user-friendly. It has been calibrated to be responsive in design and includes GUI features, such as a hamburger menu button, a decreasing blue bar timer, and button highlighting. Moreover, it also includes toggles to skip instructions and display advanced results. This app was deployed through the Apple Developer Program."; 
    let watermelon_project_url = "https://apps.apple.com/us/app/dr-thump-pro/id6451497636"; 
    load_new_project("Watermeton Sweetness Predictor App", watermelon_project_url, "https://www.youtube.com/embed/yev0lsRat_8", 
        watermelon_project_text, id("station_2023"), "watermelon_project");

    let pokemon_text = "This project is a concise encyclopedia of Pokémon developed in JavaScript. It includes a connection to an API and querying through a JSON data structure. Using a combination of HTML, CSS, and JavaScript, an interactive and organized display of the results is produced. The display includes the evolution stages, battle stats, and physical measurements.";     
    let pokemon_url = "https://github.com/yjeong223/yjeong223.github.io/blob/main/firstApiConnection/pokemon_api2.js"; 
    load_new_project("Pokémon Search Engine",pokemon_url, "https://www.youtube.com/embed/uNNTZCweXjM", 
        pokemon_text, id("station_2023"), "pokemon_engine_project"); 

    let family_tree_text = "This application is an interactive script in Java that creates and manipulates family trees. It includes the capability to translate text files into a linked list, binary tree hybrid data structure. Moreover, it uses the depth-first-search technique through recursive and iterative methods to check and discover the connections between an ancestor and a descendant. There are also options to print out and modify the family tree.";   
    let family_tree_url = "https://github.com/yjeong223/Family-Tree/blob/main/Bible%20Ancestry/src/FamilyAncestry.java"; 
    load_new_project("Family Tree Application", family_tree_url, "https://www.youtube.com/embed/VnJF4Kms2WU", 
        family_tree_text, id("station_2023"), "family_tree_project"); 

    let simon_game_text = "This game is a simulation of the Simon Game in C# where the program produces patterns for the player to replicate. Simon Game implements array comparison to check patterns between the program and the player. It also includes a text file database that stores player and login information; this information is used to check login attempts in the accounts page. Moreover, it incorporates a stream of timers that increases the speed within each level.";
    let simon_game_url = "https://github.com/yjeong223/Simon-Game/blob/main/Simon.cs"; 
    load_new_project("Simon Game Simulator", simon_game_url, "https://www.youtube.com/embed/revnjoynWsI", 
        simon_game_text, id("station_2022"), "simon_game_project"); 

    const bodyHeight = document.body.clientHeight;
    id("container_outline").style.height = bodyHeight; 

});

let charIndex2 = 0;

function type2() {
    
    const introHeader2 = id("introHeader2");
    const textContent = "This is my portfolio."; 

        if (charIndex2 < textContent.length) {
            introHeader2.textContent = textContent.substring(0, charIndex2);
            charIndex2++;
            setTimeout(type2, 100);
        }
        introHeader2.textContent = textContent.substring(0, charIndex2);
}

function load_new_project (project_title, url, parameter_video_source, project_text, station, ID){

    let container_content = document.createElement('div'); 
    container_content.classList.add("container_content"); 

    let content = document.createElement("div"); 
    content.classList.add("content"); 
    content.id = ID; 

    let content_title = document.createElement("h1"); 
    content_title.classList.add("content_title"); 
    // content_title.textContent = project_title; 
    content.appendChild(content_title); 


    let content_title_link = document.createElement("a"); 
    content_title_link.textContent = project_title; 
    content_title_link.href = url; 
    content_title.appendChild(content_title_link); 

    let container_content_video = document.createElement("div"); 
    container_content_video.classList.add("container_content_video"); 
    content.appendChild(container_content_video); 

    let content_video = document.createElement("iframe"); 
    content_video.src = parameter_video_source; 
    content_video.allowFullscreen = true;  
    content_video.classList.add("content_video");
    container_content_video.appendChild(content_video); 

    let container_content_text = document.createElement("div"); 
    container_content_text.classList.add("container_content_text"); 
    container_content_video.appendChild(container_content_text); 

    let content_text = document.createElement("p"); 
    content_text.classList.add("content_text"); 
    content_text.textContent = project_text; 
    container_content_text.appendChild(content_text); 

    container_content.appendChild(content); 

    station.appendChild(container_content); 
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