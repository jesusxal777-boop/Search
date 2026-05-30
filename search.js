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

const results =
document.getElementById("results");

results.innerHTML =
"<p>Conectando con Supabase...</p>";

async function testConnection() {

    try {

        const {
            data,
            error
        } = await supabase
        .from("pages")
        .select("*");

        console.log("DATA:", data);
        console.log("ERROR:", error);

        results.innerHTML =
        "<pre>" +
        JSON.stringify(
            {
                data,
                error
            },
            null,
            2
        ) +
        "</pre>";

    } catch(err) {

        console.error(err);

        results.innerHTML =
        "<pre>" +
        err +
        "</pre>";

    }

}

testConnection();
