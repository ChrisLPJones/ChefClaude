import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
                        onClick={() =>
                            props.toggleRecipe(
                                props.ingredients,
                                props.recipeList
                            )
                        }
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
                    {/* Render Skeleton Text */}
                    <section className="skeleton-container">
                        <Skeleton height={30} width={"70%"} />
                        <br />
                        <Skeleton height={30} width={"40%"} />
                        <br />
                        <Skeleton height={20} width={"60%"} />
                        <Skeleton height={20} width={"45%"} />
                        <Skeleton height={20} width={"50%"} />
                        <Skeleton height={20} width={"48%"} />
                        <Skeleton height={20} width={"52%"} />
                        <Skeleton height={20} width={"44%"} />
                        <Skeleton height={20} width={"55%"} />
                        <Skeleton height={20} width={"43%"} />
                        <Skeleton height={20} width={"46%"} />
                        <Skeleton height={20} width={"57%"} />
                        <br />
                        <Skeleton height={30} width={"40%"} />
                        <br />
                        <Skeleton height={20} width={"95%"} />
                        <Skeleton height={20} width={"100%"} />
                        <Skeleton height={20} width={"90%"} />
                        <Skeleton height={20} width={"85%"} />
                        <Skeleton height={20} width={"20%"} />
                        <Skeleton height={20} width={"100%"} />
                        <Skeleton height={20} width={"98%"} />
                        <Skeleton height={20} width={"87%"} />
                        <Skeleton height={20} width={"25%"} />
                        <Skeleton height={20} width={"95%"} />
                        <br />
                        <Skeleton height={30} width={"40%"} />
                        <br />
                        <Skeleton height={20} width={"15%"} />
                        <Skeleton height={20} width={"12.5%"} />
                        <Skeleton height={20} width={"10%"} />
                    </section>
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
