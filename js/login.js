
document.getElementById("form-login").addEventListener("submit", function(e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;
    const registrado = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = registrado.find(u => u.usuario === usuario && u.contrasena === contrasena);

    if (existe) {
        localStorage.setItem("usuario", usuario);
        window.location.href = "index.html";
    } else {
        document.getElementById("mensaje-error").textContent = "Usuario o contraseña incorrectos.";
    }
});
