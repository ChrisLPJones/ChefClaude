import Select from "react-select";
import { useEffect, useState, useMemo } from "react";
import Ingredients from "../src/ingredients-list.json";

export default function InputForm(props) {
    const [ingredientsArray, setIngredientsArray] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selected, setSelected] = useState(null);
    const selectRef = props.inputRef;

    const customStyles = {
        menuList: (provided) => ({
            ...provided,
            maxHeight: 300,
        }),
    };

    useEffect(() => {
        const mappedIngredients = Ingredients.map((i) => ({
            value: i.toLowerCase(),
            label: i
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
        }));
        setIngredientsArray(mappedIngredients);
    }, []);

    function handleClick() {
        selectRef.current?.focus();
    }

    // 🔍 Sort options by closeness to inputValue
    const filteredOptions = useMemo(() => {
        if (!inputValue) return ingredientsArray;

        return [...ingredientsArray].sort((a, b) => {
            const aMatch = a.label.toLowerCase().startsWith(inputValue.toLowerCase());
            const bMatch = b.label.toLowerCase().startsWith(inputValue.toLowerCase());

            if (aMatch && !bMatch) return -1;
            if (!aMatch && bMatch) return 1;

            // Secondary sort: Levenshtein distance (optional enhancement)
            return a.label.localeCompare(b.label);
        });
    }, [inputValue, ingredientsArray]);

    return (
        <>
            <form
                onSubmit={(e) => {
                    handleClick();
                    e.preventDefault();

                    if (!selected) return;

                    const formData = new FormData();
                    formData.set("ingredient", selected.label);

                    props.addIngredients(formData);
                    setSelected(null);
                    setInputValue("");
                }}
            >
                <Select
                    ref={selectRef}
                    onChange={(option) => {
                        setSelected(option);
                        setTimeout(() => {
                            const input = selectRef.current?.inputRef;
                            if (input) input.focus();
                        }, 0);
                    }}
                    isClearable={true}
                    value={selected}
                    className="select-field"
                    placeholder="Enter ingredient..."
                    options={filteredOptions}
                    onInputChange={(value) => setInputValue(value)}
                    menuIsOpen={inputValue?.length > 0}
                    styles={customStyles}
                    components={{
                        DropdownIndicator: () => null,
                        IndicatorSeparator: () => null,
                    }}
                />

                <button type="submit">Add Ingredient</button>
            </form>

            <div className="description">
                {props.ingredients.length < 3 && (
                    <p>Enter 3 or more ingredients.</p>
                )}
            </div>
        </>
    );
}
