import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { IoIosPrint } from "react-icons/io";

export default function PrintDocument(props) {
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    return (
        <div>
            <div ref={contentRef} className="print-wrapper">
                <ReactMarkdown>{props.recipe.trim()}</ReactMarkdown>
                <button
                    className="print-button"
                    onClick={() => reactToPrintFn()}
                >
                    <span className="print-button-content">
                        Print Recipe <IoIosPrint size={20} />
                    </span>
                </button>
            </div>
        </div>
    );
}
