import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import getPastOrders from "../../API/GetPastOrders.js"
import {useLanguage} from "../../context/Context.jsx";
import translations from "../../context/Translate.jsx";
import getPastOrder from "../../API/getPastOrder";
import Modal from "../component/Modal.jsx";

export const Route = createFileRoute("/Past/Lazy")({
    component: PastOrdersRoute,
})

function PastOrdersRoute() {
    const [page, setPage] = useState(1)
    const [selectedOrder, setSelectedOrder] = useState();

    const { isLoading, data } = useQuery({
        queryKey: ["past-orders", page],
        queryFn: () => getPastOrders(page),
        staleTime: 30000,
    })

    const { isLoading: isOrderLoading, data: orderData } = useQuery({
        queryKey: ["past-order", selectedOrder],
        queryFn: () => getPastOrder(selectedOrder),
        enabled: !!selectedOrder,
        staleTime: 24 * 60 * 60 * 1000,
    });

    const {language,setLanguage} = useLanguage();
    if (isLoading) {
        return (
            <div className="pesanan-lama">
                <h2>{translations[language].loading}</h2>
            </div>
        )
    }

    const currency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });


    return (
        <div className="pesanan-lama">
            <table>
                <thead>
                <tr>
                    <td>{translations[language].tableHistory.Id}</td>
                    <td>{translations[language].tableHistory.date}</td>
                    <td>{translations[language].tableHistory.time}</td>
                </tr>
                </thead>
                <tbody>
                {data.map((order) => (
                    <tr key={order.order_id}>
                        <td>
                            <button onClick={() => setSelectedOrder(order.order_id)}>
                                {order.order_id}
                            </button>
                        </td>
                        <td>{order.date}</td>
                        <td>{order.time}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pages">
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                    {translations[language].page.prev}
                </button>
                <div>{page}</div>
                <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
                    {translations[language].page.next}
                </button>
            </div>
            {selectedOrder ? (
                <Modal>
                    <h2>Order number {selectedOrder}</h2>
                    {!isOrderLoading ? (
                        <table>
                            <thead>
                            <tr>
                                <td>Image</td>
                                <td>Name</td>
                                <td>Size</td>
                                <td>Quantity</td>
                                <td>Price</td>
                                <td>Total</td>
                            </tr>
                            </thead>
                            <tbody>
                            {orderData.orderItems.map((item) => (
                                <tr key={`${item.pizzaTypeId}_${item.size}`}>
                                    <td>
                                        <img src={item.image} alt={item.name} />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.size}</td>
                                    <td>{item.quantity}</td>
                                    <td>{currency.format(item.price)}</td>
                                    <td>{currency.format(item.total)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <button onClick={() => setSelectedOrder()}>Tutup</button>
                </Modal>
            ) : null}
        </div>
    )
}