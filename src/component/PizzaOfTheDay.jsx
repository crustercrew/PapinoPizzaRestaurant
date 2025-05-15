import {usePizzaOfTheDay} from "../../hooks/APIHooks.jsx";
import {useLanguage} from "../../context/Context.jsx";
import translations from "../../context/Translate.jsx";

const intl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

const PizzaOfTheDay = () => {
    const { pizza } = usePizzaOfTheDay();
    const { language } = useLanguage();

    if (!pizza) {
        return <div>{translations[language].loading}</div>;
    }

    if (!pizza.sizes) {
        return <div>Error: Size data not available</div>; // Handle missing size data
    }

    return (
        <div className="pizza-of-the-day">
            <h2>{translations[language].todaysPizza}</h2>
            <div>
                <div className="pizza-of-the-day-info">
                    <h3>{pizza.name}</h3>
                    <p>{pizza.description}</p>
                    <p className="pizza-of-the-day-price">
                        {translations[language].to} <span>{intl.format(pizza.sizes.S)}</span>
                    </p>
                </div>
                <img
                    className="pizza-of-the-day-image"
                    src={pizza.image}
                    alt={pizza.name}
                />
            </div>
        </div>
    );
}
export default PizzaOfTheDay;