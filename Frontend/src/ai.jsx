export const callClaudeAPI = async (ingredients, recipeList) => {
    try {
        const response = await fetch(import.meta.env.VITE_API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ingredients, recipeList }),
        });

        const data = await response.json();
        return data.content[0].text;
    } catch (error) {
        return `Error fetching recipe`;
    }
};
