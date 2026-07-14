const searchInput=document.getElementById("search");
const searchBtn=document.getElementById("search-btn");
const profileContainer=document.getElementById("profile-container");
const errorContainer=document.getElementById("error-container");
const avatar=document.getElementById("avatar");
const nameElement=document.getElementById("name");
const usernameElement=document.getElementById("username");
const bioElement=document.getElementById("bio");
const locationElement=document.getElementById("location");
const joinedDateElement=document.getElementById("joined-date");
const followersElement=document.getElementById("followers");
const followingElement=document.getElementById("following");
const reposElement=document.getElementById("repos");
const companyElement=document.getElementById("company");
const blogElement=document.getElementById("blog");
const xElement=document.getElementById("xcom");
const profileLink=document.getElementById("profile-link");
const reposContainer=document.getElementById("repos-container");

//Search button
searchBtn.addEventListener("click",() =>{
    const username=searchInput.value.trim();

    if(username !== ""){
        fetchGitHubUser(username);
    }
});

searchInput.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        searchBtn.click();
    }
});

async function fetchGitHubUser(username){
    try{
        const response = await fetch(`https://api.github.com/users/${username}`);

        if(!response.ok){
            throw new Error("User not found");
        }
        const data =await response.json();

        showProfile(data);
        fetchRepositories(username);
    }
    catch(error){
        showError();
    }
}

// Display User
function showProfile(data){
    profileContainer.classList.remove("hidden");
    errorContainer.classList.add("hidden");

    avatar.src=data.avatar_url;

    nameElement.textContent=data.name || "No Name";

    usernameElement.textContent=`@${data.login}`;

    bioElement.textContent=data.bio || "No bio available";

    locationElement.textContent=data.location || "Not specified";

    joinedDateElement.textContent=new Date(data.created_at).toLocaleDateString();

    followersElement.textContent=data.followers;

    followingElement.textContent=data.following;

    reposElement.textContent=data.public_repos;

    companyElement.textContent=data.company || "Not specified";

    profileLink.href=data.html_url;

    if(data.blog){
        blogElement.textContent =data.blog;
        blogElement.href =data.blog.startsWith("http") ? data.blog : `https://${data.blog}`;
    }
    else{
        blogElement.textContent ="No website";
        blogElement.removeAttribute("href");
    }

    if(data.twitter_username){
        xElement.textContent =data.twitter_username;
        xElement.href =`https://x.com/${data.twitter_username}`;
    }
    else{
        xElement.textContent ="No X account";
        xElement.removeAttribute("href");
    }
}

async function fetchRepositories(username){
    reposContainer.innerHTML=
        `<div class="loading-repos">
            Loading repositories...
        </div>`;

    try{
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);

        const repos=await response.json();
        reposContainer.innerHTML="";

        repos.forEach(repo=>{
            const repoCard=document.createElement("div");

            repoCard.classList.add("repo-card");
            repoCard.innerHTML=`
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>

                <p>${repo.description || "No description available"}</p>

                <div class="repo-stats">
                    <span>${repo.stargazers_count}</span>
                    <span>${repo.forks_count}</span>
                    <span>${repo.language || "N/A"}</span>
                </div>
            `;
            reposContainer.appendChild(repoCard);
        });
    }
    catch(error){
        reposContainer.innerHTML=
            `<div class="loading-repos">
                Failed to load repositories
            </div>`;
    }
}

function showError(){
    profileContainer.classList.add("hidden");
    errorContainer.classList.remove("hidden");
}