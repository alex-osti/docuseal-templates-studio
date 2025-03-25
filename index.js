async function go() {
    const username = "alex";
    const password = "cPex gltn S5WA Kmir xuej Oeqh";

    const blogpostheaders = new Headers();
    blogpostheaders.set("Content-Type", "application/json");
    blogpostheaders.set(
        "Authorization", 
        "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
    );

    try {
        const response = await fetch("https://wordpress-zww4w8sg080wk0ok8wc4o0ok.trymakertoo.com/", {
            method: "POST",
            headers: blogpostheaders,
            body: JSON.stringify({
                title: "Hey You!",
                status: "publish",
                content: "<!-- wp:paragraph --><p>This Is IT!</p><!-- /wp:paragraph -->"
            })
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Success:", data);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

go();