var addDialog = document.getElementsByClassName("add_dialog")[0];
var profileDialog = document.getElementsByClassName("profile_dialog")[0];
var navSearch = document.getElementById("search_input");
var profile = document.getElementsByClassName("profile_dropdown")[0];
var plusIcon = document.getElementsByClassName("repo_dropdown")[0];
var body = document.querySelector("body");
var profileAvatar = document.getElementsByClassName("profile_avatar")[0];
var navAvatar = document.getElementsByClassName("nav_avatar")[0];
var repository = document.getElementsByClassName("repository")[0];
var fullName=document.getElementById("full_name")
var email=document.getElementById("email")
var website=document.getElementById("website")

//==========================================
// Github graphql api call
//============================================

const token = "504f3386d10c741f9930ef3e0304732a5b9be99d";
const oauth = {
  Authorization: "bearer " + token,
};
const baseUrl = "https:api.github.com/graphql";
const query = `{ 
    user(login: "larrycoal") {
        avatarUrl
        bio
        email
        websiteUrl
        name
        url
        repositories(first: 20, orderBy: {direction: DESC, field: PUSHED_AT}) {
          totalCount
          nodes {
            name
            isPrivate
            primaryLanguage {
              color
              name
            }
            updatedAt
          }
        }
      }}`;
axios({
  baseURL: baseUrl,
  method: "POST",
  headers: oauth,
  data: JSON.stringify({ query: query }),
})
  .then((res) => {
    getRepositories(res.data.data);
  })
  .catch((err) => console.log(err));

/*
============================================
Dom Manipulation
============================================
*/

plusIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  profileDialog.style.display = "none";
  addDialog.style.display = "inline";
});
profile.addEventListener("click", (event) => {
  event.stopPropagation();
  addDialog.style.display = "none";
  profileDialog.style.display = "inline";
});
body.addEventListener("click", () => {
  navSearch.classList.remove("search_input");
  addDialog.style.display = "none";
  profileDialog.style.display = "none";
});
navSearch.addEventListener("click", (event) => {
  event.stopPropagation();
  navSearch.classList.add("search_input");
});

/*
============================================
Helper Functions
============================================
*/
const getRepositories = ({ user }) => {
  profileAvatar.style.backgroundImage = `url(${user.avatarUrl})`;
  navAvatar.style.backgroundImage = `url(${user.avatarUrl})`;
  document.getElementById("pop_avatar").style.backgroundImage = `url(${user.avatarUrl})`;
  fullName.innerHTML=user.name
  email.innerHTML=user.email
  website.innerHTML=user.websiteUrl
  repository.innerHTML = listRepositories(user.repositories);
};

const listRepositories = ({ nodes }) => {
  let template = "<div>loading</div>";
  template = nodes.map(
    (data) =>
      `<div class="content">
        <section>
            <h2>${data.name}</h2>
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
            ${lastUpdated(new Date(data.updatedAt))}
            </span>
        </section>
        <section>
            <span>Star</span>
        </section>
    </div>`
  );
  return template.toString().replace(/,/g, "");
};

const lastUpdated = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) == 1 ? " year ago" : " years ago");
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) == 1 ? " month ago" : " months ago");
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) == 1 ? " day ago" : " days ago");
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) == 1 ? " hour ago" : " hours ago");
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) == 1 ? " minute ago" : " minutes ago");
    }
    return Math.floor(seconds) + (Math.floor(interval) == 1 ? " second ago" : " seconds ago");
}

window.addEventListener("scroll",()=>{
    console.log(window.scrollY)
    if(window.scrollY>72){}
    window.scrollY > 72 ?
    document.getElementsByClassName("tabs_wrapper")[0].classList.add("fixed")
    :  document.getElementsByClassName("tabs_wrapper")[0].classList.remove("fixed")
    
    window.scrollY > 300 ?
   document.getElementById("pop_up").style.visibility="visible"
    : document.getElementById("pop_up").style.visibility="hidden"
})
