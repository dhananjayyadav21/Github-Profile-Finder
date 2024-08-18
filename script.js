const APIURL = "https://api.github.com/users/";
const searchUser = document.querySelector("#search");

const getUser = async (username) => {
    const main = document.querySelector("#main");
    const responce = await fetch(APIURL + username);
    const data = await responce.json();

    const card = ` <div class="card">
            <div>
                <img class="avtar"
                    src="${data.avatar_url}"  >
            </div>

            <div class="user-info">

                <h1>${data.name}</h1>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Folloing</strong></li>
                    <li>${data.public_repos}<strong>repo</strong></li>
                </ul>

                <div class="repos">
                   
                </div>

            </div>
        </div>`

    main.innerHTML = card;
    getRepo(username);
}



const getRepo = async (username) => {
    const repo = document.querySelector(".repos");
    const responce = await fetch(APIURL + username + "/repos");
    const data = await responce.json();
    data.forEach(
        (itam) => {
            const elm = document.createElement("a");
            elm.href = itam.html_url;
            elm.innerHTML = itam.name;

            repo.appendChild(elm)

        }
    );

}

searchUser.addEventListener("focusout",
 ()=>{
    formsumbit ();
 }
)

const formsumbit = () => {
    if (searchUser.value != "") {
        getUser(searchUser.value);
    }
    searchUser.value = "";
    return false;
}