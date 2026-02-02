document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    const continuarPagoBtn = document.getElementById("btn-continuar-pago");

    // 🔹 Carrito en memoria
    const cartItems = {};

    /* ===================== FUNCIONES DEL CARRITO ===================== */
    function addToCart(id_producto, name, price, quantity) {
        if (cartItems[id_producto]) {
            cartItems[id_producto].quantity += quantity;
        } else {
            cartItems[id_producto] = { id_producto, name, price, quantity };
        }

        renderCartItems();
        updateCartTotal();
        updateCartCount();

        // Mostrar offcanvas
        const offcanvasCart = new bootstrap.Offcanvas(
            document.getElementById("offcanvasCart")
        );
        offcanvasCart.show();
    }

    function renderCartItems() {
        cartItemsContainer.innerHTML = "";

        for (const id in cartItems) {
            const item = cartItems[id];

            const listItem = document.createElement("li");
            listItem.classList.add(
                "list-group-item",
                "d-flex",
                "justify-content-between",
                "lh-sm"
            );

            listItem.innerHTML = `
                <div>
                    <h6 class="my-0">${item.name} (x${item.quantity})</h6>
                </div>
                <div class="d-flex align-items-center">
                    <span class="text-body-secondary">$${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="btn btn-danger btn-sm ms-2" onclick="removeFromCart(${id})">
                        Eliminar
                    </button>
                </div>
            `;

            cartItemsContainer.appendChild(listItem);
        }

        // Total
        const totalItem = document.createElement("li");
        totalItem.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "lh-sm",
            "fw-bold"
        );

        totalItem.innerHTML = `
            <span>Total</span>
            <strong>$${getCartTotal().toFixed(2)}</strong>
        `;

        cartItemsContainer.appendChild(totalItem);
    }

    window.removeFromCart = function (id) {
        delete cartItems[id];
        renderCartItems();
        updateCartTotal();
        updateCartCount();
    };

    function getCartTotal() {
        return Object.values(cartItems).reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    }

    function updateCartTotal() {
        cartTotal.textContent = `$${getCartTotal().toFixed(2)}`;
    }

    function updateCartCount() {
        const itemCount = Object.values(cartItems).reduce(
            (total, item) => total + item.quantity,
            0
        );
        cartCount.textContent = itemCount;
    }

    /* ===================== CLICK EN PRODUCTOS ===================== */
    document.querySelectorAll(".nav-link").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();

            const productItem = event.target.closest(".product-item");
            if (!productItem) return;

            const id_producto = parseInt(productItem.dataset.id);
            const productName = productItem.querySelector("h3").textContent;
            const productPrice = parseFloat(
                productItem.querySelector(".price").textContent.replace("$", "")
            );
            const quantity = parseInt(
                productItem.querySelector("#quantity").value
            );

            addToCart(id_producto, productName, productPrice, quantity);
        });
    });

    /* ===================== CONTINUAR PAGO ===================== */
    continuarPagoBtn.addEventListener("click", () => {
        if (Object.keys(cartItems).length === 0) {
            Swal.fire(
                "Carrito vacío",
                "Agrega productos antes de continuar",
                "warning"
            );
            return;
        }

        // 🔹 Guardar carrito para total.html
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        // 🔹 Ir a total.html
        window.location.href = "total.html";
    });
});
