document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalEl = document.getElementById("cart-total");
    const btnPagar = document.getElementById("btn-pagar");

    // 🔹 Cargar carrito desde localStorage
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || {};

    // 🔹 Renderizar carrito
    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        Object.values(cartItems).forEach(item => {
            total += item.quantity * item.price;

            const li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

            li.innerHTML = `
                <div>
                    <h6 class="my-0">${item.name}</h6>
                    <small class="text-muted">Precio: $${item.price.toFixed(2)}</small>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <input type="number" min="1" value="${item.quantity}" class="form-control form-control-sm quantity-input" style="width: 70px;">
                    <span>$${(item.quantity * item.price).toFixed(2)}</span>
                    <button class="btn btn-danger btn-sm btn-eliminar">Eliminar</button>
                </div>
            `;

            // Eliminar producto
            li.querySelector(".btn-eliminar").addEventListener("click", () => removeFromCart(item.id_producto));

            // Actualizar cantidad
            li.querySelector(".quantity-input").addEventListener("change", e => {
                const nuevaCantidad = parseInt(e.target.value);
                if (nuevaCantidad < 1) {
                    e.target.value = item.quantity;
                    return;
                }
                updateQuantity(item.id_producto, nuevaCantidad);
            });

            cartItemsContainer.appendChild(li);
        });

        cartTotalEl.textContent = `$${total.toFixed(2)}`;
        saveCart();
    }

    // 🔹 Funciones
    function removeFromCart(id_producto) {
        delete cartItems[id_producto];
        renderCart();
    }

    function updateQuantity(id_producto, cantidad) {
        if (cartItems[id_producto]) {
            cartItems[id_producto].quantity = cantidad;
            renderCart();
        }
    }

    function saveCart() {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    // 🔹 Pagar (solo alerta por ahora)
    btnPagar.addEventListener("click", () => {
        if (Object.keys(cartItems).length === 0) {
            Swal.fire("Carrito vacío", "No hay productos para pagar", "warning");
            return;
        }
        Swal.fire("¡Listo!", "Se procedería al pago aquí.", "success");
        // Opcional: limpiar carrito después del pago
        // cartItems = {};
        // saveCart();
        // renderCart();
    });

    // 🔹 Inicializar render
    renderCart();
});
