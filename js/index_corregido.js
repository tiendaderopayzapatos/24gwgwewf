
document.addEventListener("DOMContentLoaded", () => {
    const productosContenedor = document.getElementById("productos");
    const categoriaFiltro = document.getElementById("categoria");
    const tallaFiltro = document.getElementById("talla");
    const buscadorInput = document.getElementById("buscador");

    let productos = [];

    // Cargar productos desde el archivo JSON
    fetch("data/productos.json")
        .then(res => res.json())
        .then(data => {
            productos = data;
            mostrarProductos(productos);
        })
        .catch(err => console.error("Error cargando productos:", err));

    function mostrarProductos(lista) {
        productosContenedor.innerHTML = "";
        lista.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $ ${producto.precio.toFixed(2)}</p>
                <p>Tallas disponibles: ${producto.tallas.join(", ")}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            `;
            productosContenedor.appendChild(div);
        });
    }

    function filtrarProductos() {
        let filtrado = productos;
        if (categoriaFiltro.value) {
            filtrado = filtrado.filter(p => p.categoria === categoriaFiltro.value);
        }
        if (tallaFiltro.value) {
            filtrado = filtrado.filter(p => p.tallas.includes(tallaFiltro.value));
        }
        if (buscadorInput.value) {
            filtrado = filtrado.filter(p => p.nombre.toLowerCase().includes(buscadorInput.value.toLowerCase()));
        }
        mostrarProductos(filtrado);
    }

    categoriaFiltro.addEventListener("change", filtrarProductos);
    tallaFiltro.addEventListener("change", filtrarProductos);
    buscadorInput.addEventListener("input", filtrarProductos);
});

function agregarAlCarrito(id) {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
        alert("Debes iniciar sesión para agregar al carrito.");
        return;
    }
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito.");
}
