const params =
new URLSearchParams(
    location.search
);

const query =
params.get("q");

document
.getElementById("searchInput")
.value = query || "";

search(query);

async function search(text){

    if(!text) return;

    const {
        data,
        error
    } = await supabase
    .from("pages")
    .select("*")
    .or(
        `title.ilike.%${text}%,
         description.ilike.%${text}%,
         content.ilike.%${text}%`
    );

    const results =
    document.getElementById(
        "results"
    );

    if(error){

        results.innerHTML =
        "Error al buscar";

        return;
    }

    results.innerHTML = "";

    data.forEach(page=>{

        results.innerHTML += `
        <div class="result">

            <a
                class="title"
                href="${page.url}"
                target="_blank">

                ${page.title}

            </a>

            <div class="url">
                ${page.url}
            </div>

            <p>
                ${page.description}
            </p>

        </div>
        `;

    });

}
