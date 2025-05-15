import {useEffect, useState} from "react";

const usePizzaOfTheDay = () => {
    const [pizza, setPizza] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPizzaOfTheDay() {
            try {
                const response = await fetch("/api/pizza-of-the-day");
                if (!response.ok) throw new Error("Failed to fetch pizza data");

                const data = await response.json();
                setPizza(data);
            } catch (err) {
                setError(err.message);
            }
        }

        fetchPizzaOfTheDay();
    }, []);

    return { pizza, error };
};

export { usePizzaOfTheDay };