var addDialog = document.getElementsByClassName("add_dialog")[0];
var profilePage = document.getElementsByClassName("profile_page")[0]
var profileDialog = document.getElementsByClassName("profile_dialog")[0];
var navSearch = document.getElementById("search_input");
var profile = document.getElementsByClassName("profile_dropdown")[0];
var plusIcon = document.getElementsByClassName("repo_dropdown")[0];
var body = document.querySelector("body");
var profileAvatar = document.getElementsByClassName("profile_avatar")[0];
var navAvatar = document.getElementsByClassName("nav_avatar")[0];
var navAvatar2 = document.getElementsByClassName("nav_avatar2")[0];
var repository = document.getElementsByClassName("repository")[0];
var hamburger = document.getElementsByClassName("hamburger")[0]
var typeBtn = document.getElementsByClassName("type_button")[0]
var langBtn =document.getElementsByClassName("language_button")[0]
var fullName=document.getElementsByClassName("full_name")[0]
var email=document.getElementById("email")
var website=document.getElementById("website")
var repoCount = document.getElementById("repo_count")
var username = document.getElementsByClassName("username")[0]
var usernameone = document.getElementsByClassName("usernameone")[0]
var usernametwo = document.getElementsByClassName("usernametwo")[0]
var count = document.getElementById("count")
var month = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"]
window.addEventListener('load',()=>{
  let users =JSON.parse(localStorage.getItem('users'))
  getRepositories(users)
})
/*
============================================
Dom Manipulation
============================================
*/


plusIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  document.getElementById("type_filter").style.display="none"
  document.getElementById("language_filter").style.display="none"
  profileDialog.style.display = "none";
  addDialog.style.display = "inline";
});
profile.addEventListener("click", (event) => {
  event.stopPropagation();
  document.getElementById("type_filter").style.display="none"
  document.getElementById("language_filter").style.display="none"
  addDialog.style.display = "none";
  profileDialog.style.display = "inline";
});
body.addEventListener("click", () => {
  navSearch.classList.remove("search_input");
  addDialog.style.display = "none";
  profileDialog.style.display = "none";
  document.getElementById("type_filter").style.display="none"
  document.getElementById("language_filter").style.display="none"

});
navSearch.addEventListener("click", (event) => {
  event.stopPropagation();
  navSearch.classList.add("search_input");
});
hamburger.addEventListener("click",()=>{
  document.getElementsByClassName("left_nav")[0].classList.toggle("visible")
})
typeBtn.addEventListener("click",(e)=>{
  e.stopPropagation()
  addDialog.style.display = "none";
  profileDialog.style.display = "none";
  document.getElementById("language_filter").style.display="none"
  document.getElementById("type_filter").style.display="inline"
})
langBtn.addEventListener("click",(e)=>{
  e.stopPropagation()
  addDialog.style.display = "none";
  profileDialog.style.display = "none";
  document.getElementById("type_filter").style.display="none"
  document.getElementById("language_filter").style.display="inline"
})

/*
============================================
Helper Functions
============================================
*/

const getRepositories = ({ user }) => {
  console.log(user)
  profileAvatar.style.backgroundImage = `url(${user.avatarUrl})`;
  navAvatar.style.backgroundImage = `url(${user.avatarUrl})`;
  navAvatar2.style.backgroundImage = `url(${user.avatarUrl})`;
  document.getElementById("pop_avatar").style.backgroundImage = `url(${user.avatarUrl})`;
  username.innerHTML=user.login
  usernameone.innerHTML=user.login
  usernametwo.innerHTML=user.login
  fullName.innerHTML=user.name
  email.innerHTML=user.email
  website.innerHTML=user.websiteUrl
  repository.innerHTML = listRepositories(user.repositories);
  repoCount.innerHTML=user.repositories.totalCount
  count.innerHTML=user.repositories.totalCount
};
const listRepositories = ({ nodes }) => {
  let template = "<div>loading</div>";
  template = nodes.map(
    (data) =>
      `<div class="content">
        <section>
            <h2>${data.name}</h2>
            ${data.descriptionHTML}
            <span>
            <spans style="background-color:${
              data.primaryLanguage === null
                ? "black"
                : data.primaryLanguage.color
            }; padding: 0px 9px;border-radius: 20px;margin-right:5px"></spans>
            ${
              data.primaryLanguage === null
                ? "Javascript"
                : data.primaryLanguage.name
            }
            </span>
            <span>
            ${
                data.forkCount> 0?
               '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M20 18c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm0-2c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm-16 2c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm0-2c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm8-14c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm0-2c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm3.873 15.655l-2.873-2.404v-3.341c-.326.055-.658.09-1 .09s-.674-.035-1-.09v3.341l-2.873 2.404c.484.46.892 1 1.201 1.598l2.672-2.253 2.672 2.253c.309-.598.717-1.137 1.201-1.598z"/></svg>  '
               + data.forkCount
                : " "
            }
            </span>
            <span>
             updated ${lastUpdated(new Date(data.updatedAt))}
            </span>
        </section>
        <section>
            <span>
            <i class="fa fa-star-o" aria-hidden="true"></i>
            Star
            </span>
        </section>
    </div>`
  );
  return template.toString().replace(/,/g, "");
};

const lastUpdated = (date) => {
    let seconds = Math.floor((new Date() - date) / 1000);
    let lUpdate = new Date(date)
    let time = seconds / 31536000;

    if (time > 1) {
        return Math.floor(time) + (Math.floor(time) == 1 ? " year ago" : " years ago");
    }
    time = seconds / 2592000;
    if (time > 1) {

        return lUpdate.getDate() + " " + month[lUpdate.getMonth()]
    }
    time = seconds / 86400;
    if (time > 1) {
        return Math.floor(time) + (Math.floor(time) == 1 ? " day ago" : " days ago");
    }
    time = seconds / 3600;
    if (time > 1) {
        return Math.floor(time) + (Math.floor(time) == 1 ? " hour ago" : " hours ago");
    }
    time = seconds / 60;
    if (time > 1) {
        return Math.floor(time) + (Math.floor(time) == 1 ? " minute ago" : " minutes ago");
    }
    return Math.floor(seconds) + (Math.floor(time) == 1 ? " second ago" : " seconds ago");
}

window.addEventListener("scroll",()=>{
    if(window.scrollY>72){}
    window.scrollY > 72 ?
    document.getElementsByClassName("tabs_wrapper")[0].classList.add("fixed")
    :  document.getElementsByClassName("tabs_wrapper")[0].classList.remove("fixed")
    
    window.scrollY > 300 ?
   document.getElementById("pop_up").style.visibility="visible"
    : document.getElementById("pop_up").style.visibility="hidden"
})


