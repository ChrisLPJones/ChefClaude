import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import PrintDocument from "./PrintDocument";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Recipe(props) {
    return (
        <section className="suggested-recipe-container">
            <PrintDocument recipe={props.recipe} />
        </section>
    );
}

Recipe.propTypes = {
    recipe: PropTypes.string.isRequired,
};
