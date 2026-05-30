const SUPABASE_URL =
"https://etzdhnpynhgagiwwbqur.supabase.co";

const SUPABASE_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0emRobnB5bmhnYWdpd3dicXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNTY5NTEsImV4cCI6MjA5NTczMjk1MX0.iaNTV2bv6xWhJ6NlRswklZ04JxjxJlXpndfporV9zCg";

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
