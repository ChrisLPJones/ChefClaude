import chefclaudeicon from "/images/ChefClaudeIcon.png";
import { TiThMenu } from "react-icons/ti";
import { useState, useRef, useEffect } from "react";

export default function Header() {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header>
            <div className="center-content">
                <img src={chefclaudeicon} alt="Chef Claude Icon" />
                <h1>Chef Claude</h1>
            </div>
            <div className="header-right">
                <div className="menu-wrapper" ref={menuRef}>
                    <TiThMenu
                        size={30}
                        onClick={() => setOpen(!open)}
                        className="menu-icon"
                    />

                    {open && (
                        <div className="dropdown-container">
                            <div className="dropdown-panel">
                                <h3 className="dropdown-title">
                                    Chef Claude Recipe Generator
                                </h3>
                                <p className="dropdown-subtext">
                                    Created by Christian LP Jones
                                </p>
                                <p className="dropdown-subinfo">
                                    Powered by Claude AI + Spoonacular API
                                </p>
                                <a
                                    href="https://github.com/chrislpjones"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="dropdown-link"
                                >
                                    🔗 View on GitHub
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
