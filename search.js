console.log("search.js cargado");

const SUPABASE_URL =
"https://etzdhnpynhgagiwwbqur.supabase.co";

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

results.innerHTML =
"<p>DreamByte Search iniciado...</p>";

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

input.addEventListener(
    "keypress",
    e => {

        if(e.key === "Enter"){

            search();

        }

    }
);

async function search(customQuery){

    const text =
    customQuery ||
    input.value.trim();

    if(!text){

        results.innerHTML =
        "<p>Escribe algo para buscar.</p>";

        return;

    }

    results.innerHTML =
    "<p>Buscando...</p>";

    try{

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

        console.log("DATA:", data);
        console.log("ERROR:", error);

        if(error){

            results.innerHTML =
            `<pre>${JSON.stringify(error,null,2)}</pre>`;

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
                    <a
                        href="${page.url}"
                        target="_blank"
                    >
                        ${page.title || "Sin título"}
                    </a>
                </h3>

                <div class="url">
                    ${page.url || ""}
                </div>

                <p>
                    ${page.description || ""}
                </p>

            </div>
            `;

        });

    }catch(err){

        console.error(err);

        results.innerHTML =
        `<pre>${err}</pre>`;

    }

}
