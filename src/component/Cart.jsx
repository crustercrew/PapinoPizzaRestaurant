import {useLanguage} from "../../context/Context.jsx";
import translations from "../../context/Translate.jsx";

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export default function Cart({cart, checkout}){
    const { language } = useLanguage();
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const current = cart[i];
        total += current.pizza.sizes[current.size];
    }
    return(
        <div className="cart">
            <h2>{translations[language].cart}</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        <span className="size">{item.size}</span>
                        <span className="type">{item.pizza.name}</span>
                        <span className="price">{item.price}</span>
                    </li>
                ))}
            </ul>
            <p>{translations[language].total} {currency.format(total)}</p>
            <button onClick={checkout}>{translations[language].checkout}</button>
        </div>
    )
}