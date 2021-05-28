var repoSearch = document.getElementById("searchForm");
var searchInput = document.getElementById("searchInput");
var error = document.getElementsByClassName("error")[0]
var submitSearch =document.getElementsByClassName("submitSearch")[0]
var loader =document.getElementsByClassName("loader")[0]
let username
const oauth = {
  "Content-type": "application/graphql",
  authorization:
    "token " +
    window.atob("N2JjNjAwYjBmZmRlNzQ5YWY0ZjE3NzVjMmZlMGM4YzRkYzU0ODAxMw=="),
};
const baseUrl = "https:api.github.com/graphql";

searchInput.addEventListener("change", (e) => {
  username = e.target.value;
});
repoSearch.addEventListener("submit", (e) => {
  e.preventDefault();
  submitSearch.style.display="none"
  loader.style.display="inline"
 if(!username){
     error.innerHTML="Please fill the search input"
     submitSearch.style.display="inline"
     loader.style.display="none"
 }else{
//==========================================
// Github graphql api call
//============================================
  const query = `{ 
      user(login: "${username}") {
          login
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
              descriptionHTML
              forkCount
            }
          }
        }}`;

  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: oauth,
    body: JSON.stringify({ query: query }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let { user } = res.data;
      if (!user) {
       submitSearch.style.display="inline"
       loader.style.display="none"
        error.innerHTML="user not found"
      } else {
        localStorage.setItem("users", JSON.stringify(res.data));
        window.location.href = "repository.html";
      }
    })
    .catch((err) => console.log(err));
}});
