import ingredientsData from "../src/ingredients-list.json";

export const callValidIngredientAPI = async (ingredient) => {
    const ingredientsSet = new Set(ingredientsData);

    const normalizedInput = ingredient.trim().toLowerCase();

    if (ingredientsSet.has(normalizedInput)) {
        return true;
    } else {
        try {
            const response = await fetch(
                import.meta.env.VITE_API_ENDPOINT + "/validingredient",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ingredient }),
                }
            );

            const data = await response.json();
            return data.valid;
        } catch (error) {
            return `Error fetching valid ingredient ${error}`;
        }
    }
};
