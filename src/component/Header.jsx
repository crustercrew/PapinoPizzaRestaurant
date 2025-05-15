import { useContext } from "react";
import {CartContext, useLanguage} from "../../context/Context.jsx";
import {Link} from "@tanstack/react-router";

export default function Header() {
    const [cart] = useContext(CartContext);
    const { language, setLanguage } = useLanguage();
    return (
        <nav>
            <Link to="/"><h1 className="logo">Papino Pizza</h1></Link>
            <div className="nav-cart">
                🛒<span className="nav-cart-number">{cart.length}</span>
            </div>
            <button onClick={() => setLanguage(language === "id" ? "en" : "id")}>
                {language === "id" ? "Switch to English" : "Ganti ke Indonesia"}
            </button>
        </nav>
    );
}