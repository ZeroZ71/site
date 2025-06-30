// URL del endpoint que devuelve los campos
const ENDPOINT_CAMPOS = 'https://tuservidor.com/api/campos-registro';
const ENDPOINT_REGISTRO = 'https://tuservidor.com/api/registrar-usuario';

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('registroForm');
    const mensaje = document.getElementById('mensaje');

    // 1. Obtener los campos del servidor
    let campos = [];
    try {
        const res = await fetch(ENDPOINT_CAMPOS);
        campos = await res.json();
    } catch (error) {
        mensaje.textContent = 'Error al cargar los campos de registro.';
        return;
    }

    // 2. Generar el formulario dinámicamente
    campos.forEach(campo => {
        const label = document.createElement('label');
        label.textContent = campo.etiqueta + ': ';
        const input = document.createElement('input');
        input.type = campo.tipo;
        input.name = campo.nombre;
        if (campo.requerido) input.required = true;
        label.appendChild(input);
        form.appendChild(label);
        form.appendChild(document.createElement('br'));
    });

    // Botón de envío
    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.textContent = 'Registrar';
    form.appendChild(btn);

    // 3. Manejar el envío del formulario
    form.onsubmit = async (e) => {
        e.preventDefault();
        // Recopilar datos
        const datos = {};
        campos.forEach(campo => {
            datos[campo.nombre] = form.elements[campo.nombre].value;
        });

        // Enviar datos al servidor
        try {
            const res = await fetch(ENDPOINT_REGISTRO, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });
            const resultado = await res.json();
            mensaje.textContent = resultado.mensaje || 'Registro exitoso';
            form.reset();
        } catch (error) {
            mensaje.textContent = 'Error al registrar usuario.';
        }
    };
});
