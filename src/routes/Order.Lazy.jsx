import Pizza from "../component/Pizza.jsx";
import {useEffect, useState,useContext} from "react";
import {CartContext, useLanguage} from "../../context/Context.jsx";
import Cart from "../component/Cart.jsx";
import translations from "../../context/Translate.jsx";
import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/Order/Lazy")({
    component: Order
})

function Order() {

    //useState
    const [pizzaType, setPizzaType] = useState("pepperoni");
    const [pizzaSize, setPizzaSize] = useState("medium");

    const [pizzaTypes, setPizzaTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [cart, setCart] = useContext(CartContext);
    const { language, setLanguage } = useLanguage();

    async function checkout() {
        setLoading(true);

        await fetch("/api/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                cart,
            }),
        });

        setCart([]);
        setLoading(false);
    }

    const intl = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    let price, selectedPizza;
    if (!loading) {
        selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
        price = intl.format(selectedPizza.sizes[pizzaSize]);
    }

    async function fetchPizzaTypes() {
        await new Promise((resolve) => setTimeout(resolve, 3000)); // buang nanti, cuma buat liat loading

        const pizzasRes = await fetch("/api/pizzas");
        const pizzasJson = await pizzasRes.json();
        setPizzaTypes(pizzasJson);
        setLoading(false);
    }

    //useEffect
    useEffect(() => {
        fetchPizzaTypes();
    }, []);

    return (
        <div className="order">
            <h2>{translations[language].title}</h2>
            <form
            onSubmit={(e) => {
                e.preventDefault();
                setCart([
                    ...cart,
                    {
                        pizza: selectedPizza,
                        size: pizzaSize,
                        price,
                    },
                ]);
            }}
            >
                <div>
                    <div>
                        <label htmlFor="pizza-type">{translations[language].type}</label>
                        <select
                        name={"pizza-type"}
                        value={pizzaType}
                        onChange={(e) => setPizzaType(e.target.value)}
                        >
                            {
                                pizzaTypes.map((pizza) => (
                                    <option key={pizza.id} value={pizza.id}>
                                        {pizza.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pizza-size">{translations[language].size}</label>
                        <div>
              <span>
                <input
                    id="pizza-s"
                    type="radio"
                    name="pizza-size"
                    value="S"
                    checked={pizzaSize === "S"}
                    onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
                            <span>
                <input
                    id="pizza-m"
                    type="radio"
                    name="pizza-size"
                    value="M"
                    checked={pizzaSize === "M"}
                    onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
                            <span>
                <input
                    id="pizza-l"
                    type="radio"
                    name="pizza-size"
                    value="L"
                    checked={pizzaSize === "L"}
                    onChange={(e) => setPizzaSize(e.target.value)}
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
                        </div>
                    </div>
                    <button type="submit">{translations[language].addToCart}</button>
                </div>
                {
                    loading ? (
                        <h3>{translations[language].loading}</h3>
                    ) : (
                        <div className="order-pizza">
                            <Pizza
                                name={selectedPizza.name}
                                description={selectedPizza.description}
                                image={selectedPizza.image}
                            />
                            <p>{price}</p>
                        </div>
                    )
                }
            </form>
            {
                loading ? <h2>{translations[language].loading}</h2> : <Cart cart={cart} setCart={setCart} checkout={checkout} />
            }
        </div>
    );
}