import {useLanguage} from "../../context/Context.jsx";
import translations from "../../context/Translate.jsx";

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});

export default function Cart({cart,setCart, checkout}){
    const { language } = useLanguage();
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const current = cart[i];
        total += current.pizza.sizes[current.size];
    }
    const removeItem = (index) => {
        const removeCart = [];
        for (let i = 0; i < cart.length; i++) {
            if (i !== index) {
                removeCart.push(cart[i]);
            }
        }
        setCart(removeCart);
    };
    total = cart.reduce((sum, current) => sum + current.pizza.sizes[current.size], 0);

    return(
        <div className="cart">
            <h2>{translations[language].cart}</h2>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        <span className="size">{item.size}</span>
                        <span className="type">{item.pizza.name}</span>
                        <span className="price">{item.price}</span>
                        <button onClick={() => removeItem(index)} >
                            {translations[language].removeItem || "Remove"}
                        </button>

                    </li>
                ))}
            </ul>
            <p>{translations[language].total} {currency.format(total)}</p>
            <button onClick={checkout}>{translations[language].checkout}</button>
        </div>
    )
}