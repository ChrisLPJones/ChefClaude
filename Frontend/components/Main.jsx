import React, { useEffect, useRef, useState } from "react";
import { callClaudeAPI } from "../src/ai";
import InputForm from "./InputForm";
import Ingredients from "./Ingredients";
import Recipe from "./Recipe";
import axios from "axios";
import "../src/validIngredient";
import "../src/ai";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [recipe, setRecipe] = React.useState(null);
    const [recipeList, setRecipeList] = useState([]);
    const loadingSection = useRef(null);
    const inputRef = useRef(null);
    const getRecipeRef = useRef(null);

    // Ping api to wake from cold state
    useEffect(() => {
        async function pingApi() {
            try {
                await axios.post(import.meta.env.VITE_API_ENDPOINT + "/api");
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                // don't log anything to console
            }
        }
        pingApi();
    }, []);

    //Scroll window to recipe when loading recipe
    useEffect(() => {
        if (isLoading) {
            getRecipeRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [isLoading]);

    // Call API for recipe
    async function toggleRecipe(ingredientsList, recipeList) {
        setRecipe(null);
        setIsLoading(true);

        const recipeText = await callClaudeAPI(ingredientsList, recipeList);
        setRecipe(recipeText);

        // Save recipe title to list
        setRecipeList((prev) => [
            ...prev,
            recipeText.split("\n")[0].substring(2),
        ]);
        setIsLoading(false);
    }

    // Add ingredient
    async function addIngredients(formData) {
        setIngredients((preIngredients) => {
            const newIngredients = [
                ...preIngredients,
                formData.get("ingredient"),
            ];

            // If this makes 3 or more ingredients, blur the input
            if (newIngredients.length == 3) {
                const input = inputRef.current?.inputRef;
                if (input) input.blur();
            }

            return newIngredients;
        });
    }

    // Remove ingredient
    function removeIngredient(indexToRemove) {
        setIngredients((preIngredients) =>
            preIngredients.filter((_, index) => index !== indexToRemove)
        );
    }

    //---------------------------------------------------------------//

    return (
        <main>
            {/* Render Input Form */}
            <InputForm
                addIngredients={addIngredients}
                inputRef={inputRef}
                ingredients={ingredients}
            />

            {/* Render Ingredients List */}
            <Ingredients
                isLoading={isLoading}
                ingredients={ingredients}
                toggleRecipe={toggleRecipe}
                removeIngredient={removeIngredient}
                loadingSection={loadingSection}
                recipe={recipe}
                recipeList={recipeList}
                getRecipeRef={getRecipeRef}
            />

            {/* Render Recipe */}
            {recipe && <Recipe recipe={recipe} />}
        </main>
    );
}
