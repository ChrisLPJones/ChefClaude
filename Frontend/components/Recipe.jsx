import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";

export default function Recipe(props) {
    return (
        <section className="suggested-recipe-container">
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    );
}

Recipe.propTypes = {
    recipe: PropTypes.string.isRequired,
};
