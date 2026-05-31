const SUPABASE_URL = "https://etzdhnpynhgagiwwbqur.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0emRobnB5bmhnYWdpd3dicXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNTY5NTEsImV4cCI6MjA5NTczMjk1MX0.iaNTV2bv6xWhJ6NlRswklZ04JxjxJlXpndfporV9zCg";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const input = document.getElementById("searchInput");
const button = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("results");

const params = new URLSearchParams(window.location.search);
const queryParam = params.get("q");

if (queryParam) {
    input.value = queryParam;
    search(queryParam);
}

button.addEventListener("click", () => search());

// Permitir búsqueda al presionar "Enter"
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") search();
});

async function search(customQuery) {
    const text = (customQuery || input.value).trim();

    if (!text) {
        resultsContainer.innerHTML = "<p>Escribe algo para buscar.</p>";
        return;
    }

    resultsContainer.innerHTML = "<p>Buscando...</p>";

    // Búsqueda eficiente directamente en Supabase (Case-insensitive)
    const { data, error } = await supabase
        .from("pages")
        .select("*")
        .or(`title.ilike.%${text}%,description.ilike.%${text}%,content.ilike.%${text}%`);

    if (error) {
        console.error("Error de Supabase:", error);
        resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
        return;
    }

    if (!data || data.length === 0) {
        resultsContainer.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
    }

    // Renderizado limpio
    resultsContainer.innerHTML = data.map(page => `
        <div class="result">
            <a href="${page.url}" target="_blank">${page.title || 'Sin título'}</a>
            <div class="url">${page.url}</div>
            <p>${page.description || 'Sin descripción'}</p>
        </div>
    `).join('');
}
