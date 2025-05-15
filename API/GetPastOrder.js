export default async function getPastOrder(orderId) {
    const res = await fetch(`/api/past-order/${orderId}`);
    const data = await res.json();
    return data;
}