const input =
document.getElementById("searchInput");

const button =
document.getElementById("searchBtn");

button.addEventListener(
    "click",
    goSearch
);

input.addEventListener(
    "keypress",
    e => {
        if(e.key === "Enter"){
            goSearch();
        }
    }
);

function goSearch(){

    const query =
    input.value.trim();

    if(!query) return;

    location.href =
    "search.html?q=" +
    encodeURIComponent(query);

}
