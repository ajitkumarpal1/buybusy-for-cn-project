export function Orders() {
    // Dummy order data
    const orders = [
        {
            id: '1',
            date: '2024-08-01',
            items: [
                { name: 'Product 1', quantity: 2, price: 10 },
                { name: 'Product 2', quantity: 1, price: 20 },
            ],
            total: 40,
        },
        {
            id: '2',
            date: '2024-07-15',
            items: [
                { name: 'Product 3', quantity: 1, price: 15 },
                { name: 'Product 4', quantity: 3, price: 5 },
            ],
            total: 30,
        },
        // Add more orders as needed
    ];

    return (
        <div className="orders-container">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            {orders.length > 0 ? (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.id} className="order-card bg-blue-600 p-4 shadow-lg shadow-blue-950 rounded-3xl text-white mb-4">
                            <h3 className="text-xl font-semibold">Order ID: {order.id}</h3>
                            <p><strong>Date:</strong> {order.date}</p>
                            <div className="mt-2">
                                <h4 className="text-lg font-semibold">Items</h4>
                                <ul className="list-disc list-inside">
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} - {item.quantity} x ${item.price}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <p className="mt-2"><strong>Total:</strong> ${order.total}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
}
