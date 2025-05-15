import { useState } from "react"
import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import PizzaOfTheDay from "../component/PizzaOfTheDay.jsx";
import Header from "../component/Header.jsx";
import {LanguageProvider} from "../../context/Context.jsx";
import {CartContext} from "../../context/Context.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import CustomErrorBoundary from "../ErrorHandling.jsx";

export const Route = createRootRoute({
    component: () => {
        const cartHook = useState([])
        return (
            <>
                <LanguageProvider>
                    <CartContext.Provider value={cartHook}>
                        <div>
                            <Header />
                                <CustomErrorBoundary>
                                    <Outlet />
                                </CustomErrorBoundary>
                            <PizzaOfTheDay />
                        </div>
                    </CartContext.Provider>
                    <TanStackRouterDevtools />
                    <ReactQueryDevtools />
                </LanguageProvider>
            </>
        );
    },
});