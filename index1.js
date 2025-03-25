async function createPost() {
    const username = "alex.alexosti"; // Your WordPress username
    const appPassword = "wSDD MZrt Uhi8 vcbX FvpZ b1Us"; // New generated application password

    // Use Buffer to encode credentials
    const authHeader = "Basic " + Buffer.from(`${username}:${appPassword}`).toString('base64');

    try {
        const response = await fetch("https://makertoo.com/wp-json/wp/v2/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": authHeader
            },
            body: JSON.stringify({
                title: "API Created Post",
                status: "publish",
                content: "<!-- wp:paragraph --><p>Created via REST API!</p><!-- /wp:paragraph -->",
                categories: [1] // Assign to default category
            })
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Full error:", errorDetails);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const newPost = await response.json();
        console.log("Post created successfully:", newPost);
    } catch (error) {
        console.error("Creation failed:", error);
    }
}

createPost();