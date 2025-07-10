
document.addEventListener("DOMContentLoaded", () => {
    const carritoContenedor = document.getElementById("carrito");
    const resumen = document.getElementById("resumen");
    const btnPagar = document.getElementById("btn-pagar");
    const btnVaciar = document.getElementById("btn-vaciar");

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    fetch("data/productos.json")
        .then(res => res.json())
        .then(productos => {
            if (carrito.length === 0) {
                resumen.textContent = "Carrito vacío.";
                btnPagar.style.display = "none";
                btnVaciar.style.display = "none";
                return;
            }

            let total = 0;
            carritoContenedor.innerHTML = "";
            carrito.forEach(id => {
                const prod = productos.find(p => p.id === id);
                if (prod) {
                    const div = document.createElement("div");
                    div.innerHTML = \`
                        <p>\${prod.nombre} - $ \${prod.precio.toFixed(2)}</p>
                    \`;
                    carritoContenedor.appendChild(div);
                    total += prod.precio;
                }
            });
            resumen.textContent = "Total a pagar: $ " + total.toFixed(2);
        });

    btnVaciar.addEventListener("click", () => {
        localStorage.removeItem("carrito");
        location.reload();
    });

    btnPagar.addEventListener("click", () => {
        const tarjeta = prompt("Ingresa tu número de tarjeta (16 dígitos):");
        if (!/^[0-9]{16}$/.test(tarjeta)) {
            alert("Número de tarjeta inválido.");
            return;
        }
        alert("Pago realizado con éxito (ficticio). Gracias por tu compra.");
        localStorage.removeItem("carrito");
        location.reload();
    });
});
