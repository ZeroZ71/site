// Función para registrar un nuevo usuario
function registrarUsuario(nombre, email, telefono) {
    // Validar que los campos no estén vacíos
    if (!nombre || !email || !telefono) {
        return 'Por favor, complete todos los campos';
    }
    
    // Crear un objeto usuario
    const usuario = {
        nombre: nombre,
        email: email,
        telefono: telefono,
        fechaRegistro: new Date().toISOString()
    };

    // Guardar el usuario en el almacenamiento local (localStorage)
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    return 'Usuario registrado exitosamente';
}

// Ejemplo de uso
console.log(registrarUsuario('Juan Perez', 'juan@example.com', '1234567890'));

// Función para obtener todos los usuarios registrados
function obtenerUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

// Mostrar usuarios registrados
console.log(obtenerUsuarios());
