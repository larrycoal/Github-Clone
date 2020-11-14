var addDialog = document.getElementsByClassName("add_dialog")[0]
var profileDialog = document.getElementsByClassName("profile_dialog")[0]
var navSearch = document.getElementById("search_input")


var profile = document.getElementsByClassName("profile_dropdown")[0]
var plusIcon = document.getElementsByClassName("repo_dropdown")[0]

var body = document.querySelector("body")


plusIcon.addEventListener("click",(event)=>{
    event.stopPropagation()
    profileDialog.style.display="none"
    addDialog.style.display="inline"
})
profile.addEventListener("click",(event)=>{
    event.stopPropagation()
    addDialog.style.display="none"
    profileDialog.style.display="inline"
})
body.addEventListener("click",()=>{
    navSearch.classList.remove("search_input")
    addDialog.style.display="none"
    profileDialog.style.display="none"
})
navSearch.addEventListener("click",(event)=>{
    event.stopPropagation()
    console.log("clicked")
    navSearch.classList.add("search_input")
})