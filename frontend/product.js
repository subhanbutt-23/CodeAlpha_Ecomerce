const API_URL = "http://localhost:5000/api/products";

// Get product ID from the URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Get the HTML container
const productDetails = document.getElementById("product-details");

// Load product details from backend
async function loadProductDetails() {
    try {
        if (!productId) {
            throw new Error("Product ID is missing");
        }

        const response = await fetch(`${API_URL}/${encodeURIComponent(productId)}`);

        const product = await response.json();

        if (!response.ok) {
            throw new Error(product.message || "Product not found");
        }

        displayProduct(product);

    } catch (error) {
        console.error("Product error:", error);

        productDetails.textContent = error.message;
    }
}

// Display product information
function displayProduct(product) {
    productDetails.innerHTML = `
        <div class="product-details-card">

            <img
                src="${product.image || "https://placehold.co/500x500?text=No+Image"}"
                alt="${product.name}"
            >

            <div class="product-info">

                <h2>${product.name}</h2>

                <p>Category: ${product.category}</p>

                <h3>
                    Rs. ${product.price.toLocaleString("en-PK")}
                </h3>

                <button id="add-detail-to-cart">
                    Add to Cart
                </button>

            </div>

        </div>
    `;

    document.getElementById("add-detail-to-cart")
        .addEventListener("click", () => {
            addToCart(product);
        });
}

// Add product to the shared shopping cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
        item => item._id === product._id
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product added to cart!");
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cart-count").textContent = totalItems;
}

// Open cart from product page
document.getElementById("cart-button").addEventListener("click", () => {
    window.location.href = "index.html";
});

updateCartCount();
loadProductDetails();