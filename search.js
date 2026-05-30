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
document.getElementById("results").innerHTML =
"<h2>DreamByte Search conectado</h2>";

const params =
new URLSearchParams(
    window.location.search
);

const query =
params.get("q");

if(query){

    input.value = query;

    search(query);

}

button.addEventListener(
    "click",
    () => search()
);

async function search(customQuery){

    const text =
    customQuery ||
    input.value.trim();

    if(!text) return;

    results.innerHTML =
    "<p>Buscando...</p>";

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

    console.log(data);
    console.log(error);

    if(error){

        results.innerHTML =
        `<p>${error.message}</p>`;

        return;

    }

    if(!data || data.length === 0){

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
