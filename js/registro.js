
document.getElementById("form-registro").addEventListener("submit", function(e) {
    e.preventDefault();
    const nuevoUsuario = document.getElementById("nuevoUsuario").value;
    const nuevaContrasena = document.getElementById("nuevaContrasena").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some(u => u.usuario === nuevoUsuario)) {
        document.getElementById("mensaje-registro").textContent = "El usuario ya existe.";
    } else {
        usuarios.push({ usuario: nuevoUsuario, contrasena: nuevaContrasena });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        window.location.href = "login.html";
    }
});
