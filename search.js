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
    ()=>search()
);

async function search(customQuery){

    const text =
    customQuery ||
    input.value.trim();

    if(!text){

        results.innerHTML =
        "Escribe algo para buscar.";

        return;

    }

    results.innerHTML =
    "Buscando...";

    const {
        data,
        error
    } = await supabase
    .from("pages")
    .select("*");

    console.log(data);
    console.log(error);

    if(error){

        results.innerHTML =
        error.message;

        return;

    }

    const filtered =
    data.filter(page => {

        const title =
        (page.title || "")
        .toLowerCase();

        const description =
        (page.description || "")
        .toLowerCase();

        const content =
        (page.content || "")
        .toLowerCase();

        const q =
        text.toLowerCase();

        return (
            title.includes(q) ||
            description.includes(q) ||
            content.includes(q)
        );

    });

    if(filtered.length===0){

        results.innerHTML =
        "No se encontraron resultados.";

        return;

    }

    results.innerHTML = "";

    filtered.forEach(page=>{

        results.innerHTML += `
        <div class="result">

            <a
                href="${page.url}"
                target="_blank"
            >
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
