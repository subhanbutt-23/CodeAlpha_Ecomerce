const API_URL = "http://localhost:5000/api/orders/my-orders";

async function loadMyOrders() {
    const ordersList = document.getElementById("orders-list");

    // Get the login token
    const token = localStorage.getItem("token");

    // Redirect if the user is not logged in
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Unable to load orders");
        }

        // Display a message if there are no orders
        if (result.orders.length === 0) {
            ordersList.textContent = "You haven't placed any orders yet.";
            return;
        }

        // Clear the loading message
        ordersList.textContent = "";

        // Display each order
        result.orders.forEach(order => {
            const orderCard = document.createElement("div");
            orderCard.className = "order-card";

            const heading = document.createElement("h3");
            heading.textContent = `Order #${order._id}`;

            const date = document.createElement("p");
            date.textContent = `Date: ${new Date(order.createdAt).toLocaleDateString()}`;

            const total = document.createElement("p");
            total.textContent = `Total: Rs. ${order.totalAmount.toLocaleString("en-PK")}`;

            const status = document.createElement("p");
            status.textContent = `Status: ${order.orderStatus}`;

            const products = document.createElement("div");

            order.items.forEach(item => {
                const product = document.createElement("p");
                product.textContent = `${item.name} × ${item.quantity}`;
                products.appendChild(product);
            });

            orderCard.append(heading, date, products, total, status);
            ordersList.appendChild(orderCard);
        });

    } catch (error) {
        console.error("My Orders error:", error);
        ordersList.textContent = error.message;
    }
}

// Load orders when the page opens
loadMyOrders();