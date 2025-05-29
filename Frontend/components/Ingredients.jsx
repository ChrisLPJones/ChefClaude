import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";

export default function Ingredients(props) {
    function onCLick(index) {
        props.removeIngredient(index);
    }

    // Add Ingredients to render
    const ingredientsList = props.ingredients.map((ingredient, index) => (
        <li key={index} className="ingredient-item">
            <span>{ingredient}</span>
            <button className="removeButton" onClick={() => onCLick(index)}>
                <i className="fas fa-times xIcon"></i>
            </button>
        </li>
    ));

    return (
        <section className="container">
            {ingredientsList.length !== 0 && <h2>Ingredients on hand:</h2>}

            <ul>{ingredientsList}</ul>

            {props.ingredients.length >= 3 && (
                <div className="get-recipe-container" ref={props.getRecipeRef}>
                    <div className="scroll-target">
                        <h3>
                            {props.recipeList.length > 0
                                ? "Want a new recipe?"
                                : "Ready for a recipe?"}
                        </h3>
                        <p>
                            {props.recipeList.length > 0
                                ? "Get a new recipe from the list of ingredients."
                                : "Generate a recipe from the list of ingredients."}
                        </p>
                    </div>
                    <button
                        onClick={() => props.toggleRecipe(props.ingredients, props.recipeList)}
                        disabled={props.isLoading}
                    >
                        {props.isLoading ? (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "centre",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span style={{ marginRight: "10px" }}>
                                    Loading{" "}
                                </span>
                                <ClipLoader size={15} color="white" />
                            </div>
                        ) : props.recipeList.length > 0 ? (
                            "Get new recipe"
                        ) : (
                            "Get recipe"
                        )}
                    </button>
                </div>
            )}

            {props.isLoading && (
                <>
                    <div
                        className="LoadingSpinner"
                        ref={props.loadingSection}
                    ></div>
                </>
            )}
        </section>
    );
}

Ingredients.propTypes = {
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    toggleRecipe: PropTypes.func.isRequired,
    ref: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    ]),
    getRecipeRef: PropTypes.object,
};
