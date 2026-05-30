const SUPABASE_URL = "https://etzdhnpynhgagiwwbqur.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0emRobnB5bmhnYWdpd3dicXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxNTY5NTEsImV4cCI6MjA5NTczMjk1MX0.iaNTV2bv6xWhJ6NlRswklZ04JxjxJlXpndfporV9zCg";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function testConnection() {

    const { data, error } =
    await supabase
    .from("pages")
    .select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);

}

testConnection();
