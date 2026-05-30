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

if (query) {
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
        if (e.key === "Enter") {
            search();
        }
    }
);

async function search(customQuery = null) {

    const text =
    customQuery ||
    input.value.trim();

    if (!text) {
        results.innerHTML =
        "<p>Escribe algo para buscar.</p>";
        return;
    }

    results.innerHTML =
    "<p>Buscando...</p>";

    console.log("Buscando:", text);

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

    if (error) {

        results.innerHTML = `
            <div class="result">
                <h3>Error</h3>
                <pre>${JSON.stringify(error, null, 2)}</pre>
            </div>
        `;

        return;
    }

    if (!data || data.length === 0) {

        results.innerHTML = `
            <div class="result">
                <h3>Sin resultados</h3>
                <p>No se encontraron coincidencias para "${text}".</p>
            </div>
        `;

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

}
