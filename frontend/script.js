
const API_URL = "http://localhost:5000/api/products";
// Load saved cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}
// Update cart quantity in header
function updateCartCount() {
    const cartCount = document.getElementById("cart-count");

    const totalItems = cart.reduce((total, item) => {
        return total + item.quantity;
    }, 0);

    cartCount.textContent = totalItems;
}
// Display products inside the cart panel
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "0";
        return;
    }

    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement("div");
cartItem.className = "cart-item";
cartItem.innerHTML = `
    <h3>${item.name}</h3>

    <p>Price: Rs. ${item.price.toLocaleString("en-PK")}</p>

    <div class="quantity-controls">
        <button class="decrease-quantity">−</button>

        <span>${item.quantity}</span>

        <button class="increase-quantity">+</button>
    </div>

    <p>
        Subtotal: Rs.
        ${(item.price * item.quantity).toLocaleString("en-PK")}
    </p>
    <button class="remove-item">Remove</button>
`;

        cartItems.appendChild(cartItem);
        // Increase quantity
cartItem.querySelector(".increase-quantity").addEventListener("click", () => {
    updateQuantity(item._id, 1);
});

// Decrease quantity
cartItem.querySelector(".decrease-quantity").addEventListener("click", () => {
    updateQuantity(item._id, -1);
});
// Remove product from cart
cartItem.querySelector(".remove-item").addEventListener("click", () => {
    removeFromCart(item._id);
});
    });
// Update product quantity
function updateQuantity(productId, change) {
    const product = cart.find((item) => item._id === productId);

    if (!product) return;

    product.quantity += change;

    // Remove product if quantity reaches zero
    if (product.quantity <= 0) {
        cart = cart.filter((item) => item._id !== productId);
    }

    saveCart();
    updateCartCount();
    displayCart();
}
// Remove product completely
function removeFromCart(productId) {
    cart = cart.filter((item) => item._id !== productId);

    saveCart();
    updateCartCount();
    displayCart();
}

    cartTotal.textContent = total.toLocaleString("en-PK");
}
// Add product to cart
function addToCart(product) {
    const existingProduct = cart.find(
        (item) => item._id === product._id
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    alert(`${product.name} added to cart!`);
}
// Handle checkout form submission
const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    const token = localStorage.getItem("token");

if (!token) {
    alert("Please log in before placing an order.");
    window.location.href = "login.html";
    return;
}

    const orderData = {
        customerName: document.getElementById("customer-name").value,
        email: document.getElementById("customer-email").value,
        phone: document.getElementById("customer-phone").value,
        address: document.getElementById("customer-address").value,

        items: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity
        }))
    };

    try {
        const response = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Order failed");
        }

        // Show order confirmation using the saved order from the backend
document.getElementById("confirmation-order-id").textContent =
    result.order._id;

document.getElementById("confirmation-total").textContent =
    result.order.totalAmount.toLocaleString("en-PK");

document.getElementById("confirmation-panel").classList.add("active");

        cart = [];
        saveCart();
        updateCartCount();
        displayCart();

        checkoutForm.reset();
        checkoutPanel.classList.remove("active");

    } catch (error) {
        console.error("Order error:", error);
        alert(error.message);
    }
});

const productContainer = document.getElementById("product-container");
// Cart panel elements
const cartPanel = document.getElementById("cart-panel");
const cartButton = document.getElementById("cart-button");
const closeCartButton = document.getElementById("close-cart");
// Checkout panel elements
const checkoutPanel = document.getElementById("checkout-panel");
const checkoutButton = document.getElementById("checkout-button");
const closeCheckoutButton = document.getElementById("close-checkout");

// Open cart panel
cartButton.addEventListener("click", () => {
    cartPanel.classList.add("active");
    displayCart();
});

// Close cart panel
closeCartButton.addEventListener("click", () => {
    cartPanel.classList.remove("active");
});
// Open checkout panel
checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const checkoutTotal = document.getElementById("checkout-total");

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    checkoutTotal.textContent = total.toLocaleString("en-PK");

    cartPanel.classList.remove("active");
    checkoutPanel.classList.add("active");
});

// Close checkout panel
closeCheckoutButton.addEventListener("click", () => {
    checkoutPanel.classList.remove("active");
});
// Fetch products from the backend
async function loadProducts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        displayProducts(products);

    } catch (error) {
        console.error("Error:", error);

        productContainer.innerHTML =
            "<p>Unable to load products. Please try again later.</p>";
    }
}

// Display products on the webpage
function displayProducts(products) {
    productContainer.innerHTML = "";

    if (products.length === 0) {
        productContainer.innerHTML = "<p>No products available.</p>";
        return;
    }

    products.forEach((product) => {
        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
    <img
        src="${product.image || "https://placehold.co/400x400?text=No+Image"}"
        alt="${product.name}"
    >

    <h3>
    <a href="product.html?id=${encodeURIComponent(product._id)}">
        ${product.name}
    </a>
</h3>

    <p>${product.category}</p>

    <p class="price">
        Rs. ${product.price.toLocaleString("en-PK")}
    </p>

    <button class="add-to-cart">
        Add to Cart
    </button>
`;

const addButton = card.querySelector(".add-to-cart");

addButton.addEventListener("click", () => {
    addToCart(product);
});

        productContainer.appendChild(card);
    });
}
// Close order confirmation and return to shopping
const continueShoppingButton = document.getElementById("continue-shopping");

continueShoppingButton.addEventListener("click", () => {
    document.getElementById("confirmation-panel").classList.remove("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Display the current user's login status
const userSection = document.getElementById("user-section");

const savedUser = localStorage.getItem("user");

if (savedUser && userSection) {
    try {
        const user = JSON.parse(savedUser);

        // Clear Login and Register links
        userSection.innerHTML = "";

        // Display welcome message
        const welcomeMessage = document.createElement("span");
        welcomeMessage.textContent = `Welcome, ${user.name}`;

        // Create logout button
        const logoutButton = document.createElement("button");
        logoutButton.textContent = "Logout";

        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.reload();
        });

        userSection.appendChild(welcomeMessage);
        userSection.appendChild(logoutButton);

    } catch (error) {
        localStorage.removeItem("user");
        console.error("Invalid saved user information:", error);
    }
}
updateCartCount();
loadProducts();
