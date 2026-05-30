const SUPABASE_URL =
"https://TU-PROYECTO.supabase.co";

const SUPABASE_KEY =
"TU_ANON_KEY";

const supabase =
window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const input =
document.getElementById("searchInput");

const button =
document.getElementById("searchBtn");

const results =
document.getElementById("results");

button.addEventListener(
    "click",
    search
);

input.addEventListener(
    "keypress",
    e => {
        if(e.key === "Enter"){
            search();
        }
    }
);

async function search(){

    const query =
    input.value.trim();

    if(!query) return;

    results.innerHTML =
    "<p>Buscando...</p>";

    const {
        data,
        error
    } = await supabase
    .from("pages")
    .select("*")
    .ilike(
        "content",
        `%${query}%`
    );

    if(error){

        results.innerHTML =
        "<p>Error al buscar.</p>";

        console.error(error);

        return;
    }

    if(data.length === 0){

        results.innerHTML =
        "<p>No se encontraron resultados.</p>";

        return;
    }

    results.innerHTML = "";

    data.forEach(page => {

        results.innerHTML += `
        <div class="result">

            <h3>
                <a href="${page.url}"
                   target="_blank">
                   ${page.title}
                </a>
            </h3>

            <p>
                ${page.description}
            </p>

        </div>
        `;

    });

}
