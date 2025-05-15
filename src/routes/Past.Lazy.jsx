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

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

function PastOrdersRoute() {
    const [page, setPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState();
    const { language } = useLanguage();

    const { isLoading, data } = useQuery({
        queryKey: ["past-orders", page],
        queryFn: () => getPastOrders(page),
        staleTime: 15000,
    });

    const { isLoading: isOrderLoading, data: orderData } = useQuery({
        queryKey: ["past-order", selectedOrder],
        queryFn: () => getPastOrder(selectedOrder),
        enabled: !!selectedOrder,
        staleTime: 20000,
    });

    if (isLoading) {
        return (
            <div className="past-orders">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="past-orders">
            <table>
                <thead>
                <tr>
                    <td>{translations[language].tableHistory.id}</td>
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
                <button onClick={() => setPage(page + 1)} disabled={data.length < 10}>
                    {translations[language].page.next}
                </button>
            </div>
            {selectedOrder ? (
                <Modal>
                    <h2>{translations[language].OrderNumber} {selectedOrder}</h2>
                    {!isOrderLoading ? (
                        <table>
                            <thead>
                            <tr>
                                <td>{translations[language].pastHistoryDetail.id}</td>
                                <td>{translations[language].pastHistoryDetail.name}</td>
                                <td>{translations[language].pastHistoryDetail.size}</td>
                                <td>{translations[language].pastHistoryDetail.quantity}</td>
                                <td>{translations[language].pastHistoryDetail.price}</td>
                                <td>{translations[language].pastHistoryDetail.total}</td>
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
                        <p>{translations[language].loading}...</p>
                    )}
                    <button onClick={() => setSelectedOrder()}>{translations[language].close}</button>
                </Modal>
            ) : null}
        </div>
    );
}