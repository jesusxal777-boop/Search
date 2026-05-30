const input =
document.getElementById("searchInput");

const button =
document.getElementById("searchBtn");

button.addEventListener(
    "click",
    search
);

input.addEventListener(
    "keypress",
    e=>{
        if(e.key==="Enter"){
            search();
        }
    }
);

function search(){

    const query =
    input.value.trim();

    if(!query) return;

    location.href =
    "search.html?q=" +
    encodeURIComponent(query);

}.
